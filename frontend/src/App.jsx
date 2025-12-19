import React, { useState } from "react";
import axios from "axios";
import { Search, FileText, CheckCircle2 } from "lucide-react";
import FileUpload from "./components/FileUpload";
import MatchResult from "./components/MatchResult";
import Toast from "./components/Toast";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

function App() {
  const [jd, setJd] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  const handleMatch = async () => {
    if (!jd.trim())
      return showToast("Please enter a job description first.", "error");
    setLoading(true);
    setResults([]);

    try {
      const response = await axios.post("http://localhost:8000/match", {
        text: jd,
      });
      setResults(response.data.matches);
      showToast(
        `Analysis complete! Found ${response.data.matches.length} candidates.`,
        "success"
      );
    } catch (error) {
      console.error(error);
      showToast("Backend error. Is the server running?", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-(--color-text) bg-(--color-bg)">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Hero />

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20 grow space-y-8 pb-20">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            <FileUpload />

            <div className="glass-card p-6 rounded-2xl hidden md:block">
              <h3 className="font-semibold text-(--color-text) mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-(--color-accent)" />
                How it works
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex gap-2">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  Upload a candidate's resume (PDF)
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  Paste the job description
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  Get an instant implementation score & match analysis
                </li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-8">
            <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-(--color-primary) to-(--color-accent)"></div>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-(--color-text)">
                <div className="p-2 bg-indigo-500/10 text-(--color-primary) rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                Job Description Analysis
              </h2>

              <div className="relative grow">
                <textarea
                  className="w-full h-full min-h-[250px] p-5 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-(--color-primary) outline-none resize-none text-slate-300 placeholder:text-slate-600 text-base transition-all"
                  placeholder="Paste the full job description here to compare against uploaded resumes..."
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                />
                <div className="absolute bottom-4 right-4 text-xs text-slate-500 bg-slate-800/80 backdrop-blur px-2 py-1 rounded-md border border-slate-700">
                  {jd.length} characters
                </div>
              </div>

              <button
                onClick={handleMatch}
                disabled={loading}
                className={`mt-6 w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2 group
                  ${
                    loading
                      ? "bg-slate-700 cursor-not-allowed shadow-none"
                      : "bg-linear-to-r from-(--color-primary) to-indigo-600 hover:shadow-indigo-500/50 hover:-translate-y-0.5"
                  }`}
              >
                {loading ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    Processing Analysis...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Find Best Matches
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {results.length > 0 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-(--color-text)">
                Analysis Results
              </h2>
              <span className="px-3 py-1 bg-slate-800 text-slate-400 text-xs font-bold rounded-full">
                {results.length} Candidates
              </span>
              <div className="h-px bg-slate-700 grow"></div>
            </div>

            <div className="grid gap-6">
              {results.map((r, idx) => (
                <MatchResult key={idx} data={r} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
