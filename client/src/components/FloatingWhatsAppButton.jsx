import React from "react";

const WHATSAPP_PHONE = "393248872715";

const COPY = {
  en: {
    label: "Chat on WhatsApp",
    message: "Hello Asiduo Solutions, I would like to know more about your services.",
  },
  it: {
    label: "Chatta su WhatsApp",
    message: "Ciao Asiduo Solutions, vorrei maggiori informazioni sui vostri servizi.",
  },
};

export default function FloatingWhatsAppButton({ locale = "en" }) {
  const normalizedLocale = locale === "it" ? "it" : "en";
  const text = COPY[normalizedLocale];
  const href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text.message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={text.label}
      aria-label={text.label}
      className="fixed bottom-5 right-5 z-[95] inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/85 bg-[#25D366] text-white shadow-[0_18px_40px_-18px_rgba(37,211,102,0.95)] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-emerald-200/90"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-7 w-7"
      >
        <path d="M12.017 2.004c-5.523 0-10 4.476-10 9.998 0 1.764.462 3.49 1.34 5.014L2 22l5.147-1.343a9.95 9.95 0 0 0 4.87 1.26h.005c5.521 0 9.998-4.477 9.998-9.998 0-2.676-1.042-5.191-2.934-7.084a9.93 9.93 0 0 0-7.069-2.931zm.005 18.224a8.25 8.25 0 0 1-4.206-1.153l-.301-.177-3.057.798.816-2.98-.195-.306a8.257 8.257 0 0 1-1.274-4.407c0-4.555 3.702-8.257 8.257-8.257 2.203 0 4.273.856 5.832 2.416a8.188 8.188 0 0 1 2.421 5.837c0 4.555-3.703 8.257-8.257 8.257zm4.528-6.19c-.248-.124-1.467-.725-1.694-.807-.228-.083-.392-.124-.558.124-.165.248-.641.806-.786.972-.145.165-.29.186-.538.062-.248-.124-1.049-.386-1.997-1.231-.737-.657-1.233-1.468-1.378-1.716-.145-.248-.015-.382.109-.506.111-.11.248-.29.372-.435.124-.145.165-.248.248-.414.083-.165.041-.31-.021-.434-.062-.124-.558-1.343-.765-1.84-.201-.483-.405-.417-.558-.424-.145-.007-.31-.008-.476-.008a.917.917 0 0 0-.662.31c-.228.248-.868.848-.868 2.068 0 1.219.889 2.397 1.013 2.562.124.165 1.75 2.673 4.241 3.746.592.255 1.055.407 1.416.521.595.19 1.137.163 1.565.099.477-.071 1.467-.6 1.673-1.18.206-.579.206-1.076.145-1.18-.062-.104-.227-.165-.475-.289z" />
      </svg>
    </a>
  );
}
