// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api";

// export default function QuizPage() {
//   const { pdf_id } = useParams();
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [idx, setIdx] = useState(0);
//   const [selected, setSelected] = useState("");

//   useEffect(() => {
//     api.get(`/quiz/${pdf_id}`).then((r) => setQuestions(r.data.questions));
//   }, [pdf_id]);

//   async function submitAnswer() {
//     await api.post("/quiz/answer", {
//       pdf_id,
//       index: idx,
//       selected_option: selected,
//     });
//     if (idx + 1 < questions.length) {
//       setIdx(idx + 1);
//       setSelected("");
//     } else {
//       navigate(`/result/${pdf_id}`);
//     }
//   }

//   if (!questions.length) return <p>Loading…</p>;
//   const q = questions[idx];

//   return (
//     <div>
//       <h3>{q.question}</h3>
//       {q.options.map((o) => (
//         <label key={o}>
//           <input
//             type="radio"
//             value={o}
//             checked={selected === o}
//             onChange={() => setSelected(o)}
//           />
//           {o}
//         </label>
//       ))}
//       <br />
//       <button disabled={!selected} onClick={submitAnswer}>
//         {idx + 1 === questions.length ? "Finish" : "Next"}
//       </button>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api"; // Axios instance pointing to backend

export default function QuizPage() {
  const { pdf_id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/quiz/${pdf_id}`)
      .then((res) => setQuestions(res.data.questions))
      .catch((err) => {
        console.error("Failed to fetch quiz:", err);
        // Optional: redirect or show error
      });
  }, [pdf_id]);

  async function submitAnswer() {
    setIsSubmitting(true);

    try {
      await api.post("/quiz/answer", {
        pdf_id,
        index: idx,
        selected_option: selected,
      });

      if (idx + 1 < questions.length) {
        setIdx(idx + 1);
        setSelected("");
      } else {
        navigate(`/result/${pdf_id}`);
      }
    } catch (err) {
      console.error("Failed to submit answer:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-gray-700">Preparing your quiz...</p>
            <p className="text-gray-500">Creating questions from your PDF</p>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[idx];
  const progress = ((idx + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Knowledge Quiz
            </h1>
            <p className="text-gray-600">Question {idx + 1} of {questions.length}</p>
          </div>

          <div className="bg-white/60 rounded-full p-1 shadow-inner mb-8">
            <div
              className="bg-gradient-to-r from-violet-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Quiz Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Question Header */}
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-8 py-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">{idx + 1}</span>
                </div>
                <h2 className="text-xl font-semibold text-white leading-relaxed">{q.question}</h2>
              </div>
            </div>

            {/* Options */}
            <div className="p-8">
              <div className="space-y-4">
                {q.options.map((option, optionIdx) => {
                  const isSelected = selected === option;
                  const optionLetter = String.fromCharCode(65 + optionIdx); // A, B, C...

                  return (
                    <label
                      key={option}
                      className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                        isSelected
                          ? 'border-violet-400 bg-gradient-to-r from-violet-50 to-purple-50 shadow-lg'
                          : 'border-gray-200 bg-white/50 hover:border-violet-300 hover:bg-violet-50/50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-violet-500 bg-violet-500 text-white'
                            : 'border-gray-300 bg-white text-gray-500'
                        }`}>
                          <span className="font-semibold text-sm">{optionLetter}</span>
                        </div>
                        <input
                          type="radio"
                          value={option}
                          checked={isSelected}
                          onChange={() => setSelected(option)}
                          className="sr-only"
                        />
                        <span className={`flex-1 font-medium ${
                          isSelected ? 'text-violet-900' : 'text-gray-700'
                        }`}>
                          {option}
                        </span>
                        {isSelected && (
                          <div className="text-violet-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {selected ? "Great choice! Ready to continue?" : "Please select an answer to continue"}
                </div>

                <button
                  disabled={!selected || isSubmitting}
                  onClick={submitAnswer}
                  className={`py-3 px-8 rounded-xl font-semibold transition-all duration-300 shadow-lg flex items-center space-x-2 ${
                    !selected || isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>{idx + 1 === questions.length ? "Finish Quiz" : "Next Question"}</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quiz Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
              <div className="text-2xl font-bold text-violet-600 mb-1">{idx + 1}</div>
              <div className="text-xs text-gray-600">Current</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
              <div className="text-2xl font-bold text-purple-600 mb-1">{questions.length}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
              <div className="text-2xl font-bold text-blue-600 mb-1">{questions.length - idx - 1}</div>
              <div className="text-xs text-gray-600">Remaining</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
              <div className="text-2xl font-bold text-emerald-600 mb-1">{Math.round(progress)}%</div>
              <div className="text-xs text-gray-600">Complete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
