import React from 'react';
import { CheckCircle, AlertCircle, Briefcase } from 'lucide-react';

export default function MatchResult({ data }) {
  // Simple inline conditional logic for colors
  const scoreColor = data.match_score >= 80 ? "bg-green-100 text-green-700 border-green-200" 
    : data.match_score >= 50 ? "bg-yellow-100 text-yellow-700 border-yellow-200" 
    : "bg-red-100 text-red-700 border-red-200";

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{data.candidate_name}</h3>
          <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
            <Briefcase className="w-4 h-4" /> {data.experience_years} Years Experience
          </p>
        </div>
        <div className={`flex items-center justify-center w-16 h-16 rounded-2xl font-bold text-xl border-2 ${scoreColor}`}>
          {data.match_score}%
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-gray-700 italic text-sm">"{data.summary}"</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-3 text-sm uppercase">
              <CheckCircle className="w-4 h-4" /> Strengths
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.strengths.map((s, i) => (
                <span key={i} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-100">
                  {s}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-red-800 flex items-center gap-2 mb-3 text-sm uppercase">
              <AlertCircle className="w-4 h-4" /> Missing
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.missing_skills.map((s, i) => (
                <span key={i} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-medium border border-red-100">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}