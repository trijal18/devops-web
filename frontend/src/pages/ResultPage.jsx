// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api";

// export default function ResultPage() {
//   const { pdf_id } = useParams();
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     api.get(`/quiz/${pdf_id}/result`).then((r) => setResult(r.data));
//   }, [pdf_id]);

//   if (!result) return <p>Loading…</p>;

//   return (
//     <div>
//       <h2>Quiz Completed</h2>
//       <p>
//         Score: {result.score} / {result.total}
//       </p>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

export default function ResultPage() {
  const { pdf_id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get(`/quiz/${pdf_id}/result`)
      .then((r) => setResult(r.data))
      .catch((err) => {
        console.error("Failed to fetch result:", err);
      });
  }, [pdf_id]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-lg text-gray-600 font-medium">Loading your result...</p>
        </div>
      </div>
    );
  }

  const percentage = (result.score / result.total) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-10 text-center border border-white/30">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Quiz Completed!
            </h1>
            <p className="text-gray-600 mt-2">You’ve reached the end of this challenge.</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="bg-white/70 rounded-xl p-4 shadow-md">
              <p className="text-gray-600 text-sm">Score</p>
              <p className="text-4xl font-bold text-purple-600">{result.score} / {result.total}</p>
            </div>
            <div className="bg-white/70 rounded-xl p-4 shadow-md">
              <p className="text-gray-600 text-sm">Accuracy</p>
              <p className="text-2xl font-bold text-blue-600">{Math.round(percentage)}%</p>
            </div>
          </div>

          <div className="mt-8">
            <Link to="/" className="inline-block px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-all duration-300">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
