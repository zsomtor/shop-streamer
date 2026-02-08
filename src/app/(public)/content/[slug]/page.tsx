import { CardSkeleton } from "@/components/ui/loading-skeleton";

export const metadata = {
  title: "Tartalom — ShopStream",
  description: "Tartalom részletek oldal.",
};

export default function ContentDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main content area */}
        <div className="flex-1">
          {/* Preview / Player placeholder */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-dark-700 bg-dark-800">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <svg
                className="h-16 w-16 text-dark-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                />
              </svg>
              <p className="text-sm text-dark-400">
                Tartalom előnézet betöltés alatt...
              </p>
            </div>
          </div>

          {/* Title & creator */}
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Tartalom #{params.slug}
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/20 ring-1 ring-dark-600">
                <span className="text-sm font-bold text-brand-400">?</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Alkotó neve</p>
                <p className="text-xs text-dark-400">Betöltés alatt...</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 rounded-xl border border-dark-700 bg-dark-800 p-5">
            <h2 className="text-lg font-semibold text-white">Leírás</h2>
            <div className="mt-3 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-dark-700" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-dark-700" />
              <div className="h-4 w-4/6 animate-pulse rounded bg-dark-700" />
            </div>
          </div>

          {/* Reviews placeholder */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-white">Értékelések</h2>
            <div className="mt-4 rounded-xl border border-dark-700 bg-dark-800 p-8 text-center">
              <svg
                className="mx-auto h-10 w-10 text-dark-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              <p className="mt-3 text-dark-400">
                Még nincsenek értékelések ehhez a tartalomhoz.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full shrink-0 lg:w-80">
          {/* Purchase card */}
          <div className="sticky top-24 rounded-xl border border-dark-700 bg-dark-800 p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">-- Ft</p>
              <p className="mt-1 text-sm text-dark-400">Egyszeri vásárlás</p>
            </div>

            <button className="btn-primary mt-6 w-full py-3" disabled>
              Megvásárlás
            </button>

            <div className="mt-4 space-y-3 border-t border-dark-700 pt-4">
              {[
                { label: "Formátum", value: "--" },
                { label: "Időtartam", value: "--" },
                { label: "Nyelv", value: "Magyar" },
                { label: "Feltöltve", value: "--" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-dark-400">{item.label}</span>
                  <span className="text-dark-200">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Guarantee */}
            <div className="mt-4 rounded-lg bg-dark-850 p-3 text-center">
              <p className="text-xs text-dark-400">
                30 napos pénzvisszafizetési garancia
              </p>
            </div>
          </div>

          {/* Related content */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-dark-300">
              Hasonló tartalmak
            </h3>
            <div className="mt-3 space-y-4">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
