import Link from "next/link";

export default function CreatorNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-white">Alkotó nem található</h1>
      <p className="mt-4 text-dark-400">
        A keresett alkotói profil nem létezik.
      </p>
      <Link href="/explore" className="btn-primary mt-8 inline-flex">
        Felfedezés
      </Link>
    </div>
  );
}
