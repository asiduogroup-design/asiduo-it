import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { buildApiUrl } from "../config/api";

export default function ItalianLoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const getPostLoginPath = () => {
    const redirect = new URLSearchParams(location.search).get("redirect");
    return redirect && redirect.startsWith("/") ? redirect : "/it";
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

      alert(isRegister ? "Registrazione completata!" : "Accesso effettuato!");
      window.location.href = getPostLoginPath();
    } catch (err) {
      const statusCode = err.response?.status;
      const serverError = err.response?.data?.error;

      if (statusCode === 401) {
        setError(
          "Email o password non valide. Se l'account esiste solo nel DB locale, registrati una volta in produzione."
        );
      } else if (statusCode === 405) {
        setError(
          "Endpoint API bloccato (405). URL backend o routing deploy non configurati correttamente."
        );
      } else if (serverError) {
        setError(serverError);
      } else {
        setError("Impossibile connettersi al server");
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
          {isRegister ? "Registrazione" : "Accesso"}
        </h1>

        {error && <div className="text-red-600 text-center">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
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
          {loading ? "Elaborazione..." : isRegister ? "Registrati" : "Accedi"}
        </button>

        <p
          className="text-center cursor-pointer text-blue-600"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Hai gia un account? Accedi"
            : "Nuovo utente? Registrati"}
        </p>
      </form>
    </div>
  );
}
