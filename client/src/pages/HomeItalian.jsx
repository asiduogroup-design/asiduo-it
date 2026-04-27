import React from "react";
import InteractiveHomePage from "../components/InteractiveHomePage";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";

const Home = ({ locale = "it", onLanguageChange }) => (
  <>
    <InteractiveHomePage locale={locale} onLanguageChange={onLanguageChange} />
    <FloatingWhatsAppButton locale={locale} />
  </>
);

export default Home;
