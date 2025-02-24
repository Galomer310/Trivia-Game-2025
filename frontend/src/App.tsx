import React, { useState, useEffect } from "react";
import Filters from "./components/Filters";
import Question from "./components/Question";
import GameOver from "./components/GameOver";

interface Category {
  id: number;
  name: string;
}

interface QuestionData {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface LeaderboardEntry {
  player_name: string;
  score: number;
  category: string;
  difficulty: string;
  type: string;
  played_at: string;
}

const BACKEND_URL = "http://localhost:3000";
const TRIVIA_API_BASE = "https://opentdb.com/api.php?amount=10";

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories))
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  const startGame = async () => {
    if (!selectedCategory || !selectedDifficulty || !selectedType) {
      alert("Please select a category, difficulty, and type.");
      return;
    }
    const url = `${TRIVIA_API_BASE}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=${selectedType}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        // Throw an error if response is not ok (e.g., status 429)
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      if (!data.results || !Array.isArray(data.results)) {
        throw new Error("Invalid API response.");
      }
      // Set questions safely
      setQuestions(data.results);
      setCurrentQuestionIndex(0);
      setScore(0);
      setGameOver(false);
    } catch (error: any) {
      console.error("Error fetching questions:", error);
      alert("There was an error fetching questions: " + error.message);
      // Optionally, you could setQuestions([]) here to ensure questions is defined.
      setQuestions([]);
    }
  };

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setFeedback("Correct!");
      setScore((prev) => prev + 1);
    } else {
      setFeedback(
        `Wrong! The correct answer was: ${currentQuestion.correct_answer}`
      );
    }
    setTimeout(() => {
      setFeedback("");
      if (currentQuestionIndex + 1 >= questions.length) {
        setGameOver(true);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }, 2000);
  };

  const saveScore = () => {
    if (!playerName) {
      alert("Please enter your name.");
      return;
    }
    fetch(`${BACKEND_URL}/api/scores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        player_name: playerName,
        score,
        category: selectedCategory,
        difficulty: selectedDifficulty,
        type: selectedType,
      }),
    })
      .then((res) => res.json())
      .then(() => fetchLeaderboard())
      .catch((err) => console.error("Error saving score:", err));
  };

  const fetchLeaderboard = () => {
    fetch(`${BACKEND_URL}/api/leaderboard`)
      .then((res) => res.json())
      .then((data) => setLeaderboard(data))
      .catch((err) => console.error("Error fetching leaderboard:", err));
  };

  const newGame = () => {
    setQuestions([]);
    setGameOver(false);
    setPlayerName("");
    setLeaderboard([]);
  };

  return (
    <div className="App">
      <h1>Trivia Game</h1>
      {questions.length === 0 && !gameOver && (
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          startGame={startGame}
        />
      )}

      {questions.length > 0 && !gameOver && (
        <div>
          <Question
            question={questions[currentQuestionIndex].question}
            correct_answer={questions[currentQuestionIndex].correct_answer}
            incorrect_answers={
              questions[currentQuestionIndex].incorrect_answers
            }
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
          {feedback && (
            <p
              className={`feedback ${
                feedback.startsWith("Correct") ? "correct" : "wrong"
              }`}
            >
              {feedback}
            </p>
          )}
          <p>Score: {score}</p>
        </div>
      )}

      {gameOver && (
        <GameOver
          score={score}
          totalQuestions={questions.length}
          playerName={playerName}
          setPlayerName={setPlayerName}
          saveScore={saveScore}
          leaderboard={leaderboard}
          newGame={newGame}
        />
      )}
    </div>
  );
};

export default App;
