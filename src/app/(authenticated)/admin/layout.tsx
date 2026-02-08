"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Áttekintés", href: "/admin" },
  { label: "Alkotók kezelése", href: "/admin/creators" },
  { label: "Tartalom moderáció", href: "/admin/content" },
  { label: "Tranzakciók", href: "/admin/transactions" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <nav className="border-b border-dark-700 bg-dark-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-brand-500">
                ShopStream
              </span>
              <span className="rounded bg-red-600/20 px-2 py-0.5 text-xs font-semibold text-red-400">
                Admin
              </span>
            </div>
            <Link
              href="/"
              className="text-sm text-dark-400 hover:text-dark-200 transition-colors"
            >
              Vissza a főoldalra
            </Link>
          </div>

          <div className="-mb-px flex space-x-1 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "border-brand-500 text-brand-500"
                    : "border-transparent text-dark-400 hover:border-dark-600 hover:text-dark-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
