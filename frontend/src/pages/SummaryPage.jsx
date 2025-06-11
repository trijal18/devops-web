// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api";

// export default function SummaryPage() {
//   const { pdf_id } = useParams();
//   const navigate = useNavigate();
//   const [summary, setSummary] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     api.get(`/quiz/${pdf_id}`)
//       .then((res) => {
//         setSummary(res.data.summary);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching summary:", err);
//         setError("Failed to load summary. Make sure you're logged in.");
//         setLoading(false);
//       });
//   }, [pdf_id]);

//   if (loading) return <p>Loading summary...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h2>Summary</h2>
//       <p>{summary}</p>
//       <button onClick={() => navigate(`/quiz/${pdf_id}`)}>Start Quiz</button>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function SummaryPage() {
  const { pdf_id } = useParams();
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/quiz/${pdf_id}`)
      .then((res) => {
        setSummary(res.data.summary);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching summary:", err);
        setError("Failed to load summary. Please make sure you're logged in.");
        setLoading(false);
      });
  }, [pdf_id]);

  const navigateToQuiz = () => {
    navigate(`/quiz/${pdf_id}`);
  };

  const navigateToHome = () => {
    navigate(`/`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Analyzing your PDF...</p>
          <p className="text-gray-500">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={navigateToHome}
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            PDF Summary
          </h1>
          <p className="text-gray-600">Here's what we found in your document</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-6">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-semibold text-white">Key Insights</h2>
              </div>
            </div>

            <div className="p-8">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border-l-4 border-emerald-400">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
                  {summary}
                </p>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center border border-blue-100">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {summary.split(' ').length}
                  </div>
                  <div className="text-sm text-blue-800">Words in Summary</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center border border-purple-100">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {summary.split('.').filter(s => s.trim().length > 0).length}
                  </div>
                  <div className="text-sm text-purple-800">Key Points</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 text-center border border-amber-100">
                  <div className="text-2xl font-bold text-amber-600 mb-1">
                    {Math.ceil(summary.split(' ').length / 200)}
                  </div>
                  <div className="text-sm text-amber-800">Min Read Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={navigateToQuiz}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Start Quiz</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            <button
              onClick={navigateToHome}
              className="bg-white/80 backdrop-blur-sm text-gray-700 py-4 px-8 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center space-x-2"
            >
              <span>Home</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            Ready to test your knowledge? The quiz will be generated based on this summary.
          </p>
        </div>
      </div>
    </div>
  );
}
