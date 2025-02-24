import React from "react";

interface LeaderboardEntry {
  player_name: string;
  score: number;
  category: string;
  difficulty: string;
  type: string;
  played_at: string;
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ol>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            <strong>{entry.player_name}</strong> - {entry.score} points
            <br />
            <em>
              {entry.category} | {entry.difficulty} | {entry.type}
            </em>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
