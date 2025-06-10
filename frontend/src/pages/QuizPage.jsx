import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function QuizPage() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    api.get(`/quiz/${id}`).then(res => setQuestions(res.data.questions));
  }, [id]);

  const answer = async (option) => {
    const { data } = await api.post("/quiz/answer", {
      pdf_id: id,
      index: idx,
      selected_option: option,
    });
    if (data.correct) setScore(score + 1);
    if (idx + 1 < questions.length) setIdx(idx + 1);
    else setDone(true);
  };

  if (questions.length === 0) return <p>Loading…</p>;

  return done ? (
    <div>
      <h1>Done!</h1>
      <p>Your score: {score}/{questions.length}</p>
    </div>
  ) : (
    <div>
      <h3>Q{idx + 1}: {questions[idx].question}</h3>
      <ul>
        {questions[idx].options.map(o => (
          <li key={o}>
            <button onClick={() => answer(o)}>{o}</button>
          </li>
        ))}
      </ul>
      <p>Score: {score}</p>
    </div>
  );
}
