import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

export default function SummaryPage() {
  const { id } = useParams();
  const [sum, setSum] = useState("");
  const [qcount, setQcount] = useState(0);

  useEffect(() => {
    api.get(`/pdf/summary/${id}`)
      .then(res => {
        setSum(res.data.summary);
        setQcount(res.data.questions);
      });
  }, [id]);

  return (
    <div>
      <h1>Summary</h1>
      <p>{sum}</p>
      <Link to={`/quiz/${id}`}>Start Quiz ({qcount} questions)</Link>
    </div>
  );
}
