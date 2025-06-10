import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { username, email, password });
      nav("/home");
    } catch (e) {
      setErr(e.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      {err && <p>{err}</p>}
      <form onSubmit={handle}>
        <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button>Signup</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
}
