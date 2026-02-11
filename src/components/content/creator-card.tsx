import Link from "next/link";

type CreatorCardProps = {
  creator: {
    slug: string;
    displayName: string;
    bio: string | null;
    isVerified: boolean;
    _count: {
      contents: number;
    };
  };
};

export function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <Link
      href={`/creator/${creator.slug}`}
      className="group rounded-xl border border-dark-700 bg-dark-800 p-6 text-center transition-all hover:border-brand-500/50"
    >
      {/* Avatar */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/20 ring-2 ring-dark-600 group-hover:ring-brand-500/50 transition-all">
        <span className="text-2xl font-bold text-brand-400">
          {creator.displayName[0]}
        </span>
      </div>

      <h3 className="mt-4 font-semibold text-white group-hover:text-brand-400 transition-colors">
        {creator.displayName}
        {creator.isVerified && (
          <svg
            className="ml-1 inline h-4 w-4 text-brand-400"
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
      </h3>

      {creator.bio && (
        <p className="mt-1 text-sm text-dark-400 line-clamp-2">{creator.bio}</p>
      )}

      <div className="mt-3 inline-flex items-center gap-1 text-xs text-dark-500">
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        {creator._count.contents} tartalom
      </div>
    </Link>
  );
}
