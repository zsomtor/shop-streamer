"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { topUpWallet } from "@/lib/actions";

const TOP_UP_AMOUNTS = [1000, 2000, 5000, 10000, 20000];

export function TopUpForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleTopUp = () => {
    if (!selectedAmount) return;
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const result = await topUpWallet(selectedAmount);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(
          `Sikeres feltöltés! Új egyenleg: ${result.newBalance?.toLocaleString("hu-HU")} Ft`
        );
        setSelectedAmount(null);
        router.refresh();
      }
    });
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-white">
        Egyenleg feltöltése
      </h2>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3">
          <p className="text-sm text-emerald-400">{success}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {TOP_UP_AMOUNTS.map((amount) => (
          <button
            key={amount}
            onClick={() => setSelectedAmount(amount)}
            className={`rounded-lg border px-4 py-4 text-center transition-colors ${
              selectedAmount === amount
                ? "border-brand-500 bg-brand-500/10 text-brand-400"
                : "border-dark-600 bg-dark-800 text-dark-200 hover:border-dark-500 hover:bg-dark-700"
            }`}
          >
            <span className="block text-xl font-bold">
              {amount.toLocaleString("hu-HU")}
            </span>
            <span className="text-sm text-dark-400">Ft</span>
          </button>
        ))}
      </div>

      {selectedAmount && (
        <button
          onClick={handleTopUp}
          disabled={isPending}
          className="btn-primary mt-4 w-full"
        >
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Feldolgozás...
            </span>
          ) : (
            `Feltöltés: ${selectedAmount.toLocaleString("hu-HU")} Ft`
          )}
        </button>
      )}

      <p className="mt-3 text-xs text-dark-500 text-center">
        MVP: Az egyenleg feltöltése jelenleg szimulált. Éles fizetés hamarosan!
      </p>
    </div>
  );
}
