"use client";

import { useState } from "react";

const topUpAmounts = [2000, 5000, 10000];

const transactions = [
  {
    id: "1",
    description: "Feltöltés",
    amount: 5000,
    type: "credit" as const,
    date: "2025-01-15 14:32",
  },
  {
    id: "2",
    description: "Vásárlás — Haladó React tanfolyam",
    amount: -4990,
    type: "debit" as const,
    date: "2025-01-15 15:10",
  },
  {
    id: "3",
    description: "Feltöltés",
    amount: 10000,
    type: "credit" as const,
    date: "2025-01-12 09:20",
  },
  {
    id: "4",
    description: "Vásárlás — UI/UX Design alapok",
    amount: -2990,
    type: "debit" as const,
    date: "2025-01-12 10:05",
  },
  {
    id: "5",
    description: "Feltöltés",
    amount: 5000,
    type: "credit" as const,
    date: "2025-01-08 18:45",
  },
];

export default function WalletPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const currentBalance = 12500;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Tárca</h1>
        <p className="mt-1 text-dark-400">
          Kezeld az egyenleged és tekintsd meg a tranzakcióidat.
        </p>
      </div>

      {/* Balance card */}
      <div className="mb-8 rounded-xl border border-dark-700 bg-gradient-to-br from-dark-800 to-dark-900 p-6">
        <p className="text-sm font-medium text-dark-400">Jelenlegi egyenleg</p>
        <p className="mt-1 text-4xl font-bold text-white">
          {currentBalance.toLocaleString("hu-HU")}{" "}
          <span className="text-xl text-dark-300">Ft</span>
        </p>
      </div>

      {/* Top-up section */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Egyenleg feltöltése
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {topUpAmounts.map((amount) => (
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
          <button className="btn-primary mt-4 w-full">
            Feltöltés: {selectedAmount.toLocaleString("hu-HU")} Ft
          </button>
        )}
      </div>

      {/* Transaction history */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          Tranzakciós előzmények
        </h2>
        <div className="space-y-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="card flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-white">{tx.description}</p>
                <p className="text-xs text-dark-500">{tx.date}</p>
              </div>
              <span
                className={`text-sm font-semibold ${
                  tx.type === "credit" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {tx.type === "credit" ? "+" : ""}
                {tx.amount.toLocaleString("hu-HU")} Ft
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
