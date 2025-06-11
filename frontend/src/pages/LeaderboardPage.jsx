// import { useEffect, useState } from "react";
// import api from "../api";

// export default function LeaderboardPage() {
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     api.get("/leaderboard").then((r) => setRows(r.data.leaderboard));
//   }, []);

//   return (
//     <div>
//       <h2>Leaderboard</h2>
//       <ol>
//         {rows.map((row) => (
//           <li key={row.username}>
//             {row.username} – {row.score}
//           </li>
//         ))}
//       </ol>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function LeaderboardPage() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    api
      .get("/leaderboard")
      .then((r) =>
        // sort by score (highest first) in case backend doesn’t
        setRows(
          [...r.data.leaderboard].sort((a, b) => b.score - a.score)
        )
      )
      .catch((err) => console.error("Failed to fetch leaderboard:", err));
  }, []);

  /* ---------- Loading ---------- */
  if (!rows) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-lg text-gray-600 font-medium">
            Fetching leaderboard…
          </p>
        </div>
      </div>
    );
  }

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
      {/* Floating blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 left-12 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse" />
        <div
          className="absolute top-40 right-24 w-24 h-24 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-28 left-1/4 w-40 h-40 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header card */}
        <div className="max-w-xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-lg mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 9a9 9 0 10-18 0 9 9 0 0018 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Leaderboard
          </h1>
          <p className="text-gray-600 mt-2">
            See how you stack up against other learners
          </p>
        </div>

        {/* Leaderboard list */}
        <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white/30">
          <ol>
            {rows.map((row, i) => {
              /* Medal colors for top 3 */
              const medals = [
                "from-yellow-400 to-amber-500 text-yellow-900",
                "from-gray-400 to-gray-500 text-gray-900",
                "from-orange-400 to-amber-600 text-orange-900",
              ];
              const medal = medals[i] || null;

              return (
                <li
                  key={row.username}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                    i % 2 ? "bg-white/50" : "bg-white/40"
                  } hover:scale-[1.02]`}
                >
                  {/* Rank badge */}
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${
                      medal
                        ? `bg-gradient-to-r ${medal}`
                        : "bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                    }`}
                  >
                    {i + 1}
                  </div>

                  {/* Username */}
                  <div className="flex-1 px-4 text-left">
                    <p className="font-medium text-gray-800 truncate">
                      {row.username}
                    </p>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <p className="font-semibold text-purple-600">{row.score}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-all duration-300"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
