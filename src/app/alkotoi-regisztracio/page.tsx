"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { becomeCreator } from "@/lib/actions";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function BecomeCreatorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [bio, setBio] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Redirect if not logged in
  if (status === "unauthenticated") {
    router.push("/auth/bejelentkezes");
    return null;
  }

  // Redirect if already a creator
  if (session?.user?.role === "CREATOR" || session?.user?.role === "ADMIN") {
    router.push("/creator-dashboard");
    return null;
  }

  const handleNameChange = (name: string) => {
    setDisplayName(name);
    if (!slugManuallyEdited) {
      setSlug(toSlug(name));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    setSlug(value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.set("displayName", displayName);
    formData.set("slug", slug);
    formData.set("bio", bio);

    startTransition(async () => {
      const result = await becomeCreator(formData);
      if (result?.error) {
        setError(result.error);
      }
      // On success, the server action redirects to /creator-dashboard
    });
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-dark-700 bg-dark-800 p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10">
            <svg
              className="h-8 w-8 text-brand-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Legyél alkotó!</h1>
          <p className="mt-2 text-dark-400">
            Hozd létre az alkotói profilodat és kezdj el tartalmat értékesíteni
            a ShopStream-en.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Display Name */}
          <div>
            <label
              htmlFor="displayName"
              className="mb-1.5 block text-sm font-medium text-dark-200"
            >
              Megjelenítendő név *
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="pl. BAZU, TechTomi, FitMarcsi"
              className="input"
              required
              maxLength={50}
            />
            <p className="mt-1.5 text-xs text-dark-500">
              Ez a neved fog megjelenni a profil oldaladon és a tartalmaidnál.
            </p>
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="mb-1.5 block text-sm font-medium text-dark-200"
            >
              Profil URL
            </label>
            <div className="flex items-center gap-0">
              <span className="rounded-l-lg border border-r-0 border-dark-600 bg-dark-700 px-3 py-2 text-sm text-dark-400">
                shopstream.hu/creator/
              </span>
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="az-en-nevem"
                className="input !rounded-l-none"
                maxLength={50}
              />
            </div>
            <p className="mt-1.5 text-xs text-dark-500">
              Csak kisbetűk, számok és kötőjel. Automatikusan generálódik a
              nevedből.
            </p>
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="mb-1.5 block text-sm font-medium text-dark-200"
            >
              Bemutatkozás
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Mesélj magadról és a tartalmaidról..."
              rows={4}
              className="input resize-y"
              maxLength={500}
            />
            <p className="mt-1.5 text-xs text-dark-500">
              Opcionális — később is módosíthatod.
            </p>
          </div>

          {/* Preview */}
          {displayName && (
            <div className="rounded-lg border border-dark-600 bg-dark-850 p-4">
              <p className="mb-2 text-xs font-medium text-dark-400">
                Előnézet
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/20 ring-1 ring-dark-600">
                  <span className="text-sm font-bold text-brand-400">
                    {displayName[0]?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">{displayName}</p>
                  <p className="text-xs text-dark-400">
                    @{slug || "..."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="btn-primary"
              disabled={isPending || !displayName.trim()}
            >
              {isPending ? "Regisztráció..." : "Alkotói profil létrehozása"}
            </button>
            <Link href="/dashboard" className="btn-secondary">
              Mégse
            </Link>
          </div>
        </form>

        {/* Info box */}
        <div className="mt-8 rounded-lg border border-dark-600 bg-dark-850 p-4">
          <h3 className="text-sm font-medium text-dark-200">
            Mit kapsz alkotóként?
          </h3>
          <ul className="mt-2 space-y-1.5 text-xs text-dark-400">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-brand-400">✓</span>
              Saját profil oldal és tartalom kezelés
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-brand-400">✓</span>
              Videók, podcastok és exkluzív tartalmak értékesítése
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-brand-400">✓</span>
              85% bevétel az eladásaidból
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-brand-400">✓</span>
              Részletes statisztikák és bevételi kimutatás
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
