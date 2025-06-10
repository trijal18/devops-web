import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return setErr("Select a PDF first");

    const fd = new FormData();
    fd.append("file", file);

    try {
      const { data } = await api.post("/pdf/upload", fd);
      nav(`/summary/${data.pdf_id}`);
    } catch (e) {
      setErr(e.response?.data?.error || "Upload error");
    }
  };

  return (
    <div>
      <h1>Upload</h1>
      {err && <p>{err}</p>}
      <form onSubmit={submit}>
        <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />
        <button>Upload</button>
      </form>
    </div>
  );
}
