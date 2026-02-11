import { ContentGridSkeleton } from "@/components/ui/loading-skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-8 w-48 rounded bg-dark-700 animate-pulse" />
      <div className="mt-2 h-5 w-72 rounded bg-dark-700/50 animate-pulse" />
      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-64">
          <div className="rounded-xl border border-dark-700 bg-dark-800 p-5 h-96 animate-pulse" />
        </aside>
        <div className="flex-1">
          <ContentGridSkeleton count={9} />
        </div>
      </div>
    </div>
  );
}
