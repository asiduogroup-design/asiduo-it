import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import {
  faArrowLeft,
  faChartLine,
  faCheckCircle,
  faFileInvoiceDollar,
  faGaugeHigh,
  faGlobe,
  faHouse,
  faLayerGroup,
  faLink,
  faMagnifyingGlassChart,
  faPaperPlane,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";

const COPY = {
  en: {
    pageTag: "Software Solutions",
    title: "SEO Audit and Optimization",
    subtitle:
      "Improve rankings with technical SEO fixes, keyword mapping, and on-page optimization built for measurable growth.",
    supportLine:
      "We audit your current site, prioritize high-impact fixes, and implement improvements that help search engines and users.",
    getQuotation: "Get Quotation",
    contact: "Contact",
    backToServices: "Back to Services",
    homeAria: "Go to home",
    auditTitle: "What We Audit",
    outcomesTitle: "Expected Outcomes",
    plansTitle: "SEO Plan Reference",
    processTitle: "How We Deliver",
    finalCtaTitle: "Ready to Improve Organic Visibility?",
    finalCtaSubtitle: "Request a quote and get a practical SEO roadmap for your website.",
    startsFrom: "Starts from",
    upto: "Up to",
  },
  it: {
    pageTag: "Soluzioni Software",
    title: "Audit e Ottimizzazione SEO",
    subtitle:
      "Migliora il posizionamento con correzioni tecniche SEO, mappatura keyword e ottimizzazione on-page orientata ai risultati.",
    supportLine:
      "Analizziamo il tuo sito, priorizziamo le azioni ad alto impatto e implementiamo miglioramenti utili a motori di ricerca e utenti.",
    getQuotation: "Richiedi Preventivo",
    contact: "Contatti",
    backToServices: "Torna ai Servizi",
    homeAria: "Vai alla home",
    auditTitle: "Cosa Analizziamo",
    outcomesTitle: "Risultati Attesi",
    plansTitle: "Pacchetti SEO di Riferimento",
    processTitle: "Come Lavoriamo",
    finalCtaTitle: "Pronto a Migliorare la Visibilita Organica?",
    finalCtaSubtitle: "Richiedi un preventivo e ricevi una roadmap SEO concreta per il tuo sito.",
    startsFrom: "A partire da",
    upto: "Fino a",
  },
};

const AUDIT_ITEMS = {
  en: [
    {
      title: "Technical SEO",
      description: "Crawlability, indexing, sitemap, robots, and canonical checks.",
      icon: faScrewdriverWrench,
    },
    {
      title: "On-Page SEO",
      description: "Title/meta optimization, content structure, and internal linking.",
      icon: faLayerGroup,
    },
    {
      title: "Keyword Strategy",
      description: "Intent-driven keyword mapping for priority pages and services.",
      icon: faMagnifyingGlassChart,
    },
    {
      title: "Performance SEO",
      description: "Core Web Vitals and speed tuning for mobile and desktop.",
      icon: faGaugeHigh,
    },
  ],
  it: [
    {
      title: "SEO Tecnica",
      description: "Controlli su crawling, indicizzazione, sitemap, robots e canonical.",
      icon: faScrewdriverWrench,
    },
    {
      title: "SEO On-Page",
      description: "Ottimizzazione title/meta, struttura contenuti e linking interno.",
      icon: faLayerGroup,
    },
    {
      title: "Strategia Keyword",
      description: "Mappatura keyword per intento su pagine e servizi prioritari.",
      icon: faMagnifyingGlassChart,
    },
    {
      title: "Performance SEO",
      description: "Core Web Vitals e speed tuning per mobile e desktop.",
      icon: faGaugeHigh,
    },
  ],
};

const OUTCOMES = {
  en: [
    "Clear technical issue backlog",
    "Improved page relevance for target queries",
    "Stronger internal linking structure",
    "Faster page load experience",
    "Action plan for ranking growth",
  ],
  it: [
    "Backlog tecnico chiaro e prioritizzato",
    "Maggiore rilevanza pagine per query target",
    "Struttura di linking interno piu solida",
    "Esperienza di caricamento piu veloce",
    "Piano operativo per crescita ranking",
  ],
};

const PLAN_TIERS = {
  en: [
    {
      name: "Starter",
      timeline: "5-7 days",
      price: "EUR 300 - EUR 500",
      focus: "Quick audit + core fixes",
      icon: faGlobe,
    },
    {
      name: "Growth",
      timeline: "7-10 days",
      price: "EUR 500 - EUR 900",
      focus: "Audit + keyword map + on-page actions",
      icon: faChartLine,
    },
    {
      name: "Advanced",
      timeline: "10-14 days",
      price: "EUR 900 - EUR 1,200",
      focus: "Complete optimization roadmap + implementation support",
      icon: faLink,
    },
  ],
  it: [
    {
      name: "Starter",
      timeline: "5-7 giorni",
      price: "EUR 300 - EUR 500",
      focus: "Audit rapido + correzioni principali",
      icon: faGlobe,
    },
    {
      name: "Growth",
      timeline: "7-10 giorni",
      price: "EUR 500 - EUR 900",
      focus: "Audit + mappa keyword + azioni on-page",
      icon: faChartLine,
    },
    {
      name: "Advanced",
      timeline: "10-14 giorni",
      price: "EUR 900 - EUR 1,200",
      focus: "Roadmap completa + supporto implementazione",
      icon: faLink,
    },
  ],
};

const PROCESS_STEPS = {
  en: [
    "Discovery and current-state SEO scan",
    "Priority matrix and action planning",
    "Implementation and optimization updates",
    "Final report with next-step roadmap",
  ],
  it: [
    "Analisi iniziale e scansione SEO dello stato attuale",
    "Matrice priorita e piano operativo",
    "Implementazione e aggiornamenti di ottimizzazione",
    "Report finale con roadmap dei prossimi passi",
  ],
};

const headingFont = {
  fontFamily: '"Cambria", "Palatino Linotype", "Times New Roman", serif',
};

const bodyFont = {
  fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
};

const SEOAuditOptimizationPage = ({ locale = "en" }) => {
  const normalizedLocale = locale === "it" ? "it" : "en";
  const copy = COPY[normalizedLocale];
  const navigate = useNavigate();
  const localePrefix = normalizedLocale === "it" ? "/it" : "";

  const auditItems = useMemo(() => AUDIT_ITEMS[normalizedLocale], [normalizedLocale]);
  const outcomes = useMemo(() => OUTCOMES[normalizedLocale], [normalizedLocale]);
  const tiers = useMemo(() => PLAN_TIERS[normalizedLocale], [normalizedLocale]);
  const steps = useMemo(() => PROCESS_STEPS[normalizedLocale], [normalizedLocale]);

  const goToQuotation = () => {
    navigate(`${localePrefix}/services?quote=seo-optimization`);
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

  return (
    <main
      translate="no"
      style={bodyFont}
      className="notranslate safe-mobile-padding relative isolate min-h-screen overflow-hidden bg-[linear-gradient(124deg,#f8fbff_0%,#ecf8ff_40%,#f4fffb_100%)] pb-16 pt-16 text-slate-900 sm:px-6 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(148,163,184,0.42)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.42)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="pointer-events-none absolute inset-0 opacity-80 [background:radial-gradient(circle_at_16%_14%,rgba(20,184,166,0.2),transparent_34%),radial-gradient(circle_at_86%_16%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_50%_86%,rgba(16,185,129,0.14),transparent_36%)]" />

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
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/75 bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-black tracking-[0.04em] text-white shadow-[0_10px_26px_-14px_rgba(16,185,129,0.82)] transition-all duration-300 hover:border-cyan-500/80 hover:from-cyan-500 hover:to-blue-500 hover:shadow-[0_10px_26px_-14px_rgba(37,99,235,0.85)]"
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

        <section className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_20px_52px_-30px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {copy.auditTitle}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {auditItems.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_14px_30px_-22px_rgba(15,23,42,0.42)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-[0_8px_18px_-12px_rgba(6,182,212,0.9)]">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <h3 className="text-base font-black text-slate-900">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_20px_52px_-30px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {copy.outcomesTitle}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {outcomes.map((item) => (
              <p
                key={item}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900"
              >
                <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-600" />
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_20px_52px_-30px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {copy.plansTitle}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {tiers.map((tier) => (
              <article
                key={tier.name}
                className="rounded-2xl border border-cyan-200 bg-cyan-50/75 p-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.4)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-black text-slate-900">{tier.name}</h3>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                    <FontAwesomeIcon icon={tier.icon} />
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-700">{tier.timeline}</p>
                <p className="mt-2 text-base font-black text-emerald-700">{tier.price}</p>
                <p className="mt-2 text-sm text-slate-600">{tier.focus}</p>
              </article>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/85 p-4">
            <p className="text-sm font-bold text-emerald-800">
              {copy.startsFrom}: EUR 300 | {copy.upto}: EUR 1,200
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_20px_52px_-30px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {copy.processTitle}
          </h2>
          <div className="mt-5 space-y-3">
            {steps.map((step, index) => (
              <article
                key={`${step}-${index}`}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_26px_-20px_rgba(15,23,42,0.35)]"
              >
                <p className="text-xs font-black uppercase tracking-[0.08em] text-cyan-700">Step {index + 1}</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">{step}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-emerald-300/80 bg-[linear-gradient(135deg,rgba(236,253,245,0.96)_0%,rgba(240,253,250,0.95)_100%)] p-6 shadow-[0_22px_56px_-30px_rgba(16,185,129,0.4)] sm:p-8">
          <h2 style={headingFont} className="text-3xl font-extrabold text-slate-900">
            {copy.finalCtaTitle}
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-700 sm:text-base">{copy.finalCtaSubtitle}</p>
          <button
            type="button"
            onClick={goToQuotation}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/75 bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-black tracking-[0.04em] text-white shadow-[0_10px_26px_-14px_rgba(16,185,129,0.82)] transition-all duration-300 hover:border-cyan-500/80 hover:from-cyan-500 hover:to-blue-500 hover:shadow-[0_10px_26px_-14px_rgba(37,99,235,0.85)]"
          >
            <FontAwesomeIcon icon={faFileInvoiceDollar} />
            {copy.getQuotation}
          </button>
        </section>
      </section>

      <FloatingWhatsAppButton locale={normalizedLocale} />
    </main>
  );
};

export default SEOAuditOptimizationPage;
