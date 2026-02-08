import Link from "next/link";

const recentPurchases = [
  {
    id: "1",
    title: "Haladó React tanfolyam",
    creator: "Kiss Gábor",
    price: 4990,
    date: "2025-01-15",
  },
  {
    id: "2",
    title: "UI/UX Design alapok",
    creator: "Szabó Anna",
    price: 2990,
    date: "2025-01-12",
  },
  {
    id: "3",
    title: "Fotózás mesterkurzus",
    creator: "Tóth Balázs",
    price: 6990,
    date: "2025-01-08",
  },
];

const watchedContent = [
  {
    id: "1",
    title: "JavaScript tippek és trükkök",
    creator: "Kiss Gábor",
    progress: 75,
  },
  {
    id: "2",
    title: "Figma haladóknak",
    creator: "Szabó Anna",
    progress: 30,
  },
  {
    id: "3",
    title: "Természetfotózás",
    creator: "Tóth Balázs",
    progress: 100,
  },
];

export default function DashboardPage() {
  const walletBalance = 12500;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Irányítópult</h1>
        <p className="mt-1 text-dark-400">
          Üdvözlünk újra! Itt egy áttekintés a fiókodról.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Wallet balance card */}
        <Link
          href="/wallet"
          className="card flex items-center gap-4"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-500/10">
            <svg
              className="h-6 w-6 text-brand-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-dark-400">Egyenleg</p>
            <p className="text-2xl font-bold text-white">
              {walletBalance.toLocaleString("hu-HU")} Ft
            </p>
          </div>
        </Link>

        {/* Purchases count card */}
        <Link
          href="/purchases"
          className="card flex items-center gap-4"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
            <svg
              className="h-6 w-6 text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-dark-400">Vásárlások</p>
            <p className="text-2xl font-bold text-white">
              {recentPurchases.length}
            </p>
          </div>
        </Link>

        {/* Watched content card */}
        <div className="card flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
            <svg
              className="h-6 w-6 text-violet-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-dark-400">Megtekintett tartalmak</p>
            <p className="text-2xl font-bold text-white">
              {watchedContent.length}
            </p>
          </div>
        </div>
      </div>

      {/* Two-column layout for lists */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent purchases */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Legutóbbi vásárlások
            </h2>
            <Link
              href="/purchases"
              className="text-sm text-brand-400 hover:text-brand-300"
            >
              Összes
            </Link>
          </div>
          <div className="space-y-3">
            {recentPurchases.map((purchase) => (
              <div
                key={purchase.id}
                className="card flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-white">{purchase.title}</p>
                  <p className="text-sm text-dark-400">{purchase.creator}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">
                    {purchase.price.toLocaleString("hu-HU")} Ft
                  </p>
                  <p className="text-xs text-dark-500">{purchase.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Watched content */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Megtekintett tartalmak
            </h2>
          </div>
          <div className="space-y-3">
            {watchedContent.map((content) => (
              <div key={content.id} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{content.title}</p>
                    <p className="text-sm text-dark-400">{content.creator}</p>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      content.progress === 100
                        ? "text-emerald-400"
                        : "text-brand-400"
                    }`}
                  >
                    {content.progress}%
                  </span>
                </div>
                {/* Progress bar */}
                <div className="mt-3 h-1.5 w-full rounded-full bg-dark-700">
                  <div
                    className={`h-1.5 rounded-full ${
                      content.progress === 100
                        ? "bg-emerald-500"
                        : "bg-brand-500"
                    }`}
                    style={{ width: `${content.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
