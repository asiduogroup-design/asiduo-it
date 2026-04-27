import React from "react";

export default function NexiPayment() {
  return (
    <div className="safe-mobile-padding flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 py-20">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 text-center shadow-xl sm:p-10">
        <h1 className="mb-6 text-2xl font-bold text-blue-600 sm:text-3xl">Pagamento Nexi</h1>

        <p className="mb-6 text-sm text-gray-700 sm:text-base">
          Qui verra integrato il sistema di pagamento Nexi.
        </p>

        <button className="rounded-lg bg-blue-600 px-6 py-3 text-sm text-white shadow hover:bg-blue-700 sm:text-base">
          Procedi al pagamento
        </button>
      </div>
    </div>
  );
}
