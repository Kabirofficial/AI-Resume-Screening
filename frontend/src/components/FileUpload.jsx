/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import axios from "axios";
import { Upload, CheckCircle, AlertCircle, FileText, X } from "lucide-react";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (uploadedFile) => {
    if (uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      setStatus("idle");
      setMessage("");
    } else {
      setStatus("error");
      setMessage("Please upload a PDF file only.");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("success");
      setMessage("Resume indexed successfully!");
      setTimeout(() => {
        setStatus("idle");
        setFile(null); // Clear file after successful upload for next one
      }, 3000);
    } catch (error) {
      setStatus("error");
      setMessage("Upload failed.");
    }
  };

  const clearFile = () => {
    setFile(null);
    setStatus("idle");
    setMessage("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>

      <h2 className="text-xl font-bold mb-2 text-(--color-text) flex items-center gap-3 relative z-10">
        <div className="p-2 bg-indigo-500/10 text-(--color-primary) rounded-lg">
          <Upload className="w-5 h-5" />
        </div>
        Upload Resume
      </h2>
      <p className="text-sm text-slate-400 mb-6 relative z-10">
        Upload the candidate's PDF resume to begin the screening process.
      </p>

      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ease-in-out cursor-pointer
          ${
            dragActive
              ? "border-(--color-accent) bg-fuchsia-500/10 scale-[1.02]"
              : "border-slate-700 hover:border-fuchsia-500/50 hover:bg-slate-800/50"
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          onChange={handleChange}
          className="hidden"
        />

        {!file ? (
          <div className="space-y-4 pointer-events-none">
            <div className="w-16 h-16 bg-indigo-500/10 text-(--color-primary) rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-(--color-text) font-medium">
                Click to upload or drag & drop
              </p>
              <p className="text-slate-500 text-sm mt-1">
                PDF files only (max 10MB)
              </p>
            </div>
          </div>
        ) : (
          <div
            className="flex items-center justify-between bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <FileText className="w-8 h-8 text-(--color-primary) shrink-0" />
              <div className="overflow-hidden">
                <p className="font-medium text-(--color-text) truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={clearFile}
              className="text-slate-500 hover:text-red-400 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {file && status !== "success" && (
        <button
          onClick={handleUpload}
          disabled={status === "uploading"}
          className="mt-6 w-full bg-(--color-primary) hover:bg-indigo-600 disabled:bg-indigo-900/50 disabled:text-slate-500 text-white py-3 rounded-lg font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {status === "uploading"
            ? "Uploading & Indexing..."
            : "Process Resume"}
        </button>
      )}

      {status === "success" && (
        <div className="mt-6 text-emerald-600 text-sm font-medium flex items-center justify-center p-3 gap-2 bg-emerald-50 border border-emerald-100 rounded-xl animate-bounce-short">
          <CheckCircle className="w-5 h-5" />
          {message}
        </div>
      )}

      {status === "error" && (
        <div className="mt-6 text-red-600 text-sm font-medium flex items-center justify-center p-3 gap-2 bg-red-50 border border-red-100 rounded-xl">
          <AlertCircle className="w-5 h-5" />
          {message}
        </div>
      )}
    </div>
  );
}
