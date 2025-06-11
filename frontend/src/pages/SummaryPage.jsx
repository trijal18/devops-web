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
        setError("Failed to load summary. Make sure you're logged in.");
        setLoading(false);
      });
  }, [pdf_id]);

  if (loading) return <p>Loading summary...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Summary</h2>
      <p>{summary}</p>
      <button onClick={() => navigate(`/quiz/${pdf_id}`)}>Start Quiz</button>
    </div>
  );
}
