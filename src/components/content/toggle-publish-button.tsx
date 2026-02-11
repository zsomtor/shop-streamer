"use client";

import { useTransition } from "react";
import { toggleContentPublished } from "@/lib/actions";
import { useRouter } from "next/navigation";

export function TogglePublishButton({
  contentId,
  isPublished,
}: {
  contentId: string;
  isPublished: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleContentPublished(contentId);
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
        isPublished
          ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
          : "bg-dark-600 text-dark-300 hover:bg-dark-500"
      }`}
    >
      {isPending ? "..." : isPublished ? "Publikus" : "Rejtett"}
    </button>
  );
}
