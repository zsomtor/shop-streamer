import { ContentGridSkeleton } from "@/components/ui/loading-skeleton";

export const metadata = {
  title: "Felfedezés — ShopStream",
  description: "Böngéssz a tartalmak között, szűrj kategória, ár és alkotó szerint.",
};

const CATEGORIES = [
  "Összes",
  "Fotózás",
  "Design",
  "Fejlesztés",
  "Kézműves",
  "Gasztro",
  "Marketing",
  "Zene",
  "Fitness",
  "Oktatás",
];

export default function ExplorePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Felfedezés</h1>
        <p className="mt-2 text-dark-400">
          Böngéssz a tartalmak között és találd meg, ami érdekel
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        {/* Filter sidebar */}
        <aside className="w-full shrink-0 lg:w-64">
          <div className="rounded-xl border border-dark-700 bg-dark-800 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-dark-300">
              Szűrők
            </h2>

            {/* Search */}
            <div className="mt-4">
              <label htmlFor="search" className="text-sm font-medium text-dark-200">
                Keresés
              </label>
              <input
                id="search"
                type="text"
                placeholder="Tartalom keresése..."
                className="input mt-1.5"
                disabled
              />
            </div>

            {/* Category filter */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-dark-200">Kategória</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      cat === "Összes"
                        ? "bg-brand-500 text-white"
                        : "bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white"
                    }`}
                    disabled
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price filter placeholder */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-dark-200">Ár</h3>
              <div className="mt-2 space-y-2">
                {["Ingyenes", "0 - 5 000 Ft", "5 000 - 10 000 Ft", "10 000 Ft +"].map(
                  (range) => (
                    <label
                      key={range}
                      className="flex items-center gap-2 text-sm text-dark-400"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-dark-600 bg-dark-700 text-brand-500 focus:ring-brand-500"
                        disabled
                      />
                      {range}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Sort placeholder */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-dark-200">Rendezés</h3>
              <select className="input mt-1.5" disabled>
                <option>Legújabb</option>
                <option>Legnépszerűbb</option>
                <option>Ár: növekvő</option>
                <option>Ár: csökkenő</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Content grid */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-dark-400">
              Tartalmak betöltése...
            </p>
          </div>

          {/* Skeleton grid as placeholder */}
          <ContentGridSkeleton count={9} />

          {/* Empty state (hidden by default, shown when no results) */}
          <div className="hidden mt-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-dark-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-white">
              Nincs találat
            </h3>
            <p className="mt-2 text-dark-400">
              Próbálj más keresési feltételeket vagy szűrőket használni.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
