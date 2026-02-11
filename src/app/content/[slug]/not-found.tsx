import Link from "next/link";

export default function ContentNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-white">Tartalom nem található</h1>
      <p className="mt-4 text-dark-400">
        A keresett tartalom nem létezik vagy el lett távolítva.
      </p>
      <Link href="/explore" className="btn-primary mt-8 inline-flex">
        Felfedezés
      </Link>
    </div>
  );
}
