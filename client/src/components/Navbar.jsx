import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Topbar = ({ isOverlayRoute }) => (
  <div
    className={`w-full overflow-hidden border-b border-white/10 py-1.5 sm:py-2 ${
      isOverlayRoute
        ? "bg-slate-900/35 backdrop-blur-sm"
        : "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"
    }`}
  >
    <div className="whitespace-nowrap animate-scroll px-3 text-[11px] font-medium tracking-[0.03em] text-slate-100 sm:px-4 sm:text-xs md:text-sm">
      <span className="mx-8">Welcome to Asiduo Solutions.</span>
      <span className="mx-8">Software, electrical project consulting, and graphic design.</span>
      <span className="mx-8">Let us build your next digital solution.</span>
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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isOverlayRoute = location.pathname === "/" || location.pathname === "/contact";
  const token = localStorage.getItem("token");

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const desktopLinkClass = isOverlayRoute
    ? "text-white hover:text-slate-200"
    : "text-violet-900 hover:text-violet-700";

  return (
    <div className={isOverlayRoute ? "fixed inset-x-0 top-0 z-[80]" : "relative z-40"}>
      <Topbar isOverlayRoute={isOverlayRoute} />

      <nav
        className={`safe-mobile-padding relative flex w-full items-center justify-between overflow-visible py-1.5 sm:px-4 sm:py-2 md:px-8 ${
          isOverlayRoute
            ? "border-b border-white/20 bg-slate-950/35 shadow-none backdrop-blur-md"
            : "border-b border-violet-100 bg-white/95 shadow-sm backdrop-blur-md"
        }`}
      >
        <Link to="/" className="flex items-center">
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
            to="/software-solutions"
            className={`${desktopLinkClass} rounded-md px-3 py-1.5 text-sm font-bold tracking-[0.02em] transition-colors duration-200 lg:text-[15px]`}
          >
            Software Solutions
          </Link>
          <Link
            to="/contact"
            className={`${desktopLinkClass} rounded-md px-3 py-1.5 text-sm font-bold tracking-[0.02em] transition-colors duration-200 lg:text-[15px]`}
          >
            Contact
          </Link>
        </div>

        <div className="ml-3 flex items-center gap-2 sm:gap-3">
          {!token && (
            <Link
              to="/login"
              title="Login"
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
              Logout
            </button>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className={`h-7 w-7 ${isOverlayRoute ? "text-white" : "text-violet-900"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div
            className={`absolute left-0 top-full z-50 flex max-h-[72dvh] w-full flex-col items-center overflow-y-auto py-3 md:hidden ${
              isOverlayRoute
                ? "border-b border-white/20 bg-slate-950/90 backdrop-blur-md"
                : "border-b border-violet-100 bg-white/95 shadow-lg"
            }`}
          >
            <Link
              to="/software-solutions"
              className={`w-full py-2 text-center text-base font-bold ${
                isOverlayRoute ? "text-white hover:bg-white/10" : "text-violet-900 hover:bg-violet-50"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Software Solutions
            </Link>
            <Link
              to="/contact"
              className={`w-full py-2 text-center text-base font-bold ${
                isOverlayRoute ? "text-white hover:bg-white/10" : "text-violet-900 hover:bg-violet-50"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            {!token && (
              <Link
                to="/login"
                className={`w-full py-3 text-center font-bold ${
                  isOverlayRoute ? "text-white hover:bg-white/10" : "text-violet-900 hover:bg-violet-50"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Login
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
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
