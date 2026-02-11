import Link from "next/link";
import { formatPrice, formatContentType } from "@/lib/utils";

type ContentCardProps = {
  content: {
    slug: string;
    title: string;
    type: string;
    priceHUF: number;
    isFree: boolean;
    thumbnailUrl: string | null;
    creator: {
      displayName: string;
      slug: string;
    };
  };
};

export function ContentCard({ content }: ContentCardProps) {
  return (
    <Link
      href={`/content/${content.slug}`}
      className="card group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-dark-700">
        {content.thumbnailUrl ? (
          <img
            src={content.thumbnailUrl}
            alt={content.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="h-10 w-10 text-dark-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
          </div>
        )}

        {/* Type badge */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-dark-900/80 px-2.5 py-1 text-xs font-medium text-dark-200 backdrop-blur-sm">
            {formatContentType(content.type)}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-white line-clamp-2 group-hover:text-brand-400 transition-colors">
          {content.title}
        </h3>
        <p className="mt-1 text-sm text-dark-400">{content.creator.displayName}</p>
        <p className="mt-2 text-sm font-bold text-brand-400">
          {content.isFree ? "Ingyenes" : formatPrice(content.priceHUF)}
        </p>
      </div>
    </Link>
  );
}
