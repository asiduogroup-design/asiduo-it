import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchway,
  faBuildingColumns,
  faChurch,
  faGopuram,
  faLandmarkDome,
  faMonument,
  faMosque,
  faTowerObservation,
  faVihara,
} from "@fortawesome/free-solid-svg-icons";

const COPY = {
  en: {
    title: "Choose Your Country For Payment",
    subtitle: "Select where you want to pay from. India routes to Razorpay and Italy routes to Stripe.",
    indiaTitle: "India",
    indiaSubtitle: "Razorpay checkout for Indian payments",
    indiaCta: "Continue to Razorpay",
    italyTitle: "Italy",
    italySubtitle: "Stripe checkout for Italian payments",
    italyCta: "Continue to Stripe",
  },
  it: {
    title: "Scegli Il Paese Per Il Pagamento",
    subtitle: "Scegli il tuo paese. India porta a Razorpay e Italia porta a Stripe.",
    indiaTitle: "India",
    indiaSubtitle: "Checkout Razorpay per pagamenti in India",
    indiaCta: "Continua con Razorpay",
    italyTitle: "Italia",
    italySubtitle: "Checkout Stripe per pagamenti in Italia",
    italyCta: "Continua con Stripe",
  },
};

const INDIA_LANDMARKS = [
  {
    label: "Taj Mahal",
    icon: faLandmarkDome,
    left: "10%",
    delay: "0s",
    duration: "14s",
    driftMid: "24px",
    driftEnd: "-20px",
  },
  {
    label: "Red Fort",
    icon: faArchway,
    left: "30%",
    delay: "1.2s",
    duration: "13s",
    driftMid: "-28px",
    driftEnd: "18px",
  },
  {
    label: "Qutub Minar",
    icon: faTowerObservation,
    left: "50%",
    delay: "2.3s",
    duration: "15s",
    driftMid: "20px",
    driftEnd: "-12px",
  },
  {
    label: "Sanchi",
    icon: faMonument,
    left: "68%",
    delay: "1.9s",
    duration: "12s",
    driftMid: "-18px",
    driftEnd: "24px",
  },
  {
    label: "Meenakshi",
    icon: faGopuram,
    left: "82%",
    delay: "0.7s",
    duration: "16s",
    driftMid: "14px",
    driftEnd: "-14px",
  },
  {
    label: "Bodh Gaya",
    icon: faVihara,
    left: "20%",
    delay: "3.4s",
    duration: "14.5s",
    driftMid: "-16px",
    driftEnd: "20px",
  },
  {
    label: "Jama Masjid",
    icon: faMosque,
    left: "76%",
    delay: "2.8s",
    duration: "13.5s",
    driftMid: "20px",
    driftEnd: "-18px",
  },
];

const ITALY_LANDMARKS = [
  {
    label: "Colosseum",
    icon: faBuildingColumns,
    left: "12%",
    delay: "0s",
    duration: "14s",
    driftMid: "18px",
    driftEnd: "-16px",
  },
  {
    label: "Roman Forum",
    icon: faArchway,
    left: "30%",
    delay: "1.1s",
    duration: "13s",
    driftMid: "-24px",
    driftEnd: "16px",
  },
  {
    label: "Leaning Tower",
    icon: faTowerObservation,
    left: "49%",
    delay: "2.2s",
    duration: "15.5s",
    driftMid: "16px",
    driftEnd: "-20px",
  },
  {
    label: "Pantheon",
    icon: faLandmarkDome,
    left: "65%",
    delay: "2.8s",
    duration: "12.8s",
    driftMid: "-14px",
    driftEnd: "18px",
  },
  {
    label: "Milan Duomo",
    icon: faChurch,
    left: "80%",
    delay: "0.8s",
    duration: "14.2s",
    driftMid: "22px",
    driftEnd: "-16px",
  },
  {
    label: "Vittoriano",
    icon: faMonument,
    left: "22%",
    delay: "3.5s",
    duration: "13.8s",
    driftMid: "-16px",
    driftEnd: "20px",
  },
  {
    label: "Pompeii",
    icon: faBuildingColumns,
    left: "74%",
    delay: "1.7s",
    duration: "15.2s",
    driftMid: "14px",
    driftEnd: "-14px",
  },
];

const ASHOKA_SPOKES = Array.from({ length: 24 }, (_, index) => index * 15);
const GLOBE_IMAGE_PATH =
  "/images/ChatGPT%20Image%20Apr%2020,%202026,%2003_42_38%20PM.png?v=20260420-154814";

function FloatingLandmarks({ items }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="country-float-chip"
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            "--drift-mid": item.driftMid,
            "--drift-end": item.driftEnd,
          }}
        >
          <FontAwesomeIcon icon={item.icon} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function IndiaFlag() {
  return (
    <div className="mx-auto h-20 w-32 overflow-hidden rounded-lg shadow-lg sm:h-24 sm:w-40">
      <svg
        viewBox="0 0 450 300"
        className="h-full w-full"
        role="img"
        aria-label="Flag of India"
      >
        <rect x="0" y="0" width="450" height="100" fill="#FF9933" />
        <rect x="0" y="100" width="450" height="100" fill="#FFFFFF" />
        <rect x="0" y="200" width="450" height="100" fill="#138808" />

        <circle cx="225" cy="150" r="42" fill="none" stroke="#000080" strokeWidth="4" />
        {ASHOKA_SPOKES.map((angle) => (
          <line
            key={angle}
            x1="225"
            y1="150"
            x2="225"
            y2="111"
            stroke="#000080"
            strokeWidth="2"
            transform={`rotate(${angle} 225 150)`}
          />
        ))}
        <circle cx="225" cy="150" r="6" fill="#000080" />
      </svg>
    </div>
  );
}

function ItalyFlag() {
  return (
    <div className="mx-auto flex h-20 w-32 overflow-hidden rounded-lg shadow-lg sm:h-24 sm:w-40">
      <div className="w-1/3 bg-[#009246]" />
      <div className="w-1/3 bg-white" />
      <div className="w-1/3 bg-[#ce2b37]" />
    </div>
  );
}

function RealisticGlobe() {
  return (
    <div className="globe-path-motion realistic-globe h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] md:h-[480px] md:w-[480px] lg:h-[560px] lg:w-[560px]">
      <img
        src={GLOBE_IMAGE_PATH}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        className="h-full w-full object-contain"
      />
    </div>
  );
}

function CountryCard({
  onClick,
  flag,
  landmarks,
  gradientClass,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="country-card group relative min-h-[300px] overflow-hidden rounded-3xl border border-white/20 bg-slate-900/60 p-4 text-left shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-sky-200 sm:min-h-[350px] sm:p-6"
    >
      <div className={`absolute inset-0 opacity-55 ${gradientClass}`} />
      <FloatingLandmarks items={landmarks} />

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="transition-transform duration-300 group-hover:scale-105">
          {flag}
        </div>
      </div>
    </button>
  );
}

export default function CountrySelectionPage({ locale = "en" }) {
  const navigate = useNavigate();
  const text = locale === "it" ? COPY.it : COPY.en;

  const indiaPaymentRoute = locale === "it" ? "/it/payment/razorpay" : "/payment/razorpay";
  const italyPaymentRoute = locale === "it" ? "/it/payment/stripe" : "/payment/stripe";

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.38),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(45,212,191,0.25),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(14,116,144,0.35),transparent_55%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(148,163,184,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.3)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <RealisticGlobe />
      </div>

      <section className="safe-mobile-padding relative z-10 mx-auto max-w-6xl pb-12 pt-28 sm:px-8 sm:pt-32">
        <h1 className="text-center text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
          {text.title}
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-slate-200 sm:text-base">
          {text.subtitle}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-2">
          <CountryCard
            onClick={() => navigate(indiaPaymentRoute)}
            flag={<IndiaFlag />}
            landmarks={INDIA_LANDMARKS}
            gradientClass="bg-gradient-to-br from-[#ff9933]/40 via-slate-900/20 to-[#138808]/40"
          />

          <CountryCard
            onClick={() => navigate(italyPaymentRoute)}
            flag={<ItalyFlag />}
            landmarks={ITALY_LANDMARKS}
            gradientClass="bg-gradient-to-br from-[#009246]/35 via-slate-900/20 to-[#ce2b37]/35"
          />
        </div>
      </section>

      <style>{`
        .globe-path-motion {
          animation: globePathMove 30s linear infinite;
          transform-origin: center;
        }

        .realistic-globe {
          opacity: 0.9;
          filter: drop-shadow(0 0 28px rgba(56, 189, 248, 0.26));
        }

        .country-card::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 2px;
          border-radius: 1.5rem;
          background: linear-gradient(135deg, rgba(251, 146, 60, 0.95), rgba(34, 197, 94, 0.95), rgba(59, 130, 246, 0.95));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 320ms ease;
          pointer-events: none;
        }

        .country-card:hover::before,
        .country-card:focus-visible::before {
          opacity: 1;
        }

        .country-float-chip {
          position: absolute;
          bottom: -22%;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          border-radius: 9999px;
          border: 1px solid rgba(191, 219, 254, 0.55);
          background: rgba(2, 6, 23, 0.72);
          padding: 0.3rem 0.62rem;
          color: #f8fafc;
          font-size: 0.68rem;
          letter-spacing: 0.01em;
          box-shadow: 0 10px 28px rgba(15, 23, 42, 0.35);
          animation-name: floatLandmark;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          white-space: nowrap;
        }

        .country-float-chip svg {
          color: #7dd3fc;
          font-size: 0.72rem;
        }

        .country-float-chip span {
          max-width: 6.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @keyframes floatLandmark {
          0% {
            transform: translateY(0) translateX(0) scale(0.86);
            opacity: 0;
          }
          12% {
            opacity: 0.92;
          }
          55% {
            transform: translateY(-56vh) translateX(var(--drift-mid));
            opacity: 1;
          }
          100% {
            transform: translateY(-118vh) translateX(var(--drift-end));
            opacity: 0;
          }
        }

        @keyframes globePathMove {
          0% {
            transform: translate(-38vw, -18vh) rotate(0deg);
          }
          12.5% {
            transform: translate(38vw, -18vh) rotate(90deg);
          }
          25% {
            transform: translate(26vw, 0vh) rotate(160deg);
          }
          37.5% {
            transform: translate(34vw, 27vh) rotate(240deg);
          }
          50% {
            transform: translate(0vw, 30vh) rotate(320deg);
          }
          62.5% {
            transform: translate(-34vw, 27vh) rotate(410deg);
          }
          75% {
            transform: translate(-36vw, 0vh) rotate(500deg);
          }
          87.5% {
            transform: translate(-34vw, -25vh) rotate(610deg);
          }
          100% {
            transform: translate(0vw, 0vh) rotate(720deg);
          }
        }

        @media (max-width: 640px) {
          .country-float-chip:nth-child(n + 6) {
            display: none;
          }

          @keyframes globePathMove {
            0% {
              transform: translate(-26vw, -14vh) rotate(0deg);
            }
            12.5% {
              transform: translate(26vw, -14vh) rotate(90deg);
            }
            25% {
              transform: translate(20vw, 0vh) rotate(160deg);
            }
            37.5% {
              transform: translate(24vw, 20vh) rotate(240deg);
            }
            50% {
              transform: translate(0vw, 23vh) rotate(320deg);
            }
            62.5% {
              transform: translate(-24vw, 20vh) rotate(410deg);
            }
            75% {
              transform: translate(-24vw, 0vh) rotate(500deg);
            }
            87.5% {
              transform: translate(-24vw, -20vh) rotate(610deg);
            }
            100% {
              transform: translate(0vw, 0vh) rotate(720deg);
            }
          }
        }
      `}</style>
    </main>
  );
}
