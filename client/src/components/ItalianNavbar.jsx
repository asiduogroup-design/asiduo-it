import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV_COPY = {
  en: {
    ticker: [
      "Welcome to Asiduo Solutions.",
      "Software, electrical project consulting, and graphic design services.",
      "Contact us for innovative and reliable technology solutions.",
    ],
    services: "Services",
    software: "Software Solutions",
    electrical: "Electrical Project Consulting",
    design: "Graphic Design",
    login: "Login",
    logout: "Logout",
    switchLabel: "IT",
    switchTitle: "Switch to Italian",
  },
  it: {
    ticker: [
      "Benvenuti in Asiduo Solutions!",
      "Offriamo soluzioni software, consulenza per progetti elettrici e servizi di progettazione grafica.",
      "Contattateci per soluzioni tecnologiche innovative e affidabili.",
    ],
    services: "Servizi",
    software: "Soluzioni Software",
    electrical: "Consulenza Progetti Elettrici",
    design: "Progettazione Grafica",
    login: "Login",
    logout: "Logout",
    switchLabel: "EN",
    switchTitle: "Passa a Inglese",
  },
};

const Topbar = ({ isOverlayRoute, items }) => (
  <div
    className={`w-full overflow-hidden border-b border-white/10 py-1.5 sm:py-2 ${
      isOverlayRoute
        ? "bg-slate-900/35 backdrop-blur-sm"
        : "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"
    }`}
  >
    <div className="whitespace-nowrap animate-scroll px-3 text-[11px] font-medium tracking-[0.03em] text-slate-100 sm:px-4 sm:text-xs md:text-sm">
      {items.map((line) => (
        <span key={line} className="mx-8">
          {line}
        </span>
      ))}
    </div>

    <style>{`
      @keyframes scroll {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
      .animate-scroll {
        display: inline-block;
        min-width: 100%;
        animation: scroll 24s linear infinite;
      }
    `}</style>
  </div>
);

const ItalianNavbar = ({ lang = "it", onLanguageChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactNavHasBackground, setContactNavHasBackground] = useState(false);
  const [servicesNavHidden, setServicesNavHidden] = useState(false);
  const navRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const servicesLastScrollYRef = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  const normalizedLang = lang === "en" ? "en" : "it";
  const copy = NAV_COPY[normalizedLang];
  const localePrefix = normalizedLang === "it" ? "/it" : "";
  const homePath = normalizedLang === "it" ? "/it" : "/";
  const contactPath = `${localePrefix}/contact`;
  const servicesPath = `${localePrefix}/services`;
  const softwarePath = `${localePrefix}/software-solutions`;
  const loginPath = `${localePrefix}/login`;

  const isHomeOverlayRoute = location.pathname === "/" || location.pathname === "/it";
  const isContactOverlayRoute =
    location.pathname === "/contact" || location.pathname === "/it/contact";
  const isServicesRoute =
    location.pathname === "/services" || location.pathname === "/it/services";
  const isOverlayRoute = isHomeOverlayRoute || isContactOverlayRoute;
  const shouldUseFixedNav = isOverlayRoute || isServicesRoute;
  const showTopbar = !isServicesRoute;

  const token = localStorage.getItem("token");

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick, { passive: true });
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!isContactOverlayRoute) {
      setContactNavHasBackground(false);
      return undefined;
    }

    const getHeroHeight = () => {
      const heroSection = document.getElementById("contact-hero-section");
      return heroSection?.offsetHeight || Math.round(window.innerHeight * 0.65);
    };

    let heroHeight = getHeroHeight();

    const handleResize = () => {
      heroHeight = getHeroHeight();
    };

    const handleScroll = () => {
      const currentY = window.scrollY || 0;
      const isScrollingUp = currentY < lastScrollYRef.current;
      const withinHero = currentY < Math.max(heroHeight - 120, 120);

      if (isScrollingUp) {
        setContactNavHasBackground(true);
      } else {
        setContactNavHasBackground(withinHero);
      }

      lastScrollYRef.current = currentY;
    };

    lastScrollYRef.current = window.scrollY || 0;
    setContactNavHasBackground(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isContactOverlayRoute]);

  useEffect(() => {
    if (!isServicesRoute) {
      setServicesNavHidden(false);
      return undefined;
    }

    const handleScroll = () => {
      const currentY = window.scrollY || 0;
      const delta = currentY - servicesLastScrollYRef.current;

      if (currentY < 28) {
        setServicesNavHidden(false);
      } else if (delta > 8) {
        setServicesNavHidden(true);
        setMenuOpen(false);
      } else if (delta < -8) {
        setServicesNavHidden(false);
      }

      servicesLastScrollYRef.current = currentY;
    };

    servicesLastScrollYRef.current = window.scrollY || 0;
    setServicesNavHidden(false);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isServicesRoute]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(loginPath);
  };

  const handleLanguageSwitch = () => {
    const nextLang = normalizedLang === "it" ? "en" : "it";
    if (typeof onLanguageChange === "function") {
      onLanguageChange(nextLang);
    }
  };

  const desktopLinkClass = isHomeOverlayRoute
    ? "text-white hover:text-slate-200"
    : "text-violet-900 hover:text-violet-700";

  const navBackgroundClass = isContactOverlayRoute
    ? contactNavHasBackground
      ? "border-b border-violet-100/80 bg-white/92 shadow-sm backdrop-blur-md"
      : "border-b border-violet-100/70 bg-white/70 shadow-none backdrop-blur-md"
    : isOverlayRoute
      ? "border-b border-white/20 bg-slate-950/35 shadow-none backdrop-blur-md"
      : "border-b border-violet-100 bg-white/95 shadow-sm backdrop-blur-md";

  return (
    <div
      className={
        shouldUseFixedNav
          ? `fixed inset-x-0 top-0 z-[90] transition-transform duration-300 ${
              isServicesRoute && servicesNavHidden ? "-translate-y-full" : "translate-y-0"
            }`
          : "relative z-40"
      }
    >
      {showTopbar && <Topbar isOverlayRoute={isOverlayRoute} items={copy.ticker} />}

      <nav
        ref={navRef}
        className={`safe-mobile-padding relative flex w-full items-center justify-between overflow-visible py-1.5 sm:px-4 sm:py-2 md:px-8 ${navBackgroundClass}`}
      >
        <Link to={homePath} className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Asiduo Solutions"
            loading="eager"
            decoding="async"
            className="h-[46px] w-auto translate-y-[30%] drop-shadow-md transition-transform duration-200 hover:scale-105 sm:h-[52px] md:h-[60px]"
          />
        </Link>

        <div className="hidden md:flex flex-1 justify-center space-x-4 lg:space-x-6">
          <Link
            to={servicesPath}
            className={`${desktopLinkClass} rounded-md px-3 py-1.5 text-sm font-bold tracking-[0.02em] transition-colors duration-200 lg:text-[15px]`}
          >
            {copy.services}
          </Link>

          <Link
            to={softwarePath}
            className={`${desktopLinkClass} rounded-md px-3 py-1.5 text-sm font-bold tracking-[0.02em] transition-colors duration-200 lg:text-[15px]`}
          >
            {copy.software}
          </Link>

          <span
            className={`${desktopLinkClass} cursor-pointer rounded-md px-3 py-1.5 text-sm font-bold tracking-[0.02em] transition-colors duration-200 lg:text-[15px]`}
          >
            {copy.electrical}
          </span>

          <span
            className={`${desktopLinkClass} cursor-pointer rounded-md px-3 py-1.5 text-sm font-bold tracking-[0.02em] transition-colors duration-200 lg:text-[15px]`}
          >
            {copy.design}
          </span>
        </div>

        <div className="ml-2 flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleLanguageSwitch}
            className={`rounded-md px-2.5 py-1.5 text-xs font-bold tracking-[0.08em] transition-colors sm:text-sm ${
              isHomeOverlayRoute
                ? "border border-white/40 bg-white/10 text-white hover:bg-white/20"
                : "border border-violet-200 bg-white text-violet-900 hover:bg-violet-50"
            }`}
            title={copy.switchTitle}
          >
            {copy.switchLabel}
          </button>

          {!token && (
            <Link
              to={loginPath}
              title={copy.login}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-violet-200 bg-white text-violet-900 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 sm:h-10 sm:w-10"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.1a7.5 7.5 0 0 1 15 0"
                />
              </svg>
            </Link>
          )}

          {token && (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-semibold text-white shadow transition hover:bg-red-600 sm:px-4"
            >
              {copy.logout}
            </button>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className={`h-7 w-7 ${isHomeOverlayRoute ? "text-white" : "text-violet-900"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div
            className={`absolute left-0 top-full z-50 flex max-h-[72dvh] w-full flex-col items-center overflow-y-auto py-3 md:hidden ${
              isHomeOverlayRoute
                ? "border-b border-white/20 bg-slate-950/90 backdrop-blur-md"
                : "border-b border-violet-100 bg-white/95 shadow-lg"
            }`}
          >
            <Link
              to={servicesPath}
              className={`w-full py-2 text-center text-base font-bold ${
                isHomeOverlayRoute ? "text-white hover:bg-white/10" : "text-violet-900 hover:bg-violet-50"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {copy.services}
            </Link>

            <Link
              to={softwarePath}
              className={`w-full py-2 text-center text-base font-bold ${
                isHomeOverlayRoute ? "text-white hover:bg-white/10" : "text-violet-900 hover:bg-violet-50"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {copy.software}
            </Link>

            <span
              className={`w-full py-2 text-center text-base font-bold cursor-pointer ${
                isHomeOverlayRoute ? "text-white hover:bg-white/10" : "text-violet-900 hover:bg-violet-50"
              }`}
            >
              {copy.electrical}
            </span>

            <span
              className={`w-full py-2 text-center text-base font-bold cursor-pointer ${
                isHomeOverlayRoute ? "text-white hover:bg-white/10" : "text-violet-900 hover:bg-violet-50"
              }`}
            >
              {copy.design}
            </span>

            {!token && (
              <Link
                to={loginPath}
                className={`w-full py-3 text-center font-bold ${
                  isHomeOverlayRoute ? "text-white hover:bg-white/10" : "text-violet-900 hover:bg-violet-50"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {copy.login}
              </Link>
            )}

            {token && (
              <button
                type="button"
                onClick={handleLogout}
                className={`w-full py-3 text-center font-semibold ${
                  isOverlayRoute ? "text-red-300 hover:bg-white/10" : "text-red-600 hover:bg-red-50"
                }`}
              >
                {copy.logout}
              </button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default ItalianNavbar;
