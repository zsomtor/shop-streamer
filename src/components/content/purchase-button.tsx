"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { purchaseContent } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";

type PurchaseButtonProps = {
  contentId: string;
  priceHUF: number;
  isPurchased: boolean;
  isFree: boolean;
  isLoggedIn: boolean;
  userBalance: number;
};

export function PurchaseButton({
  contentId,
  priceHUF,
  isPurchased,
  isFree,
  isLoggedIn,
  userBalance,
}: PurchaseButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  if (success || isPurchased) {
    return (
      <div className="space-y-3">
        <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-center">
          <p className="text-sm font-medium text-emerald-400">
            {success ? "Sikeres vásárlás!" : "Megvásárolt tartalom"}
          </p>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-center font-semibold text-white hover:bg-emerald-700 transition-colors"
        >
          Megtekintés
        </button>
      </div>
    );
  }

  if (isFree) {
    return (
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-center font-semibold text-white hover:bg-emerald-700 transition-colors"
      >
        Ingyenes megtekintés
      </button>
    );
  }

  if (!isLoggedIn) {
    return (
      <Link
        href="/auth/bejelentkezes"
        className="btn-primary block w-full py-3 text-center"
      >
        Bejelentkezés a vásárláshoz
      </Link>
    );
  }

  if (userBalance < priceHUF) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-400 text-center">
          Nincs elegendő egyenleg ({formatPrice(userBalance)})
        </p>
        <Link
          href="/wallet"
          className="btn-primary block w-full py-3 text-center"
        >
          Tárca feltöltése
        </Link>
      </div>
    );
  }

  const handlePurchase = () => {
    setError(null);
    startTransition(async () => {
      const result = await purchaseContent(contentId);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        router.refresh();
      }
    });
  };

  return (
    <div className="space-y-3">
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
      <button
        onClick={handlePurchase}
        disabled={isPending}
        className="btn-primary w-full py-3"
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
          `Megvásárlás: ${formatPrice(priceHUF)}`
        )}
      </button>
      <p className="text-xs text-dark-500 text-center">
        Egyenleged: {formatPrice(userBalance)}
      </p>
    </div>
  );
}
