import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserPurchases, getUserWalletBalance } from "@/lib/queries";
import { formatPrice, formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/bejelentkezes");

  let purchases: Awaited<ReturnType<typeof getUserPurchases>> = [];
  let walletBalance = 0;
  try {
    [purchases, walletBalance] = await Promise.all([
      getUserPurchases(session.user.id),
      getUserWalletBalance(session.user.id),
    ]);
  } catch {
    // DB may not be initialized yet
  }

  const recentPurchases = purchases.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Irányítópult</h1>
        <p className="mt-1 text-dark-400">
          Üdvözlünk újra{session.user.name ? `, ${session.user.name}` : ""}! Itt egy áttekintés a fiókodról.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Wallet balance card */}
        <Link href="/wallet" className="card flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-500/10">
            <svg className="h-6 w-6 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-dark-400">Egyenleg</p>
            <p className="text-2xl font-bold text-white">{formatPrice(walletBalance)}</p>
          </div>
        </Link>

        {/* Purchases count card */}
        <Link href="/purchases" className="card flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
            <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-dark-400">Vásárlások</p>
            <p className="text-2xl font-bold text-white">{purchases.length}</p>
          </div>
        </Link>

        {/* Explore card */}
        <Link href="/explore" className="card flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
            <svg className="h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-dark-400">Felfedezés</p>
            <p className="text-sm font-medium text-white">Böngéssz új tartalmak között</p>
          </div>
        </Link>
      </div>

      {/* Become a Creator CTA — only for BUYER users */}
      {session.user.role === "BUYER" && (
        <div className="mb-8 rounded-xl border border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-brand-600/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Legyél te is alkotó!
              </h2>
              <p className="mt-1 text-sm text-dark-400">
                Hozd létre az alkotói profilodat, töltsd fel tartalmaidat és keress bevételt az eladásaid után.
              </p>
            </div>
            <Link
              href="/alkotoi-regisztracio"
              className="btn-primary shrink-0"
            >
              Alkotóvá válás
            </Link>
          </div>
        </div>
      )}

      {/* Recent purchases */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Legutóbbi vásárlások
          </h2>
          {purchases.length > 0 && (
            <Link href="/purchases" className="text-sm text-brand-400 hover:text-brand-300">
              Összes
            </Link>
          )}
        </div>

        {recentPurchases.length > 0 ? (
          <div className="space-y-3">
            {recentPurchases.map((purchase) => (
              <Link
                key={purchase.id}
                href={`/content/${purchase.content.slug}`}
                className="card flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-white">{purchase.content.title}</p>
                  <p className="text-sm text-dark-400">{purchase.content.creator.displayName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">{formatPrice(purchase.amountHUF)}</p>
                  <p className="text-xs text-dark-500">{formatDate(purchase.createdAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dark-700 bg-dark-800 p-8 text-center">
            <p className="text-dark-400">Még nincs vásárlásod.</p>
            <Link href="/explore" className="btn-primary mt-4 inline-flex">
              Tartalmak felfedezése
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
