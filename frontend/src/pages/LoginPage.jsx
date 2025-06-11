// LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit() {
    await api.post("/auth/login", { email, password });
    navigate("/");
  }

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submit}>Login</button>
    </div>
  );
}
