import React from "react";
import { useNavigate } from "react-router-dom";

const COPY = {
  en: {
    title: "Stripe Payment",
    subtitle: "You selected Italy. Continue to Stripe to complete your payment securely.",
    proceed: "Proceed To Stripe",
    back: "Back To Country Selection",
  },
  it: {
    title: "Pagamento Stripe",
    subtitle: "Hai selezionato Italia. Continua su Stripe per completare il pagamento.",
    proceed: "Procedi Con Stripe",
    back: "Torna Alla Scelta Del Paese",
  },
};

export default function StripePayment({ locale = "en" }) {
  const navigate = useNavigate();
  const text = locale === "it" ? COPY.it : COPY.en;

  const countryRoute = locale === "it" ? "/it/country-selection" : "/country-selection";

  const handleProceed = () => {
    window.location.href = "https://stripe.com/payments";
  };

  return (
    <main className="safe-mobile-padding flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 py-24 text-white">
      <section className="w-full max-w-xl rounded-3xl border border-emerald-200/30 bg-slate-900/70 p-8 text-center shadow-2xl backdrop-blur-sm sm:p-10">
        <h1 className="text-3xl font-black text-emerald-300 sm:text-4xl">{text.title}</h1>
        <p className="mt-4 text-sm text-slate-200 sm:text-base">{text.subtitle}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handleProceed}
            className="rounded-full border border-emerald-200 bg-emerald-500/20 px-6 py-3 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:scale-105 hover:bg-emerald-500/35 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            {text.proceed}
          </button>

          <button
            type="button"
            onClick={() => navigate(countryRoute)}
            className="rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            {text.back}
          </button>
        </div>
      </section>
    </main>
  );
}
