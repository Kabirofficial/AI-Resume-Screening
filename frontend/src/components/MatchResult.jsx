import React from "react";
import { CheckCircle, AlertCircle, Briefcase, Mail } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

export default function MatchResult({ data }) {
  const scoreColor =
    data.match_score >= 80
      ? "text-emerald-400"
      : data.match_score >= 50
      ? "text-amber-400"
      : "text-rose-400";

  const matchPercentage = Math.round(data.match_score);

  return (
    <div className="glass-card rounded-xl p-6 hover:border-indigo-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-indigo-500/10">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="shrink-0 mx-auto md:mx-0 flex items-center justify-center p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <span className={`text-3xl font-bold ${scoreColor}`}>
            {matchPercentage}%
          </span>
        </div>

        <div className="grow w-full space-y-4">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-(--color-text) group-hover:text-(--color-primary) transition-colors">
                  {data.name}
                </h3>
                <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                  <Mail className="w-3.5 h-3.5" />
                  {data.email}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  matchPercentage >= 70
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : matchPercentage >= 40
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                }`}
              >
                {matchPercentage >= 70
                  ? "High Match"
                  : matchPercentage >= 40
                  ? "Potential"
                  : "Low Match"}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/50 border border-slate-700 text-slate-300 text-xs font-medium">
                <Briefcase className="w-3.5 h-3.5 text-(--color-tertiary)" />
                {data.experience}
              </div>
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-slate-700 pl-3">
            {data.summary}
          </p>

          <div className="grid md:grid-cols-2 gap-4 pt-2">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />{" "}
                Strengths
              </h4>
              <ul className="space-y-1">
                {data.strengths && data.strengths.length > 0 ? (
                  data.strengths.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-300 flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-slate-500 italic">
                    None detected
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> Missing
                Skills
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {data.missing_skills && data.missing_skills.length > 0 ? (
                  data.missing_skills.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    >
                      {kw}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500 italic">
                    None detected
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
