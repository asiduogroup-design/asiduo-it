import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { buildApiUrl } from "../config/api";

const COPY = {
  en: {
    registerTitle: "Registration",
    loginTitle: "Login",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    processing: "Processing...",
    registerAction: "Register",
    loginAction: "Login",
    hasAccount: "Already have an account? Log in",
    newUser: "New user? Register",
    registerSuccess: "Registration completed!",
    loginSuccess: "Login successful!",
    invalidCredentials:
      "Invalid email or password. If this account exists only in local DB, register once in production.",
    blockedEndpoint:
      "API endpoint blocked (405). Backend URL or deployment routing is not configured correctly.",
    serverConnection: "Unable to connect to server",
  },
  it: {
    registerTitle: "Registrazione",
    loginTitle: "Accesso",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    processing: "Elaborazione...",
    registerAction: "Registrati",
    loginAction: "Accedi",
    hasAccount: "Hai gia un account? Accedi",
    newUser: "Nuovo utente? Registrati",
    registerSuccess: "Registrazione completata!",
    loginSuccess: "Accesso effettuato!",
    invalidCredentials:
      "Email o password non valide. Se l'account esiste solo nel DB locale, registrati una volta in produzione.",
    blockedEndpoint:
      "Endpoint API bloccato (405). URL backend o routing deploy non configurati correttamente.",
    serverConnection: "Impossibile connettersi al server",
  },
};

export default function ItalianLoginPage({ locale }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const normalizedLocale = locale === "it" || location.pathname.startsWith("/it") ? "it" : "en";
  const text = COPY[normalizedLocale];

  const getPostLoginPath = () => {
    const redirect = new URLSearchParams(location.search).get("redirect");
    return redirect && redirect.startsWith("/") ? redirect : normalizedLocale === "it" ? "/it" : "/";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const url = isRegister
        ? buildApiUrl("/api/register")
        : buildApiUrl("/api/login");

      const res = await axios.post(url, { email, password });

      localStorage.setItem("token", res.data.token);

      alert(isRegister ? text.registerSuccess : text.loginSuccess);
      window.location.href = getPostLoginPath();
    } catch (err) {
      const statusCode = err.response?.status;
      const serverError = err.response?.data?.error;

      if (statusCode === 401) {
        setError(text.invalidCredentials);
      } else if (statusCode === 405) {
        setError(text.blockedEndpoint);
      } else if (serverError) {
        setError(serverError);
      } else {
        setError(text.serverConnection);
      }
    }

    setLoading(false);
  };

  return (
    <div className="safe-mobile-padding flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 py-20">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-5 rounded-xl bg-white p-5 shadow-xl sm:gap-6 sm:p-8 md:p-10"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center">
          {isRegister ? text.registerTitle : text.loginTitle}
        </h1>

        {error && <div className="text-red-600 text-center">{error}</div>}

        <input
          type="email"
          placeholder={text.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="password"
          placeholder={text.passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-lg"
        >
          {loading ? text.processing : isRegister ? text.registerAction : text.loginAction}
        </button>

        <p
          className="text-center cursor-pointer text-blue-600"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? text.hasAccount
            : text.newUser}
        </p>
      </form>
    </div>
  );
}
