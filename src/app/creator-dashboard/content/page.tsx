import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCreatorProfile, getCreatorContentList } from "@/lib/queries";
import { formatPrice, formatContentType } from "@/lib/utils";
import { TogglePublishButton } from "@/components/content/toggle-publish-button";

export default async function ContentManagementPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/bejelentkezes");
  if (session.user.role !== "CREATOR" && session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  let profile;
  try {
    profile = await getCreatorProfile(session.user.id);
  } catch {
    // DB may not be initialized yet
  }
  if (!profile) redirect("/dashboard");

  let contents: Awaited<ReturnType<typeof getCreatorContentList>> = [];
  try {
    contents = await getCreatorContentList(profile.id);
  } catch {
    // DB may not be initialized yet
  }

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

      {contents.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700 text-left text-sm text-dark-400">
                <th className="pb-3 pr-4 font-medium">Cím</th>
                <th className="pb-3 pr-4 font-medium">Típus</th>
                <th className="pb-3 pr-4 font-medium">Ár</th>
                <th className="pb-3 pr-4 font-medium text-center">Eladás</th>
                <th className="pb-3 pr-4 font-medium text-center">Megtekintés</th>
                <th className="pb-3 font-medium text-center">Állapot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700/50">
              {contents.map((content) => (
                <tr key={content.id} className="text-sm">
                  <td className="py-3 pr-4">
                    <Link
                      href={`/content/${content.slug}`}
                      className="font-medium text-dark-100 hover:text-brand-400 transition-colors"
                    >
                      {content.title}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-dark-400">
                    {formatContentType(content.type)}
                  </td>
                  <td className="py-3 pr-4 text-dark-200">
                    {content.isFree ? "Ingyenes" : formatPrice(content.priceHUF)}
                  </td>
                  <td className="py-3 pr-4 text-center text-dark-300">
                    {content.purchaseCount}
                  </td>
                  <td className="py-3 pr-4 text-center text-dark-300">
                    {content.viewCount}
                  </td>
                  <td className="py-3 text-center">
                    <TogglePublishButton
                      contentId={content.id}
                      isPublished={content.isPublished}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
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
      )}
    </div>
  );
}
