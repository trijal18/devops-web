import { useEffect, useState } from "react";
import api from "../api";

export default function LeaderboardPage() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    api.get("/leaderboard").then(res => setBoard(res.data.leaderboard));
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {board.map(u => (
          <li key={u.username}>
            {u.username}: {u.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
