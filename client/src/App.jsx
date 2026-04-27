import React, { useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import ItalianNavbar from "./components/ItalianNavbar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ContactPageItalian from "./pages/ContactPageItalian";
import CountrySelectionPage from "./pages/CountrySelectionPage";
import HomeItalian from "./pages/HomeItalian";
import ItalianLoginPage from "./pages/ItalianLoginPage";
import ItalianSoftwareSolutions from "./pages/ItalianSoftwareSolutions";
import NexiPayment from "./pages/NexiPayment";
import RazorpayPayment from "./pages/RazorpayPayment";
import StripePayment from "./pages/StripePayment";

function AppRoutes({ lang }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {lang === "it" ? <ItalianNavbar /> : <Navbar />}

      <Routes>
        <Route
          path="/"
          element={lang === "it" ? <Navigate to="/it" replace /> : <HomeItalian locale="en" />}
        />
        <Route path="/contact" element={<ContactPageItalian locale="en" />} />
        <Route path="/software-solutions" element={<ItalianSoftwareSolutions />} />
        <Route path="/login" element={<ItalianLoginPage />} />
        <Route
          path="/country-selection"
          element={
            <ProtectedRoute redirectTo="/login">
              <CountrySelectionPage locale="en" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/razorpay"
          element={
            <ProtectedRoute redirectTo="/login">
              <RazorpayPayment locale="en" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/stripe"
          element={
            <ProtectedRoute redirectTo="/login">
              <StripePayment locale="en" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nexi-payment"
          element={
            <ProtectedRoute redirectTo="/login">
              <NexiPayment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/it"
          element={lang === "en" ? <Navigate to="/" replace /> : <HomeItalian locale="it" />}
        />
        <Route path="/it/contact" element={<ContactPageItalian locale="it" />} />
        <Route path="/it/software-solutions" element={<ItalianSoftwareSolutions />} />
        <Route path="/it/login" element={<ItalianLoginPage />} />
        <Route
          path="/it/country-selection"
          element={
            <ProtectedRoute redirectTo="/it/login">
              <CountrySelectionPage locale="it" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/it/payment/razorpay"
          element={
            <ProtectedRoute redirectTo="/it/login">
              <RazorpayPayment locale="it" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/it/payment/stripe"
          element={
            <ProtectedRoute redirectTo="/it/login">
              <StripePayment locale="it" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/it/nexi-payment"
          element={
            <ProtectedRoute redirectTo="/it/login">
              <NexiPayment />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={lang === "it" ? "/it" : "/"} replace />} />
      </Routes>
    </div>
  );
}

function App() {
  const [lang] = useState(() => localStorage.getItem("lang_pref") || "it");

  return (
    <Router>
      <AppRoutes lang={lang} />
    </Router>
  );
}

export default App;
