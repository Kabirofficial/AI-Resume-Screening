/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8000/upload", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus("success");
      setMessage("Resume indexed successfully!");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setMessage("Upload failed.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <Upload className="w-5 h-5 text-blue-600" /> 
        Upload Candidate Resume
      </h2>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <input 
          type="file" 
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
        
        <button 
          onClick={handleUpload}
          disabled={!file || status === "uploading"}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
        >
          {status === "uploading" ? "Uploading..." : "Upload"}
        </button>
      </div>

      {status === "success" && (
        <div className="mt-3 text-green-600 text-sm font-medium flex items-center gap-2 bg-green-50 p-2 rounded">
          <CheckCircle className="w-4 h-4" /> {message}
        </div>
      )}
      
      {status === "error" && (
        <div className="mt-3 text-red-600 text-sm font-medium flex items-center gap-2 bg-red-50 p-2 rounded">
          <AlertCircle className="w-4 h-4" /> {message}
        </div>
      )}
    </div>
  );
}