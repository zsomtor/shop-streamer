import type { Metadata } from "next";
import "./globals.css";
import AuthSessionProvider from "@/components/providers/session-provider";

export const metadata: Metadata = {
  title: "ShopStream — Tartalom & Élő Vásárlás",
  description:
    "Magyar tartalom piactér és élő vásárlás platform. Vásárolj exkluzív tartalmakat és szerezz kedvezményeket élő közvetítések során.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className="dark">
      <body className="font-sans">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
