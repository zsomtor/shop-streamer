export function formatPrice(priceHUF: number): string {
  if (priceHUF === 0) return "Ingyenes";
  return `${priceHUF.toLocaleString("hu-HU")} Ft`;
}

export function formatDuration(seconds: number | null): string {
  if (!seconds) return "--";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0 && minutes > 0) return `${hours} óra ${minutes} perc`;
  if (hours > 0) return `${hours} óra`;
  return `${minutes} perc`;
}

export function formatContentType(type: string): string {
  const map: Record<string, string> = {
    VIDEO: "Videó",
    PODCAST: "Podcast",
    LIVE_REPLAY: "Élő visszajátszás",
    EXCLUSIVE: "Exkluzív",
  };
  return map[type] ?? type;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
