export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <div className="aspect-video w-full animate-pulse rounded-xl bg-dark-800" />
          <div className="mt-6 h-8 w-3/4 animate-pulse rounded bg-dark-700" />
          <div className="mt-3 flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-full bg-dark-700" />
            <div className="h-5 w-32 animate-pulse rounded bg-dark-700" />
          </div>
          <div className="mt-6 h-40 animate-pulse rounded-xl bg-dark-800" />
        </div>
        <aside className="w-full shrink-0 lg:w-80">
          <div className="h-64 animate-pulse rounded-xl bg-dark-800" />
        </aside>
      </div>
    </div>
  );
}
