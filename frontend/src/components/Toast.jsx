import React, { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export default function Toast({
  message,
  type = "info",
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
  };

  const bgColors = {
    success: "bg-emerald-500/10 border-emerald-500/20",
    error: "bg-rose-500/10 border-rose-500/20",
    info: "bg-blue-500/10 border-blue-500/20",
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 p-4 rounded-xl shadow-lg backdrop-blur-md border ${bgColors[type]} min-w-[300px] animate-in slide-in-from-right fade-in duration-300`}
    >
      {icons[type]}
      <p className="flex-1 text-sm font-medium text-slate-200">{message}</p>
      <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
