import { Suspense } from "react";
import Link from "next/link";
import { getPublishedContent } from "@/lib/queries";
import { ContentCard } from "@/components/content/content-card";
import { ExploreFilters } from "./explore-filters";

export const metadata = {
  title: "Felfedezés — ShopStream",
  description: "Böngéssz a tartalmak között, szűrj típus, ár és alkotó szerint.",
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = {
    search: typeof searchParams.search === "string" ? searchParams.search : undefined,
    type: typeof searchParams.type === "string" ? searchParams.type : undefined,
    sort: typeof searchParams.sort === "string" ? searchParams.sort : undefined,
    free: typeof searchParams.free === "string" ? searchParams.free : undefined,
    page: typeof searchParams.page === "string" ? searchParams.page : undefined,
  };

  let items: Awaited<ReturnType<typeof getPublishedContent>>["items"] = [];
  let total = 0;
  let totalPages = 0;
  let page = 1;

  try {
    const result = await getPublishedContent(params);
    items = result.items;
    total = result.total;
    totalPages = result.totalPages;
    page = result.page;
  } catch {
    // DB might not be ready
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Felfedezés</h1>
        <p className="mt-2 text-dark-400">
          Böngéssz a tartalmak között és találd meg, ami érdekel
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        {/* Filter sidebar */}
        <aside className="w-full shrink-0 lg:w-64">
          <Suspense fallback={<div className="rounded-xl border border-dark-700 bg-dark-800 p-5 h-96 animate-pulse" />}>
            <ExploreFilters />
          </Suspense>
        </aside>

        {/* Content grid */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-dark-400">
              {total} tartalom található
            </p>
          </div>

          {items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <ContentCard key={item.id} content={item} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-4">
                  {page > 1 && (
                    <Link
                      href={`/explore?${new URLSearchParams({
                        ...Object.fromEntries(
                          Object.entries(params).filter(([, v]) => v !== undefined) as [string, string][]
                        ),
                        page: String(page - 1),
                      }).toString()}`}
                      className="btn-secondary px-4 py-2 text-sm"
                    >
                      &larr; Előző
                    </Link>
                  )}
                  <span className="text-sm text-dark-400">
                    {page} / {totalPages} oldal
                  </span>
                  {page < totalPages && (
                    <Link
                      href={`/explore?${new URLSearchParams({
                        ...Object.fromEntries(
                          Object.entries(params).filter(([, v]) => v !== undefined) as [string, string][]
                        ),
                        page: String(page + 1),
                      }).toString()}`}
                      className="btn-secondary px-4 py-2 text-sm"
                    >
                      Következő &rarr;
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="mt-12 text-center">
              <svg
                className="mx-auto h-16 w-16 text-dark-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-white">
                Nincs találat
              </h3>
              <p className="mt-2 text-dark-400">
                Próbálj más keresési feltételeket vagy szűrőket használni.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
