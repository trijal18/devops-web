// SignupPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit() {
    await api.post("/auth/signup", form);
    navigate("/login");
  }

  return (
    <div>
      <h2>Signup</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button onClick={submit}>Create Account</button>
    </div>
  );
}
