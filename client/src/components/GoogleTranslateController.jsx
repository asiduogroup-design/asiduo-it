import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SOURCE_LANGUAGE = "it";
const SUPPORTED_LANGUAGES = new Set(["it", "en"]);
const TRANSLATE_SCRIPT_ID = "google-translate-script";
const TRANSLATE_CONTAINER_ID = "google_translate_element_hidden";
const TRANSLATE_READY_EVENT = "google-translate-ready";

const isIpAddressHost = (host) => /^\d{1,3}(?:\.\d{1,3}){3}$/.test(host);

const setGoogleTranslateCookie = (targetLanguage) => {
  const cookieValue = `/${SOURCE_LANGUAGE}/${targetLanguage}`;
  const cookie = `googtrans=${cookieValue};path=/`;
  document.cookie = cookie;

  const { hostname } = window.location;
  if (hostname && hostname !== "localhost" && !isIpAddressHost(hostname)) {
    document.cookie = `googtrans=${cookieValue};path=/;domain=.${hostname}`;
  }
};

const applyTranslateComboValue = (targetLanguage) => {
  const combo = document.querySelector(".goog-te-combo");
  if (!combo) return false;

  if (combo.value !== targetLanguage) {
    combo.value = targetLanguage;
  }

  combo.dispatchEvent(new Event("change"));
  return true;
};

const ensureTranslateContainer = () => {
  if (document.getElementById(TRANSLATE_CONTAINER_ID)) return;

  const container = document.createElement("div");
  container.id = TRANSLATE_CONTAINER_ID;
  container.style.display = "none";
  document.body.appendChild(container);
};

const ensureTranslateScript = () => {
  if (document.getElementById(TRANSLATE_SCRIPT_ID)) return;

  window.googleTranslateElementInit = () => {
    if (!window.google?.translate || window.__googleTranslateInitialized) return;

    // Hidden widget, controlled by language state.
    new window.google.translate.TranslateElement(
      {
        pageLanguage: SOURCE_LANGUAGE,
        includedLanguages: "it,en",
        autoDisplay: false,
      },
      TRANSLATE_CONTAINER_ID
    );

    window.__googleTranslateInitialized = true;
    window.dispatchEvent(new Event(TRANSLATE_READY_EVENT));
  };

  const script = document.createElement("script");
  script.id = TRANSLATE_SCRIPT_ID;
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
};

const hideInjectedGoogleUi = () => {
  const selectors = [
    ".goog-te-banner-frame",
    "iframe.goog-te-banner-frame",
    "iframe.skiptranslate",
    "#goog-gt-tt",
    ".goog-te-balloon-frame",
    ".VIpgJd-ZVi9od-ORHb",
    ".VIpgJd-ZVi9od-aZ2wEe-wOHMyf",
    ".VIpgJd-ZVi9od-l4eHX-hSRGPd",
    ".VIpgJd-yAWNEb-L7lbkb",
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.style.display = "none";
      element.style.visibility = "hidden";
      element.style.height = "0";
    });
  });

  document.body.style.top = "0px";
  document.documentElement.style.top = "0px";
};

export default function GoogleTranslateController({ lang = "it" }) {
  const location = useLocation();

  useEffect(() => {
    const targetLanguage = SUPPORTED_LANGUAGES.has(lang) ? lang : SOURCE_LANGUAGE;
    document.documentElement.lang = targetLanguage;

    ensureTranslateContainer();
    ensureTranslateScript();

    const applyTranslation = () => {
      setGoogleTranslateCookie(targetLanguage);
      applyTranslateComboValue(targetLanguage);
      hideInjectedGoogleUi();
    };

    const handleTranslateReady = () => {
      applyTranslation();
      window.setTimeout(applyTranslation, 160);
    };

    applyTranslation();
    window.addEventListener(TRANSLATE_READY_EVENT, handleTranslateReady);
    const observer = new MutationObserver(() => hideInjectedGoogleUi());
    observer.observe(document.body, { childList: true, subtree: true });

    const firstRetry = window.setTimeout(applyTranslation, 350);
    const secondRetry = window.setTimeout(applyTranslation, 1200);

    return () => {
      window.removeEventListener(TRANSLATE_READY_EVENT, handleTranslateReady);
      observer.disconnect();
      window.clearTimeout(firstRetry);
      window.clearTimeout(secondRetry);
    };
  }, [lang, location.pathname, location.search, location.hash]);

  return null;
}
