import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import SummaryPage from "./pages/SummaryPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/summary/:pdf_id" element={<SummaryPage />} />
      <Route path="/quiz/:pdf_id" element={<QuizPage />} />
      <Route path="/result/:pdf_id" element={<ResultPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
