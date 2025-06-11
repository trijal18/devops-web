import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function SummaryPage() {
  const { pdf_id } = useParams();
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");

  useEffect(() => {
    api.get(`/quiz/${pdf_id}`).then((res) => setSummary(res.data.summary));
  }, [pdf_id]);

  return (
    <div>
      <h2>Summary</h2>
      <p>{summary || "Loading..."}</p>
      <button onClick={() => navigate(`/quiz/${pdf_id}`)}>Start Quiz</button>
    </div>
  );
}
