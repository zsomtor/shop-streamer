import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-dark-700 bg-dark-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Platform</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/explore" className="text-sm text-dark-400 hover:text-dark-200">
                  Felfedezés
                </Link>
              </li>
              <li>
                <Link href="/live" className="text-sm text-dark-400 hover:text-dark-200">
                  Élő közvetítések
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Alkotóknak</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/creator-dashboard" className="text-sm text-dark-400 hover:text-dark-200">
                  Alkotói panel
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-dark-400 hover:text-dark-200">
                  Jelentkezz alkotónak
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Segítség</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="#" className="text-sm text-dark-400 hover:text-dark-200">
                  GYIK
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-dark-400 hover:text-dark-200">
                  Kapcsolat
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Jogi</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="#" className="text-sm text-dark-400 hover:text-dark-200">
                  ÁSZF
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-dark-400 hover:text-dark-200">
                  Adatvédelem
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-dark-800 pt-6">
          <p className="text-center text-sm text-dark-500">
            &copy; {new Date().getFullYear()} ShopStream. Minden jog fenntartva.
          </p>
        </div>
      </div>
    </footer>
  );
}
