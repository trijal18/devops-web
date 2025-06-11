import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function ResultPage() {
  const { pdf_id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get(`/quiz/${pdf_id}/result`).then((r) => setResult(r.data));
  }, [pdf_id]);

  if (!result) return <p>Loading…</p>;

  return (
    <div>
      <h2>Quiz Completed</h2>
      <p>
        Score: {result.score} / {result.total}
      </p>
    </div>
  );
}
