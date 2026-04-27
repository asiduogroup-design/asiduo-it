import React from "react";

const AnimatedBar = ({ className = "" }) => (
  <div className={`relative h-1.5 w-28 overflow-hidden rounded-full bg-slate-200/85 ${className}`}>
    <div className="absolute inset-y-0 left-0 w-14 rounded-full bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-400 animate-barSlide" />
    <style>{`
      @keyframes barSlide {
        0% { transform: translateX(-90%); }
        50% { transform: translateX(115%); }
        100% { transform: translateX(-90%); }
      }
      .animate-barSlide {
        animation: barSlide 2.4s ease-in-out infinite;
      }
    `}</style>
  </div>
);

export default AnimatedBar;
