import Link from "next/link";

type LiveEventCardProps = {
  event: {
    id: string;
    title: string;
    status: string;
    scheduledAt: Date;
    viewerCount: number;
    creator: {
      displayName: string;
      slug: string;
    };
    _count: {
      products: number;
    };
  };
};

export function LiveEventCard({ event }: LiveEventCardProps) {
  const isLive = event.status === "LIVE";
  const scheduledDate = new Date(event.scheduledAt).toLocaleDateString("hu-HU", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link
      href={`/live/${event.id}`}
      className="group rounded-xl border border-dark-700 bg-dark-800 transition-all hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/5"
    >
      {/* Thumbnail placeholder */}
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-dark-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="h-12 w-12 text-dark-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>

        {isLive ? (
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span className="badge-live">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Élő
            </span>
            <span className="rounded-full bg-dark-900/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
              {event.viewerCount} néző
            </span>
          </div>
        ) : (
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-dark-900/80 px-2.5 py-1 text-xs font-medium text-brand-400 backdrop-blur-sm">
              {scheduledDate}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-white line-clamp-1 group-hover:text-brand-400 transition-colors">
          {event.title}
        </h3>
        <p className="mt-1 text-sm text-dark-400">{event.creator.displayName}</p>
        {event._count.products > 0 && (
          <p className="mt-1 text-xs text-dark-500">
            {event._count.products} termék
          </p>
        )}
      </div>
    </Link>
  );
}
