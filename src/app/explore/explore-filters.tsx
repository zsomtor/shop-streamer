"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const CONTENT_TYPES = [
  { value: "", label: "Összes" },
  { value: "VIDEO", label: "Videó" },
  { value: "PODCAST", label: "Podcast" },
  { value: "LIVE_REPLAY", label: "Élő visszajátszás" },
  { value: "EXCLUSIVE", label: "Exkluzív" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Legújabb" },
  { value: "popular", label: "Legnépszerűbb" },
  { value: "price_asc", label: "Ár: növekvő" },
  { value: "price_desc", label: "Ár: csökkenő" },
];

export function ExploreFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const current = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(params)) {
        if (value) {
          current.set(key, value);
        } else {
          current.delete(key);
        }
      }
      // Reset to page 1 when filters change
      current.delete("page");
      return current.toString();
    },
    [searchParams]
  );

  const handleSearch = () => {
    router.push(`/explore?${createQueryString({ search: searchInput })}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleTypeChange = (type: string) => {
    router.push(`/explore?${createQueryString({ type })}`);
  };

  const handleSortChange = (sort: string) => {
    router.push(`/explore?${createQueryString({ sort })}`);
  };

  const handleFreeToggle = () => {
    const isFree = searchParams.get("free") === "true";
    router.push(`/explore?${createQueryString({ free: isFree ? "" : "true" })}`);
  };

  const currentType = searchParams.get("type") || "";
  const currentSort = searchParams.get("sort") || "newest";
  const isFreeOnly = searchParams.get("free") === "true";

  return (
    <div className="rounded-xl border border-dark-700 bg-dark-800 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-dark-300">
        Szűrők
      </h2>

      {/* Search */}
      <div className="mt-4">
        <label htmlFor="search" className="text-sm font-medium text-dark-200">
          Keresés
        </label>
        <div className="mt-1.5 flex gap-2">
          <input
            id="search"
            type="text"
            placeholder="Tartalom keresése..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input flex-1"
          />
          <button onClick={handleSearch} className="btn-primary px-3">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Type filter */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-dark-200">Típus</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {CONTENT_TYPES.map((ct) => (
            <button
              key={ct.value}
              onClick={() => handleTypeChange(ct.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                currentType === ct.value
                  ? "bg-brand-500 text-white"
                  : "bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white"
              }`}
            >
              {ct.label}
            </button>
          ))}
        </div>
      </div>

      {/* Free only toggle */}
      <div className="mt-6">
        <label className="flex items-center gap-2 text-sm text-dark-300 cursor-pointer">
          <input
            type="checkbox"
            checked={isFreeOnly}
            onChange={handleFreeToggle}
            className="h-4 w-4 rounded border-dark-600 bg-dark-700 text-brand-500 focus:ring-brand-500"
          />
          Csak ingyenes tartalmak
        </label>
      </div>

      {/* Sort */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-dark-200">Rendezés</h3>
        <select
          value={currentSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="input mt-1.5"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
