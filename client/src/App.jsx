import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import GoogleTranslateController from "./components/GoogleTranslateController";
import ItalianNavbar from "./components/ItalianNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ContactPageItalian from "./pages/ContactPageItalian";
import HomeItalian from "./pages/HomeItalian";
import ItalianLoginPage from "./pages/ItalianLoginPage";
import ItalianSoftwareSolutions from "./pages/ItalianSoftwareSolutions";
import ServicesCatalogPage from "./pages/ServicesCatalogPage";
import StripePayment from "./pages/StripePayment";
import WebsiteDesignDevelopmentPage from "./pages/WebsiteDesignDevelopmentPage";

const normalizeLanguagePath = (pathname, targetLanguage) => {
  if (targetLanguage === "en") {
    if (pathname === "/it") return "/";
    if (pathname.startsWith("/it/")) return pathname.slice(3);
    return pathname;
  }

  if (pathname === "/") return "/it";
  if (pathname === "/it" || pathname.startsWith("/it/")) return pathname;
  return `/it${pathname}`;
};

function AppRoutes({ lang, setLang }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLanguageChange = useCallback(
    (nextLang) => {
      const normalizedLang = nextLang === "en" ? "en" : "it";
      setLang(normalizedLang);
      localStorage.setItem("lang_pref", normalizedLang);

      const currentUrl = `${location.pathname}${location.search}${location.hash}`;
      const nextPathname = normalizeLanguagePath(location.pathname, normalizedLang);
      const nextUrl = `${nextPathname}${location.search}${location.hash}`;

      if (nextUrl !== currentUrl) {
        navigate(nextUrl, { replace: true });
      }
    },
    [location.hash, location.pathname, location.search, navigate, setLang]
  );

  const homeLocale = useMemo(() => (lang === "it" ? "it" : "en"), [lang]);

  useEffect(() => {
    localStorage.setItem("lang_pref", lang);
  }, [lang]);

  return (
    <div className="min-h-screen bg-gray-100">
      <GoogleTranslateController lang={lang} />
      <ItalianNavbar lang={lang} onLanguageChange={handleLanguageChange} />

      <Routes>
        <Route
          path="/"
          element={
            lang === "it" ? (
              <Navigate to="/it" replace />
            ) : (
              <HomeItalian locale={homeLocale} onLanguageChange={handleLanguageChange} />
            )
          }
        />
        <Route
          path="/contact"
          element={lang === "it" ? <Navigate to="/it/contact" replace /> : <ContactPageItalian locale="en" />}
        />
        <Route
          path="/services"
          element={lang === "it" ? <Navigate to="/it/services" replace /> : <ServicesCatalogPage locale="en" />}
        />
        <Route
          path="/software-solutions"
          element={
            lang === "it" ? <Navigate to="/it/software-solutions" replace /> : <ItalianSoftwareSolutions locale="en" />
          }
        />
        <Route
          path="/website-design-development"
          element={
            lang === "it" ? (
              <Navigate to="/it/website-design-development" replace />
            ) : (
              <WebsiteDesignDevelopmentPage locale="en" />
            )
          }
        />
        <Route
          path="/login"
          element={lang === "it" ? <Navigate to="/it/login" replace /> : <ItalianLoginPage locale="en" />}
        />
        <Route
          path="/payment/stripe"
          element={
            lang === "it" ? (
              <Navigate to="/it/payment/stripe" replace />
            ) : (
              <ProtectedRoute redirectTo="/login">
                <StripePayment locale="en" />
              </ProtectedRoute>
            )
          }
        />

        <Route
          path="/it"
          element={
            lang === "en" ? (
              <Navigate to="/" replace />
            ) : (
              <HomeItalian locale={homeLocale} onLanguageChange={handleLanguageChange} />
            )
          }
        />
        <Route
          path="/it/contact"
          element={lang === "en" ? <Navigate to="/contact" replace /> : <ContactPageItalian locale="it" />}
        />
        <Route
          path="/it/services"
          element={lang === "en" ? <Navigate to="/services" replace /> : <ServicesCatalogPage locale="it" />}
        />
        <Route
          path="/it/software-solutions"
          element={
            lang === "en" ? <Navigate to="/software-solutions" replace /> : <ItalianSoftwareSolutions locale="it" />
          }
        />
        <Route
          path="/it/website-design-development"
          element={
            lang === "en" ? (
              <Navigate to="/website-design-development" replace />
            ) : (
              <WebsiteDesignDevelopmentPage locale="it" />
            )
          }
        />
        <Route
          path="/it/login"
          element={lang === "en" ? <Navigate to="/login" replace /> : <ItalianLoginPage locale="it" />}
        />
        <Route
          path="/it/payment/stripe"
          element={
            lang === "en" ? (
              <Navigate to="/payment/stripe" replace />
            ) : (
              <ProtectedRoute redirectTo="/it/login">
                <StripePayment locale="it" />
              </ProtectedRoute>
            )
          }
        />

        <Route path="*" element={<Navigate to={lang === "it" ? "/it" : "/"} replace />} />
      </Routes>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem("lang_pref");
    return stored === "en" ? "en" : "it";
  });

  return (
    <Router>
      <AppRoutes lang={lang} setLang={setLang} />
    </Router>
  );
}

export default App;
