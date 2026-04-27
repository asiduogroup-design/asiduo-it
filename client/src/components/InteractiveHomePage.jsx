import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const COPY = {
  en: {
    heroTagline: "ONE PLATFORM TO TAKE YOUR BUSINESS ONLINE",
    heroHeadingPrefix: "We build modern growth systems across ",
    rotatingFeatures: [
      "SEO",
      "Social Media",
      "PPC",
      "Website Design",
      "Graphic Design",
      "Mobile Apps",
      "Web Application",
    ],
    heroDescription:
      "From strategy to launch, we combine software engineering, design, and digital marketing to help you scale with confidence.",
    focusTitle: "Core Focus",
    focusSubtitle: "Practical services tailored for speed, quality, and long-term growth.",
    getInTouchLabel: "Get In Touch",
    changeLanguageLabel: "Change Language",
    payNowLabel: "Pay Now",
  },
  it: {
    heroTagline: "PIATTAFORMA UNICA PER PORTARE ONLINE IL TUO BUSINESS",
    heroHeadingPrefix: "Costruiamo soluzioni digitali complete su ",
    rotatingFeatures: [
      "SEO",
      "Social Media",
      "PPC",
      "Siti Web",
      "Design Grafico",
      "App Mobile",
      "Web Application",
    ],
    heroDescription:
      "Dalla strategia al rilascio, uniamo sviluppo software, design e marketing digitale per far crescere il tuo business in modo concreto.",
    focusTitle: "Aree Principali",
    focusSubtitle: "Servizi pratici e professionali per risultati rapidi e crescita continua.",
    getInTouchLabel: "Contattaci",
    changeLanguageLabel: "Cambia lingua / Change Language",
    payNowLabel: "Paga Ora",
  },
};

const headingFont = {
  fontFamily: '"Bodoni MT", "Didot", "Palatino Linotype", serif',
};

const bodyFont = {
  fontFamily: '"Trebuchet MS", "Franklin Gothic Medium", "Segoe UI", sans-serif',
};

export default function InteractiveHomePage({ locale = "en" }) {
  const navigate = useNavigate();
  const text = locale === "it" ? COPY.it : COPY.en;
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [animatePanel, setAnimatePanel] = useState(false);

  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setActiveFeatureIndex((prevIndex) => (prevIndex + 1) % text.rotatingFeatures.length);
    }, 1900);

    return () => clearInterval(rotationTimer);
  }, [text.rotatingFeatures.length]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatePanel(true), 40);
    return () => clearTimeout(timer);
  }, []);

  const handleChangeLanguage = () => {
    localStorage.removeItem("lang_pref");
    window.location.reload();
  };

  const handleGetInTouch = () => {
    navigate(locale === "it" ? "/it/contact" : "/contact");
  };

  const handlePayNow = () => {
    const token = localStorage.getItem("token");
    const countrySelectionPath = locale === "it" ? "/it/country-selection" : "/country-selection";

    if (!token) {
      const loginPath = locale === "it" ? "/it/login" : "/login";
      navigate(`${loginPath}?redirect=${encodeURIComponent(countrySelectionPath)}`);
      return;
    }

    navigate(countrySelectionPath);
  };

  const activeFeature = text.rotatingFeatures[activeFeatureIndex] || text.rotatingFeatures[0];
  const focusItems = text.rotatingFeatures.slice(0, 4);

  return (
    <main className="w-full overflow-x-hidden bg-slate-950 text-white" style={bodyFont}>
      <section className="safe-mobile-padding relative isolate flex min-h-screen min-h-dvh items-center justify-center overflow-hidden pb-10 pt-32 sm:px-6 sm:pt-36 md:px-10 md:pt-40">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/Animated_Background_Video_Generation.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-slate-950/74" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(56,189,248,0.34),transparent_44%),radial-gradient(circle_at_82%_12%,rgba(16,185,129,0.26),transparent_36%),radial-gradient(circle_at_50%_88%,rgba(59,130,246,0.22),transparent_44%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(203,213,225,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.22)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div
          className={`relative z-10 mx-auto grid w-full max-w-6xl gap-6 transition-all duration-700 ease-out lg:grid-cols-[1.55fr_1fr] ${
            animatePanel ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <article className="rounded-3xl border border-white/20 bg-slate-900/66 p-6 shadow-[0_24px_70px_-32px_rgba(2,132,199,0.65)] backdrop-blur-md sm:p-8 md:p-10">
            <p className="inline-flex rounded-full border border-cyan-300/45 bg-cyan-900/35 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-cyan-100 sm:text-xs">
              {text.heroTagline}
            </p>

            <h1
              className="mt-5 break-words text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[3.45rem]"
              style={headingFont}
            >
              {text.heroHeadingPrefix}
              <span
                key={activeFeature}
                className="mt-2 inline-block rounded-2xl border border-cyan-300/60 bg-cyan-500/10 px-3 py-1 text-cyan-200 [animation:featureSwap_420ms_ease-out] sm:px-4"
              >
                {activeFeature}
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base md:text-lg">
              {text.heroDescription}
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={handleGetInTouch}
                className="w-full rounded-full border border-cyan-300 bg-cyan-500/15 px-6 py-3 text-sm font-bold tracking-[0.03em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-200 sm:w-auto"
              >
                {text.getInTouchLabel}
              </button>

              <button
                type="button"
                onClick={handleChangeLanguage}
                className="w-full rounded-full border border-white/45 bg-white/10 px-6 py-3 text-sm font-semibold tracking-[0.02em] text-white transition-all duration-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 sm:w-auto"
              >
                {text.changeLanguageLabel}
              </button>
            </div>
          </article>

          <aside className="flex flex-col justify-between rounded-3xl border border-white/20 bg-slate-900/68 p-6 shadow-[0_24px_70px_-35px_rgba(20,184,166,0.7)] backdrop-blur-md sm:p-8">
            <div>
              <h2 className="text-lg font-black tracking-[0.08em] text-emerald-200 sm:text-xl">
                {text.focusTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{text.focusSubtitle}</p>

              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                {focusItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-slate-300/20 bg-slate-800/55 px-3 py-2 text-sm font-semibold tracking-[0.02em] text-slate-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={handlePayNow}
              className="mt-6 rounded-2xl border border-amber-300/70 bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 px-5 py-3 text-sm font-black tracking-[0.08em] text-slate-900 shadow-[0_10px_30px_-14px_rgba(245,158,11,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              {text.payNowLabel}
            </button>
          </aside>
        </div>
      </section>

      <style>{`
        @keyframes featureSwap {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
