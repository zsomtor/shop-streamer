import Link from "next/link";

export default function ContentManagementPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark-50">
          Tartalmak kezelése
        </h1>
        <Link href="/creator-dashboard/content/new" className="btn-primary">
          + Új tartalom
        </Link>
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
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <p className="text-dark-400 text-sm mb-4">
            Még nincsenek tartalmaid.
          </p>
          <Link
            href="/creator-dashboard/content/new"
            className="btn-primary"
          >
            Első tartalom feltöltése
          </Link>
        </div>
      </div>
    </div>
  );
}
