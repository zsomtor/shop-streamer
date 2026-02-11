import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserPurchases } from "@/lib/queries";
import { formatPrice, formatDate, formatContentType } from "@/lib/utils";

export default async function PurchasesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/bejelentkezes");

  let purchases: Awaited<ReturnType<typeof getUserPurchases>> = [];
  try {
    purchases = await getUserPurchases(session.user.id);
  } catch {
    // DB may not be initialized yet
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Vásárlásaim</h1>
        <p className="mt-1 text-dark-400">
          Itt találod a megvásárolt tartalmaidat ({purchases.length} darab).
        </p>
      </div>

      {purchases.length > 0 ? (
        <div className="space-y-3">
          {purchases.map((purchase) => (
            <Link
              key={purchase.id}
              href={`/content/${purchase.content.slug}`}
              className="card flex items-center justify-between group"
            >
              <div>
                <p className="font-medium text-white group-hover:text-brand-400 transition-colors">
                  {purchase.content.title}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-dark-400">
                    {purchase.content.creator.displayName}
                  </span>
                  <span className="text-dark-600">·</span>
                  <span className="text-xs text-dark-500">
                    {formatContentType(purchase.content.type)}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-white">{formatPrice(purchase.amountHUF)}</p>
                <p className="text-xs text-dark-500">{formatDate(purchase.createdAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}
