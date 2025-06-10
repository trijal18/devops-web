import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function HomePage() {
  const nav = useNavigate();

  const logout = async () => {
    await api.get("/auth/logout");
    nav("/login");
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
      <br />
      <Link to="/upload">Upload PDF</Link> |{" "}
      <Link to="/leaderboard">Leaderboard</Link>
    </div>
  );
}
