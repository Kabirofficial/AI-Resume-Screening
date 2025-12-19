import React from "react";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-white/5 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 py-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-(--color-primary) text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" /> AI Powered Recruiter
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-(--color-text) tracking-tight mb-6 leading-tight">
          Resume{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-primary) to-(--color-accent)">
            Screener
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Upload resumes, define your requirements, and let our advanced AI
          instantly identify the top candidates for your role.
        </p>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6366F1] rounded-full mix-blend-screen filter blur-3xl animate-blob opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#D946EF] rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000 opacity-20"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-[#3B82F6] rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000 opacity-20"></div>
      </div>
    </div>
  );
}
