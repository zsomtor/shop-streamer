import { CardSkeleton } from "@/components/ui/loading-skeleton";

export const metadata = {
  title: "Élő közvetítés — ShopStream",
  description: "Élő közvetítés részletek és vásárlás.",
};

export default function LiveEventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main stream area */}
        <div className="flex-1">
          {/* Video player placeholder */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-dark-700 bg-dark-950">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <svg
                className="h-16 w-16 text-dark-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <p className="text-sm text-dark-500">
                Közvetítés betöltése...
              </p>
            </div>

            {/* Stream status badge */}
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="badge-live">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Élő
              </span>
              <span className="rounded-full bg-dark-900/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                -- néző
              </span>
            </div>
          </div>

          {/* Stream info */}
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-white">
              Élő közvetítés #{params.id}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/20 ring-1 ring-dark-600">
                <span className="text-sm font-bold text-brand-400">?</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Alkotó neve</p>
                <p className="text-xs text-dark-400">Betöltés alatt...</p>
              </div>
              <button className="btn-secondary ml-auto text-xs" disabled>
                Követés
              </button>
            </div>
          </div>

          {/* Stream description */}
          <div className="mt-6 rounded-xl border border-dark-700 bg-dark-800 p-5">
            <h2 className="text-sm font-semibold text-dark-300">
              A közvetítésről
            </h2>
            <div className="mt-3 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-dark-700" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-dark-700" />
              <div className="h-4 w-3/5 animate-pulse rounded bg-dark-700" />
            </div>
          </div>
        </div>

        {/* Sidebar: Chat + Products */}
        <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-96">
          {/* Chat panel */}
          <div className="flex flex-col rounded-xl border border-dark-700 bg-dark-800">
            <div className="flex items-center justify-between border-b border-dark-700 px-4 py-3">
              <h2 className="text-sm font-semibold text-white">
                Élő chat
              </h2>
              <span className="text-xs text-dark-500">-- résztvevő</span>
            </div>

            {/* Chat messages placeholder */}
            <div className="flex-1 p-4" style={{ minHeight: "320px" }}>
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <svg
                  className="h-10 w-10 text-dark-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
                <p className="text-sm text-dark-500">
                  A chat betöltés alatt...
                </p>
              </div>
            </div>

            {/* Chat input */}
            <div className="border-t border-dark-700 p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Írj üzenetet..."
                  className="input flex-1"
                  disabled
                />
                <button className="btn-primary px-3" disabled>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Products panel */}
          <div className="rounded-xl border border-dark-700 bg-dark-800">
            <div className="flex items-center justify-between border-b border-dark-700 px-4 py-3">
              <h2 className="text-sm font-semibold text-white">
                Termékek a közvetítésben
              </h2>
              <span className="rounded-full bg-brand-500/20 px-2 py-0.5 text-xs font-medium text-brand-400">
                -- termék
              </span>
            </div>

            <div className="p-4">
              <div className="flex flex-col items-center justify-center gap-2 py-6">
                <svg
                  className="h-10 w-10 text-dark-600"
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
                <p className="text-sm text-dark-500">
                  Termékek betöltése...
                </p>
              </div>

              {/* Product card skeletons */}
              <div className="space-y-3">
                <CardSkeleton />
                <CardSkeleton />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
