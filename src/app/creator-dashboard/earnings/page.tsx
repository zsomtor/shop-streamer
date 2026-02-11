import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCreatorProfile, getCreatorEarnings } from "@/lib/queries";
import { formatPrice, formatDate } from "@/lib/utils";

export default async function EarningsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/bejelentkezes");
  if (session.user.role !== "CREATOR" && session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const profile = await getCreatorProfile(session.user.id);
  if (!profile) redirect("/dashboard");

  const sales = await getCreatorEarnings(profile.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-50 mb-6">Bevételek</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <div className="card">
          <p className="text-sm text-dark-400">Összes bevétel</p>
          <p className="mt-1 text-2xl font-bold text-dark-50">
            {formatPrice(profile.totalEarnings)}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-dark-400">Elérhető egyenleg</p>
          <p className="mt-1 text-2xl font-bold text-brand-500">
            {formatPrice(profile.availableBalance)}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-dark-400">Platformdíj</p>
          <p className="mt-1 text-2xl font-bold text-dark-50">
            {Math.round((1 - Number(profile.commissionRate)) * 100)}%
          </p>
          <p className="mt-0.5 text-xs text-dark-500">
            Te kapod: {Math.round(Number(profile.commissionRate) * 100)}%
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">
          Eladások
        </h2>

        {sales.length > 0 ? (
          <div className="space-y-3">
            {sales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between text-sm border-b border-dark-700/50 pb-3 last:border-0">
                <div>
                  <p className="text-dark-200 font-medium">{sale.content.title}</p>
                  <p className="text-xs text-dark-500">
                    {sale.user.name ?? "Névtelen"} · {formatDate(sale.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-400">
                    +{formatPrice(sale.creatorEarningHUF)}
                  </p>
                  <p className="text-xs text-dark-500">
                    összesen: {formatPrice(sale.amountHUF)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-dark-400">
            Még nincsenek eladásaid. Amikor valaki megvásárolja a tartalmaidat, itt fogod látni.
          </p>
        )}
      </div>
    </div>
  );
}
