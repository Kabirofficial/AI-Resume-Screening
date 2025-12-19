import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-white/5 backdrop-blur-md mt-auto relative z-10">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-400">
          © 2025 AI Resume Screener. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-sm text-slate-400 hover:text-(--color-primary) transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-slate-400 hover:text-(--color-primary) transition-colors"
          >
            Terms of Service
          </a>
          <span className="flex items-center gap-1.5 text-xs text-slate-300 border border-white/10 px-3 py-1 rounded-full bg-white/5">
            Made with{" "}
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current animate-pulse" />{" "}
            by Jingg
          </span>
        </div>
      </div>
    </footer>
  );
}
