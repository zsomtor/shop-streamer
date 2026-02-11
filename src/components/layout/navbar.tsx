"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-dark-700 bg-dark-900/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 font-bold text-white text-sm">
              S
            </div>
            <span className="text-lg font-bold text-white">ShopStream</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/explore"
              className="text-sm text-dark-300 transition-colors hover:text-white"
            >
              Felfedezés
            </Link>
            <Link
              href="/live"
              className="text-sm text-dark-300 transition-colors hover:text-white"
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Élő
              </span>
            </Link>

            {session ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/wallet"
                  className="rounded-lg bg-dark-800 px-3 py-1.5 text-sm font-medium text-brand-400"
                >
                  {(session.user.walletBalanceHUF ?? 0).toLocaleString("hu-HU")} Ft
                </Link>
                <div className="relative group">
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-dark-700 text-sm font-medium text-white">
                    {session.user.name?.[0]?.toUpperCase() ?? "?"}
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-dark-700 bg-dark-800 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-dark-200 hover:bg-dark-700"
                    >
                      Irányítópult
                    </Link>
                    <Link
                      href="/purchases"
                      className="block px-4 py-2 text-sm text-dark-200 hover:bg-dark-700"
                    >
                      Vásárlásaim
                    </Link>
                    {(session.user.role === "CREATOR" ||
                      session.user.role === "ADMIN") && (
                      <Link
                        href="/creator-dashboard"
                        className="block px-4 py-2 text-sm text-dark-200 hover:bg-dark-700"
                      >
                        Alkotói panel
                      </Link>
                    )}
                    {session.user.role === "BUYER" && (
                      <Link
                        href="/alkotoi-regisztracio"
                        className="block px-4 py-2 text-sm text-brand-400 hover:bg-dark-700"
                      >
                        Alkotóvá válás
                      </Link>
                    )}
                    {session.user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-dark-200 hover:bg-dark-700"
                      >
                        Admin
                      </Link>
                    )}
                    <hr className="my-1 border-dark-700" />
                    <button
                      onClick={() => signOut()}
                      className="block w-full px-4 py-2 text-left text-sm text-dark-400 hover:bg-dark-700 hover:text-white"
                    >
                      Kijelentkezés
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => signIn()} className="btn-primary text-sm">
                Bejelentkezés
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-dark-300 hover:text-white md:hidden"
            aria-label="Menü megnyitása"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-dark-700 md:hidden">
          <div className="space-y-1 px-4 py-3">
            <Link
              href="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-dark-200 hover:bg-dark-800"
            >
              Felfedezés
            </Link>
            <Link
              href="/live"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-dark-200 hover:bg-dark-800"
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Élő
              </span>
            </Link>
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-dark-200 hover:bg-dark-800"
                >
                  Irányítópult
                </Link>
                <Link
                  href="/wallet"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-dark-200 hover:bg-dark-800"
                >
                  Tárca — {(session.user.walletBalanceHUF ?? 0).toLocaleString("hu-HU")} Ft
                </Link>
                <Link
                  href="/purchases"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-dark-200 hover:bg-dark-800"
                >
                  Vásárlásaim
                </Link>
                {(session.user.role === "CREATOR" || session.user.role === "ADMIN") && (
                  <Link
                    href="/creator-dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-dark-200 hover:bg-dark-800"
                  >
                    Alkotói panel
                  </Link>
                )}
                {session.user.role === "BUYER" && (
                  <Link
                    href="/alkotoi-regisztracio"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-brand-400 hover:bg-dark-800"
                  >
                    Alkotóvá válás
                  </Link>
                )}
                <button
                  onClick={() => { signOut(); setMobileMenuOpen(false); }}
                  className="block w-full rounded-lg px-3 py-2 text-left text-dark-400 hover:bg-dark-800"
                >
                  Kijelentkezés
                </button>
              </>
            ) : (
              <button
                onClick={() => { signIn(); setMobileMenuOpen(false); }}
                className="btn-primary mt-2 w-full text-sm"
              >
                Bejelentkezés
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
