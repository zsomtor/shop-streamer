export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-dark-700 bg-dark-800">
        <div className="h-48 animate-pulse rounded-t-xl bg-dark-700 sm:h-56" />
        <div className="px-6 pb-6">
          <div className="-mt-12 h-24 w-24 animate-pulse rounded-full bg-dark-700 sm:-mt-14 sm:h-28 sm:w-28" />
          <div className="mt-4 h-7 w-48 animate-pulse rounded bg-dark-700" />
          <div className="mt-2 h-5 w-32 animate-pulse rounded bg-dark-700/50" />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="aspect-video rounded-lg bg-dark-700" />
            <div className="mt-4 h-5 w-3/4 rounded bg-dark-700" />
            <div className="mt-2 h-4 w-1/2 rounded bg-dark-700/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
