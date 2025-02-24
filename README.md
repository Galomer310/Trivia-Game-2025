# Trivia Game 2025

A fun and interactive trivia game built with a Node.js backend and a React frontend. This project fetches trivia questions from the [Open Trivia Database](https://opentdb.com/), features a countdown timer for each question, sound effects for correct and incorrect answers, a progress bar, and a leaderboard that saves user scores to a PostgreSQL database.

## Features

- **Dynamic Question Filters:**  
  Choose your trivia category, difficulty, and question type.
- **Countdown Timer:**  
  Each question comes with a 20-second countdown.
- **Progress Bar:**  
  Visual indicator to show your progress through the quiz.
- **Leaderboard:**  
  Save and display high scores using a PostgreSQL database.
- **Modular Code Structure:**  
  The project is broken down into focused React components for better maintainability.
- **Responsive Design:**  
  Styled with CSS for a great user experience on any device.

## Technologies Used

- **Frontend:** React, TypeScript, CSS
- **Backend:** Node.js, Express, PostgreSQL, Axios, dotenv, cors
- **Deployment:** GitHub and Render

## Demo

(https://trivia-game-2025.onrender.com)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) database
- A GitHub account for repository hosting
- A Render account for deployment

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/Trivia-Game-2025.git
   cd Trivia-Game-2025
   ```

2. **Backend Setup:**

   Navigate to the `backend` directory, install dependencies, and configure your environment:

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` folder with your PostgreSQL credentials:

   ```env
   PGUSER=your_pg_user
   PGHOST=your_pg_host
   PGDATABASE=your_pg_database
   PGPASSWORD=your_pg_password
   PGPORT=your_pg_port
   ```

3. **Frontend Setup:**

   Navigate to the `frontend` directory, install dependencies, and start the development server:

   ```bash
   cd ../frontend
   npm install
   npm start
   ```

   Your React app should now be running at [http://localhost:3000](http://localhost:3000).

## Usage

1. Open the application in your browser.
2. Select a trivia category, difficulty level, and question type.
3. Click **Start Game** to begin the quiz.
4. Answer the questions within the time limit.
5. At the end of the game, enter your name to save your score and view the leaderboard.

## Deployment

### Deploying on Render

The project is structured into separate directories for the backend and frontend. On Render:

- **Backend:**  
  Create a Web Service pointing to the `backend` folder.  
  - **Build Command:** `npm install`  
  - **Start Command:** `node server.js` (adjust based on your file structure)  
  - Set the required environment variables (e.g., PostgreSQL credentials).

- **Frontend:**  
  Create a Static Site pointing to the `frontend` folder.  
  - **Build Command:** `npm install && npm run build`  
  - **Publish Directory:** `build`  
  - Ensure your API endpoints (backend URL) are correctly configured.

For detailed deployment steps, refer to [Render's documentation](https://render.com/docs).

## Project Structure

A sample structure for the project:

```
Trivia-Game-2025/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Filters.tsx
│   │   │   ├── Question.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   └── GameOver.tsx
│   │   └── App.tsx
│   ├── package.json
│   └── style.css
└── .gitignore
```

## Contributing

Contributions are welcome! Feel free to fork this repository, create a new branch for your feature or bug fix, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for trivia questions.
