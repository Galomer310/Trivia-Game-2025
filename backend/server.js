const express = require("express");
const { Pool } = require("pg");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (if needed)
// app.use(express.static("public"));

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false },
});

pool
  .connect()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection error:", err));

// Fetch trivia questions from API
app.get("/api/questions", async (req, res) => {
  try {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=10&type=multiple"
    );
    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching trivia questions.");
  }
});

// Save player score to database
app.post("/api/scores", async (req, res) => {
  const { player_name, score, category, difficulty, type } = req.body;
  try {
    // Note: "type" is quoted since it is a reserved word.
    const result = await pool.query(
      'INSERT INTO scores (player_name, score, category, difficulty, "type") VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [player_name, score, category, difficulty, type]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).send("Error saving score.");
  }
});

// Get leaderboard (updated to include category, difficulty, and type)
app.get("/api/leaderboard", async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT player_name, score, category, difficulty, "type", played_at FROM scores ORDER BY score DESC LIMIT 5'
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching leaderboard.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
