import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import {
  faArrowLeft,
  faCheckCircle,
  faCloudArrowUp,
  faDatabase,
  faFileInvoiceDollar,
  faGlobe,
  faHouse,
  faLock,
  faNetworkWired,
  faPaperPlane,
  faServer,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

const COPY = {
  en: {
    pageTag: "Software Solutions",
    title: "Domain, Hosting, and Deployment Setup",
    subtitle:
      "Complete setup for domain purchase, DNS records, SSL security, hosting provisioning, and production deployment.",
    supportLine:
      "We configure your infrastructure end-to-end so your website launches securely, quickly, and with a clean technical foundation.",
    getQuotation: "Get Quotation",
    contact: "Contact",
    backToServices: "Back to Services",
    homeAria: "Go to home",
    servicesTitle: "What We Setup",
    processTitle: "Deployment Workflow",
    plansTitle: "Setup Plan Reference",
    includedTitle: "Included Deliverables",
    finalCtaTitle: "Ready to Launch with Clean Infrastructure?",
    finalCtaSubtitle: "Request a quote for domain, hosting, and deployment setup in one package.",
    startsFrom: "Starts from",
    upto: "Up to",
    services: [
      {
        title: "Domain and Registrar Setup",
        description: "Domain purchase guidance, registrar account setup, and ownership-ready configuration.",
        icon: faGlobe,
      },
      {
        title: "DNS and Records Configuration",
        description: "A, AAAA, CNAME, MX, TXT, and other records tuned for website and email services.",
        icon: faNetworkWired,
      },
      {
        title: "SSL and Security Hardening",
        description: "HTTPS certificates, redirect rules, and baseline security headers for safe delivery.",
        icon: faLock,
      },
      {
        title: "Hosting and Deployment",
        description: "Provisioned hosting environment, deployment pipeline, and go-live validation checks.",
        icon: faCloudArrowUp,
      },
    ],
    processSteps: [
      "Requirement alignment and domain/provider selection",
      "DNS, SSL, and hosting provisioning",
      "Application deployment and environment checks",
      "Post-launch verification and handover",
    ],
    planTiers: [
      {
        title: "Base",
        price: "EUR 180 - EUR 270",
        timeline: "2-3 days",
        icon: faServer,
      },
      {
        title: "Standard",
        price: "EUR 270 - EUR 470",
        timeline: "3-5 days",
        icon: faDatabase,
      },
      {
        title: "Advanced",
        price: "EUR 470 - EUR 650",
        timeline: "5-8 days",
        icon: faShieldHalved,
      },
    ],
    deliverables: [
      "Domain and DNS mapping document",
      "SSL certificate setup and renew strategy",
      "Hosting environment access and credentials handover",
      "Deployment checklist and rollback notes",
      "Go-live verification report",
    ],
  },
  it: {
    pageTag: "Soluzioni Software",
    title: "Setup Dominio, Hosting e Deploy",
    subtitle:
      "Configurazione completa per acquisto dominio, DNS, SSL, provisioning hosting e deploy in produzione.",
    supportLine:
      "Configuriamo tutta l'infrastruttura in modo sicuro e ordinato per un lancio stabile del tuo sito.",
    getQuotation: "Richiedi Preventivo",
    contact: "Contatti",
    backToServices: "Torna ai Servizi",
    homeAria: "Vai alla home",
    servicesTitle: "Cosa Configuriamo",
    processTitle: "Workflow di Deploy",
    plansTitle: "Pacchetti Setup di Riferimento",
    includedTitle: "Deliverable Inclusi",
    finalCtaTitle: "Pronto a lanciare con infrastruttura pulita?",
    finalCtaSubtitle: "Richiedi un preventivo unico per dominio, hosting e deploy.",
    startsFrom: "A partire da",
    upto: "Fino a",
    services: [
      {
        title: "Setup Dominio e Registrar",
        description: "Supporto acquisto dominio, setup account registrar e configurazione proprieta.",
        icon: faGlobe,
      },
      {
        title: "Configurazione DNS e Record",
        description: "Record A, AAAA, CNAME, MX, TXT e altri parametri per sito ed email.",
        icon: faNetworkWired,
      },
      {
        title: "SSL e Hardening Sicurezza",
        description: "Certificati HTTPS, redirect e header base di sicurezza.",
        icon: faLock,
      },
      {
        title: "Hosting e Deploy",
        description: "Provisioning ambiente, pipeline deploy e verifiche go-live.",
        icon: faCloudArrowUp,
      },
    ],
    processSteps: [
      "Allineamento requisiti e scelta dominio/provider",
      "Configurazione DNS, SSL e hosting",
      "Deploy applicazione e controlli ambiente",
      "Verifica post-lancio e handover finale",
    ],
    planTiers: [
      {
        title: "Base",
        price: "EUR 180 - EUR 270",
        timeline: "2-3 giorni",
        icon: faServer,
      },
      {
        title: "Standard",
        price: "EUR 270 - EUR 470",
        timeline: "3-5 giorni",
        icon: faDatabase,
      },
      {
        title: "Advanced",
        price: "EUR 470 - EUR 650",
        timeline: "5-8 giorni",
        icon: faShieldHalved,
      },
    ],
    deliverables: [
      "Documento mappatura dominio e DNS",
      "Setup certificato SSL e strategia rinnovo",
      "Handover accessi e credenziali hosting",
      "Checklist deploy con note rollback",
      "Report verifiche go-live",
    ],
  },
};

const headingFont = {
  fontFamily: '"Cambria", "Palatino Linotype", "Times New Roman", serif',
};

const bodyFont = {
  fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
};

const DomainHostingDeploymentPage = ({ locale = "en" }) => {
  const normalizedLocale = locale === "it" ? "it" : "en";
  const text = COPY[normalizedLocale];
  const navigate = useNavigate();
  const localePrefix = normalizedLocale === "it" ? "/it" : "";

  const goToQuotation = () => {
    navigate(`${localePrefix}/services?quote=domain-hosting-setup`);
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
      className="notranslate safe-mobile-padding relative isolate min-h-screen overflow-hidden bg-[linear-gradient(126deg,#f8fbff_0%,#edf6ff_45%,#f6fbff_100%)] pb-16 pt-16 text-slate-900 sm:px-6 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(148,163,184,0.42)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.42)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="pointer-events-none absolute inset-0 opacity-80 [background:radial-gradient(circle_at_16%_14%,rgba(14,165,233,0.2),transparent_34%),radial-gradient(circle_at_86%_16%,rgba(2,132,199,0.16),transparent_30%),radial-gradient(circle_at_50%_86%,rgba(56,189,248,0.12),transparent_36%)]" />

      <section className="relative z-10 mx-auto w-full max-w-6xl space-y-6">
        <div className="flex justify-start">
          <button
            type="button"
            onClick={goBackToServices}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/90 bg-white/90 px-4 py-2 text-sm font-black tracking-[0.03em] text-cyan-800 shadow-[0_10px_24px_-16px_rgba(14,116,144,0.55)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-900"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {text.backToServices}
          </button>
        </div>

        <header className="rounded-3xl border border-slate-200/85 bg-white/90 p-6 shadow-[0_24px_60px_-30px_rgba(30,64,175,0.45)] backdrop-blur-md sm:p-8">
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-4xl">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">{text.pageTag}</p>
                <h1 style={headingFont} className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                  {text.title}
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">{text.subtitle}</p>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600 sm:text-[15px]">{text.supportLine}</p>
              </div>

              <button
                type="button"
                onClick={goHome}
                aria-label={text.homeAria}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700"
              >
                <FontAwesomeIcon icon={faHouse} />
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={goToQuotation}
                className="inline-flex items-center gap-2 rounded-full border border-sky-500/75 bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-2.5 text-sm font-black tracking-[0.04em] text-white shadow-[0_10px_26px_-14px_rgba(14,165,233,0.82)] transition-all duration-300 hover:border-blue-500/80 hover:from-blue-500 hover:to-indigo-500 hover:shadow-[0_10px_26px_-14px_rgba(37,99,235,0.85)]"
              >
                <FontAwesomeIcon icon={faFileInvoiceDollar} />
                {text.getQuotation}
              </button>

              <button
                type="button"
                onClick={goToContact}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-100 px-5 py-2.5 text-sm font-black tracking-[0.04em] text-cyan-800 transition-all duration-300 hover:border-sky-400 hover:bg-sky-400 hover:text-white hover:shadow-[0_10px_22px_-12px_rgba(2,132,199,0.75)]"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                {text.contact}
              </button>
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_20px_52px_-30px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {text.servicesTitle}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {text.services.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_14px_30px_-22px_rgba(15,23,42,0.42)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-[0_8px_18px_-12px_rgba(14,165,233,0.9)]">
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
            {text.processTitle}
          </h2>
          <div className="mt-5 space-y-3">
            {text.processSteps.map((step, index) => (
              <article
                key={`${step}-${index}`}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_26px_-20px_rgba(15,23,42,0.35)]"
              >
                <p className="text-xs font-black uppercase tracking-[0.08em] text-sky-700">Step {index + 1}</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">{step}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_20px_52px_-30px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {text.plansTitle}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {text.planTiers.map((plan) => (
              <article
                key={plan.title}
                className="rounded-2xl border border-sky-200 bg-sky-50/75 p-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.4)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-black text-slate-900">{plan.title}</h3>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-500 text-white">
                    <FontAwesomeIcon icon={plan.icon} />
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-700">{plan.timeline}</p>
                <p className="mt-2 text-base font-black text-sky-700">{plan.price}</p>
              </article>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50/85 p-4">
            <p className="text-sm font-bold text-sky-800">
              {text.startsFrom}: EUR 180 | {text.upto}: EUR 650
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_20px_52px_-30px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {text.includedTitle}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {text.deliverables.map((item) => (
              <p
                key={item}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-900"
              >
                <FontAwesomeIcon icon={faCheckCircle} className="text-cyan-600" />
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-sky-300/80 bg-[linear-gradient(135deg,rgba(240,249,255,0.96)_0%,rgba(236,254,255,0.95)_100%)] p-6 shadow-[0_22px_56px_-30px_rgba(2,132,199,0.4)] sm:p-8">
          <h2 style={headingFont} className="text-3xl font-extrabold text-slate-900">
            {text.finalCtaTitle}
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-700 sm:text-base">{text.finalCtaSubtitle}</p>
          <button
            type="button"
            onClick={goToQuotation}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-500/75 bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3 text-sm font-black tracking-[0.04em] text-white shadow-[0_10px_26px_-14px_rgba(14,165,233,0.82)] transition-all duration-300 hover:border-blue-500/80 hover:from-blue-500 hover:to-indigo-500 hover:shadow-[0_10px_26px_-14px_rgba(37,99,235,0.85)]"
          >
            <FontAwesomeIcon icon={faFileInvoiceDollar} />
            {text.getQuotation}
          </button>
        </section>
      </section>

      <FloatingWhatsAppButton locale={normalizedLocale} />
    </main>
  );
};

export default DomainHostingDeploymentPage;
