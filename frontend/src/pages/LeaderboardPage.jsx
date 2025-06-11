import { useEffect, useState } from "react";
import api from "../api";

export default function LeaderboardPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get("/leaderboard").then((r) => setRows(r.data.leaderboard));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {rows.map((row) => (
          <li key={row.username}>
            {row.username} – {row.score}
          </li>
        ))}
      </ol>
    </div>
  );
}
