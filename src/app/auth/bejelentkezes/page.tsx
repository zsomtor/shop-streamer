"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function BejelentkezesPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await signIn("credentials", { email, callbackUrl: "/dashboard" });
    setLoading(false);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-dark-700 bg-dark-800 p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-xl font-bold text-white">
            S
          </div>
          <h1 className="text-2xl font-bold text-white">Bejelentkezés</h1>
          <p className="mt-2 text-sm text-dark-400">
            Lépj be a ShopStream fiókodba
          </p>
        </div>

        {/* Email login form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-dark-200"
            >
              E-mail cím
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pelda@email.hu"
              className="input"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="btn-primary w-full"
          >
            {loading ? "Bejelentkezés..." : "Bejelentkezés"}
          </button>
        </form>

        {/* Test accounts hint */}
        <div className="mt-6 rounded-lg border border-dark-700 bg-dark-850 p-4">
          <p className="text-xs font-medium text-dark-300 mb-2">
            Teszt fiókok:
          </p>
          <div className="space-y-1.5">
            {[
              { email: "admin@shopstream.hu", label: "Admin" },
              { email: "bazu@shopstream.hu", label: "BAZU (Alkotó)" },
              { email: "vasarlo@example.com", label: "Vásárló" },
            ].map((account) => (
              <button
                key={account.email}
                onClick={() => {
                  setEmail(account.email);
                  signIn("credentials", {
                    email: account.email,
                    callbackUrl: "/dashboard",
                  });
                }}
                className="flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-xs transition-colors hover:bg-dark-700"
              >
                <span className="text-dark-400">{account.email}</span>
                <span className="text-brand-400">{account.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-dark-500">
          A bejelentkezéssel elfogadod az{" "}
          <a href="#" className="text-brand-400 hover:underline">
            ÁSZF
          </a>
          -t és az{" "}
          <a href="#" className="text-brand-400 hover:underline">
            Adatvédelmi szabályzat
          </a>
          ot.
        </p>
      </div>
    </div>
  );
}
