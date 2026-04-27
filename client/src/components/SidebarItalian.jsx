import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const features = [
  "Sviluppo Software Personalizzato",
  "Sviluppo Web",
  "Sviluppo Applicazioni Mobile",
  "Manutenzione e Supporto Software",
  "Sviluppo e Integrazione API",
  "Marketing Digitale e SEO",
];

const SidebarItalian = ({ selected, onSelect, desktopOpen = true, setDesktopOpen }) => {
  const [open, setOpen] = useState(false);
  const supportsDesktopToggle = typeof setDesktopOpen === "function";
  const isDesktopOpen = supportsDesktopToggle ? desktopOpen : true;

  const showDesktopSidebar = () => {
    if (supportsDesktopToggle) {
      setDesktopOpen(true);
    }
  };

  const hideDesktopSidebar = () => {
    if (supportsDesktopToggle) {
      setDesktopOpen(false);
    }
  };

  return (
    <>
      {!isDesktopOpen && (
        <button
          type="button"
          className="fixed left-0 top-0 z-40 hidden h-screen w-3 bg-green-100/70 transition-colors duration-200 hover:bg-green-200 md:block"
          onMouseEnter={showDesktopSidebar}
          onFocus={showDesktopSidebar}
          aria-label="Show sidebar"
        />
      )}

      <div className="mb-2 flex items-center space-x-3 md:hidden">
        <button
          type="button"
          className="rounded-full bg-green-100 p-2 shadow hover:bg-green-200"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        <span className="min-w-0 truncate font-bold text-base text-green-700 sm:text-lg">{selected}</span>
      </div>

      {isDesktopOpen && (
        <aside
          className="mt-4 hidden w-full rounded-lg bg-white p-4 shadow-lg md:mt-0 md:block md:w-64 md:max-h-[calc(100vh-9rem)] md:overflow-y-auto"
          onMouseLeave={hideDesktopSidebar}
        >
          <h2 className="mb-4 text-xl font-bold text-purple-700">Funzionalita</h2>
          <ul className="space-y-4">
            {features.map((title) => (
              <li key={title}>
                <button
                  className={`w-full rounded px-2 py-2 text-left font-semibold text-green-700 transition-colors duration-200 focus:outline-none ${
                    selected === title ? "bg-green-100" : "hover:bg-green-50"
                  }`}
                  onClick={() => {
                    onSelect(title);
                    hideDesktopSidebar();
                  }}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 md:hidden">
          <div className="animate-slideIn flex h-full w-[85vw] max-w-xs flex-col bg-white p-4 shadow-lg">
            <div className="mb-6 flex items-center justify-end">
              <button type="button" onClick={() => setOpen(false)} aria-label="Close sidebar">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
                  <line x1="6" y1="18" x2="18" y2="6" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <h2 className="mb-4 text-xl font-bold text-purple-700">Funzionalita</h2>
            <ul className="space-y-4 overflow-y-auto pr-1">
              {features.map((title) => (
                <li key={title}>
                  <button
                    className={`w-full rounded px-2 py-2 text-left font-semibold text-green-700 transition-colors duration-200 focus:outline-none ${
                      selected === title ? "bg-green-100" : "hover:bg-green-50"
                    }`}
                    onClick={() => {
                      onSelect(title);
                      setOpen(false);
                    }}
                  >
                    {title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarItalian;
