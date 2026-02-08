import Link from "next/link";

export default function LiveEventsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark-50">Élő események</h1>
        <button className="btn-primary">+ Új élő esemény</button>
      </div>

      <div className="card">
        <div className="flex flex-col items-center justify-center py-12">
          <svg
            className="h-16 w-16 text-dark-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <p className="text-dark-400 text-sm mb-2">
            Nincs tervezett élő esemény.
          </p>
          <p className="text-dark-500 text-xs">
            Hozz létre egy új élő eseményt, hogy valós időben kapcsolódj a
            közönségeddel.
          </p>
        </div>
      </div>
    </div>
  );
}
