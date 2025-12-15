import React, { useState } from 'react';
import axios from 'axios';
import { Search, Sparkles } from 'lucide-react';
import FileUpload from './components/FileUpload';
import MatchResult from './components/MatchResult';

function App() {
  const [jd, setJd] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!jd.trim()) return alert("Please enter a job description first.");
    setLoading(true);
    setResults([]); 

    try {
      const response = await axios.post("http://localhost:8000/match", { text: jd });
      setResults(response.data.matches);
    } catch (error) {
      console.error(error);
      alert("Backend error. Is it running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 font-sans text-gray-800">
      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3 h-3" /> AI Powered Recruiter
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Smart Resume Screener
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Upload resumes, paste a job description, and let AI identify the perfect candidate.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-8 space-y-8">
        <FileUpload />

        {/* JD Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-purple-600" /> 
            Job Description Analysis
          </h2>
          <textarea
            className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-400 outline-none resize-none text-gray-700 text-sm"
            placeholder="Paste Job Description here..."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />
          
          <button 
            onClick={handleMatch}
            disabled={loading}
            className={`mt-4 w-full py-3.5 rounded-lg font-bold text-white shadow-lg transition-transform active:scale-[0.99]
              ${loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
          >
            {loading ? "Analyzing..." : "Find Best Matches"}
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-purple-600 pl-4">
              Results
            </h2>
            <div className="grid gap-6">
              {results.map((r, idx) => (
                <MatchResult key={idx} data={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;