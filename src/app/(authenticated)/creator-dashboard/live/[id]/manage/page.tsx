import Link from "next/link";

export default function ManageLiveEventPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/creator-dashboard/live"
          className="text-sm text-dark-400 hover:text-dark-200 transition-colors"
        >
          &larr; Vissza az élő eseményekhez
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-dark-50 mb-6">
        Élő esemény kezelése
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex aspect-video items-center justify-center rounded-lg bg-dark-900">
              <p className="text-dark-500 text-sm">
                Élő közvetítés előnézet
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card">
            <h2 className="text-lg font-semibold text-dark-100 mb-3">
              Közvetítés állapota
            </h2>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-dark-500" />
              <span className="text-sm text-dark-400">Offline</span>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-dark-100 mb-3">
              Statisztikák
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-dark-400">Nézők</span>
                <span className="text-dark-200">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-dark-400">Üzenetek</span>
                <span className="text-dark-200">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-dark-400">Eladások</span>
                <span className="text-dark-200">0</span>
              </div>
            </div>
          </div>

          <button className="btn-primary w-full">
            Közvetítés indítása
          </button>
        </div>
      </div>
    </div>
  );
}
