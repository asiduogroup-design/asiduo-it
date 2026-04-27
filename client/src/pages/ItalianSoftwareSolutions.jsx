import React, { useState } from "react";
import SidebarItalian from "../components/SidebarItalian";
import AnimatedBar from "../components/AnimatedBar";
import RevealText from "../components/RevealText";
import italianContent from "../data/italianContent";
import { useNavigate } from "react-router-dom";

const ItalianSoftwareSolutions = () => {
  const [selected, setSelected] = useState("Sviluppo Software Personalizzato");
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const content = italianContent[selected];
  const navigate = useNavigate();

  return (
    <div className="safe-mobile-padding relative isolate min-h-screen overflow-hidden bg-[radial-gradient(130%_90%_at_0%_0%,#dbeafe_0%,#ecf3ff_40%,#f5f8fd_68%,#eef3f9_100%)] py-4 sm:py-5 md:px-4 md:py-6">
      <div className="pointer-events-none absolute inset-0 opacity-45 [background:radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(99,102,241,0.14),transparent_30%),radial-gradient(circle_at_70%_78%,rgba(14,165,233,0.12),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="pointer-events-none absolute -left-24 top-4 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-36 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative z-10 flex min-h-[calc(100vh-8.5rem)] w-full flex-col gap-4 sm:gap-5">
        <section className="rounded-2xl border border-slate-200/80 bg-white/92 px-5 py-5 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.55)] backdrop-blur sm:px-7 sm:py-6">
          <div className="flex items-start justify-between gap-3">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-600 sm:text-xs">
                Servizi tecnologici professionali
              </p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                <RevealText text={selected} delay={18} className="align-top" />
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                <RevealText text={content.desc} delay={10} className="align-top" />
              </p>
            </div>

            <button
              type="button"
              title="Torna alla Home"
              onClick={() => navigate("/it")}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-indigo-600 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700"
            >
              <i className="fa-solid fa-house" />
            </button>
          </div>
        </section>

        <div className="flex w-full flex-1 flex-col gap-4 md:flex-row md:items-stretch md:gap-6">
          <div
            className={`relative w-full transition-all duration-300 ${
              desktopSidebarOpen
                ? "md:w-[320px] md:max-w-[320px]"
                : "md:w-0 md:max-w-0 md:overflow-visible"
            }`}
          >
            <div
              className={`rounded-2xl border border-slate-200/80 bg-white/92 p-4 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.65)] backdrop-blur transition-all duration-300 ${
                desktopSidebarOpen ? "" : "md:border-transparent md:bg-transparent md:shadow-none md:p-0"
              }`}
            >
              <div
                className={`mb-3 flex flex-wrap items-center justify-end gap-2 rounded-xl bg-slate-50 px-3 py-2 ${
                  desktopSidebarOpen ? "" : "md:hidden"
                }`}
              >
                <button
                  type="button"
                  onClick={() => navigate("/it/nexi-payment")}
                  className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow transition hover:bg-slate-800 sm:text-sm"
                >
                  Paga con Nexi
                </button>
              </div>

              <SidebarItalian
                selected={selected}
                onSelect={setSelected}
                desktopOpen={desktopSidebarOpen}
                setDesktopOpen={setDesktopSidebarOpen}
              />
            </div>
          </div>

          <section className="grid min-w-0 flex-1 grid-cols-1 gap-5 rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_18px_42px_-28px_rgba(15,23,42,0.55)] md:h-full md:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.85fr)] md:gap-6 md:p-7">
            <div className="order-2 space-y-4 md:order-1">
              <AnimatedBar />

              {content.bullets.map((bullet, index) => (
                <article
                  key={bullet.heading}
                  className="rounded-xl border border-slate-200 bg-slate-50/85 p-4 shadow-sm"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{bullet.heading}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    {bullet.content}
                  </p>
                </article>
              ))}
            </div>

            <div className="order-1 md:order-2">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-xl">
                <img
                  src={content.img}
                  alt={selected}
                  loading="lazy"
                  decoding="async"
                  className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-64 md:h-[340px]"
                />
              </div>
              <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm leading-relaxed text-slate-600">
                Soluzioni progettate per prestazioni elevate, manutenzione semplice e crescita duratura.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ItalianSoftwareSolutions;
