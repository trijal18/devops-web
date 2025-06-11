// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function UploadPage() {
//   const [file, setFile] = useState(null);
//   const navigate = useNavigate();

//   async function handleUpload() {
//     if (!file) return alert("Choose a PDF first");
//     const form = new FormData();
//     form.append("pdf", file);
//     const { data } = await api.post("/api/generate", form);
//     navigate(`/summary/${data.pdf_id || data._id}`);
//   }

//   return (
//     <div>
//       <h2>Upload PDF</h2>
//       <input
//         type="file"
//         accept="application/pdf"
//         onChange={(e) => setFile(e.target.files[0])}
//       />
//       <button onClick={handleUpload}>Generate Quiz</button>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const navigate = useNavigate();

  async function handleUpload() {
    if (!file) {
      alert("Choose a PDF first");
      return;
    }
    
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append("pdf", file);
      const { data } = await api.post("/api/generate", form);
      navigate(`/summary/${data.pdf_id || data._id}`);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      alert("Please drop a PDF file");
    }
  };

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Quiz Magic
          </h1>
          <p className="text-gray-600">Transform your PDF into an interactive quiz</p>
        </div>

        {/* Upload Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
          {/* Drop Zone */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer group
              ${isDragging 
                ? 'border-indigo-400 bg-indigo-50/50 scale-105' 
                : file 
                ? 'border-green-400 bg-green-50/50' 
                : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/30'
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input').click()}
          >
            <input
              id="file-input"
              type="file"
              accept="application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="text-center">
              {file ? (
                <div className="space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <p className="text-xs text-green-600">✓ Ready to upload</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
                    ${isDragging ? 'bg-indigo-100 scale-110' : 'bg-gray-100 group-hover:bg-indigo-100'}`}>
                    <svg className={`w-6 h-6 transition-all duration-300
                      ${isDragging ? 'text-indigo-600 scale-110' : 'text-gray-400 group-hover:text-indigo-600'}`} 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {isDragging ? 'Drop your PDF here' : 'Drag & drop your PDF'}
                    </p>
                    <p className="text-sm text-gray-500">or click to browse files</p>
                  </div>
                  <p className="text-xs text-gray-400">Supports PDF files up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg
              ${!file || isUploading
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
              }`}
          >
            <div className="flex items-center justify-center space-x-2">
              {isUploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Generating Quiz...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Generate Quiz</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </div>
          </button>

          {/* Features */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-center text-sm">
            <div className="space-y-1">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-indigo-600 font-bold text-xs">AI</span>
              </div>
              <p className="text-gray-600">Smart Analysis</p>
            </div>
            <div className="space-y-1">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-purple-600 font-bold text-xs">⚡</span>
              </div>
              <p className="text-gray-600">Instant Results</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Your PDF is processed securely and never stored permanently
        </p>
      </div>
    </div>
  );
}