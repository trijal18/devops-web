// // SignupPage.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function SignupPage() {
//   const [form, setForm] = useState({ username: "", email: "", password: "" });
//   const navigate = useNavigate();

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function submit() {
//     await api.post("/auth/signup", form);
//     navigate("/login");
//   }

//   return (
//     <div>
//       <h2>Signup</h2>
//       <input name="username" placeholder="Username" onChange={handleChange} />
//       <input name="email" placeholder="Email" onChange={handleChange} />
//       <input
//         name="password"
//         type="password"
//         placeholder="Password"
//         onChange={handleChange}
//       />
//       <button onClick={submit}>Create Account</button>
//     </div>
//   );
// }
// SignupPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await api.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const disabled =
    !form.username || !form.email || !form.password || isSubmitting;

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

      {/* Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-10 border border-white/30">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full shadow-lg mb-4">
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
                  d="M12 4v4m0 0v4m0-4h4m-4 0H8m0 8h8m-8 4h8"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Create Your Account
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Username
              </label>
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all duration-200 bg-white/90"
                placeholder="john_doe"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all duration-200 bg-white/90"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all duration-200 bg-white/90"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={disabled}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 ${
                disabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating…</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-violet-600 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
