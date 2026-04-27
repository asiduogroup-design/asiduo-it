import React, { useRef, useState } from "react";

const MAP_URL =
  "https://www.google.com/maps/place/KOTIREDDY+TC/@16.5437711,80.6337037,17z/data=!3m1!4b1!4m6!3m5!1s0x3a35e50fd88ca80b:0x60e57a2a01183c92!8m2!3d16.5437711!4d80.6337037!16s%2Fg%2F11p9wrcv0y?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D";

const UPDATED_ADDRESS =
  "Sri Durga Devi Nilayam, Door no:43-106/1-51B/1, 8thLane, Thotavari Veedi,Nandamuri nagar, Ajith singh nagar,Vijayawada, Pincode 520015";

const PHONE_LINES = ["IND: +91 9959812864", "ITALY: +39 3248872715"];

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
  company: "",
  message: "",
};

const COPY = {
  en: {
    heading: "Get In Touch With Us And Talk About Your Project Today",
    paragraph:
      "With a team of friendly experts, you get to talk to us and we help you choose the right digital services for your business.",
    findUsLabel: "Find Us Now",
    openFormLabel: "Open Contact Form",
    formTitle: "Contact Us Today",
    namePlaceholder: "Your Name",
    phonePlaceholder: "Your Phone",
    emailPlaceholder: "Your Email",
    companyPlaceholder: "Your Company",
    messagePlaceholder: "Your Message",
    submitLabel: "SUBMIT",
    officeAddressTitle: "Our Office Address",
    callUsTitle: "Call Us",
    emailTitle: "E-mail Us",
    emailPrefix: "New Sales / Enquiries / Support / Grievances:",
    emailAddress: "support@asiduosolutions.com",
    formSuccessMessage: "Thanks! We have received your message.",
  },
  it: {
    heading: "Parla Con Noi Del Tuo Progetto Oggi",
    paragraph:
      "Con un team di esperti sempre disponibili, siamo pronti ad aiutarti a scegliere i servizi digitali giusti per il tuo business.",
    findUsLabel: "Trovaci Ora",
    openFormLabel: "Apri Modulo Contatti",
    formTitle: "Contattaci Oggi",
    namePlaceholder: "Il tuo nome",
    phonePlaceholder: "Il tuo telefono",
    emailPlaceholder: "La tua email",
    companyPlaceholder: "La tua azienda",
    messagePlaceholder: "Il tuo messaggio",
    submitLabel: "INVIA",
    officeAddressTitle: "Indirizzo Ufficio",
    callUsTitle: "Chiamaci",
    emailTitle: "Scrivici",
    emailPrefix: "Nuove vendite / Richieste / Supporto / Reclami:",
    emailAddress: "support@asiduosolutions.com",
    formSuccessMessage: "Grazie! Abbiamo ricevuto il tuo messaggio.",
  },
};

export default function InteractiveContactPage({ locale = "en" }) {
  const text = locale === "it" ? COPY.it : COPY.en;
  const [formData, setFormData] = useState(INITIAL_FORM);
  const formSectionRef = useRef(null);

  const handleFindUs = () => {
    window.location.href = MAP_URL;
  };

  const handleFormInput = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    alert(text.formSuccessMessage);
    setFormData(INITIAL_FORM);
  };

  return (
    <main className="w-full overflow-x-hidden bg-slate-950 text-white">
      <section
        id="contact-hero-section"
        className="safe-mobile-padding relative overflow-hidden bg-[#020611] pb-14 pt-32 sm:px-6 sm:pb-16 sm:pt-36 md:px-12 md:pt-40 lg:px-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 22%, rgba(14,165,233,0.35) 0%, transparent 40%), radial-gradient(circle at 88% 72%, rgba(37,99,235,0.35) 0%, transparent 40%), linear-gradient(125deg, rgba(56,189,248,0.08) 0%, transparent 55%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-5xl">
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            {text.heading}
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-200 sm:mt-6 sm:text-base md:text-lg">
            {text.paragraph}
          </p>

          <div className="mt-8 flex w-full max-w-lg flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
            <button
              type="button"
              onClick={handleFindUs}
              className="w-full rounded-full border-2 border-sky-400 bg-sky-500/10 px-6 py-3 text-base font-bold text-white transition-all duration-300 hover:bg-sky-500/30 focus:outline-none focus:ring-2 focus:ring-sky-300 sm:w-auto sm:px-7"
            >
              {text.findUsLabel}
            </button>

            <button
              type="button"
              onClick={() => formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="w-full rounded-full border border-white/50 bg-white/10 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 sm:w-auto sm:px-7"
            >
              {text.openFormLabel}
            </button>
          </div>
        </div>
      </section>

      <section ref={formSectionRef} className="safe-mobile-padding bg-slate-100 py-10 sm:px-6 sm:py-12 md:px-12 lg:px-16">
        <div className="mx-auto grid w-full max-w-6xl gap-5 rounded-3xl bg-white/95 p-2.5 shadow-2xl sm:p-3 md:grid-cols-[1.25fr_1fr] md:gap-6 md:p-5">
          <div className="rounded-3xl bg-gradient-to-br from-sky-500 to-blue-500 p-5 sm:p-7 md:p-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">{text.formTitle}</h2>
            <div className="mt-3 h-1 w-14 rounded-full bg-white/90" />

            <form onSubmit={handleFormSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleFormInput}
                placeholder={text.namePlaceholder}
                className="rounded-full border border-white/30 bg-white px-4 py-3 text-base text-slate-800 outline-none ring-sky-300 placeholder:text-slate-500 focus:ring-2"
              />
              <input
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleFormInput}
                placeholder={text.phonePlaceholder}
                className="rounded-full border border-white/30 bg-white px-4 py-3 text-base text-slate-800 outline-none ring-sky-300 placeholder:text-slate-500 focus:ring-2"
              />
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleFormInput}
                placeholder={text.emailPlaceholder}
                className="rounded-full border border-white/30 bg-white px-4 py-3 text-base text-slate-800 outline-none ring-sky-300 placeholder:text-slate-500 focus:ring-2"
              />
              <input
                name="company"
                type="text"
                value={formData.company}
                onChange={handleFormInput}
                placeholder={text.companyPlaceholder}
                className="rounded-full border border-white/30 bg-white px-4 py-3 text-base text-slate-800 outline-none ring-sky-300 placeholder:text-slate-500 focus:ring-2"
              />
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleFormInput}
                placeholder={text.messagePlaceholder}
                className="min-h-[150px] rounded-3xl border border-white/30 bg-white px-4 py-3 text-base text-slate-800 outline-none ring-sky-300 placeholder:text-slate-500 focus:ring-2 sm:col-span-2"
              />

              <button
                type="submit"
                className="w-full rounded-full bg-slate-950 px-8 py-3 text-base font-extrabold text-white transition-colors duration-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200 sm:col-span-2 sm:w-fit"
              >
                {text.submitLabel}
              </button>
            </form>
          </div>

          <aside className="rounded-3xl bg-slate-50 p-5 text-slate-800 sm:p-7 md:p-8">
            <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">{text.officeAddressTitle}</h3>
            <p className="mt-4 break-words text-base leading-relaxed text-slate-600 sm:text-lg">{UPDATED_ADDRESS}</p>

            <h3 className="mt-8 text-2xl font-bold text-slate-900 sm:text-3xl">{text.callUsTitle}</h3>
            <ul className="mt-4 space-y-2 text-base text-slate-700 sm:text-lg">
              {PHONE_LINES.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <h3 className="mt-8 text-2xl font-bold text-slate-900 sm:text-3xl">{text.emailTitle}</h3>
            <p className="mt-4 text-base text-slate-700 sm:text-lg">{text.emailPrefix}</p>
            <p className="mt-1 break-all text-base font-semibold text-sky-700 sm:text-lg">{text.emailAddress}</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
