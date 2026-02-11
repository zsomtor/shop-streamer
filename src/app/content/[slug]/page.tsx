import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getContentBySlug, getRelatedContent, hasUserPurchased, getUserWalletBalance } from "@/lib/queries";
import { formatPrice, formatDuration, formatContentType, formatDate } from "@/lib/utils";
import { ContentCard } from "@/components/content/content-card";
import { PurchaseButton } from "@/components/content/purchase-button";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const content = await getContentBySlug(params.slug);
    if (!content) return { title: "Tartalom nem található — ShopStream" };
    return {
      title: `${content.title} — ShopStream`,
      description: content.description?.slice(0, 160) ?? undefined,
    };
  } catch {
    return { title: "ShopStream" };
  }
}

export default async function ContentDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let content;
  try {
    content = await getContentBySlug(params.slug);
  } catch {
    notFound();
  }
  if (!content) notFound();

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  let isPurchased = false;
  let userBalance = 0;
  let relatedContent: Awaited<ReturnType<typeof getRelatedContent>> = [];
  try {
    [isPurchased, userBalance, relatedContent] = await Promise.all([
      userId ? hasUserPurchased(userId, content.id) : false,
      userId ? getUserWalletBalance(userId) : 0,
      getRelatedContent(content.id, content.creatorId),
    ]);
  } catch {
    // DB queries may fail
  }

  const canAccess = content.isFree || isPurchased;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main content area */}
        <div className="flex-1">
          {/* Preview / Player */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-dark-700 bg-dark-800">
            {canAccess && content.videoUrl ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href={content.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 text-brand-400 hover:text-brand-300 transition-colors"
                >
                  <svg
                    className="h-16 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    />
                  </svg>
                  <p className="text-sm font-medium">Videó megtekintése</p>
                </a>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <svg
                  className="h-16 w-16 text-dark-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <p className="text-sm text-dark-400">
                  {content.isFree ? "Tartalom előnézet" : "Vásárold meg a megtekintéshez"}
                </p>
              </div>
            )}
          </div>

          {/* Title & creator */}
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              {content.title}
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <Link
                href={`/creator/${content.creator.slug}`}
                className="flex items-center gap-3 group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/20 ring-1 ring-dark-600">
                  <span className="text-sm font-bold text-brand-400">
                    {content.creator.displayName[0]}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-brand-400 transition-colors">
                    {content.creator.displayName}
                    {content.creator.isVerified && (
                      <svg
                        className="ml-1 inline h-3.5 w-3.5 text-brand-400"
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
                  </p>
                  <p className="text-xs text-dark-400">
                    {content.creator._count.contents} tartalom
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 rounded-xl border border-dark-700 bg-dark-800 p-5">
            <h2 className="text-lg font-semibold text-white">Leírás</h2>
            {content.description ? (
              <p className="mt-3 text-dark-300 whitespace-pre-line">
                {content.description}
              </p>
            ) : (
              <p className="mt-3 text-dark-500 italic">
                Nincs leírás.
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full shrink-0 lg:w-80">
          {/* Purchase card */}
          <div className="sticky top-24 rounded-xl border border-dark-700 bg-dark-800 p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">
                {content.isFree ? "Ingyenes" : formatPrice(content.priceHUF)}
              </p>
              {!content.isFree && (
                <p className="mt-1 text-sm text-dark-400">Egyszeri vásárlás</p>
              )}
            </div>

            <div className="mt-6">
              <PurchaseButton
                contentId={content.id}
                priceHUF={content.priceHUF}
                isPurchased={isPurchased}
                isFree={content.isFree}
                isLoggedIn={!!userId}
                userBalance={userBalance}
              />
            </div>

            <div className="mt-4 space-y-3 border-t border-dark-700 pt-4">
              {[
                { label: "Formátum", value: formatContentType(content.type) },
                { label: "Időtartam", value: formatDuration(content.duration) },
                { label: "Nyelv", value: "Magyar" },
                { label: "Feltöltve", value: content.publishedAt ? formatDate(content.publishedAt) : "--" },
                { label: "Eladások", value: String(content.purchaseCount) },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-dark-400">{item.label}</span>
                  <span className="text-dark-200">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg bg-dark-850 p-3 text-center">
              <p className="text-xs text-dark-400">
                30 napos pénzvisszafizetési garancia
              </p>
            </div>
          </div>

          {/* Related content */}
          {relatedContent.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-dark-300">
                Hasonló tartalmak
              </h3>
              <div className="mt-3 space-y-4">
                {relatedContent.map((item) => (
                  <ContentCard key={item.id} content={item} />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
