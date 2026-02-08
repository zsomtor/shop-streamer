import { ContentGridSkeleton, CardSkeleton } from "@/components/ui/loading-skeleton";

export const metadata = {
  title: "Élő közvetítések — ShopStream",
  description: "Élő közvetítések és közelgő események listája.",
};

export default function LiveEventsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">Élő közvetítések</h1>
            <span className="badge-live">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Élő
            </span>
          </div>
          <p className="mt-2 text-dark-400">
            Csatlakozz élő közvetítésekhez és vásárolj egyedi termékeket valós időben
          </p>
        </div>

        <div className="flex gap-3">
          <button
            className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white"
            disabled
          >
            Most élők
          </button>
          <button
            className="rounded-lg bg-dark-800 px-4 py-2 text-sm font-medium text-dark-300 border border-dark-700"
            disabled
          >
            Közelgő
          </button>
          <button
            className="rounded-lg bg-dark-800 px-4 py-2 text-sm font-medium text-dark-300 border border-dark-700"
            disabled
          >
            Visszanézhető
          </button>
        </div>
      </div>

      {/* Currently live section */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-white">Most közvetítenek</h2>
        <p className="mt-1 text-sm text-dark-400">
          Élő közvetítések, amelyekhez most csatlakozhatsz
        </p>

        <div className="mt-6">
          {/* Skeleton placeholder for live streams */}
          <ContentGridSkeleton count={3} />

          {/* Empty state */}
          <div className="hidden mt-8 rounded-xl border border-dark-700 bg-dark-800 p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-dark-700">
              <svg
                className="h-8 w-8 text-dark-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              Jelenleg nincs élő közvetítés
            </h3>
            <p className="mt-2 text-dark-400">
              Nézd meg a közelgő eseményeket, vagy iratkozz fel értesítésekre.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming events section */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-white">Közelgő események</h2>
        <p className="mt-1 text-sm text-dark-400">
          Állíts be emlékeztetőt, hogy ne maradj le
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-dark-700 bg-dark-800 p-5"
            >
              <div className="h-3 w-24 rounded bg-dark-700" />
              <div className="mt-3 h-5 w-full rounded bg-dark-700" />
              <div className="mt-2 h-5 w-3/4 rounded bg-dark-700" />
              <div className="mt-3 h-3 w-20 rounded bg-dark-700" />
              <div className="mt-4 h-3 w-16 rounded bg-dark-700" />
            </div>
          ))}
        </div>
      </section>

      {/* Past/Replayable section */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-white">Visszanézhető</h2>
        <p className="mt-1 text-sm text-dark-400">
          Korábbi élő közvetítések, amelyeket visszanézhetsz
        </p>

        <div className="mt-6">
          <ContentGridSkeleton count={6} />
        </div>
      </section>
    </div>
  );
}
