import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCreatorBySlug, getCreatorContent } from "@/lib/queries";
import { ContentCard } from "@/components/content/content-card";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const creator = await getCreatorBySlug(params.slug);
  if (!creator) return { title: "Alkotó nem található — ShopStream" };
  return {
    title: `${creator.displayName} — ShopStream`,
    description: creator.bio?.slice(0, 160) ?? `${creator.displayName} alkotói profilja a ShopStream-en.`,
  };
}

export default async function CreatorProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const creator = await getCreatorBySlug(params.slug);
  if (!creator) notFound();

  const contents = await getCreatorContent(params.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Creator header */}
      <div className="rounded-xl border border-dark-700 bg-dark-800">
        {/* Banner */}
        <div className="h-48 rounded-t-xl bg-gradient-to-r from-brand-600/20 via-dark-700 to-brand-500/20 sm:h-56" />

        <div className="px-6 pb-6">
          {/* Avatar + info */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
            <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-dark-800 bg-gradient-to-br from-brand-500/30 to-brand-600/30 ring-2 ring-dark-600 sm:-mt-14 sm:h-28 sm:w-28">
              <span className="text-3xl font-bold text-brand-400">
                {creator.displayName[0]}
              </span>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white">
                {creator.displayName}
                {creator.isVerified && (
                  <svg
                    className="ml-2 inline h-5 w-5 text-brand-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </h1>
              <p className="mt-1 text-dark-400">@{creator.slug}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-dark-700 pt-6 text-center">
            <div>
              <p className="text-xl font-bold text-white">{creator._count.contents}</p>
              <p className="text-xs text-dark-400">Tartalom</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">{creator._count.liveEvents}</p>
              <p className="text-xs text-dark-400">Élő esemény</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">
                {contents.reduce((sum, c) => sum + c.purchaseCount, 0)}
              </p>
              <p className="text-xs text-dark-400">Eladás</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio section */}
      {creator.bio && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-white">Bemutatkozás</h2>
          <div className="mt-3 rounded-xl border border-dark-700 bg-dark-800 p-5">
            <p className="text-dark-300 whitespace-pre-line">{creator.bio}</p>
          </div>
        </div>
      )}

      {/* Content grid */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-white mb-6">
          Tartalmak ({contents.length})
        </h2>

        {contents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contents.map((item) => (
              <ContentCard key={item.id} content={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dark-700 bg-dark-800 p-12 text-center">
            <p className="text-dark-400">Ez az alkotó még nem töltött fel tartalmat.</p>
          </div>
        )}
      </div>
    </div>
  );
}
