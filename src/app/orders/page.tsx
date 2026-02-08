import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Rendeléseim</h1>
        <p className="mt-1 text-dark-400">
          Az élő vásárlások során leadott rendeléseid.
        </p>
      </div>

      {/* Empty state */}
      <div className="rounded-xl border border-dark-700 bg-dark-800 px-6 py-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dark-700">
          <svg
            className="h-8 w-8 text-dark-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-white">
          Még nincs rendelésed
        </h2>
        <p className="mt-2 text-sm text-dark-400">
          Csatlakozz egy élő közvetítéshez és rendelj termékeket valós időben,
          exkluzív kedvezményekkel!
        </p>
        <Link href="/live" className="btn-primary mt-6 inline-flex">
          Élő közvetítések megtekintése
        </Link>
      </div>
    </div>
  );
}
