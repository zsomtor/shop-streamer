import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserWalletBalance, getUserWalletTransactions } from "@/lib/queries";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { TopUpForm } from "@/components/wallet/top-up-form";

export default async function WalletPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/bejelentkezes");

  const [balance, transactions] = await Promise.all([
    getUserWalletBalance(session.user.id),
    getUserWalletTransactions(session.user.id),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Tárca</h1>
        <p className="mt-1 text-dark-400">
          Kezeld az egyenleged és tekintsd meg a tranzakcióidat.
        </p>
      </div>

      {/* Balance card */}
      <div className="mb-8 rounded-xl border border-dark-700 bg-gradient-to-br from-dark-800 to-dark-900 p-6">
        <p className="text-sm font-medium text-dark-400">Jelenlegi egyenleg</p>
        <p className="mt-1 text-4xl font-bold text-white">
          {balance.toLocaleString("hu-HU")}{" "}
          <span className="text-xl text-dark-300">Ft</span>
        </p>
      </div>

      {/* Top-up section */}
      <div className="mb-8">
        <TopUpForm />
      </div>

      {/* Transaction history */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          Tranzakciós előzmények
        </h2>

        {transactions.length > 0 ? (
          <div className="space-y-2">
            {transactions.map((tx) => {
              const isCredit = tx.amountHUF > 0;
              const typeLabel = {
                TOP_UP: "Feltöltés",
                PURCHASE: "Vásárlás",
                REFUND: "Visszatérítés",
                CREATOR_PAYOUT: "Alkotói kifizetés",
              }[tx.type];

              return (
                <div key={tx.id} className="card flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{typeLabel}</p>
                    <p className="text-xs text-dark-500">{formatDateTime(tx.createdAt)}</p>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      isCredit ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {isCredit ? "+" : ""}
                    {tx.amountHUF.toLocaleString("hu-HU")} Ft
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dark-700 bg-dark-800 p-8 text-center">
            <p className="text-dark-400">Még nincsenek tranzakcióid.</p>
          </div>
        )}
      </div>
    </div>
  );
}
