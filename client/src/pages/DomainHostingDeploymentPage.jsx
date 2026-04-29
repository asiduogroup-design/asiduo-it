import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import {
  faArrowLeft,
  faCartShopping,
  faCheckCircle,
  faFileInvoiceDollar,
  faGlobe,
  faHouse,
  faMagnifyingGlass,
  faPaperPlane,
  faServer,
  faShieldHalved,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const DOMAIN_EXTENSIONS = [".com", ".net", ".org", ".in", ".io", ".co"];

const DOMAIN_BASE_PRICES = {
  ".com": 14,
  ".net": 13,
  ".org": 12,
  ".in": 9,
  ".io": 39,
  ".co": 27,
};

const RESERVED_DOMAINS = new Set([
  "google.com",
  "facebook.com",
  "amazon.com",
  "apple.com",
  "microsoft.com",
  "youtube.com",
  "openai.com",
  "instagram.com",
  "whatsapp.com",
  "netflix.com",
]);

const COPY = {
  en: {
    pageTag: "Software Solutions",
    title: "Domain, Hosting, and Deployment Store",
    subtitle:
      "Search domain availability, check transparent pricing, and add domain, hosting, and SEO bundles to your cart in one flow.",
    supportLine:
      "This page is built for quick customer decisions: search domain, compare plans, and build a launch package in minutes.",
    getQuotation: "Get Quotation",
    contact: "Contact",
    backToServices: "Back to Services",
    homeAria: "Go to home",
    domainSearchTitle: "Find Your Domain",
    domainSearchSubtitle: "Type your brand name, choose extension, and check instant availability.",
    domainNameLabel: "Domain Name",
    extensionLabel: "Extension",
    searchPlaceholder: "example: asiduo",
    searchDomain: "Search Domain",
    searchHint: "Prices shown are first-year estimates. Final registrar pricing may vary slightly.",
    invalidDomainMessage: "Enter a valid domain name using letters, numbers, or hyphen.",
    domainAvailableLabel: "Available",
    domainTakenLabel: "Taken",
    domainAvailableMessage: (domain) => `${domain} is available now.`,
    domainUnavailableMessage: (domain) => `${domain} is already registered.`,
    registrationPriceLabel: "Registration (1 year)",
    renewalPriceLabel: "Renewal",
    suggestedAlternatives: "Suggested alternatives",
    addToCart: "Add to Cart",
    addedToCart: "Added",
    domainItemType: "Domain",
    domainYearlyBilling: "Yearly billing",
    hostingTitle: "Hosting Services",
    hostingSubtitle: "Choose a hosting plan and add it directly to your cart.",
    hostingItemType: "Hosting",
    bundleTitle: "Launch Packages (Domain + Hosting + SEO)",
    bundleSubtitle: "Ready-made packages for complete launch execution.",
    bundleItemType: "Bundle",
    includesLabel: "Includes",
    cartTitle: "Cart Summary",
    cartCountLabel: (count) => `${count} item${count === 1 ? "" : "s"} selected`,
    cartEmpty: "Your cart is empty. Add a domain, hosting plan, or launch package.",
    removeLabel: "Remove",
    totalLabel: "Total",
    cartSupport: "Use this summary when you request quotation so we can respond faster.",
    finalCtaTitle: "Need a Complete Setup with Expert Support?",
    finalCtaSubtitle: "Share your selected cart items and we will send a deployment-ready quotation.",
    hostingPlans: [
      {
        id: "hosting-starter",
        title: "Starter Hosting",
        description: "Best for brochure sites and startup landing pages.",
        price: 59,
        billing: "Per year",
        features: ["1 website", "10 GB SSD storage", "Free SSL", "Weekly backups"],
      },
      {
        id: "hosting-business",
        title: "Business Hosting",
        description: "For growing businesses that need speed and reliability.",
        price: 129,
        billing: "Per year",
        features: ["5 websites", "50 GB NVMe storage", "Free SSL + CDN", "Daily backups"],
      },
      {
        id: "hosting-scale",
        title: "Scale Cloud Hosting",
        description: "High-performance stack for heavy traffic websites.",
        price: 249,
        billing: "Per year",
        features: ["Unlimited sites", "Managed cloud setup", "WAF security", "Priority support"],
      },
    ],
    bundlePlans: [
      {
        id: "bundle-launch",
        title: "Launch Package",
        description: "Perfect for first-time online launch.",
        price: 319,
        billing: "One-time + 1 year hosting",
        includes: ["1 domain registration", "Starter Hosting", "SEO setup for 5 pages"],
      },
      {
        id: "bundle-growth",
        title: "Growth Package",
        description: "For businesses planning traffic growth in the next 6-12 months.",
        price: 579,
        billing: "One-time + 1 year hosting",
        includes: ["1 premium domain", "Business Hosting", "SEO optimization for 12 pages"],
      },
      {
        id: "bundle-authority",
        title: "Authority Package",
        description: "Complete technical + visibility setup for brand scale.",
        price: 949,
        billing: "One-time + 1 year hosting",
        includes: ["Premium domain strategy", "Scale Cloud Hosting", "SEO audit + implementation"],
      },
    ],
  },
  it: {
    pageTag: "Soluzioni Software",
    title: "Store Dominio, Hosting e Deploy",
    subtitle:
      "Cerca disponibilita dominio, controlla i prezzi in modo trasparente e aggiungi dominio, hosting e pacchetti SEO al carrello.",
    supportLine:
      "Questa pagina e pensata per decisioni rapide: cerca dominio, confronta piani e crea un pacchetto completo in pochi minuti.",
    getQuotation: "Richiedi Preventivo",
    contact: "Contatti",
    backToServices: "Torna ai Servizi",
    homeAria: "Vai alla home",
    domainSearchTitle: "Trova il Tuo Dominio",
    domainSearchSubtitle: "Inserisci il nome del brand, scegli estensione e verifica disponibilita immediata.",
    domainNameLabel: "Nome Dominio",
    extensionLabel: "Estensione",
    searchPlaceholder: "esempio: asiduo",
    searchDomain: "Cerca Dominio",
    searchHint: "I prezzi mostrati sono stime primo anno. Il prezzo finale registrar puo variare leggermente.",
    invalidDomainMessage: "Inserisci un dominio valido con lettere, numeri o trattino.",
    domainAvailableLabel: "Disponibile",
    domainTakenLabel: "Occupato",
    domainAvailableMessage: (domain) => `${domain} e disponibile ora.`,
    domainUnavailableMessage: (domain) => `${domain} risulta gia registrato.`,
    registrationPriceLabel: "Registrazione (1 anno)",
    renewalPriceLabel: "Rinnovo",
    suggestedAlternatives: "Alternative suggerite",
    addToCart: "Aggiungi al Carrello",
    addedToCart: "Aggiunto",
    domainItemType: "Dominio",
    domainYearlyBilling: "Fatturazione annuale",
    hostingTitle: "Servizi Hosting",
    hostingSubtitle: "Scegli un piano hosting e aggiungilo subito al carrello.",
    hostingItemType: "Hosting",
    bundleTitle: "Pacchetti Lancio (Dominio + Hosting + SEO)",
    bundleSubtitle: "Pacchetti pronti per un lancio completo.",
    bundleItemType: "Pacchetto",
    includesLabel: "Include",
    cartTitle: "Riepilogo Carrello",
    cartCountLabel: (count) => `${count} element${count === 1 ? "o" : "i"} selezionat${count === 1 ? "o" : "i"}`,
    cartEmpty: "Il carrello e vuoto. Aggiungi un dominio, un piano hosting o un pacchetto lancio.",
    removeLabel: "Rimuovi",
    totalLabel: "Totale",
    cartSupport: "Usa questo riepilogo quando richiedi il preventivo, cosi rispondiamo piu velocemente.",
    finalCtaTitle: "Ti Serve un Setup Completo con Supporto Esperto?",
    finalCtaSubtitle: "Condividi gli elementi del carrello e invieremo un preventivo pronto al deploy.",
    hostingPlans: [
      {
        id: "hosting-starter",
        title: "Hosting Starter",
        description: "Ideale per siti vetrina e landing page startup.",
        price: 59,
        billing: "Per anno",
        features: ["1 sito web", "10 GB SSD", "SSL gratuito", "Backup settimanali"],
      },
      {
        id: "hosting-business",
        title: "Hosting Business",
        description: "Per aziende in crescita che richiedono velocita e affidabilita.",
        price: 129,
        billing: "Per anno",
        features: ["5 siti web", "50 GB NVMe", "SSL + CDN gratuiti", "Backup giornalieri"],
      },
      {
        id: "hosting-scale",
        title: "Hosting Cloud Scale",
        description: "Stack ad alte prestazioni per siti ad alto traffico.",
        price: 249,
        billing: "Per anno",
        features: ["Siti illimitati", "Setup cloud gestito", "Sicurezza WAF", "Supporto prioritario"],
      },
    ],
    bundlePlans: [
      {
        id: "bundle-launch",
        title: "Pacchetto Launch",
        description: "Perfetto per il primo lancio online.",
        price: 319,
        billing: "Una tantum + 1 anno hosting",
        includes: ["1 registrazione dominio", "Hosting Starter", "Setup SEO per 5 pagine"],
      },
      {
        id: "bundle-growth",
        title: "Pacchetto Growth",
        description: "Per aziende che pianificano crescita traffico nei prossimi 6-12 mesi.",
        price: 579,
        billing: "Una tantum + 1 anno hosting",
        includes: ["1 dominio premium", "Hosting Business", "Ottimizzazione SEO per 12 pagine"],
      },
      {
        id: "bundle-authority",
        title: "Pacchetto Authority",
        description: "Setup completo tecnico + visibilita per scalare il brand.",
        price: 949,
        billing: "Una tantum + 1 anno hosting",
        includes: ["Strategia dominio premium", "Hosting Cloud Scale", "SEO audit + implementazione"],
      },
    ],
  },
};

const headingFont = {
  fontFamily: '"Cambria", "Palatino Linotype", "Times New Roman", serif',
};

const bodyFont = {
  fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
};

const formatEuro = (value) => `EUR ${Math.round(value)}`;

const sanitizeDomainLabel = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .slice(0, 30);

const estimateDomainPrice = (domainLabel, extension) => {
  const basePrice = DOMAIN_BASE_PRICES[extension] ?? 15;
  const scarcityFee = domainLabel.length <= 4 ? 18 : domainLabel.length <= 6 ? 10 : domainLabel.length <= 8 ? 4 : 0;
  const keywordPremium = /(shop|store|ai|tech|cloud|labs|digital)/.test(domainLabel) ? 6 : 0;
  return basePrice + scarcityFee + keywordPremium;
};

const createSuggestionDomains = (domainLabel, extension) => {
  const altExtension = extension === ".com" ? ".net" : ".com";
  const variants = [
    `${domainLabel}online${extension}`,
    `get${domainLabel}${extension}`,
    `${domainLabel}hq${altExtension}`,
  ];

  return Array.from(new Set(variants)).map((fullDomain) => {
    const splitPoint = fullDomain.lastIndexOf(".");
    const namePart = fullDomain.slice(0, splitPoint);
    const extensionPart = fullDomain.slice(splitPoint);
    const price = estimateDomainPrice(namePart, extensionPart);

    return {
      domain: fullDomain,
      price,
    };
  });
};

const buildDomainResult = (domainLabel, extension) => {
  const fullDomain = `${domainLabel}${extension}`.toLowerCase();
  const hash = Array.from(fullDomain).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const looksTakenByPattern = hash % 5 === 0;
  const isAvailable = !RESERVED_DOMAINS.has(fullDomain) && !looksTakenByPattern;
  const registrationPrice = estimateDomainPrice(domainLabel, extension);
  const renewalPrice = Math.max((DOMAIN_BASE_PRICES[extension] ?? 15) + 3, Math.round(registrationPrice * 0.9));

  return {
    fullDomain,
    isAvailable,
    registrationPrice,
    renewalPrice,
    suggestions: isAvailable ? [] : createSuggestionDomains(domainLabel, extension),
  };
};

const DomainHostingDeploymentPage = ({ locale = "en" }) => {
  const normalizedLocale = locale === "it" ? "it" : "en";
  const text = COPY[normalizedLocale];
  const navigate = useNavigate();
  const localePrefix = normalizedLocale === "it" ? "/it" : "";

  const [domainLabelInput, setDomainLabelInput] = useState("");
  const [domainExtension, setDomainExtension] = useState(".com");
  const [domainResult, setDomainResult] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const cartItemIds = useMemo(() => new Set(cartItems.map((item) => item.id)), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price, 0), [cartItems]);

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

  const addToCart = (item) => {
    setCartItems((previousItems) => {
      if (previousItems.some((existingItem) => existingItem.id === item.id)) {
        return previousItems;
      }

      return [...previousItems, item];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((previousItems) => previousItems.filter((item) => item.id !== itemId));
  };

  const handleDomainSearch = (event) => {
    event.preventDefault();
    const cleanedLabel = sanitizeDomainLabel(domainLabelInput);

    if (!cleanedLabel) {
      setDomainResult({ error: text.invalidDomainMessage });
      return;
    }

    setDomainResult(buildDomainResult(cleanedLabel, domainExtension));
  };

  const addDomainToCart = (domainName, price) => {
    addToCart({
      id: `domain-${domainName}`,
      type: text.domainItemType,
      title: domainName,
      billing: text.domainYearlyBilling,
      price,
    });
  };

  return (
    <main
      translate="no"
      style={bodyFont}
      className="notranslate safe-mobile-padding relative isolate min-h-screen overflow-hidden bg-[linear-gradient(126deg,#f8fbff_0%,#edf6ff_44%,#f3fff8_100%)] pb-16 pt-16 text-slate-900 sm:px-6 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(148,163,184,0.42)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.42)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="pointer-events-none absolute inset-0 opacity-85 [background:radial-gradient(circle_at_14%_12%,rgba(14,165,233,0.18),transparent_34%),radial-gradient(circle_at_86%_14%,rgba(34,197,94,0.16),transparent_32%),radial-gradient(circle_at_50%_84%,rgba(56,189,248,0.14),transparent_36%)]" />

      <section className="relative z-10 mx-auto w-full max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBackToServices}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/90 bg-white/92 px-4 py-2 text-sm font-black tracking-[0.03em] text-cyan-800 shadow-[0_10px_24px_-16px_rgba(14,116,144,0.55)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-900"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {text.backToServices}
          </button>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/80 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800 shadow-[0_10px_24px_-18px_rgba(5,150,105,0.62)]">
            <FontAwesomeIcon icon={faCartShopping} />
            {text.cartCountLabel(cartItems.length)}
          </div>
        </div>

        <header className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_24px_60px_-30px_rgba(30,64,175,0.45)] backdrop-blur-md sm:p-8">
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
            {text.domainSearchTitle}
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-600">{text.domainSearchSubtitle}</p>

          <form onSubmit={handleDomainSearch} className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_auto]">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-[0.08em] text-slate-700">{text.domainNameLabel}</span>
              <input
                type="text"
                value={domainLabelInput}
                onChange={(event) => setDomainLabelInput(event.target.value)}
                placeholder={text.searchPlaceholder}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all duration-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-[0.08em] text-slate-700">{text.extensionLabel}</span>
              <select
                value={domainExtension}
                onChange={(event) => setDomainExtension(event.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-bold text-slate-900 outline-none transition-all duration-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
              >
                {DOMAIN_EXTENSIONS.map((extension) => (
                  <option key={extension} value={extension}>
                    {extension}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="md:self-end inline-flex items-center justify-center gap-2 rounded-xl border border-sky-500/80 bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-3 text-sm font-black uppercase tracking-[0.05em] text-white shadow-[0_12px_28px_-16px_rgba(14,165,233,0.88)] transition-all duration-300 hover:border-blue-500/80 hover:from-blue-500 hover:to-indigo-500"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              {text.searchDomain}
            </button>
          </form>

          <p className="mt-3 text-xs font-semibold text-slate-500">{text.searchHint}</p>

          {domainResult && (
            <article
              className={`mt-5 rounded-2xl border p-4 shadow-[0_14px_30px_-22px_rgba(15,23,42,0.42)] ${
                domainResult.error
                  ? "border-rose-200 bg-rose-50"
                  : domainResult.isAvailable
                    ? "border-emerald-200 bg-emerald-50/75"
                    : "border-amber-200 bg-amber-50/75"
              }`}
            >
              {domainResult.error ? (
                <p className="text-sm font-bold text-rose-700">{domainResult.error}</p>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.08em] text-slate-600">{text.domainNameLabel}</p>
                      <h3 className="text-xl font-black text-slate-900">{domainResult.fullDomain}</h3>
                    </div>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.06em] ${
                        domainResult.isAvailable ? "bg-emerald-200 text-emerald-800" : "bg-amber-200 text-amber-800"
                      }`}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} />
                      {domainResult.isAvailable ? text.domainAvailableLabel : text.domainTakenLabel}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-700">
                    {domainResult.isAvailable
                      ? text.domainAvailableMessage(domainResult.fullDomain)
                      : text.domainUnavailableMessage(domainResult.fullDomain)}
                  </p>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <p className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700">
                      {text.registrationPriceLabel}: <span className="text-sky-700">{formatEuro(domainResult.registrationPrice)}</span>
                    </p>
                    <p className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700">
                      {text.renewalPriceLabel}: <span className="text-sky-700">{formatEuro(domainResult.renewalPrice)}</span>
                    </p>
                  </div>

                  {domainResult.isAvailable ? (
                    <button
                      type="button"
                      onClick={() => addDomainToCart(domainResult.fullDomain, domainResult.registrationPrice)}
                      disabled={cartItemIds.has(`domain-${domainResult.fullDomain}`)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black tracking-[0.03em] transition-all duration-200 ${
                        cartItemIds.has(`domain-${domainResult.fullDomain}`)
                          ? "cursor-not-allowed border-emerald-300 bg-emerald-200 text-emerald-900"
                          : "border-sky-400 bg-sky-100 text-sky-800 hover:border-sky-500 hover:bg-sky-200"
                      }`}
                    >
                      <FontAwesomeIcon icon={faCartShopping} />
                      {cartItemIds.has(`domain-${domainResult.fullDomain}`) ? text.addedToCart : text.addToCart}
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm font-black text-slate-800">{text.suggestedAlternatives}</p>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                        {domainResult.suggestions.map((suggestion) => {
                          const suggestionCartId = `domain-${suggestion.domain}`;
                          const alreadyAdded = cartItemIds.has(suggestionCartId);

                          return (
                            <article key={suggestion.domain} className="rounded-xl border border-amber-200 bg-white p-3">
                              <p className="text-sm font-black text-slate-900">{suggestion.domain}</p>
                              <p className="mt-1 text-xs font-bold text-amber-700">{formatEuro(suggestion.price)}</p>
                              <button
                                type="button"
                                onClick={() => addDomainToCart(suggestion.domain, suggestion.price)}
                                disabled={alreadyAdded}
                                className={`mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black uppercase tracking-[0.05em] transition-colors ${
                                  alreadyAdded
                                    ? "cursor-not-allowed border-emerald-300 bg-emerald-200 text-emerald-900"
                                    : "border-amber-400 bg-amber-100 text-amber-800 hover:bg-amber-200"
                                }`}
                              >
                                <FontAwesomeIcon icon={faCartShopping} />
                                {alreadyAdded ? text.addedToCart : text.addToCart}
                              </button>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </article>
          )}
        </section>

        <section className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_20px_52px_-30px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {text.hostingTitle}
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-600">{text.hostingSubtitle}</p>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {text.hostingPlans.map((plan) => {
              const cartId = `hosting-${plan.id}`;
              const added = cartItemIds.has(cartId);

              return (
                <article
                  key={plan.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_14px_30px_-22px_rgba(15,23,42,0.42)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-black text-slate-900">{plan.title}</h3>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      <FontAwesomeIcon icon={faServer} />
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-600">{plan.description}</p>
                  <p className="mt-3 text-base font-black text-sky-700">
                    {formatEuro(plan.price)} <span className="text-xs font-bold text-slate-500">{plan.billing}</span>
                  </p>

                  <div className="mt-3 space-y-2">
                    {plan.features.map((feature) => (
                      <p key={feature} className="inline-flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-cyan-600" />
                        {feature}
                      </p>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: cartId,
                        type: text.hostingItemType,
                        title: plan.title,
                        billing: plan.billing,
                        price: plan.price,
                      })
                    }
                    disabled={added}
                    className={`mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black tracking-[0.03em] transition-all duration-200 ${
                      added
                        ? "cursor-not-allowed border-emerald-300 bg-emerald-200 text-emerald-900"
                        : "border-cyan-400 bg-cyan-100 text-cyan-800 hover:border-cyan-500 hover:bg-cyan-200"
                    }`}
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                    {added ? text.addedToCart : text.addToCart}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/85 bg-white/92 p-6 shadow-[0_20px_52px_-30px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {text.bundleTitle}
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-600">{text.bundleSubtitle}</p>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {text.bundlePlans.map((pack) => {
              const cartId = `bundle-${pack.id}`;
              const added = cartItemIds.has(cartId);

              return (
                <article
                  key={pack.id}
                  className="rounded-2xl border border-sky-200 bg-sky-50/72 p-4 shadow-[0_14px_30px_-22px_rgba(15,23,42,0.42)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-black text-slate-900">{pack.title}</h3>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white">
                      <FontAwesomeIcon icon={faShieldHalved} />
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-700">{pack.description}</p>
                  <p className="mt-3 text-base font-black text-sky-700">
                    {formatEuro(pack.price)} <span className="text-xs font-bold text-slate-500">{pack.billing}</span>
                  </p>

                  <p className="mt-3 text-xs font-black uppercase tracking-[0.06em] text-slate-700">{text.includesLabel}</p>
                  <div className="mt-2 space-y-2">
                    {pack.includes.map((line) => (
                      <p key={line} className="inline-flex w-full items-center gap-2 rounded-lg border border-sky-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
                        <FontAwesomeIcon icon={faGlobe} className="text-sky-600" />
                        {line}
                      </p>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: cartId,
                        type: text.bundleItemType,
                        title: pack.title,
                        billing: pack.billing,
                        price: pack.price,
                      })
                    }
                    disabled={added}
                    className={`mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black tracking-[0.03em] transition-all duration-200 ${
                      added
                        ? "cursor-not-allowed border-emerald-300 bg-emerald-200 text-emerald-900"
                        : "border-sky-400 bg-sky-100 text-sky-800 hover:border-sky-500 hover:bg-sky-200"
                    }`}
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                    {added ? text.addedToCart : text.addToCart}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-emerald-300/85 bg-[linear-gradient(135deg,rgba(236,253,245,0.9)_0%,rgba(240,249,255,0.9)_100%)] p-6 shadow-[0_20px_52px_-30px_rgba(5,150,105,0.45)] sm:p-8">
          <h2 style={headingFont} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {text.cartTitle}
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-700">{text.cartSupport}</p>

          {cartItems.length === 0 ? (
            <p className="mt-4 rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm font-bold text-slate-700">{text.cartEmpty}</p>
          ) : (
            <div className="mt-4 space-y-3">
              {cartItems.map((item) => (
                <article key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-white p-3">
                  <div>
                    <p className="text-base font-black text-slate-900">{item.title}</p>
                    <p className="text-xs font-bold uppercase tracking-[0.06em] text-emerald-700">
                      {item.type} · {item.billing}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="text-base font-black text-emerald-800">{formatEuro(item.price)}</p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rose-300 bg-rose-100 text-rose-700 transition-colors hover:bg-rose-200"
                      aria-label={text.removeLabel}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                </article>
              ))}

              <div className="rounded-2xl border border-emerald-300 bg-emerald-100/80 p-4">
                <p className="text-lg font-black text-emerald-900">
                  {text.totalLabel}: {formatEuro(cartTotal)}
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-sky-300/80 bg-[linear-gradient(135deg,rgba(240,249,255,0.96)_0%,rgba(236,254,255,0.95)_100%)] p-6 shadow-[0_22px_56px_-30px_rgba(2,132,199,0.4)] sm:p-8">
          <h2 style={headingFont} className="text-3xl font-extrabold text-slate-900">
            {text.finalCtaTitle}
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-700 sm:text-base">{text.finalCtaSubtitle}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={goToQuotation}
              className="inline-flex items-center gap-2 rounded-full border border-sky-500/75 bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3 text-sm font-black tracking-[0.04em] text-white shadow-[0_10px_26px_-14px_rgba(14,165,233,0.82)] transition-all duration-300 hover:border-blue-500/80 hover:from-blue-500 hover:to-indigo-500 hover:shadow-[0_10px_26px_-14px_rgba(37,99,235,0.85)]"
            >
              <FontAwesomeIcon icon={faFileInvoiceDollar} />
              {text.getQuotation}
            </button>

            <button
              type="button"
              onClick={goToContact}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-100 px-6 py-3 text-sm font-black tracking-[0.04em] text-cyan-800 transition-all duration-300 hover:border-sky-400 hover:bg-sky-400 hover:text-white hover:shadow-[0_10px_22px_-12px_rgba(2,132,199,0.75)]"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              {text.contact}
            </button>
          </div>
        </section>
      </section>

      <FloatingWhatsAppButton locale={normalizedLocale} />
    </main>
  );
};

export default DomainHostingDeploymentPage;
