import { ContentGridSkeleton } from "@/components/ui/loading-skeleton";

export const metadata = {
  title: "Alkotói profil — ShopStream",
  description: "Alkotói profil oldal.",
};

export default function CreatorProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Creator header */}
      <div className="rounded-xl border border-dark-700 bg-dark-800">
        {/* Banner placeholder */}
        <div className="h-48 rounded-t-xl bg-gradient-to-r from-brand-600/20 via-dark-700 to-brand-500/20 sm:h-56" />

        <div className="px-6 pb-6">
          {/* Avatar + info */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
            <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-dark-800 bg-gradient-to-br from-brand-500/30 to-brand-600/30 ring-2 ring-dark-600 sm:-mt-14 sm:h-28 sm:w-28">
              <svg
                className="h-10 w-10 text-brand-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white">
                Alkotó #{params.slug}
              </h1>
              <p className="mt-1 text-dark-400">
                Az alkotó adatai betöltés alatt...
              </p>
            </div>

            <div className="flex gap-3">
              <button className="btn-primary" disabled>
                Követés
              </button>
              <button className="btn-secondary" disabled>
                Üzenet
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-dark-700 pt-6 text-center sm:grid-cols-4">
            <div>
              <p className="text-xl font-bold text-white">--</p>
              <p className="text-xs text-dark-400">Tartalom</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">--</p>
              <p className="text-xs text-dark-400">Követő</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">--</p>
              <p className="text-xs text-dark-400">Eladás</p>
            </div>
            <div className="hidden sm:block">
              <p className="text-xl font-bold text-white">--</p>
              <p className="text-xs text-dark-400">Értékelés</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-white">Bemutatkozás</h2>
        <div className="mt-3 rounded-xl border border-dark-700 bg-dark-800 p-5">
          <p className="text-dark-400">
            Az alkotó bemutatkozása betöltés alatt...
          </p>
        </div>
      </div>

      {/* Content tabs placeholder */}
      <div className="mt-8">
        <div className="flex gap-6 border-b border-dark-700">
          {["Tartalmak", "Élő események", "Értékelések"].map((tab, i) => (
            <button
              key={tab}
              className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                i === 0
                  ? "border-brand-500 text-brand-400"
                  : "border-transparent text-dark-400 hover:text-dark-200"
              }`}
              disabled
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content grid skeleton */}
        <div className="mt-6">
          <ContentGridSkeleton count={6} />
        </div>
      </div>
    </div>
  );
}
