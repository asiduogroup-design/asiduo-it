import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
  faBolt,
  faBug,
  faCartShopping,
  faCircleCheck,
  faClock,
  faCode,
  faComments,
  faDatabase,
  faFileInvoiceDollar,
  faGlobe,
  faHouse,
  faPaperPlane,
  faPenRuler,
  faRocket,
  faServer,
  faScrewdriverWrench,
  faShieldHalved,
  faUserTie,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

const PAGE_COPY = {
  en: {
    pageTag: "Software Solutions",
    title: "Website Design & Development",
    subtitle:
      "Build modern, responsive, and high-performing websites tailored to your business needs. We create user-friendly designs with fast performance and scalable solutions to help you grow online.",
    supportLine:
      "From simple static pages to fully dynamic and e-commerce platforms, we deliver solutions that convert visitors into customers.",
    getQuotation: "Get Quotation",
    contact: "Contact",
    backToServices: "Back to Services",
    homeAria: "Go to home",
    typesTitle: "Types of Websites",
    deliveryTitle: "Delivery Time",
    priceTitle: "Price Range",
    priceFrom: "Starting from",
    priceTo: "Up to",
    budgetWord: "BUDGET",
    friendlyWord: "friendly",
    includedTitle: "What's Included",
    portfolioTitle: "Portfolio / Demo",
    processTitle: "Process",
    addonsTitle: "Add-ons (Preview)",
    finalCtaTitle: "Ready to Build Your Website Package?",
    finalCtaSubtitle: "Share your needs and get a clear quotation with timeline.",
    previewLabel: "View Preview",
    exampleLabel: "Example use:",
    stepLabels: [
      "Requirement discussion",
      "Design",
      "Development",
      "Testing",
      "Delivery",
    ],
    stepDescriptions: [
      "We discuss goals, audience, pages, and technical scope.",
      "Wireframes and modern UI direction are prepared.",
      "Frontend and backend are developed with scalability.",
      "Cross-device, speed, and QA checks are performed.",
      "Deployment with handover and launch support.",
    ],
  },
  it: {
    pageTag: "Soluzioni Software",
    title: "Design e Sviluppo Siti Web",
    subtitle:
      "Realizziamo siti web moderni, responsive e ad alte prestazioni, progettati per le esigenze della tua azienda. Creiamo interfacce intuitive, veloci e scalabili per aiutarti a crescere online.",
    supportLine:
      "Dalle pagine statiche ai portali dinamici e e-commerce, forniamo soluzioni che trasformano i visitatori in clienti.",
    getQuotation: "Richiedi Preventivo",
    contact: "Contatti",
    backToServices: "Torna ai Servizi",
    homeAria: "Vai alla home",
    typesTitle: "Tipi di Sito Web",
    deliveryTitle: "Tempi di Consegna",
    priceTitle: "Fascia Prezzo",
    priceFrom: "A partire da",
    priceTo: "Fino a",
    budgetWord: "BUDGET",
    friendlyWord: "friendly",
    includedTitle: "Cosa Include",
    portfolioTitle: "Portfolio / Demo",
    processTitle: "Processo",
    addonsTitle: "Extra (Anteprima)",
    finalCtaTitle: "Pronto a costruire il tuo sito web?",
    finalCtaSubtitle: "Condividi i requisiti e ricevi un preventivo chiaro con timeline.",
    previewLabel: "Apri Anteprima",
    exampleLabel: "Esempio d'uso:",
    stepLabels: ["Raccolta requisiti", "Design", "Sviluppo", "Testing", "Consegna"],
    stepDescriptions: [
      "Definiamo obiettivi, pubblico, pagine e ambito tecnico.",
      "Prepariamo wireframe e direzione UI moderna.",
      "Sviluppiamo frontend e backend in modo scalabile.",
      "Verifichiamo velocita, dispositivi e qualita finale.",
      "Deploy con handover e supporto al lancio.",
    ],
  },
};

const WEBSITE_TYPES = {
  en: [
    {
      title: "Static Website",
      description:
        "A simple website with fixed content. Best for small businesses or personal pages.",
      example: "A local shop showing services, contact details, and location.",
      icon: faGlobe,
    },
    {
      title: "Dynamic Website",
      description:
        "Content changes based on user interaction or database with advanced workflows.",
      example: "A job portal, blog, or admin dashboard system.",
      icon: faDatabase,
    },
    {
      title: "Portfolio Website",
      description: "Showcases personal work, projects, and skills in a professional way.",
      example: "A developer, designer, or photographer displaying their work.",
      icon: faUserTie,
    },
    {
      title: "E-commerce Website",
      description:
        "An online store where users can browse products, add to cart, and checkout.",
      example: "Clothing store, electronics shop, or product-focused business.",
      icon: faCartShopping,
    },
    {
      title: "Website Redesign / Updates",
      description:
        "Modernizing existing websites for design quality, performance, and feature depth.",
      example: "Updating an old business website with modern UI and mobile responsiveness.",
      icon: faPenRuler,
    },
  ],
  it: [
    {
      title: "Sito Statico",
      description: "Sito semplice con contenuti fissi, ideale per piccole attivita.",
      example: "Negozio locale con servizi, contatti e posizione.",
      icon: faGlobe,
    },
    {
      title: "Sito Dinamico",
      description: "Contenuti dinamici in base a interazione utente o database.",
      example: "Portale lavoro, blog o dashboard amministrativa.",
      icon: faDatabase,
    },
    {
      title: "Sito Portfolio",
      description: "Mostra lavori, progetti e competenze in modo professionale.",
      example: "Sviluppatore, designer o fotografo che presenta i propri lavori.",
      icon: faUserTie,
    },
    {
      title: "Sito E-commerce",
      description: "Store online con catalogo prodotti, carrello e pagamento.",
      example: "Negozio abbigliamento, elettronica o e-shop specializzato.",
      icon: faCartShopping,
    },
    {
      title: "Restyling / Aggiornamento",
      description: "Migliorie su sito esistente per UI, performance e nuove funzioni.",
      example: "Sito aziendale aggiornato con design moderno e mobile first.",
      icon: faPenRuler,
    },
  ],
};

const DELIVERY_CARDS = {
  en: [
    { title: "Static", days: "5-7 days", icon: faGlobe },
    { title: "Dynamic", days: "10-15 days", icon: faDatabase },
    { title: "Portfolio", days: "7-10 days", icon: faUserTie },
    { title: "Redesign", days: "6-12 days", icon: faWandMagicSparkles },
    { title: "E-commerce", days: "15-25 days", icon: faCartShopping },
  ],
  it: [
    { title: "Statico", days: "5-7 giorni", icon: faGlobe },
    { title: "Dinamico", days: "10-15 giorni", icon: faDatabase },
    { title: "Portfolio", days: "7-10 giorni", icon: faUserTie },
    { title: "Restyling", days: "6-12 giorni", icon: faWandMagicSparkles },
    { title: "E-commerce", days: "15-25 giorni", icon: faCartShopping },
  ],
};

const INCLUDED_ITEMS = {
  en: ["Responsive design", "SEO basics", "Fast performance", "Contact form", "Deployment"],
  it: ["Design responsive", "SEO base", "Prestazioni veloci", "Modulo contatto", "Deployment"],
};

const INCLUDED_LAYOUT = [
  { top: "8%", left: "8%", fromX: "-180px", fromY: "0px", delay: "80ms" },
  { top: "20%", left: "52%", fromX: "0px", fromY: "-150px", delay: "260ms" },
  { top: "44%", left: "12%", fromX: "0px", fromY: "180px", delay: "430ms" },
  { top: "56%", left: "55%", fromX: "170px", fromY: "0px", delay: "560ms" },
  { top: "76%", left: "30%", fromX: "-120px", fromY: "120px", delay: "720ms" },
];

const ADDON_ITEMS = {
  en: [
    { label: "SEO", icon: faBolt },
    { label: "Hosting", icon: faServer },
    { label: "Maintenance", icon: faScrewdriverWrench },
  ],
  it: [
    { label: "SEO", icon: faBolt },
    { label: "Hosting", icon: faServer },
    { label: "Manutenzione", icon: faScrewdriverWrench },
  ],
};

const DEMO_ITEMS = {
  en: [
    {
      title: "Corporate Website Demo",
      image: "/images/services-carousel/Gemini_Generated_Image_2e33062e33062e33.png",
      link: "/images/services-carousel/Gemini_Generated_Image_2e33062e33062e33.png",
    },
    {
      title: "Portfolio Website Demo",
      image: "/images/services-carousel/Gemini_Generated_Image_ci6vonci6vonci6v.png",
      link: "/images/services-carousel/Gemini_Generated_Image_ci6vonci6vonci6v.png",
    },
    {
      title: "E-commerce Website Demo",
      image: "/images/services-carousel/Gemini_Generated_Image_ry5dwkry5dwkry5d.png",
      link: "/images/services-carousel/Gemini_Generated_Image_ry5dwkry5dwkry5d.png",
    },
  ],
  it: [
    {
      title: "Demo Sito Aziendale",
      image: "/images/services-carousel/Gemini_Generated_Image_2e33062e33062e33.png",
      link: "/images/services-carousel/Gemini_Generated_Image_2e33062e33062e33.png",
    },
    {
      title: "Demo Sito Portfolio",
      image: "/images/services-carousel/Gemini_Generated_Image_ci6vonci6vonci6v.png",
      link: "/images/services-carousel/Gemini_Generated_Image_ci6vonci6vonci6v.png",
    },
    {
      title: "Demo Sito E-commerce",
      image: "/images/services-carousel/Gemini_Generated_Image_ry5dwkry5dwkry5d.png",
      link: "/images/services-carousel/Gemini_Generated_Image_ry5dwkry5dwkry5d.png",
    },
  ],
};

const PROCESS_ICONS = [faComments, faPenRuler, faCode, faBug, faRocket];

const BACKGROUND_BALLS = [
  { top: "10%", left: "5%", size: 10, delay: "0s", duration: "16s", driftX: "34px", driftY: "28px" },
  { top: "17%", left: "24%", size: 14, delay: "-2s", duration: "20s", driftX: "42px", driftY: "20px" },
  { top: "8%", left: "58%", size: 8, delay: "-5s", duration: "14s", driftX: "22px", driftY: "36px" },
  { top: "18%", left: "80%", size: 12, delay: "-3s", duration: "21s", driftX: "46px", driftY: "24px" },
  { top: "28%", left: "13%", size: 9, delay: "-8s", duration: "17s", driftX: "26px", driftY: "34px" },
  { top: "32%", left: "39%", size: 13, delay: "-1s", duration: "19s", driftX: "38px", driftY: "16px" },
  { top: "36%", left: "67%", size: 7, delay: "-4s", duration: "13s", driftX: "20px", driftY: "26px" },
  { top: "40%", left: "89%", size: 11, delay: "-7s", duration: "20s", driftX: "44px", driftY: "22px" },
  { top: "51%", left: "8%", size: 15, delay: "-6s", duration: "18s", driftX: "48px", driftY: "32px" },
  { top: "56%", left: "30%", size: 8, delay: "-9s", duration: "12s", driftX: "18px", driftY: "20px" },
  { top: "60%", left: "53%", size: 10, delay: "-2.5s", duration: "15s", driftX: "24px", driftY: "28px" },
  { top: "66%", left: "74%", size: 12, delay: "-5.5s", duration: "19s", driftX: "41px", driftY: "19px" },
  { top: "74%", left: "14%", size: 9, delay: "-3.5s", duration: "14s", driftX: "26px", driftY: "35px" },
  { top: "79%", left: "42%", size: 13, delay: "-10s", duration: "22s", driftX: "50px", driftY: "24px" },
  { top: "82%", left: "62%", size: 11, delay: "-11s", duration: "17s", driftX: "32px", driftY: "26px" },
  { top: "88%", left: "83%", size: 14, delay: "-1.2s", duration: "20s", driftX: "36px", driftY: "30px" },
];

const headingFont = {
  fontFamily: '"Cambria", "Palatino Linotype", "Times New Roman", serif',
};

const bodyFont = {
  fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
};

const WebsiteDesignDevelopmentPage = ({ locale = "en" }) => {
  const normalizedLocale = locale === "it" ? "it" : "en";
  const copy = PAGE_COPY[normalizedLocale];
  const navigate = useNavigate();
  const localePrefix = normalizedLocale === "it" ? "/it" : "";
  const includedShellRef = useRef(null);
  const [isIncludedVisible, setIsIncludedVisible] = useState(false);

  const scrollingTypes = useMemo(() => {
    const items = WEBSITE_TYPES[normalizedLocale];
    return [...items, ...items];
  }, [normalizedLocale]);

  const processSteps = useMemo(
    () =>
      copy.stepLabels.map((label, index) => ({
        label,
        description: copy.stepDescriptions[index],
        icon: PROCESS_ICONS[index],
      })),
    [copy.stepDescriptions, copy.stepLabels]
  );

  const scrollingProcessSteps = useMemo(
    () => [...processSteps, ...processSteps],
    [processSteps]
  );

  const goToQuotation = () => {
    navigate(`${localePrefix}/services?quote=website-design-dev`);
  };

  const goToContact = () => {
    navigate(`${localePrefix}/contact`);
  };

  const goHome = () => {
    navigate(normalizedLocale === "it" ? "/it" : "/");
  };

  const goBackToServices = () => {
    navigate(`${localePrefix}/services`);
  };

  useEffect(() => {
    const targetNode = includedShellRef.current;
    if (!targetNode) {
      return undefined;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsIncludedVisible(true);
      return undefined;
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsIncludedVisible(entry.isIntersecting);
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    observer.observe(targetNode);

    return () => observer.disconnect();
  }, []);

  return (
    <main
      translate="no"
      style={bodyFont}
      className="notranslate safe-mobile-padding relative isolate min-h-screen overflow-hidden bg-[linear-gradient(126deg,#f8fbff_0%,#edf5ff_41%,#fef6e9_100%)] pb-16 pt-16 text-slate-900 sm:px-6 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(148,163,184,0.42)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.42)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="pointer-events-none absolute inset-0 opacity-75 [background:radial-gradient(circle_at_15%_16%,rgba(56,189,248,0.2),transparent_35%),radial-gradient(circle_at_86%_14%,rgba(251,191,36,0.2),transparent_30%),radial-gradient(circle_at_50%_88%,rgba(14,165,233,0.16),transparent_36%)]" />

      <div className="pointer-events-none absolute inset-0">
        {BACKGROUND_BALLS.map((ball, index) => (
          <span
            key={`bg-ball-${index}`}
            className="absolute rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95)_0%,rgba(34,211,238,0.55)_45%,rgba(59,130,246,0.34)_100%)] shadow-[0_0_18px_rgba(56,189,248,0.45)]"
            style={{
              top: ball.top,
              left: ball.left,
              width: `${ball.size}px`,
              height: `${ball.size}px`,
              opacity: 0.55,
              animationName: "floatBall",
              animationDuration: ball.duration,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: ball.delay,
              "--drift-x": ball.driftX,
              "--drift-y": ball.driftY,
            }}
          />
        ))}
      </div>

      <section className="relative z-10 mx-auto w-full max-w-6xl space-y-6">
        <div className="flex justify-start">
          <button
            type="button"
            onClick={goBackToServices}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/90 bg-white/90 px-4 py-2 text-sm font-black tracking-[0.03em] text-cyan-800 shadow-[0_10px_24px_-16px_rgba(14,116,144,0.55)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-900"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {copy.backToServices}
          </button>
        </div>

        <header className="rounded-3xl border border-slate-200/85 bg-white/90 p-6 shadow-[0_24px_60px_-30px_rgba(30,64,175,0.45)] backdrop-blur-md sm:p-8">
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-4xl">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">{copy.pageTag}</p>
                <h1 style={headingFont} className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                  {copy.title}
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">{copy.subtitle}</p>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600 sm:text-[15px]">{copy.supportLine}</p>
              </div>

              <button
                type="button"
                onClick={goHome}
                aria-label={copy.homeAria}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700"
              >
                <FontAwesomeIcon icon={faHouse} />
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={goToQuotation}
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/75 bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-black tracking-[0.04em] text-white shadow-[0_10px_26px_-14px_rgba(245,158,11,0.82)] transition-all duration-300 hover:border-blue-500/80 hover:from-blue-500 hover:to-cyan-500 hover:shadow-[0_10px_26px_-14px_rgba(37,99,235,0.85)]"
              >
                <FontAwesomeIcon icon={faFileInvoiceDollar} />
                {copy.getQuotation}
              </button>

              <button
                type="button"
                onClick={goToContact}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-100 px-5 py-2.5 text-sm font-black tracking-[0.04em] text-cyan-800 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-400 hover:text-white hover:shadow-[0_10px_22px_-12px_rgba(16,185,129,0.75)]"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                {copy.contact}
              </button>
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_22px_54px_-32px_rgba(15,23,42,0.42)] sm:p-8">
          <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {copy.typesTitle}
          </h2>

          <div className="relative mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/72 py-4">
            <div className="type-marquee-track flex w-max items-stretch gap-4 px-4">
              {scrollingTypes.map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  className="type-card w-[280px] shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.45)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      <FontAwesomeIcon icon={item.icon} />
                    </span>
                    <h3 className="text-base font-black text-slate-900">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.description}</p>
                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    {copy.exampleLabel} {item.example}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_20px_50px_-32px_rgba(15,23,42,0.45)]">
            <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900">
              {copy.deliveryTitle}
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              {DELIVERY_CARDS[normalizedLocale].map((item, index) => (
                <div
                  key={`${item.title}-${item.days}`}
                  className="rounded-2xl border border-cyan-200 bg-cyan-50/80 p-3 text-center shadow-sm"
                >
                  <div
                    className={`delivery-card-motion ${index % 2 === 0 ? "spin-lr" : "spin-rl"}`}
                    style={{ "--rotate-delay": `${index * 170}ms` }}
                  >
                    <span className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_8px_18px_-12px_rgba(59,130,246,0.9)]">
                      <FontAwesomeIcon icon={item.icon} />
                    </span>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.03em] text-slate-800">{item.title}</p>
                    <p className="mt-1 text-[11px] font-semibold text-cyan-900">{item.days}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_20px_50px_-32px_rgba(15,23,42,0.45)]">
            <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900">
              {copy.priceTitle}
            </h2>
            <div className="mt-4 flex justify-center">
              <div className="budget-friendly-badge" aria-label={`${copy.budgetWord} ${copy.friendlyWord}`}>
                <span className="budget-word">{copy.budgetWord}</span>
                <span className="friendly-word">{copy.friendlyWord}</span>
              </div>
            </div>
          </article>
        </section>

        <section className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_20px_52px_-30px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {copy.includedTitle}
          </h2>

          <div
            ref={includedShellRef}
            className={`included-shell mx-auto mt-5 w-full max-w-[58rem] rounded-2xl bg-[linear-gradient(145deg,rgba(37,99,235,0.9)_0%,rgba(6,182,212,0.9)_48%,rgba(30,64,175,0.88)_100%)] p-3 ${
              isIncludedVisible ? "is-visible" : ""
            }`}
          >
            <div className="included-floating-area relative min-h-[200px] rounded-xl bg-[radial-gradient(circle_at_15%_20%,rgba(147,197,253,0.24),transparent_32%),radial-gradient(circle_at_78%_18%,rgba(125,211,252,0.2),transparent_30%),radial-gradient(circle_at_52%_86%,rgba(59,130,246,0.22),transparent_36%)]">
              {INCLUDED_ITEMS[normalizedLocale].map((item, index) => {
                const layout = INCLUDED_LAYOUT[index % INCLUDED_LAYOUT.length];

                return (
                  <span
                    key={`${item}-${layout.left}-${layout.top}`}
                    className="included-pill absolute inline-flex items-center gap-2 px-1 py-0 text-[1.34rem] font-medium text-white sm:text-[1.6rem]"
                    style={{
                      top: layout.top,
                      left: layout.left,
                      "--from-x": layout.fromX,
                      "--from-y": layout.fromY,
                      "--entry-delay": layout.delay,
                      "--glow-delay": `${index * 220}ms`,
                      "--float-x": index % 2 === 0 ? `${6 + index}px` : `-${5 + index}px`,
                      "--float-y": index % 2 === 0 ? `-${5 + index}px` : `${4 + index}px`,
                      "--float-duration": `${5.8 + index * 0.55}s`,
                      "--float-phase": `${index * 180}ms`,
                    }}
                  >
                    <span className="included-pill-content">
                      <FontAwesomeIcon icon={faCircleCheck} className="text-white/90" />
                      {item}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_20px_52px_-30px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {copy.portfolioTitle}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {DEMO_ITEMS[normalizedLocale].map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_30px_-24px_rgba(15,23,42,0.48)]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="h-44 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-base font-black text-slate-900">{item.title}</h3>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-100 px-3 py-1.5 text-xs font-black uppercase tracking-[0.05em] text-sky-800 transition-colors hover:bg-sky-200"
                  >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    {copy.previewLabel}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_20px_52px_-30px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {copy.processTitle}
          </h2>

          <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/72 py-4">
            <div className="process-marquee-track flex w-max items-stretch gap-4 px-4">
              {scrollingProcessSteps.map((step, index) => (
                <article
                  key={`${step.label}-${index}`}
                  className="w-[286px] shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_14px_30px_-22px_rgba(15,23,42,0.45)]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_8px_18px_-12px_rgba(37,99,235,0.95)]">
                    <FontAwesomeIcon icon={step.icon} />
                  </span>
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.06em] text-cyan-700">
                    Step {(index % processSteps.length) + 1}
                  </p>
                  <h3 className="mt-1 text-base font-black text-slate-900">{step.label}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_20px_52px_-30px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {copy.addonsTitle}
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {ADDON_ITEMS[normalizedLocale].map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-amber-200 bg-amber-50/82 p-4 text-center shadow-sm"
              >
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-lg text-white shadow-[0_10px_22px_-14px_rgba(245,158,11,0.86)]">
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                <p className="mt-2 text-sm font-black text-amber-900">{item.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-amber-300/80 bg-[linear-gradient(135deg,rgba(255,251,235,0.95)_0%,rgba(255,237,213,0.95)_100%)] p-6 shadow-[0_22px_56px_-30px_rgba(217,119,6,0.45)] sm:p-8">
          <h2 style={headingFont} className="text-3xl font-extrabold text-slate-900">
            {copy.finalCtaTitle}
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-700 sm:text-base">{copy.finalCtaSubtitle}</p>
          <button
            type="button"
            onClick={goToQuotation}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-500/75 bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-black tracking-[0.04em] text-white shadow-[0_10px_26px_-14px_rgba(245,158,11,0.82)] transition-all duration-300 hover:border-blue-500/80 hover:from-blue-500 hover:to-cyan-500 hover:shadow-[0_10px_26px_-14px_rgba(37,99,235,0.85)]"
          >
            <FontAwesomeIcon icon={faFileInvoiceDollar} />
            {copy.getQuotation}
          </button>
        </section>
      </section>

      <button
        type="button"
        onClick={goToQuotation}
        className="fixed bottom-5 right-5 z-[900] inline-flex items-center gap-2 rounded-full border border-amber-500/80 bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xs font-black uppercase tracking-[0.06em] text-white shadow-[0_12px_26px_-14px_rgba(245,158,11,0.88)] transition-all duration-300 hover:border-blue-500/80 hover:from-blue-500 hover:to-cyan-500 sm:hidden"
      >
        <FontAwesomeIcon icon={faFileInvoiceDollar} />
        {copy.getQuotation}
      </button>

      <FloatingWhatsAppButton locale={normalizedLocale} />

      <style>{`
        @keyframes floatBall {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          25% {
            transform: translate3d(var(--drift-x), calc(var(--drift-y) * -1), 0) rotate(90deg);
          }
          50% {
            transform: translate3d(calc(var(--drift-x) * -0.65), var(--drift-y), 0) rotate(180deg);
          }
          75% {
            transform: translate3d(calc(var(--drift-x) * 0.35), calc(var(--drift-y) * 0.4), 0) rotate(270deg);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(360deg);
          }
        }

        .type-marquee-track {
          animation: moveTypesRight 24s linear infinite;
        }

        .type-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes moveTypesRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .budget-friendly-badge {
          position: relative;
          isolation: isolate;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.2rem;
          width: min(78vw, 250px);
          aspect-ratio: 1 / 1;
          animation: budgetBlink 1.25s ease-in-out infinite;
        }

        .budget-friendly-badge::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(140deg, #0ea5e9 0%, #06b6d4 48%, #0284c7 100%);
          clip-path: polygon(
            50% 0%,
            59% 7%,
            71% 3%,
            77% 14%,
            89% 12%,
            88% 24%,
            100% 30%,
            91% 41%,
            100% 50%,
            91% 59%,
            100% 70%,
            88% 76%,
            89% 88%,
            77% 86%,
            71% 97%,
            59% 93%,
            50% 100%,
            41% 93%,
            29% 97%,
            23% 86%,
            11% 88%,
            12% 76%,
            0% 70%,
            9% 59%,
            0% 50%,
            9% 41%,
            0% 30%,
            12% 24%,
            11% 12%,
            23% 14%,
            29% 3%,
            41% 7%
          );
          filter: drop-shadow(0 14px 28px rgba(14, 116, 144, 0.35));
          z-index: -2;
        }

        .budget-friendly-badge::after {
          content: "";
          position: absolute;
          inset: 12%;
          background: linear-gradient(145deg, #22d3ee 0%, #06b6d4 46%, #0891b2 100%);
          clip-path: polygon(
            50% 0%,
            60% 8%,
            72% 5%,
            78% 16%,
            90% 14%,
            88% 26%,
            100% 31%,
            92% 42%,
            100% 50%,
            92% 58%,
            100% 69%,
            88% 74%,
            90% 86%,
            78% 84%,
            72% 95%,
            60% 92%,
            50% 100%,
            40% 92%,
            28% 95%,
            22% 84%,
            10% 86%,
            12% 74%,
            0% 69%,
            8% 58%,
            0% 50%,
            8% 42%,
            0% 31%,
            12% 26%,
            10% 14%,
            22% 16%,
            28% 5%,
            40% 8%
          );
          z-index: -1;
        }

        .budget-word {
          display: block;
          color: #ffffff;
          font-size: clamp(1.55rem, 3.8vw, 2.25rem);
          font-weight: 900;
          letter-spacing: 0.07em;
          line-height: 1;
          text-transform: uppercase;
          text-shadow:
            0 4px 16px rgba(15, 23, 42, 0.5),
            0 1px 1px rgba(15, 23, 42, 0.3);
        }

        .friendly-word {
          display: block;
          color: #1e1b7a;
          font-size: clamp(2.15rem, 4.9vw, 3rem);
          line-height: 0.95;
          font-weight: 500;
          font-family: "Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive;
          text-shadow:
            0 4px 14px rgba(30, 27, 122, 0.28),
            0 1px 1px rgba(255, 255, 255, 0.18);
        }

        .budget-friendly-badge .budget-word,
        .budget-friendly-badge .friendly-word {
          position: relative;
          z-index: 2;
        }

        .budget-friendly-badge .friendly-word::after {
          content: "";
          position: absolute;
          top: 8%;
          left: -120%;
          width: 78%;
          height: 84%;
          transform: skewX(-20deg);
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.68) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: friendlyShine 2.2s ease-in-out infinite;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        @keyframes budgetBlink {
          0% {
            opacity: 0.92;
            transform: scale(1);
            filter: brightness(1);
          }
          45% {
            opacity: 1;
            transform: scale(1.02);
            filter: brightness(1.07);
          }
          55% {
            opacity: 0.86;
            transform: scale(0.985);
            filter: brightness(0.98);
          }
          100% {
            opacity: 0.92;
            transform: scale(1);
            filter: brightness(1);
          }
        }

        @keyframes friendlyShine {
          0% {
            left: -120%;
            opacity: 0;
          }
          28% {
            opacity: 0.8;
          }
          52% {
            left: 130%;
            opacity: 0;
          }
          100% {
            left: 130%;
            opacity: 0;
          }
        }

        .included-pill {
          text-shadow:
            0 4px 16px rgba(15, 23, 42, 0.55),
            0 1px 1px rgba(15, 23, 42, 0.35);
          opacity: 0;
        }

        .included-shell.is-visible .included-pill {
          animation:
            dropInPlace 920ms cubic-bezier(0.2, 0.75, 0.2, 1) both,
            includedGlow 2800ms ease-in-out infinite;
          animation-delay:
            var(--entry-delay),
            calc(var(--entry-delay) + 920ms + var(--glow-delay));
        }

        .included-pill-content {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          will-change: transform;
          animation: includedFloat var(--float-duration) ease-in-out infinite;
          animation-delay: calc(var(--entry-delay) + 920ms + var(--float-phase));
        }

        @keyframes dropInPlace {
          0% {
            opacity: 0;
            transform: translate3d(var(--from-x), var(--from-y), 0) scale(0.86);
          }
          65% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1.04);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes includedFloat {
          0% {
            transform: translate3d(0, 0, 0);
          }
          25% {
            transform: translate3d(var(--float-x), calc(var(--float-y) * -0.6), 0);
          }
          50% {
            transform: translate3d(calc(var(--float-x) * -0.75), var(--float-y), 0);
          }
          75% {
            transform: translate3d(calc(var(--float-x) * 0.45), calc(var(--float-y) * 0.35), 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes includedGlow {
          0% {
            opacity: 0.82;
            text-shadow:
              0 4px 16px rgba(15, 23, 42, 0.5),
              0 1px 1px rgba(15, 23, 42, 0.35);
          }
          50% {
            opacity: 1;
            text-shadow:
              0 8px 22px rgba(56, 189, 248, 0.65),
              0 2px 2px rgba(15, 23, 42, 0.3);
          }
          100% {
            opacity: 0.82;
            text-shadow:
              0 4px 16px rgba(15, 23, 42, 0.5),
              0 1px 1px rgba(15, 23, 42, 0.35);
          }
        }

        .delivery-card-motion {
          transform-style: preserve-3d;
          will-change: transform;
          animation-duration: 4.6s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-delay: calc(340ms + var(--rotate-delay, 0ms));
        }

        .delivery-card-motion.spin-lr {
          animation-name: processRotateLeftRight;
          transform-origin: center center;
        }

        .delivery-card-motion.spin-rl {
          animation-name: processRotateRightLeft;
          transform-origin: center center;
        }

        .process-marquee-track {
          animation: moveProcessLeft 24s linear infinite;
        }

        .process-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes moveProcessLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes processRotateLeftRight {
          0% {
            transform: perspective(1100px) rotateY(-11deg) rotateZ(-1.6deg) translate3d(-2px, 0, 0);
          }
          50% {
            transform: perspective(1100px) rotateY(11deg) rotateZ(1.6deg) translate3d(2px, 0, 0);
          }
          100% {
            transform: perspective(1100px) rotateY(-11deg) rotateZ(-1.6deg) translate3d(-2px, 0, 0);
          }
        }

        @keyframes processRotateRightLeft {
          0% {
            transform: perspective(1100px) rotateY(11deg) rotateZ(1.6deg) translate3d(2px, 0, 0);
          }
          50% {
            transform: perspective(1100px) rotateY(-11deg) rotateZ(-1.6deg) translate3d(-2px, 0, 0);
          }
          100% {
            transform: perspective(1100px) rotateY(11deg) rotateZ(1.6deg) translate3d(2px, 0, 0);
          }
        }

        @media (max-width: 900px) {
          .type-marquee-track {
            animation-duration: 28s;
          }

          .process-marquee-track {
            animation-duration: 28s;
          }

          .delivery-card-motion {
            animation-duration: 4.9s;
          }
        }

        @media (max-width: 640px) {
          .included-floating-area {
            min-height: 220px;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            gap: 10px;
            padding: 14px;
          }

          .included-pill {
            position: static;
            max-width: 100%;
            white-space: normal;
            text-align: center;
            font-size: 1.28rem;
            line-height: 1.15;
          }

          .included-pill-content {
            animation-duration: 6.6s;
          }
        }
      `}</style>
    </main>
  );
};

export default WebsiteDesignDevelopmentPage;
