import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import ItalianNavbar from "./components/ItalianNavbar";
import ContactPageItalian from "./pages/ContactPageItalian";
import HomeItalian from "./pages/HomeItalian";
import ItalianLoginPage from "./pages/ItalianLoginPage";
import ItalianSoftwareSolutions from "./pages/ItalianSoftwareSolutions";
import NexiPayment from "./pages/NexiPayment";
import StripePayment from "./pages/StripePayment";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <ItalianNavbar />
        <Routes>
          <Route path="/" element={<Navigate to="/it" replace />} />
          <Route path="/it" element={<HomeItalian />} />
          <Route path="/it/login" element={<ItalianLoginPage />} />
          <Route path="/it/contact" element={<ContactPageItalian />} />
          <Route path="/it/software-solutions" element={<ItalianSoftwareSolutions />} />
          <Route path="/it/payment/stripe" element={<StripePayment locale="it" />} />
          <Route path="/it/nexi-payment" element={<NexiPayment />} />
          <Route path="*" element={<Navigate to="/it" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;