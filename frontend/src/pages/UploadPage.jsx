import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  async function handleUpload() {
    if (!file) return alert("Choose a PDF first");
    const form = new FormData();
    form.append("pdf", file);
    const { data } = await api.post("/api/generate", form);
    navigate(`/summary/${data.pdf_id || data._id}`);
  }

  return (
    <div>
      <h2>Upload PDF</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Generate Quiz</button>
    </div>
  );
}
