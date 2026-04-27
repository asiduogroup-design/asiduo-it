import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const COPY = {
  en: {
    heroTagline: "ONE STOP PLATFORM TO GET YOUR BUSINESS ONLINE",
    heroHeadingPrefix: "Serving Global Clients with New Age Solutions on ",
    rotatingFeatures: [
      "SEO",
      "Social Media",
      "PPC",
      "Website Design",
      "Graphic Design",
      "Mobile Apps",
      "Web Application",
    ],
    getInTouchLabel: "Get In Touch",
    changeLanguageLabel: "Change Language",
    payNowLabel: "Pay",
  },
  it: {
    heroTagline: "PIATTAFORMA UNICA PER PORTARE ONLINE IL TUO BUSINESS",
    heroHeadingPrefix: "Soluzioni digitali avanzate per clienti globali su ",
    rotatingFeatures: [
      "SEO",
      "Social Media",
      "PPC",
      "Siti Web",
      "Design Grafico",
      "App Mobile",
      "Web Application",
    ],
    getInTouchLabel: "Contattaci",
    changeLanguageLabel: "Cambia lingua / Change Language",
    payNowLabel: "Paga",
  },
};

export default function InteractiveHomePage({ locale = "en" }) {
  const navigate = useNavigate();
  const text = locale === "it" ? COPY.it : COPY.en;
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setActiveFeatureIndex((prevIndex) => (prevIndex + 1) % text.rotatingFeatures.length);
    }, 1800);

    return () => clearInterval(rotationTimer);
  }, [text.rotatingFeatures.length]);

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

  return (
    <main className="w-full overflow-x-hidden bg-slate-950 text-white">
      <section className="safe-mobile-padding relative isolate flex min-h-screen min-h-dvh items-center justify-center overflow-hidden pb-24 pt-36 sm:px-6 sm:pb-12 sm:pt-40 md:px-12 md:pt-44 lg:px-16">
        <button
          type="button"
          onClick={handlePayNow}
          className="paynow-star fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:bottom-auto sm:left-auto sm:right-5 sm:top-1/2 sm:-translate-x-0 sm:-translate-y-1/2"
        >
          <span className="paynow-star__label">
            <span className="paynow-star__text">{text.payNowLabel}</span>
          </span>
        </button>

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
          <source
            src="/videos/Software_Electrical_Graphic_Design_Background_Video.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-700/20 via-slate-950/55 to-slate-950/75" />

        <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-200 sm:text-sm">
            {text.heroTagline}
          </p>

          <h1 className="mt-4 break-words text-3xl font-extrabold leading-tight text-white sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
            {text.heroHeadingPrefix}
            <span
              key={activeFeature}
              className="inline-block min-w-[6ch] text-sky-400 [animation:featureSwap_420ms_ease-out] sm:min-w-[8ch]"
            >
              {activeFeature}
            </span>
          </h1>

          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={handleGetInTouch}
              className="w-full rounded-full border-2 border-sky-400 bg-sky-500/10 px-6 py-3 text-base font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-sky-500/30 focus:outline-none focus:ring-2 focus:ring-sky-300 sm:w-auto sm:px-7"
            >
              {text.getInTouchLabel}
            </button>

            <button
              type="button"
              onClick={handleChangeLanguage}
              className="w-full rounded-full border border-white/50 bg-white/10 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 sm:w-auto sm:px-7"
            >
              {text.changeLanguageLabel}
            </button>
          </div>
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

        .paynow-star {
          width: 148px;
          aspect-ratio: 1;
          border: 0;
          cursor: pointer;
          display: grid;
          place-items: center;
          position: fixed;
          overflow: hidden;
          isolation: isolate;
          background: radial-gradient(
            circle at 32% 24%,
            #fff8c5 0%,
            #ffd95a 34%,
            #f59e0b 70%,
            #d97706 100%
          );
          color: #fff;
          clip-path: polygon(
            50% 2%,
            61% 35%,
            97% 35%,
            68% 56%,
            79% 92%,
            50% 70%,
            21% 92%,
            32% 56%,
            3% 35%,
            39% 35%
          );
          box-shadow: 0 0 18px rgba(251, 191, 36, 0.75), 0 0 40px rgba(245, 158, 11, 0.45);
          transition: filter 220ms ease, box-shadow 220ms ease;
          animation: payNowStarGlow 2.2s ease-in-out infinite;
        }

        .paynow-star::before {
          content: "";
          position: absolute;
          inset: -75% -25%;
          background: linear-gradient(
            115deg,
            transparent 35%,
            rgba(255, 255, 255, 0.28) 44%,
            rgba(255, 255, 255, 0.95) 50%,
            rgba(255, 255, 255, 0.28) 56%,
            transparent 66%
          );
          transform: translateX(-125%) rotate(16deg);
          animation: payNowStarShine 2.9s linear infinite;
          z-index: 0;
          pointer-events: none;
        }

        .paynow-star:hover {
          filter: brightness(1.06);
        }

        .paynow-star__label {
          position: relative;
          z-index: 1;
          width: 82%;
          display: grid;
          place-items: center;
          text-align: center;
          text-transform: uppercase;
          transform: rotate(-8deg) skewX(-4deg);
        }

        .paynow-star__label::before {
          content: "";
          position: absolute;
          left: 7%;
          right: 7%;
          top: 38%;
          height: 32%;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255, 252, 229, 0.96) 0%, rgba(255, 239, 166, 0.94) 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65), 0 2px 6px rgba(74, 17, 120, 0.18);
          z-index: -1;
        }

        .paynow-star__text {
          position: relative;
          display: inline-block;
          padding: 0.02rem 0.32rem;
          letter-spacing: 0.06em;
          font-weight: 900;
          line-height: 1;
          font-size: 1rem;
          color: #3a0f64;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.55), 0 1px 3px rgba(58, 15, 100, 0.2);
        }

        @keyframes payNowStarShine {
          0% {
            transform: translateX(-125%) rotate(16deg);
          }
          40% {
            transform: translateX(130%) rotate(16deg);
          }
          100% {
            transform: translateX(130%) rotate(16deg);
          }
        }

        @keyframes payNowStarGlow {
          0%,
          100% {
            box-shadow: 0 0 14px rgba(251, 191, 36, 0.68), 0 0 34px rgba(245, 158, 11, 0.42);
          }
          50% {
            box-shadow: 0 0 22px rgba(253, 224, 71, 0.88), 0 0 56px rgba(251, 191, 36, 0.64);
          }
        }

        @media (max-width: 640px) {
          .paynow-star {
            width: 124px;
          }

          .paynow-star__text {
            font-size: 0.84rem;
          }
        }
      `}</style>
    </main>
  );
}
