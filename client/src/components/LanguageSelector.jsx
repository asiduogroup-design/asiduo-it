import React, { useEffect, useState } from "react";

const headingText = "Select Your Preferred Language";

export default function LanguageSelector({ onSelect }) {
  const [show, setShow] = useState(true);
  const [typedHeading, setTypedHeading] = useState("");
  const [animateButtons, setAnimateButtons] = useState(false);

  useEffect(() => {
    const pref = localStorage.getItem("lang_pref");
    if (pref === "en" || pref === "it") {
      setShow(false);
      onSelect(pref);
    }
  }, [onSelect]);

  useEffect(() => {
    if (!show) return undefined;

    let currentIndex = 0;
    setTypedHeading("");

    const typingTimer = setInterval(() => {
      currentIndex += 1;
      setTypedHeading(headingText.slice(0, currentIndex));

      if (currentIndex >= headingText.length) {
        clearInterval(typingTimer);
      }
    }, 60);

    return () => clearInterval(typingTimer);
  }, [show]);

  useEffect(() => {
    if (!show) return undefined;

    setAnimateButtons(false);
    const animationTimer = setTimeout(() => {
      setAnimateButtons(true);
    }, 80);

    return () => clearTimeout(animationTimer);
  }, [show]);

  const handleSelect = (lang) => {
    localStorage.setItem("lang_pref", lang);
    setShow(false);
    onSelect(lang);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-x-hidden overflow-y-auto">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/Software_Electrical_Graphic_Design_Background_Video.mp4" type="video/mp4" />
        <source src="/videos/software_electrical_graphic_design_background_video.mp4" type="video/mp4" />
        <source src="/videos/Animated_Background_Video_Generation.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/55" />

      <div className="safe-mobile-padding relative z-10 mx-auto flex min-h-screen min-h-dvh w-full max-w-5xl flex-col items-center justify-center py-8 sm:px-6 sm:py-10 md:px-8">
        <h1 className="mb-5 w-full max-w-3xl text-center text-2xl font-extrabold leading-tight text-white drop-shadow-lg min-h-[4.5rem] sm:mb-8 sm:min-h-[5rem] sm:text-4xl md:min-h-[6rem] md:text-5xl">
          {typedHeading}
        </h1>

        <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 md:gap-8">
          <button
            type="button"
            className={`w-full sm:w-fit max-w-xs sm:max-w-full px-6 py-2.5 rounded-lg flex items-center justify-center text-base sm:px-8 sm:py-2.5 sm:text-xl font-bold text-white shadow-2xl cursor-pointer transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-cyan-900/40 backdrop-blur-sm bg-slate-900/75 border border-cyan-400/35 hover:bg-cyan-600/90 focus:outline-none focus:ring-2 focus:ring-cyan-300/70 ${
              animateButtons ? "translate-x-0 opacity-100" : "-translate-x-[120vw] opacity-0"
            }`}
            onClick={() => handleSelect("en")}
          >
            English
          </button>

          <button
            type="button"
            className={`w-full sm:w-fit max-w-xs sm:max-w-full px-6 py-2.5 rounded-lg flex items-center justify-center text-base sm:px-8 sm:py-2.5 sm:text-xl font-bold text-white shadow-2xl cursor-pointer transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-indigo-900/40 backdrop-blur-sm bg-indigo-950/70 border border-indigo-300/35 hover:bg-indigo-600/90 focus:outline-none focus:ring-2 focus:ring-indigo-300/70 ${
              animateButtons ? "translate-x-0 opacity-100" : "translate-x-[120vw] opacity-0"
            }`}
            onClick={() => handleSelect("it")}
          >
            Italiano
          </button>
        </div>
      </div>
    </div>
  );
}
