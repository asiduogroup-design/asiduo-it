import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import {
  faArrowUpRightFromSquare,
  faChevronLeft,
  faChevronRight,
  faCircleCheck,
  faEnvelope,
  faFileInvoiceDollar,
  faMagnifyingGlass,
  faPaperPlane,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { buildApiUrl } from "../config/api";

const COPY = {
  en: {
    carouselTitle: "Featured Service Highlights",
    carouselPrev: "Previous slide",
    carouselNext: "Next slide",
    title: "Service Catalog",
    subtitle:
      "Explore software, electrical consulting, and graphic design services with transparent price ranges and premium delivery.",
    searchPlaceholder: "Search services, keywords, or deliverables...",
    filters: {
      all: "All Services",
      software: "Software Solutions",
      electrical: "Electrical Consultant",
      design: "Graphic Design",
    },
    resultsLabel: "results found",
    quoteTitle: "Estimated Quotation",
    quoteCta: "Request a Quote",
    visitCta: "Visit",
    noResults: "No services match your search. Try another keyword or filter.",
    modalTitle: "Request a Quote",
    modalSubtitle: "Tell us your requirements and we'll send a tailored quote.",
    packageBuilderTitle: "Build Your Website Package",
    websiteTypeLabel: "Website Type",
    pagesLabel: "Pages",
    addOnsLabel: "Add-ons",
    baseLabel: "Base",
    pagesCostLabel: "Pages",
    addOnsCostLabel: "Add-ons",
    totalPriceLabel: "Total Price",
    deliveryLabel: "Delivery",
    daysLabel: "days",
    noneLabel: "None",
    selectedService: "Selected Service",
    estimatedRange: "Estimated Range",
    nameLabel: "Full Name",
    phoneLabel: "Phone Number",
    emailLabel: "Email Address",
    companyLabel: "Company (Optional)",
    messageLabel: "Requirements",
    messagePlaceholder:
      "Tell us your scope, timeline, and any technical/design expectations...",
    submitLabel: "Submit Request",
    submittingLabel: "Submitting...",
    requiredMessage: "Name, phone, and email are required.",
    invalidEmailMessage: "Please enter a valid email address.",
    submitErrorMessage: "Unable to submit right now. Please try again in a moment.",
    submitSuccessMessage: "Your request has been sent. Our team will contact you shortly with a detailed quote.",
    contactSalesLabel: "Contact Sales",
    contactSalesPromptTitle: "Choose a contact option",
    contactSalesPromptSubtitle: "How would you like to connect with our sales team?",
    contactByEmailLabel: "Email",
    contactByWhatsAppLabel: "WhatsApp",
    cancelContactOptionLabel: "Cancel",
    contactSalesFormTitle: "Email Sales Team",
    contactSalesFormSubtitle: "Share your details and purpose, then submit.",
    addressLabel: "Address",
    purposeLabel: "Purpose of Contact",
    contactSalesFormSubmitLabel: "Send Details",
    contactSalesFormSubmittingLabel: "Sending...",
    contactSalesFormRequiredMessage: "Please fill all contact form fields.",
    contactSalesFormInvalidEmailMessage: "Please enter a valid email for contact form.",
    contactSalesFormSubmitErrorMessage: "Unable to send details right now. Please try again.",
    contactSalesFormSuccessMessage: "Details sent to team. Reach you soon.",
    contactSalesSmtpMissingHint:
      "Email delivery is not configured on server. Please ask admin to set contact-sales email settings in server .env.",
    contactSalesDeliveryFailedHint:
      "Email delivery failed. Please try again in a few minutes or use WhatsApp.",
    closeLabel: "Close",
  },
  it: {
    carouselTitle: "Servizi in Evidenza",
    carouselPrev: "Slide precedente",
    carouselNext: "Slide successiva",
    title: "Catalogo Servizi",
    subtitle:
      "Esplora servizi software, consulenza elettrica e graphic design con fasce prezzo trasparenti e delivery professionale.",
    searchPlaceholder: "Cerca servizi, parole chiave o deliverable...",
    filters: {
      all: "Tutti i Servizi",
      software: "Soluzioni Software",
      electrical: "Consulenza Elettrica",
      design: "Graphic Design",
    },
    resultsLabel: "risultati trovati",
    quoteTitle: "Preventivo Stimato",
    quoteCta: "Richiedi Preventivo",
    visitCta: "Visita",
    noResults: "Nessun servizio trovato. Prova con un'altra parola chiave o filtro.",
    modalTitle: "Richiedi Preventivo",
    modalSubtitle: "Condividi i tuoi requisiti e ti invieremo un preventivo su misura.",
    packageBuilderTitle: "Crea il tuo pacchetto sito web",
    websiteTypeLabel: "Tipo di sito web",
    pagesLabel: "Pagine",
    addOnsLabel: "Extra",
    baseLabel: "Base",
    pagesCostLabel: "Pagine",
    addOnsCostLabel: "Extra",
    totalPriceLabel: "Prezzo totale",
    deliveryLabel: "Consegna",
    daysLabel: "giorni",
    noneLabel: "Nessuno",
    selectedService: "Servizio Selezionato",
    estimatedRange: "Fascia Stimata",
    nameLabel: "Nome Completo",
    phoneLabel: "Numero di Telefono",
    emailLabel: "Email",
    companyLabel: "Azienda (Opzionale)",
    messageLabel: "Requisiti",
    messagePlaceholder:
      "Descrivi obiettivi, tempistiche e requisiti tecnici/grafici...",
    submitLabel: "Invia Richiesta",
    submittingLabel: "Invio in corso...",
    requiredMessage: "Nome, telefono ed email sono obbligatori.",
    invalidEmailMessage: "Inserisci un indirizzo email valido.",
    submitErrorMessage: "Invio non riuscito al momento. Riprova tra poco.",
    submitSuccessMessage:
      "La tua richiesta e stata inviata. Il nostro team ti contattera presto con un preventivo dettagliato.",
    contactSalesLabel: "Contatta il Team Sales",
    contactSalesPromptTitle: "Scegli un'opzione di contatto",
    contactSalesPromptSubtitle: "Come vuoi contattare il nostro team sales?",
    contactByEmailLabel: "Email",
    contactByWhatsAppLabel: "WhatsApp",
    cancelContactOptionLabel: "Annulla",
    contactSalesFormTitle: "Invia Email al Team Sales",
    contactSalesFormSubtitle: "Condividi i tuoi dati e il motivo del contatto, poi invia.",
    addressLabel: "Indirizzo",
    purposeLabel: "Motivo del Contatto",
    contactSalesFormSubmitLabel: "Invia Dettagli",
    contactSalesFormSubmittingLabel: "Invio in corso...",
    contactSalesFormRequiredMessage: "Compila tutti i campi del modulo di contatto.",
    contactSalesFormInvalidEmailMessage: "Inserisci un'email valida per il modulo di contatto.",
    contactSalesFormSubmitErrorMessage: "Impossibile inviare i dettagli ora. Riprova tra poco.",
    contactSalesFormSuccessMessage: "Dettagli inviati al team. Ti contatteremo presto.",
    contactSalesSmtpMissingHint:
      "L'invio email non e configurato sul server. Chiedi all'admin di impostare i parametri email in server .env.",
    contactSalesDeliveryFailedHint:
      "Consegna email non riuscita. Riprova tra qualche minuto oppure usa WhatsApp.",
    closeLabel: "Chiudi",
  },
};

const CATEGORY_META = {
  software: {
    chipClass: "border-cyan-300 bg-cyan-100 text-cyan-700",
  },
  electrical: {
    chipClass: "border-amber-300 bg-amber-100 text-amber-700",
  },
  design: {
    chipClass: "border-fuchsia-300 bg-fuchsia-100 text-fuchsia-700",
  },
};

const CARD_THEMES = [
  {
    shell: "border-cyan-200/90 bg-cyan-50/78 hover:border-cyan-300/90 hover:shadow-[0_26px_54px_-26px_rgba(8,145,178,0.55)]",
    accent: "from-cyan-400 via-sky-400 to-blue-400",
    quoteBox: "border-cyan-200 bg-cyan-50",
    quoteText: "text-cyan-700",
    tag: "border-cyan-200 bg-cyan-100/70 text-cyan-700",
    cta: "border-cyan-300 bg-cyan-100 text-cyan-700 hover:border-cyan-400 hover:bg-cyan-200 focus:ring-cyan-300",
  },
  {
    shell: "border-emerald-200/90 bg-emerald-50/78 hover:border-emerald-300/90 hover:shadow-[0_26px_54px_-26px_rgba(5,150,105,0.55)]",
    accent: "from-emerald-400 via-teal-400 to-cyan-400",
    quoteBox: "border-emerald-200 bg-emerald-50",
    quoteText: "text-emerald-700",
    tag: "border-emerald-200 bg-emerald-100/70 text-emerald-700",
    cta: "border-emerald-300 bg-emerald-100 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-200 focus:ring-emerald-300",
  },
  {
    shell: "border-violet-200/90 bg-violet-50/78 hover:border-violet-300/90 hover:shadow-[0_26px_54px_-26px_rgba(124,58,237,0.45)]",
    accent: "from-violet-400 via-fuchsia-400 to-indigo-400",
    quoteBox: "border-violet-200 bg-violet-50",
    quoteText: "text-violet-700",
    tag: "border-violet-200 bg-violet-100/70 text-violet-700",
    cta: "border-violet-300 bg-violet-100 text-violet-700 hover:border-violet-400 hover:bg-violet-200 focus:ring-violet-300",
  },
  {
    shell: "border-amber-200/90 bg-amber-50/80 hover:border-amber-300/90 hover:shadow-[0_26px_54px_-26px_rgba(217,119,6,0.52)]",
    accent: "from-amber-400 via-orange-400 to-rose-400",
    quoteBox: "border-amber-200 bg-amber-50",
    quoteText: "text-amber-700",
    tag: "border-amber-200 bg-amber-100/70 text-amber-700",
    cta: "border-amber-300 bg-amber-100 text-amber-700 hover:border-amber-400 hover:bg-amber-200 focus:ring-amber-300",
  },
  {
    shell: "border-rose-200/90 bg-rose-50/80 hover:border-rose-300/90 hover:shadow-[0_26px_54px_-26px_rgba(225,29,72,0.46)]",
    accent: "from-rose-400 via-pink-400 to-fuchsia-400",
    quoteBox: "border-rose-200 bg-rose-50",
    quoteText: "text-rose-700",
    tag: "border-rose-200 bg-rose-100/70 text-rose-700",
    cta: "border-rose-300 bg-rose-100 text-rose-700 hover:border-rose-400 hover:bg-rose-200 focus:ring-rose-300",
  },
  {
    shell: "border-sky-200/90 bg-sky-50/80 hover:border-sky-300/90 hover:shadow-[0_26px_54px_-26px_rgba(2,132,199,0.52)]",
    accent: "from-sky-400 via-cyan-400 to-indigo-400",
    quoteBox: "border-sky-200 bg-sky-50",
    quoteText: "text-sky-700",
    tag: "border-sky-200 bg-sky-100/70 text-sky-700",
    cta: "border-sky-300 bg-sky-100 text-sky-700 hover:border-sky-400 hover:bg-sky-200 focus:ring-sky-300",
  },
];

const SERVICES = [
  {
    id: "website-design-dev",
    category: "software",
    title: {
      en: "Website Design and Development",
      it: "Progettazione e Sviluppo Siti Web",
    },
    description: {
      en: "Business websites and landing pages with responsive UI, performance optimization, and conversion-focused structure.",
      it: "Siti aziendali e landing page con UI responsive, ottimizzazione performance e struttura orientata alle conversioni.",
    },
    quote: {
      en: "EUR 800 - EUR 2,500",
      it: "EUR 800 - EUR 2.500",
    },
    tags: ["website", "responsive", "ui", "ux", "landing page"],
  },
  {
    id: "seo-optimization",
    category: "software",
    title: {
      en: "SEO Audit and Optimization",
      it: "Audit e Ottimizzazione SEO",
    },
    description: {
      en: "On-page and technical SEO including keyword mapping, metadata strategy, speed tuning, and ranking improvements.",
      it: "SEO on-page e tecnica con keyword mapping, strategia metadata, speed tuning e miglioramento ranking.",
    },
    quote: {
      en: "EUR 300 - EUR 1,200",
      it: "EUR 300 - EUR 1.200",
    },
    tags: ["seo", "keywords", "metadata", "ranking", "search"],
  },
  {
    id: "domain-hosting-setup",
    category: "software",
    title: {
      en: "Domain, Hosting, and Deployment Setup",
      it: "Setup Dominio, Hosting e Deploy",
    },
    description: {
      en: "End-to-end setup for domain purchase, DNS configuration, SSL, hosting, and production deployment.",
      it: "Configurazione completa di dominio, DNS, SSL, hosting e deploy in produzione.",
    },
    quote: {
      en: "EUR 180 - EUR 650",
      it: "EUR 180 - EUR 650",
    },
    tags: ["domain", "hosting", "dns", "ssl", "deployment"],
  },
  {
    id: "load-calculation",
    category: "electrical",
    title: {
      en: "Electrical Load Calculation and Panel Planning",
      it: "Calcolo Carichi Elettrici e Pianificazione Quadri",
    },
    description: {
      en: "Detailed load schedule, feeder sizing, and distribution panel recommendations for commercial and industrial projects.",
      it: "Piano carichi dettagliato, dimensionamento linee e raccomandazioni quadri per progetti commerciali e industriali.",
    },
    quote: {
      en: "EUR 450 - EUR 1,800",
      it: "EUR 450 - EUR 1.800",
    },
    tags: ["electrical", "load", "panel", "distribution", "consulting"],
  },
  {
    id: "earthing-lightning",
    category: "electrical",
    title: {
      en: "Earthing and Lightning Protection Design",
      it: "Progettazione Messa a Terra e Protezione Fulmini",
    },
    description: {
      en: "Grounding and lightning protection design with compliance-focused calculations and site recommendations.",
      it: "Progettazione impianto di terra e protezione fulmini con calcoli tecnici e linee guida di conformita.",
    },
    quote: {
      en: "EUR 500 - EUR 2,200",
      it: "EUR 500 - EUR 2.200",
    },
    tags: ["earthing", "lightning", "safety", "site audit", "design"],
  },
  {
    id: "solar-feasibility",
    category: "electrical",
    title: {
      en: "Solar PV Feasibility and Sizing",
      it: "Studio Fattibilita e Dimensionamento Fotovoltaico",
    },
    description: {
      en: "Solar feasibility reports including consumption analysis, capacity sizing, and projected ROI for installations.",
      it: "Studio fotovoltaico con analisi consumi, dimensionamento impianto e stima ROI dell'investimento.",
    },
    quote: {
      en: "EUR 350 - EUR 1,600",
      it: "EUR 350 - EUR 1.600",
    },
    tags: ["solar", "pv", "energy", "roi", "sizing"],
  },
  {
    id: "flyer-design",
    category: "design",
    title: {
      en: "Flyer and Poster Design",
      it: "Design Flyer e Poster",
    },
    description: {
      en: "Marketing flyers and promotional posters with print-ready layout, branding alignment, and campaign messaging.",
      it: "Flyer marketing e poster promozionali con layout pronto stampa, coerenza brand e messaggi di campagna.",
    },
    quote: {
      en: "EUR 90 - EUR 350",
      it: "EUR 90 - EUR 350",
    },
    tags: ["flyer", "poster", "print", "campaign", "branding"],
  },
  {
    id: "visiting-card-design",
    category: "design",
    title: {
      en: "Visiting Card and Stationery Design",
      it: "Design Biglietti da Visita e Stationery",
    },
    description: {
      en: "Professional business card systems with brand-consistent layouts and production-ready export formats.",
      it: "Biglietti da visita professionali con layout coerente al brand e file pronti per la produzione.",
    },
    quote: {
      en: "EUR 70 - EUR 250",
      it: "EUR 70 - EUR 250",
    },
    tags: ["visiting card", "business card", "stationery", "branding"],
  },
  {
    id: "photoshop-editing",
    category: "design",
    title: {
      en: "Photoshop Editing and Retouching",
      it: "Editing e Ritocco Photoshop",
    },
    description: {
      en: "Photo enhancement, background cleanup, color correction, and ad-ready compositions for digital campaigns.",
      it: "Miglioramento immagini, pulizia sfondi, correzione colori e composizioni pronte per campagne digitali.",
    },
    quote: {
      en: "EUR 40 - EUR 300",
      it: "EUR 40 - EUR 300",
    },
    tags: ["photoshop", "retouch", "editing", "creative", "ads"],
  },
];

const CAROUSEL_SLIDES = [
  {
    id: "service-showcase-1",
    image: "/images/services-carousel/Gemini_Generated_Image_2e33062e33062e33.png",
    animationClass: "anim-slide-up",
    alt: {
      en: "Service showcase slide 1",
      it: "Vetrina servizi slide 1",
    },
  },
  {
    id: "service-showcase-2",
    image: "/images/services-carousel/Gemini_Generated_Image_7vlx7y7vlx7y7vlx.png",
    animationClass: "anim-slide-left",
    alt: {
      en: "Service showcase slide 2",
      it: "Vetrina servizi slide 2",
    },
  },
  {
    id: "service-showcase-3",
    image: "/images/services-carousel/Gemini_Generated_Image_a5wzlta5wzlta5wz.png",
    animationClass: "anim-slide-right",
    alt: {
      en: "Service showcase slide 3",
      it: "Vetrina servizi slide 3",
    },
  },
  {
    id: "service-showcase-4",
    image: "/images/services-carousel/Gemini_Generated_Image_ci6vonci6vonci6v.png",
    animationClass: "anim-zoom-in",
    alt: {
      en: "Service showcase slide 4",
      it: "Vetrina servizi slide 4",
    },
  },
  {
    id: "service-showcase-5",
    image: "/images/services-carousel/Gemini_Generated_Image_ckgw29ckgw29ckgw.png",
    animationClass: "anim-zoom-out",
    alt: {
      en: "Service showcase slide 5",
      it: "Vetrina servizi slide 5",
    },
  },
  {
    id: "service-showcase-6",
    image: "/images/services-carousel/Gemini_Generated_Image_ga6hexga6hexga6h.png",
    animationClass: "anim-rotate-in",
    alt: {
      en: "Service showcase slide 6",
      it: "Vetrina servizi slide 6",
    },
  },
  {
    id: "service-showcase-7",
    image: "/images/services-carousel/Gemini_Generated_Image_nckktcnckktcnckk.png",
    animationClass: "anim-flip-in",
    alt: {
      en: "Service showcase slide 7",
      it: "Vetrina servizi slide 7",
    },
  },
  {
    id: "service-showcase-8",
    image: "/images/services-carousel/Gemini_Generated_Image_qwpnsaqwpnsaqwpn.png",
    animationClass: "anim-diagonal-right",
    alt: {
      en: "Service showcase slide 8",
      it: "Vetrina servizi slide 8",
    },
  },
  {
    id: "service-showcase-9",
    image: "/images/services-carousel/Gemini_Generated_Image_ry5dwkry5dwkry5d.png",
    animationClass: "anim-diagonal-left",
    alt: {
      en: "Service showcase slide 9",
      it: "Vetrina servizi slide 9",
    },
  },
  {
    id: "service-showcase-10",
    image: "/images/services-carousel/Gemini_Generated_Image_xyso3kxyso3kxyso.png",
    animationClass: "anim-swing-in",
    alt: {
      en: "Service showcase slide 10",
      it: "Vetrina servizi slide 10",
    },
  },
];

const INITIAL_FORM_STATE = {
  name: "",
  phone: "",
  email: "",
  company: "",
  message: "",
};

const INITIAL_CONTACT_SALES_FORM_STATE = {
  name: "",
  email: "",
  phone: "",
  address: "",
  purpose: "",
};

const WEBSITE_PACKAGE_SERVICE_ID = "website-design-dev";
const CONTACT_SALES_EMAIL = "asiduogroup@gmail.com";
const CONTACT_SALES_WHATSAPP_PHONE = "393248872715";

const WEBSITE_TYPE_OPTIONS = [
  {
    value: "static",
    basePrice: 800,
    deliveryDays: 5,
    label: {
      en: "Static",
      it: "Statico",
    },
  },
  {
    value: "dynamic",
    basePrice: 1500,
    deliveryDays: 10,
    label: {
      en: "Dynamic",
      it: "Dinamico",
    },
  },
  {
    value: "portfolio",
    basePrice: 1200,
    deliveryDays: 8,
    label: {
      en: "Portfolio",
      it: "Portfolio",
    },
  },
  {
    value: "redesign",
    basePrice: 1000,
    deliveryDays: 7,
    label: {
      en: "Website Redesign",
      it: "Restyling Sito Web",
    },
  },
  {
    value: "ecommerce",
    basePrice: 2500,
    deliveryDays: 15,
    label: {
      en: "E-commerce",
      it: "E-commerce",
    },
  },
];

const WEBSITE_PAGE_OPTIONS = [
  {
    value: "1-5",
    additionalPrice: 0,
    label: {
      en: "1-5 pages",
      it: "1-5 pagine",
    },
  },
  {
    value: "5-10",
    additionalPrice: 250,
    label: {
      en: "5-10 pages",
      it: "5-10 pagine",
    },
  },
];

const WEBSITE_ADDON_OPTIONS = [
  {
    key: "seo",
    price: 200,
    label: {
      en: "SEO",
      it: "SEO",
    },
  },
  {
    key: "hosting",
    price: 100,
    label: {
      en: "Hosting",
      it: "Hosting",
    },
  },
  {
    key: "maintenance",
    price: 150,
    label: {
      en: "Maintenance",
      it: "Manutenzione",
    },
  },
];

const normalizeLookupToken = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

const resolveWebsiteTypeOption = (rawValue) => {
  const normalizedRawValue = normalizeLookupToken(rawValue);

  return (
    WEBSITE_TYPE_OPTIONS.find((option) => {
      const valueToken = normalizeLookupToken(option.value);
      const englishLabelToken = normalizeLookupToken(option.label.en);
      const italianLabelToken = normalizeLookupToken(option.label.it);

      return (
        normalizedRawValue === valueToken ||
        normalizedRawValue === englishLabelToken ||
        normalizedRawValue === italianLabelToken ||
        normalizedRawValue.includes(valueToken) ||
        normalizedRawValue.includes(englishLabelToken) ||
        normalizedRawValue.includes(italianLabelToken)
      );
    }) || WEBSITE_TYPE_OPTIONS[0]
  );
};

const resolveWebsitePageOption = (rawValue) => {
  const normalizedRawValue = normalizeLookupToken(rawValue);

  return (
    WEBSITE_PAGE_OPTIONS.find((option) => {
      const valueToken = normalizeLookupToken(option.value);
      const englishLabelToken = normalizeLookupToken(option.label.en);
      const italianLabelToken = normalizeLookupToken(option.label.it);

      return (
        normalizedRawValue === valueToken ||
        normalizedRawValue === englishLabelToken ||
        normalizedRawValue === italianLabelToken ||
        normalizedRawValue.includes(valueToken) ||
        normalizedRawValue.includes(englishLabelToken) ||
        normalizedRawValue.includes(italianLabelToken)
      );
    }) || WEBSITE_PAGE_OPTIONS[0]
  );
};

const createInitialWebsitePackageState = () => ({
  websiteType: "static",
  pages: "1-5",
  addons: {
    seo: false,
    hosting: false,
    maintenance: false,
  },
});

const calculateWebsitePackageMetrics = (packageState) => {
  const selectedWebsiteType = resolveWebsiteTypeOption(packageState.websiteType);
  const selectedWebsitePageRange = resolveWebsitePageOption(packageState.pages);
  const selectedWebsiteAddOns = WEBSITE_ADDON_OPTIONS.filter((addon) => Boolean(packageState.addons?.[addon.key]));
  const selectedWebsitePageExtraPrice = Number(selectedWebsitePageRange.additionalPrice) || 0;
  const selectedWebsiteAddOnsTotalPrice = selectedWebsiteAddOns.reduce(
    (total, addon) => total + (Number(addon.price) || 0),
    0
  );
  const selectedWebsiteBasePrice = Number(selectedWebsiteType.basePrice) || 0;
  const selectedWebsiteDeliveryDays = Number(selectedWebsiteType.deliveryDays) || 0;

  return {
    selectedWebsiteType,
    selectedWebsitePageRange,
    selectedWebsiteAddOns,
    selectedWebsitePageExtraPrice,
    selectedWebsiteAddOnsTotalPrice,
    selectedWebsiteTotalPrice:
      selectedWebsiteBasePrice + selectedWebsitePageExtraPrice + selectedWebsiteAddOnsTotalPrice,
    selectedWebsiteDeliveryDays,
  };
};

const headingFont = {
  fontFamily: '"Cambria", "Palatino Linotype", "Times New Roman", serif',
};

const bodyFont = {
  fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
};

export default function ServicesCatalogPage({ locale = "en" }) {
  const normalizedLocale = locale === "it" ? "it" : "en";
  const text = COPY[normalizedLocale];
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [carouselAspectRatio, setCarouselAspectRatio] = useState(16 / 9);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formError, setFormError] = useState("");
  const [submitState, setSubmitState] = useState("idle");
  const [websitePackage, setWebsitePackage] = useState(() => createInitialWebsitePackageState());
  const [isContactSalesChooserOpen, setIsContactSalesChooserOpen] = useState(false);
  const [isContactSalesEmailFormOpen, setIsContactSalesEmailFormOpen] = useState(false);
  const [contactSalesFormData, setContactSalesFormData] = useState(INITIAL_CONTACT_SALES_FORM_STATE);
  const [contactSalesFormError, setContactSalesFormError] = useState("");
  const [contactSalesFormSubmitState, setContactSalesFormSubmitState] = useState("idle");
  const [contactSalesChooserPosition, setContactSalesChooserPosition] = useState({ top: 120, left: 20 });

  useEffect(() => {
    if (!isQuoteModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isQuoteModalOpen]);

  const filterChips = [
    { key: "all", label: text.filters.all },
    { key: "software", label: text.filters.software },
    { key: "electrical", label: text.filters.electrical },
    { key: "design", label: text.filters.design },
  ];

  const filteredServices = useMemo(() => {
    const loweredQuery = query.trim().toLowerCase();

    return SERVICES.filter((service) => {
      if (activeFilter !== "all" && service.category !== activeFilter) {
        return false;
      }

      if (!loweredQuery) {
        return true;
      }

      const localizedTitle = service.title[normalizedLocale].toLowerCase();
      const localizedDescription = service.description[normalizedLocale].toLowerCase();
      const tagText = service.tags.join(" ").toLowerCase();

      return (
        localizedTitle.includes(loweredQuery) ||
        localizedDescription.includes(loweredQuery) ||
        tagText.includes(loweredQuery)
      );
    });
  }, [activeFilter, normalizedLocale, query]);

  const carouselSlides = useMemo(
    () =>
      CAROUSEL_SLIDES.map((slide) => ({
        ...slide,
        localizedAlt: slide.alt[normalizedLocale],
      })),
    [normalizedLocale]
  );

  useEffect(() => {
    setActiveSlideIndex(0);
  }, [normalizedLocale]);

  useEffect(() => {
    const rotationTimer = window.setInterval(() => {
      setActiveSlideIndex((previousIndex) =>
        previousIndex >= carouselSlides.length - 1 ? 0 : previousIndex + 1
      );
    }, 5200);

    return () => window.clearInterval(rotationTimer);
  }, [carouselSlides.length]);

  useEffect(() => {
    const activeSlide = carouselSlides[activeSlideIndex];
    if (!activeSlide?.image) {
      return undefined;
    }

    let isCancelled = false;
    const probeImage = new window.Image();
    probeImage.src = activeSlide.image;
    probeImage.onload = () => {
      if (isCancelled) {
        return;
      }

      if (probeImage.naturalWidth > 0 && probeImage.naturalHeight > 0) {
        setCarouselAspectRatio(probeImage.naturalWidth / probeImage.naturalHeight);
      }
    };

    return () => {
      isCancelled = true;
    };
  }, [activeSlideIndex, carouselSlides]);

  const formatEuro = (amount) =>
    `\u20AC${amount.toLocaleString(normalizedLocale === "it" ? "it-IT" : "en-US")}`;

  const contactSalesWhatsAppHref = useMemo(() => {
    const message =
      normalizedLocale === "it"
        ? "Ciao Asiduo Solutions, vorrei parlare con il team sales."
        : "Hello Asiduo Solutions, I would like to speak with your sales team.";

    return `https://wa.me/${CONTACT_SALES_WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  }, [normalizedLocale]);

  const isWebsitePackageService = selectedService?.id === WEBSITE_PACKAGE_SERVICE_ID;

  const {
    selectedWebsiteType,
    selectedWebsitePageRange,
    selectedWebsiteAddOns,
    selectedWebsitePageExtraPrice,
    selectedWebsiteAddOnsTotalPrice,
    selectedWebsiteTotalPrice,
    selectedWebsiteDeliveryDays,
  } = useMemo(() => calculateWebsitePackageMetrics(websitePackage), [websitePackage]);

  const selectedOptionsSummary = useMemo(() => {
    if (!isWebsitePackageService) {
      return "";
    }

    const addOnsText =
      selectedWebsiteAddOns.length > 0
        ? selectedWebsiteAddOns.map((addon) => addon.label[normalizedLocale]).join(", ")
        : text.noneLabel;

    return [
      `${text.websiteTypeLabel}: ${selectedWebsiteType.label[normalizedLocale]}`,
      `${text.pagesLabel}: ${selectedWebsitePageRange.label[normalizedLocale]}${
        selectedWebsitePageExtraPrice > 0 ? ` (+${formatEuro(selectedWebsitePageExtraPrice)})` : ""
      }`,
      `${text.addOnsLabel}: ${addOnsText}`,
    ].join(" | ");
  }, [
    isWebsitePackageService,
    normalizedLocale,
    selectedWebsiteAddOns,
    selectedWebsitePageExtraPrice,
    selectedWebsitePageRange.label,
    selectedWebsiteType.label,
    text.addOnsLabel,
    text.noneLabel,
    text.pagesLabel,
    text.websiteTypeLabel,
  ]);

  const selectedPriceBreakdownLabel = `${text.baseLabel} ${formatEuro(
    selectedWebsiteType.basePrice
  )} + ${text.pagesCostLabel} ${formatEuro(selectedWebsitePageExtraPrice)} + ${
    text.addOnsCostLabel
  } ${formatEuro(selectedWebsiteAddOnsTotalPrice)}`;

  const openQuoteModal = (service) => {
    setSelectedService(service);
    setIsQuoteModalOpen(true);
    setFormError("");
    setSubmitState("idle");
    setIsContactSalesChooserOpen(false);
    setIsContactSalesEmailFormOpen(false);
    setContactSalesFormError("");
    setContactSalesFormSubmitState("idle");
    setContactSalesFormData(INITIAL_CONTACT_SALES_FORM_STATE);
    setWebsitePackage(createInitialWebsitePackageState());
    setFormData({
      ...INITIAL_FORM_STATE,
      message:
        normalizedLocale === "it"
          ? `Vorrei un preventivo per ${service.title.it}.`
          : `I would like a quotation for ${service.title.en}.`,
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const quoteServiceId = searchParams.get("quote");

    if (!quoteServiceId) {
      return;
    }

    const matchingService = SERVICES.find((service) => service.id === quoteServiceId);
    if (!matchingService) {
      return;
    }

    openQuoteModal(matchingService);

    searchParams.delete("quote");
    const remainingQuery = searchParams.toString();
    const targetUrl = remainingQuery ? `${location.pathname}?${remainingQuery}` : location.pathname;
    navigate(targetUrl, { replace: true });
  }, [location.pathname, location.search, navigate]);

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedService(null);
    setFormError("");
    setSubmitState("idle");
    setIsContactSalesChooserOpen(false);
    setIsContactSalesEmailFormOpen(false);
    setContactSalesFormError("");
    setContactSalesFormSubmitState("idle");
    setContactSalesFormData(INITIAL_CONTACT_SALES_FORM_STATE);
    setWebsitePackage(createInitialWebsitePackageState());
    setFormData(INITIAL_FORM_STATE);
  };

  const openContactSalesChooser = (event) => {
    const triggerRect = event?.currentTarget?.getBoundingClientRect?.();
    const chooserWidth = 360;
    const chooserHeight = 220;
    const safeMargin = 12;

    let nextLeft = triggerRect
      ? triggerRect.left
      : Math.round(window.innerWidth / 2 - chooserWidth / 2);
    nextLeft = Math.max(safeMargin, Math.min(nextLeft, window.innerWidth - chooserWidth - safeMargin));

    let nextTop = triggerRect ? triggerRect.bottom + 10 : 120;
    if (nextTop + chooserHeight > window.innerHeight - safeMargin && triggerRect) {
      nextTop = Math.max(safeMargin, triggerRect.top - chooserHeight - 10);
    }

    setContactSalesChooserPosition({
      top: nextTop,
      left: nextLeft,
    });

    setIsContactSalesEmailFormOpen(false);
    setContactSalesFormError("");
    setContactSalesFormSubmitState("idle");
    setIsContactSalesChooserOpen(true);
  };

  const closeContactSalesChooser = () => {
    setIsContactSalesChooserOpen(false);
  };

  const openContactSalesEmailForm = () => {
    setIsContactSalesChooserOpen(false);
    setContactSalesFormError("");
    setContactSalesFormSubmitState("idle");
    setIsContactSalesEmailFormOpen(true);
  };

  const closeContactSalesEmailForm = () => {
    setIsContactSalesEmailFormOpen(false);
    setContactSalesFormError("");
    setContactSalesFormSubmitState("idle");
    setContactSalesFormData(INITIAL_CONTACT_SALES_FORM_STATE);
  };

  const handleContactSalesFormChange = (event) => {
    const { name, value } = event.target;
    setContactSalesFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleContactSalesEmailSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = contactSalesFormData.name.trim();
    const trimmedEmail = contactSalesFormData.email.trim().toLowerCase();
    const trimmedPhone = contactSalesFormData.phone.trim();
    const trimmedAddress = contactSalesFormData.address.trim();
    const trimmedPurpose = contactSalesFormData.purpose.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedAddress || !trimmedPurpose) {
      setContactSalesFormError(text.contactSalesFormRequiredMessage);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setContactSalesFormError(text.contactSalesFormInvalidEmailMessage);
      return;
    }

    setContactSalesFormError("");
    setContactSalesFormSubmitState("submitting");

    try {
      await axios.post(buildApiUrl("/api/contact-sales"), {
        targetEmail: CONTACT_SALES_EMAIL,
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        address: trimmedAddress,
        purpose: trimmedPurpose,
        locale: normalizedLocale,
      });

      setContactSalesFormSubmitState("success");
      setContactSalesFormData(INITIAL_CONTACT_SALES_FORM_STATE);
    } catch (error) {
      const apiCode = error.response?.data?.code;
      const apiError = error.response?.data?.error;
      if (apiCode === "CONTACT_SALES_EMAIL_NOT_CONFIGURED") {
        setContactSalesFormError(text.contactSalesSmtpMissingHint);
      } else if (apiCode === "CONTACT_SALES_EMAIL_DELIVERY_FAILED") {
        setContactSalesFormError(text.contactSalesDeliveryFailedHint);
      } else {
        setContactSalesFormError(apiError || text.contactSalesFormSubmitErrorMessage);
      }
      setContactSalesFormSubmitState("idle");
    }
  };

  const handleContactSalesRedirect = (channel) => {
    setIsContactSalesChooserOpen(false);

    if (channel === "email") {
      openContactSalesEmailForm();
      return;
    }

    window.open(contactSalesWhatsAppHref, "_blank", "noopener,noreferrer");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleWebsiteTypeChange = (event) => {
    const { value } = event.target;
    const resolvedWebsiteType = resolveWebsiteTypeOption(value);

    setWebsitePackage((previous) => ({
      ...previous,
      websiteType: resolvedWebsiteType.value,
    }));
  };

  const handleWebsitePagesChange = (event) => {
    const { value } = event.target;
    const resolvedPageRange = resolveWebsitePageOption(value);

    setWebsitePackage((previous) => ({
      ...previous,
      pages: resolvedPageRange.value,
    }));
  };

  const handleWebsiteAddOnChange = (event) => {
    const { name, checked } = event.target;
    setWebsitePackage((previous) => ({
      ...previous,
      addons: {
        ...previous.addons,
        [name]: checked,
      },
    }));
  };

  const handleQuoteSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();

    if (!trimmedName || !trimmedPhone || !trimmedEmail) {
      setFormError(text.requiredMessage);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setFormError(text.invalidEmailMessage);
      return;
    }

    if (!selectedService) {
      setFormError(text.submitErrorMessage);
      return;
    }

    setFormError("");
    setSubmitState("submitting");

    const currentTotalPriceLabel = formatEuro(selectedWebsiteTotalPrice);
    const currentDeliveryLabel = `${selectedWebsiteDeliveryDays} ${text.daysLabel}`;
    const pricingSummary =
      isWebsitePackageService &&
      `${selectedOptionsSummary} | ${text.totalPriceLabel}: ${currentTotalPriceLabel} | ${text.deliveryLabel}: ${currentDeliveryLabel}`;
    const combinedMessage = [
      "New Quote Request:",
      `Service: ${selectedService.title[normalizedLocale]}`,
      pricingSummary,
      formData.message.trim(),
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      await axios.post(buildApiUrl("/api/quotations"), {
        serviceId: selectedService.id,
        serviceName: selectedService.title[normalizedLocale],
        serviceCategory: selectedService.category,
        estimatedQuote: selectedService.quote[normalizedLocale],
        selectedOptions: selectedOptionsSummary,
        totalPrice: isWebsitePackageService ? currentTotalPriceLabel : "",
        deliveryTime: isWebsitePackageService ? currentDeliveryLabel : "",
        name: trimmedName,
        phone: trimmedPhone,
        email: trimmedEmail,
        company: formData.company.trim(),
        message: combinedMessage,
        locale: normalizedLocale,
      });

      setSubmitState("success");
    } catch (error) {
      const apiError = error.response?.data?.error;
      setFormError(apiError || text.submitErrorMessage);
      setSubmitState("idle");
    }
  };

  const goToPreviousSlide = () => {
    setActiveSlideIndex((previousIndex) =>
      previousIndex <= 0 ? carouselSlides.length - 1 : previousIndex - 1
    );
  };

  const goToNextSlide = () => {
    setActiveSlideIndex((previousIndex) =>
      previousIndex >= carouselSlides.length - 1 ? 0 : previousIndex + 1
    );
  };

  const handleVisitService = (service) => {
    const localePrefix = normalizedLocale === "it" ? "/it" : "";

    if (service.id === WEBSITE_PACKAGE_SERVICE_ID) {
      navigate(`${localePrefix}/website-design-development`);
      return;
    }

    const targetPath =
      service.category === "software"
        ? `${localePrefix}/software-solutions`
        : `${localePrefix}/contact`;

    navigate(targetPath);
  };

  return (
    <main
      translate="no"
      style={bodyFont}
      className="notranslate safe-mobile-padding relative isolate min-h-screen overflow-hidden bg-[linear-gradient(125deg,#f8fbff_0%,#eef4ff_46%,#f6f1ff_100%)] pb-16 pt-16 text-slate-900 sm:px-6 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 opacity-90 [background:radial-gradient(circle_at_12%_14%,rgba(14,165,233,0.2),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(99,102,241,0.16),transparent_32%),radial-gradient(circle_at_46%_92%,rgba(14,116,144,0.14),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(148,163,184,0.42)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.42)_1px,transparent_1px)] [background-size:46px_46px]" />
      <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-cyan-200/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-80 w-80 rounded-full bg-indigo-200/70 blur-3xl" />

      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <section
          className="service-bootstrap-shell mt-[30px] mb-6 overflow-hidden rounded-3xl border border-slate-200/85 bg-white/82 shadow-[0_20px_55px_-26px_rgba(30,64,175,0.42)] backdrop-blur-md sm:mb-8"
          aria-label={text.carouselTitle}
        >
          <div
            className="service-bootstrap-carousel carousel slide"
            style={{ aspectRatio: carouselAspectRatio }}
          >
            {carouselSlides.map((slide, index) => {
              const isActive = index === activeSlideIndex;

              return (
                <article
                  key={slide.id}
                  className={`service-bootstrap-item carousel-item ${slide.animationClass} ${
                    isActive ? "is-active active" : ""
                  }`}
                  aria-hidden={!isActive}
                >
                  <img
                    src={slide.image}
                    alt={slide.localizedAlt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="service-bootstrap-image"
                  />
                </article>
              );
            })}

            <button
              type="button"
              onClick={goToPreviousSlide}
              aria-label={text.carouselPrev}
              className="service-bootstrap-control carousel-control-prev prev"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <button
              type="button"
              onClick={goToNextSlide}
              aria-label={text.carouselNext}
              className="service-bootstrap-control carousel-control-next next"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>

            <div className="service-bootstrap-indicators carousel-indicators">
              {carouselSlides.map((slide, index) => (
                <button
                  key={`${slide.id}-indicator`}
                  type="button"
                  onClick={() => setActiveSlideIndex(index)}
                  aria-label={`${text.carouselTitle} ${index + 1}`}
                  className={`service-bootstrap-indicator ${
                    index === activeSlideIndex ? "is-active" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <header className="rounded-3xl border border-slate-200/85 bg-white/82 p-6 shadow-[0_18px_48px_-24px_rgba(30,64,175,0.35)] backdrop-blur-md sm:p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
            <label className="group relative block w-[230px] max-w-full sm:w-[250px] md:w-[270px]">
              <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-cyan-600">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={text.searchPlaceholder}
                className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-2.5 text-[13px] text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/80"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              {filterChips.map((chip) => {
                const isActive = activeFilter === chip.key;
                return (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={() => setActiveFilter(chip.key)}
                    className={`rounded-full border px-4 py-2 text-xs font-bold tracking-[0.05em] transition-all duration-300 sm:text-sm ${
                      isActive
                        ? "border-cyan-300 bg-cyan-100 text-cyan-700 shadow-[0_0_0_2px_rgba(34,211,238,0.2)]"
                        : "border-slate-200 bg-white text-slate-600 hover:border-cyan-200 hover:bg-cyan-50"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {filteredServices.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white/85 p-8 text-center text-slate-700 shadow-[0_10px_30px_-22px_rgba(30,41,59,0.45)]">
            {text.noResults}
          </div>
        ) : (
          <section className="mt-5 grid grid-cols-1 gap-4 [perspective:2200px] sm:grid-cols-2 xl:grid-cols-3">
            {filteredServices.map((service, index) => (
              (() => {
                const theme = CARD_THEMES[index % CARD_THEMES.length];

                return (
                  <article
                    key={service.id}
                    className={`service-card group relative overflow-hidden rounded-2xl border p-5 shadow-[0_16px_34px_-22px_rgba(30,41,59,0.45)] transform-gpu will-change-transform hover:z-20 ${theme.shell}`}
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.accent} opacity-90`} />

                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black tracking-[0.12em] uppercase sm:text-xs ${CATEGORY_META[service.category].chipClass}`}
                      >
                        {text.filters[service.category]}
                      </span>
                    </div>

                    <h3
                      style={headingFont}
                      className="mt-4 text-xl font-bold leading-snug text-slate-900"
                    >
                      {service.title[normalizedLocale]}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                      {service.description[normalizedLocale]}
                    </p>

                    <div className={`mt-4 rounded-xl border p-3 ${theme.quoteBox}`}>
                      <p className={`text-xs font-bold uppercase tracking-[0.1em] ${theme.quoteText}`}>
                        {text.quoteTitle}
                      </p>
                      <p className={`mt-1 text-base font-black ${theme.quoteText}`}>{service.quote[normalizedLocale]}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {service.tags.slice(0, 4).map((tag) => (
                        <span
                          key={`${service.id}-${tag}`}
                          className={`rounded-full border px-2.5 py-1 text-[11px] ${theme.tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => openQuoteModal(service)}
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black tracking-[0.05em] transition-all duration-300 focus:outline-none focus:ring-2 ${theme.cta}`}
                      >
                        <FontAwesomeIcon icon={faFileInvoiceDollar} />
                        {text.quoteCta}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleVisitService(service)}
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black tracking-[0.05em] transition-all duration-300 focus:outline-none focus:ring-2 ${theme.cta}`}
                      >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        {text.visitCta}
                      </button>
                    </div>
                  </article>
                );
              })()
            ))}
          </section>
        )}
      </section>

      {isQuoteModalOpen &&
        selectedService &&
        createPortal(
        <div
          className="quote-overlay fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-stone-900/68 p-2 backdrop-blur-[2px] sm:p-6"
          onClick={closeQuoteModal}
        >
          <section
            className="quote-panel relative w-full max-w-2xl max-h-[calc(100vh-1rem)] overflow-y-auto rounded-3xl border border-stone-200/90 bg-white p-5 shadow-[0_30px_80px_-24px_rgba(41,37,36,0.48)] sm:max-h-[calc(100vh-3rem)] sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-amber-200/45 blur-3xl animate-quoteFloatOne" />
              <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-orange-200/45 blur-3xl animate-quoteFloatTwo" />
              <div className="absolute inset-0 bg-[linear-gradient(155deg,rgba(255,252,247,0.95)_0%,rgba(255,247,237,0.96)_58%,rgba(255,251,235,0.95)_100%)]" />
              <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(100,116,139,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.35)_1px,transparent_1px)] [background-size:32px_32px]" />
            </div>

            <div className="relative z-10 mb-4 flex items-start justify-between gap-3">
              <div>
                <h2
                  style={headingFont}
                  className="text-2xl font-extrabold text-slate-900 sm:text-3xl"
                >
                  {text.modalTitle}
                </h2>
                <p className="mt-1 text-sm text-slate-600 sm:text-base">{text.modalSubtitle}</p>
              </div>

              <button
                type="button"
                onClick={closeQuoteModal}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-600 transition-colors hover:bg-amber-50"
                aria-label={text.closeLabel}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="relative z-10 rounded-2xl border border-amber-200 bg-amber-50/85 px-4 py-3 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-stone-600">{text.selectedService}</p>
              <p className="mt-1 text-lg font-extrabold text-slate-900">{selectedService.title[normalizedLocale]}</p>
              <p className="mt-1 text-sm font-semibold text-amber-700">
                {text.estimatedRange}: {selectedService.quote[normalizedLocale]}
              </p>
            </div>

            {submitState === "success" ? (
              <div className="relative z-10 mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/95 p-5 text-emerald-800">
                <div className="flex items-center gap-2 text-lg font-black">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <span>{text.submitSuccessMessage}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={closeQuoteModal}
                    className="rounded-full border border-emerald-300 bg-emerald-100 px-5 py-2 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-200"
                  >
                    {text.closeLabel}
                  </button>
                  <button
                    type="button"
                    onClick={openContactSalesChooser}
                    className="inline-flex items-center rounded-full border border-cyan-300 bg-cyan-100 px-5 py-2 text-sm font-bold text-cyan-800 transition-colors hover:bg-cyan-200"
                  >
                    {text.contactSalesLabel}
                  </button>
                </div>
              </div>
            ) : (
              <form className="relative z-10 mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleQuoteSubmit}>
                {isWebsitePackageService && (
                  <section
                    translate="no"
                    className="notranslate sm:col-span-2 rounded-2xl border border-amber-200/90 bg-white/80 p-4 shadow-sm"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-amber-700">
                      {text.packageBuilderTitle}
                    </p>

                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <label className="text-sm font-semibold text-slate-800">
                        {text.websiteTypeLabel}
                        <select
                          name="websiteType"
                          value={websitePackage.websiteType}
                          onChange={handleWebsiteTypeChange}
                          className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-200/70"
                        >
                          {WEBSITE_TYPE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label[normalizedLocale]} ({formatEuro(option.basePrice)})
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="text-sm font-semibold text-slate-800">
                        {text.pagesLabel}
                        <select
                          name="pages"
                          value={websitePackage.pages}
                          onChange={handleWebsitePagesChange}
                          className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-200/70"
                        >
                          {WEBSITE_PAGE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label[normalizedLocale]}
                              {option.additionalPrice > 0 ? ` (+${formatEuro(option.additionalPrice)})` : ""}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <fieldset className="mt-4">
                      <legend className="text-sm font-semibold text-slate-800">{text.addOnsLabel}</legend>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {WEBSITE_ADDON_OPTIONS.map((addon) => (
                          <label
                            key={addon.key}
                            className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/75 px-3 py-1.5 text-xs font-semibold text-amber-800"
                          >
                            <input
                              type="checkbox"
                              name={addon.key}
                              checked={websitePackage.addons[addon.key]}
                              onChange={handleWebsiteAddOnChange}
                              className="h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-400"
                            />
                            <span>
                              {addon.label[normalizedLocale]} (+{formatEuro(addon.price)})
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div
                      key={`${selectedWebsiteTotalPrice}-${selectedWebsiteDeliveryDays}-${selectedWebsitePageExtraPrice}-${selectedWebsiteAddOnsTotalPrice}`}
                      translate="no"
                      className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3"
                    >
                      <p className="text-sm font-black text-amber-800">
                        {text.totalPriceLabel}: {formatEuro(selectedWebsiteTotalPrice)}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-stone-600">
                        {selectedPriceBreakdownLabel}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-stone-700">
                        {text.deliveryLabel}: {selectedWebsiteDeliveryDays} {text.daysLabel}
                      </p>
                    </div>
                  </section>
                )}

                <input type="hidden" name="selectedOptions" value={selectedOptionsSummary} readOnly />
                <input type="hidden" name="totalPrice" value={formatEuro(selectedWebsiteTotalPrice)} readOnly />

                <label className="text-sm font-semibold text-slate-800">
                  {text.nameLabel}
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-200/70"
                    required
                  />
                </label>

                <label className="text-sm font-semibold text-slate-800">
                  {text.phoneLabel}
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-200/70"
                    required
                  />
                </label>

                <label className="text-sm font-semibold text-slate-800">
                  {text.emailLabel}
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-200/70"
                    required
                  />
                </label>

                <label className="text-sm font-semibold text-slate-800">
                  {text.companyLabel}
                  <input
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleFormChange}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-200/70"
                  />
                </label>

                <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
                  {text.messageLabel}
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder={text.messagePlaceholder}
                    className="mt-1 min-h-[110px] w-full rounded-2xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-200/70"
                  />
                </label>

                {formError && (
                  <p className="sm:col-span-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="sm:col-span-2 justify-self-center inline-flex items-center justify-center gap-2 rounded-full border border-amber-500/70 bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-black tracking-[0.05em] !text-white shadow-[0_10px_26px_-14px_rgba(245,158,11,0.8)] transition-all duration-300 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitState === "submitting" ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin !text-white" />
                      <span className="!text-white">{text.submittingLabel}</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} className="!text-white" />
                      <span className="!text-white">{text.submitLabel}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={openContactSalesChooser}
                  className="sm:col-span-2 justify-self-center inline-flex items-center justify-center rounded-full border border-cyan-300 bg-cyan-100 px-6 py-3 text-sm font-black tracking-[0.05em] text-cyan-800 transition-colors hover:bg-cyan-200"
                >
                  {text.contactSalesLabel}
                </button>
              </form>
            )}

            {isContactSalesChooserOpen && (
              <div
                className="fixed inset-0 z-[1200]"
                onClick={closeContactSalesChooser}
              >
                <div
                  className="absolute w-[min(92vw,360px)] rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_30px_60px_-28px_rgba(15,23,42,0.52)]"
                  style={{
                    top: `${contactSalesChooserPosition.top}px`,
                    left: `${contactSalesChooserPosition.left}px`,
                  }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <h3 style={headingFont} className="text-xl font-extrabold text-slate-900">
                    {text.contactSalesPromptTitle}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{text.contactSalesPromptSubtitle}</p>

                  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => handleContactSalesRedirect("email")}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300 bg-cyan-100 px-4 py-3 text-sm font-bold text-cyan-800 transition-colors hover:bg-cyan-200"
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                      {text.contactByEmailLabel}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleContactSalesRedirect("whatsapp")}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-100 px-4 py-3 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-200"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-4 w-4"
                      >
                        <path d="M12.017 2.004c-5.523 0-10 4.476-10 9.998 0 1.764.462 3.49 1.34 5.014L2 22l5.147-1.343a9.95 9.95 0 0 0 4.87 1.26h.005c5.521 0 9.998-4.477 9.998-9.998 0-2.676-1.042-5.191-2.934-7.084a9.93 9.93 0 0 0-7.069-2.931zm.005 18.224a8.25 8.25 0 0 1-4.206-1.153l-.301-.177-3.057.798.816-2.98-.195-.306a8.257 8.257 0 0 1-1.274-4.407c0-4.555 3.702-8.257 8.257-8.257 2.203 0 4.273.856 5.832 2.416a8.188 8.188 0 0 1 2.421 5.837c0 4.555-3.703 8.257-8.257 8.257zm4.528-6.19c-.248-.124-1.467-.725-1.694-.807-.228-.083-.392-.124-.558.124-.165.248-.641.806-.786.972-.145.165-.29.186-.538.062-.248-.124-1.049-.386-1.997-1.231-.737-.657-1.233-1.468-1.378-1.716-.145-.248-.015-.382.109-.506.111-.11.248-.29.372-.435.124-.145.165-.248.248-.414.083-.165.041-.31-.021-.434-.062-.124-.558-1.343-.765-1.84-.201-.483-.405-.417-.558-.424-.145-.007-.31-.008-.476-.008a.917.917 0 0 0-.662.31c-.228.248-.868.848-.868 2.068 0 1.219.889 2.397 1.013 2.562.124.165 1.75 2.673 4.241 3.746.592.255 1.055.407 1.416.521.595.19 1.137.163 1.565.099.477-.071 1.467-.6 1.673-1.18.206-.579.206-1.076.145-1.18-.062-.104-.227-.165-.475-.289z" />
                      </svg>
                      {text.contactByWhatsAppLabel}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={closeContactSalesChooser}
                    className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                  >
                    {text.cancelContactOptionLabel}
                  </button>
                </div>
              </div>
            )}

            {isContactSalesEmailFormOpen && (
              <div
                className="fixed inset-0 z-[1250] flex items-center justify-center bg-slate-900/42 px-4 backdrop-blur-[1px]"
                onClick={closeContactSalesEmailForm}
              >
                <div
                  className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_30px_60px_-28px_rgba(15,23,42,0.52)]"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 style={headingFont} className="text-2xl font-extrabold text-slate-900">
                        {text.contactSalesFormTitle}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">{text.contactSalesFormSubtitle}</p>
                    </div>
                    <button
                      type="button"
                      onClick={closeContactSalesEmailForm}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-600 transition-colors hover:bg-cyan-50"
                      aria-label={text.closeLabel}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>

                  {contactSalesFormSubmitState === "success" ? (
                    <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                      <div className="flex items-center gap-2 text-base font-black">
                        <FontAwesomeIcon icon={faCircleCheck} />
                        <span>{text.contactSalesFormSuccessMessage}</span>
                      </div>
                      <div className="mt-3 flex justify-center">
                        <button
                          type="button"
                          onClick={closeContactSalesEmailForm}
                          className="inline-flex items-center justify-center rounded-full border border-emerald-300 bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-200"
                        >
                          {text.closeLabel}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2" onSubmit={handleContactSalesEmailSubmit}>
                      <label className="text-sm font-semibold text-slate-800">
                        {text.nameLabel}
                        <input
                          type="text"
                          name="name"
                          value={contactSalesFormData.name}
                          onChange={handleContactSalesFormChange}
                          className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/70"
                          required
                        />
                      </label>

                      <label className="text-sm font-semibold text-slate-800">
                        {text.emailLabel}
                        <input
                          type="email"
                          name="email"
                          value={contactSalesFormData.email}
                          onChange={handleContactSalesFormChange}
                          className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/70"
                          required
                        />
                      </label>

                      <label className="text-sm font-semibold text-slate-800">
                        {text.phoneLabel}
                        <input
                          type="tel"
                          name="phone"
                          value={contactSalesFormData.phone}
                          onChange={handleContactSalesFormChange}
                          className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/70"
                          required
                        />
                      </label>

                      <label className="text-sm font-semibold text-slate-800">
                        {text.addressLabel}
                        <input
                          type="text"
                          name="address"
                          value={contactSalesFormData.address}
                          onChange={handleContactSalesFormChange}
                          className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/70"
                          required
                        />
                      </label>

                      <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
                        {text.purposeLabel}
                        <textarea
                          name="purpose"
                          value={contactSalesFormData.purpose}
                          onChange={handleContactSalesFormChange}
                          className="mt-1 min-h-[100px] w-full rounded-2xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/70"
                          required
                        />
                      </label>

                      {contactSalesFormError && (
                        <p className="sm:col-span-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
                          {contactSalesFormError}
                        </p>
                      )}

                      <div className="sm:col-span-2 mt-1 flex flex-wrap justify-center gap-2">
                        <button
                          type="submit"
                          disabled={contactSalesFormSubmitState === "submitting"}
                          className="inline-flex items-center justify-center rounded-full border border-cyan-500/70 bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2.5 text-sm font-black tracking-[0.05em] text-white shadow-[0_10px_26px_-14px_rgba(6,182,212,0.8)] transition-all duration-300 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {contactSalesFormSubmitState === "submitting"
                            ? text.contactSalesFormSubmittingLabel
                            : text.contactSalesFormSubmitLabel}
                        </button>

                        <button
                          type="button"
                          onClick={closeContactSalesEmailForm}
                          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                        >
                          {text.cancelContactOptionLabel}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>,
        document.body
      )}
      <FloatingWhatsAppButton locale={normalizedLocale} />

      <style>{`
        .service-bootstrap-shell {
          position: relative;
        }

        .service-bootstrap-carousel {
          position: relative;
          width: 100%;
          min-height: 320px;
          max-height: calc(100vh - 5rem);
          overflow: hidden;
        }

        .service-bootstrap-item {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          transform: translate3d(0, 16px, 0) scale(1.01);
          transition: opacity 460ms ease, transform 520ms ease;
          background: #0b1325;
        }

        .service-bootstrap-item.is-active {
          opacity: 1;
          pointer-events: auto;
          transform: translate3d(0, 0, 0) scale(1);
          z-index: 2;
        }

        .service-bootstrap-image {
          height: 100%;
          width: 100%;
          display: block;
          margin: 0 auto;
          max-height: 100%;
          max-width: 100%;
          object-fit: cover;
          object-position: center;
          filter: saturate(1.03) contrast(1.02);
        }

        .service-bootstrap-item.is-active.anim-slide-up {
          animation: carouselSlideUp 760ms cubic-bezier(0.2, 0.75, 0.2, 1);
        }

        .service-bootstrap-item.is-active.anim-slide-left {
          animation: carouselSlideLeft 760ms cubic-bezier(0.2, 0.75, 0.2, 1);
        }

        .service-bootstrap-item.is-active.anim-slide-right {
          animation: carouselSlideRight 760ms cubic-bezier(0.2, 0.75, 0.2, 1);
        }

        .service-bootstrap-item.is-active.anim-zoom-in {
          animation: carouselZoomIn 720ms cubic-bezier(0.2, 0.75, 0.2, 1);
        }

        .service-bootstrap-item.is-active.anim-zoom-out {
          animation: carouselZoomOut 720ms cubic-bezier(0.2, 0.75, 0.2, 1);
        }

        .service-bootstrap-item.is-active.anim-rotate-in {
          animation: carouselRotateIn 780ms cubic-bezier(0.2, 0.75, 0.2, 1);
        }

        .service-bootstrap-item.is-active.anim-flip-in {
          animation: carouselFlipIn 820ms cubic-bezier(0.2, 0.75, 0.2, 1);
          transform-origin: center center;
        }

        .service-bootstrap-item.is-active.anim-diagonal-right {
          animation: carouselDiagonalRight 760ms cubic-bezier(0.2, 0.75, 0.2, 1);
        }

        .service-bootstrap-item.is-active.anim-diagonal-left {
          animation: carouselDiagonalLeft 760ms cubic-bezier(0.2, 0.75, 0.2, 1);
        }

        .service-bootstrap-item.is-active.anim-swing-in {
          animation: carouselSwingIn 820ms cubic-bezier(0.2, 0.75, 0.2, 1);
          transform-origin: top center;
        }

        .service-bootstrap-control {
          position: absolute;
          top: 50%;
          z-index: 4;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 3rem;
          width: 3rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.75);
          background: rgba(15, 23, 42, 0.38);
          color: white;
          transform: translateY(-50%);
          transition: all 220ms ease;
        }

        .service-bootstrap-control:hover {
          background: rgba(15, 23, 42, 0.58);
          border-color: rgba(255, 255, 255, 0.95);
        }

        .service-bootstrap-control.prev {
          left: 0.75rem;
        }

        .service-bootstrap-control.next {
          right: 0.75rem;
        }

        .service-bootstrap-indicators {
          position: absolute;
          bottom: 0.95rem;
          left: 50%;
          z-index: 4;
          display: flex;
          gap: 0.45rem;
          transform: translateX(-50%);
        }

        .service-bootstrap-indicator {
          height: 0.45rem;
          width: 0.45rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.82);
          background: rgba(255, 255, 255, 0.45);
          transition: all 220ms ease;
        }

        .service-bootstrap-indicator.is-active {
          width: 1.8rem;
          background: white;
        }

        @media (max-width: 640px) {
          .service-bootstrap-carousel {
            min-height: 240px;
            max-height: 50vh;
          }

          .service-bootstrap-control {
            height: 2.4rem;
            width: 2.4rem;
          }
        }

        @keyframes carouselSlideUp {
          0% { opacity: 0; transform: translate3d(0, 62px, 0) scale(1.03); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes carouselSlideLeft {
          0% { opacity: 0; transform: translate3d(-86px, 0, 0) scale(1.03); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes carouselSlideRight {
          0% { opacity: 0; transform: translate3d(86px, 0, 0) scale(1.03); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes carouselZoomIn {
          0% { opacity: 0; transform: scale(1.18); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes carouselZoomOut {
          0% { opacity: 0; transform: scale(0.82); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes carouselRotateIn {
          0% { opacity: 0; transform: perspective(1200px) rotateZ(-3deg) translate3d(0, 26px, 0) scale(1.02); }
          100% { opacity: 1; transform: perspective(1200px) rotateZ(0deg) translate3d(0, 0, 0) scale(1); }
        }

        @keyframes carouselFlipIn {
          0% { opacity: 0; transform: perspective(1200px) rotateY(-24deg) scale(0.96); }
          100% { opacity: 1; transform: perspective(1200px) rotateY(0deg) scale(1); }
        }

        @keyframes carouselDiagonalRight {
          0% { opacity: 0; transform: translate3d(-68px, 48px, 0) scale(1.02); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes carouselDiagonalLeft {
          0% { opacity: 0; transform: translate3d(68px, 48px, 0) scale(1.02); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes carouselSwingIn {
          0% { opacity: 0; transform: perspective(1100px) rotateX(16deg) translate3d(0, -38px, 0) scale(0.98); }
          100% { opacity: 1; transform: perspective(1100px) rotateX(0deg) translate3d(0, 0, 0) scale(1); }
        }

        @keyframes cardIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .service-card {
          opacity: 0;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
          transition: transform 360ms cubic-bezier(0.22, 0.7, 0.2, 1), box-shadow 280ms ease, border-color 240ms ease, background-color 240ms ease;
          animation: cardIn 560ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        }

        .service-card:hover {
          transform: translate3d(0, -34px, 190px);
          background-image: linear-gradient(
            135deg,
            rgba(255, 237, 213, 0.96) 0%,
            rgba(253, 230, 138, 0.94) 55%,
            rgba(255, 251, 235, 0.96) 100%
          );
        }

        .quote-overlay {
          animation: fadeIn 220ms ease-out;
        }

        .quote-panel {
          animation: slideUpIn 300ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .animate-quoteFloatOne {
          animation: quoteFloatOne 8s ease-in-out infinite;
        }

        .animate-quoteFloatTwo {
          animation: quoteFloatTwo 9s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUpIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes quoteFloatOne {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(16px, 20px) scale(1.08);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes quoteFloatTwo {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-18px, -16px) scale(1.06);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
      `}</style>
    </main>
  );
}
