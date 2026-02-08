import Link from "next/link";

export default function PurchasesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Vásárlásaim</h1>
        <p className="mt-1 text-dark-400">
          Itt találod a megvásárolt tartalmaidat.
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-white">
          Még nincs vásárlásod
        </h2>
        <p className="mt-2 text-sm text-dark-400">
          Fedezd fel a piacteret és vásárolj exkluzív tartalmakat kedvenc
          alkotóidtól!
        </p>
        <Link href="/explore" className="btn-primary mt-6 inline-flex">
          Tartalmak felfedezése
        </Link>
      </div>
    </div>
  );
}
