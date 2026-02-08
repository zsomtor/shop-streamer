"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  {
    label: "Áttekintés",
    href: "/creator-dashboard",
  },
  {
    label: "Tartalmak",
    href: "/creator-dashboard/content",
  },
  {
    label: "Élő események",
    href: "/creator-dashboard/live",
  },
  {
    label: "Termékek",
    href: "/creator-dashboard/products",
  },
  {
    label: "Bevételek",
    href: "/creator-dashboard/earnings",
  },
];

export default function CreatorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/creator-dashboard") {
      return pathname === "/creator-dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-dark-800 border-r border-dark-700 transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-dark-700 px-6">
          <span className="text-xl font-bold text-brand-500">ShopStream</span>
          <span className="text-xs font-medium text-dark-400">Alkotó</span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-brand-500 text-white"
                  : "text-dark-300 hover:bg-dark-700 hover:text-dark-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-dark-700 p-4">
          <Link
            href="/"
            className="text-sm text-dark-400 hover:text-dark-200 transition-colors"
          >
            Vissza a főoldalra
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <header className="flex h-16 items-center border-b border-dark-700 bg-dark-900 px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-dark-300 hover:bg-dark-800 hover:text-dark-100"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="ml-3 text-lg font-bold text-brand-500">
            ShopStream
          </span>
        </header>

        <main className="flex-1 overflow-y-auto bg-dark-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
