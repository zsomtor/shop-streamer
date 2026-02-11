import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCreatorProfile, getCreatorDashboardStats } from "@/lib/queries";
import { formatPrice, formatDate } from "@/lib/utils";

export default async function CreatorDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/bejelentkezes");
  if (session.user.role !== "CREATOR" && session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const profile = await getCreatorProfile(session.user.id);
  if (!profile) redirect("/dashboard");

  const stats = await getCreatorDashboardStats(profile.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-50 mb-6">
        Alkotói Irányítópult
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-sm text-dark-400">Összes bevétel</p>
          <p className="mt-1 text-2xl font-bold text-dark-50">
            {formatPrice(stats.totalEarnings)}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-dark-400">Elérhető egyenleg</p>
          <p className="mt-1 text-2xl font-bold text-brand-500">
            {formatPrice(stats.availableBalance)}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-dark-400">Tartalmak száma</p>
          <p className="mt-1 text-2xl font-bold text-dark-50">
            {stats.contentCount}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-dark-400">Megtekintések</p>
          <p className="mt-1 text-2xl font-bold text-dark-50">
            {stats.totalViews.toLocaleString("hu-HU")}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">
            Legutóbbi tartalmak
          </h2>
          {stats.recentContent.length > 0 ? (
            <div className="space-y-3">
              {stats.recentContent.map((content) => (
                <div key={content.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-dark-200 font-medium">{content.title}</p>
                    <p className="text-xs text-dark-500">
                      {content.publishedAt ? formatDate(content.publishedAt) : "Piszkozat"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-dark-400">{content.purchaseCount} eladás</span>
                    <span className={`h-2 w-2 rounded-full ${content.isPublished ? "bg-emerald-400" : "bg-dark-500"}`} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-dark-400">
              Még nincsenek tartalmaid.{" "}
              <Link href="/creator-dashboard/content/new" className="text-brand-400 hover:text-brand-300">
                Kezdj el feltölteni!
              </Link>
            </p>
          )}
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">
            Gyors műveletek
          </h2>
          <div className="space-y-3">
            <Link
              href="/creator-dashboard/content/new"
              className="btn-primary w-full justify-center"
            >
              + Új tartalom feltöltése
            </Link>
            <Link
              href="/creator-dashboard/content"
              className="btn-secondary w-full justify-center"
            >
              Tartalmak kezelése
            </Link>
            <Link
              href="/creator-dashboard/earnings"
              className="btn-secondary w-full justify-center"
            >
              Bevételek megtekintése
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
