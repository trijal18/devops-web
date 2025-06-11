import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function QuizPage() {
  const { pdf_id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    api.get(`/quiz/${pdf_id}`).then((r) => setQuestions(r.data.questions));
  }, [pdf_id]);

  async function submitAnswer() {
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
  }

  if (!questions.length) return <p>Loading…</p>;
  const q = questions[idx];

  return (
    <div>
      <h3>{q.question}</h3>
      {q.options.map((o) => (
        <label key={o}>
          <input
            type="radio"
            value={o}
            checked={selected === o}
            onChange={() => setSelected(o)}
          />
          {o}
        </label>
      ))}
      <br />
      <button disabled={!selected} onClick={submitAnswer}>
        {idx + 1 === questions.length ? "Finish" : "Next"}
      </button>
    </div>
  );
}
