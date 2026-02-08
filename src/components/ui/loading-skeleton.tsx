export function CardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="aspect-video w-full rounded-lg bg-dark-700" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-3/4 rounded bg-dark-700" />
        <div className="h-3 w-1/2 rounded bg-dark-700" />
        <div className="h-3 w-1/4 rounded bg-dark-700" />
      </div>
    </div>
  );
}

export function ContentGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-4">
      <div className="h-8 w-1/3 rounded bg-dark-700" />
      <div className="h-4 w-2/3 rounded bg-dark-700" />
      <ContentGridSkeleton />
    </div>
  );
}
