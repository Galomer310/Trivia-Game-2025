import React from "react";
import Leaderboard from "./Leaderboard";

interface GameOverProps {
  score: number;
  totalQuestions: number;
  playerName: string;
  setPlayerName: (value: string) => void;
  saveScore: () => void;
  leaderboard: any[];
  newGame: () => void;
}

const GameOver: React.FC<GameOverProps> = ({
  score,
  totalQuestions,
  playerName,
  setPlayerName,
  saveScore,
  leaderboard,
  newGame,
}) => {
  return (
    <div className="game-over">
      <h2>Game Over!</h2>
      <p>
        Your final score is: {score} / {totalQuestions}
      </p>
      <div>
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button onClick={saveScore}>Save Score</button>
      </div>
      {leaderboard.length > 0 && <Leaderboard leaderboard={leaderboard} />}
      <button onClick={newGame}>New Game</button>
    </div>
  );
};

export default GameOver;
