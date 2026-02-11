export const dynamic = "force-dynamic";

import Link from "next/link";
import { getFeaturedContent, getUpcomingLiveEvents, getActiveCreators, getPlatformStats, getLiveNowCount } from "@/lib/queries";
import { ContentCard } from "@/components/content/content-card";
import { CreatorCard } from "@/components/content/creator-card";
import { LiveEventCard } from "@/components/content/live-event-card";

export default async function HomePage() {
  let featuredContent: Awaited<ReturnType<typeof getFeaturedContent>> = [];
  let upcomingEvents: Awaited<ReturnType<typeof getUpcomingLiveEvents>> = [];
  let creators: Awaited<ReturnType<typeof getActiveCreators>> = [];
  let stats = { creators: 0, contents: 0, users: 0 };
  let liveNow = 0;

  try {
    [featuredContent, upcomingEvents, creators, stats, liveNow] = await Promise.all([
      getFeaturedContent(6),
      getUpcomingLiveEvents(4),
      getActiveCreators(4),
      getPlatformStats(),
      getLiveNowCount(),
    ]);
  } catch {
    // DB might not be initialized yet — show page with empty data
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-600/10 via-transparent to-transparent" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            {liveNow > 0 && (
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-400">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                {liveNow} alkotó most közvetít
              </div>
            )}

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Exkluzív tartalmak,{" "}
              <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                élő vásárlás
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dark-300 sm:text-xl">
              Fedezd fel a legjobb magyar alkotók prémium tartalmait. Csatlakozz
              élő közvetítésekhez, vásárolj egyedi termékeket és támogasd kedvenc
              alkotóidat — mindezt egy helyen.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/explore" className="btn-primary px-8 py-3 text-base">
                Felfedezés
              </Link>
              <Link
                href="/live"
                className="btn-secondary px-8 py-3 text-base"
              >
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  Élő közvetítések
                </span>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-dark-700/50 pt-8">
              <div>
                <p className="text-2xl font-bold text-white sm:text-3xl">{stats.creators}+</p>
                <p className="mt-1 text-sm text-dark-400">Alkotó</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white sm:text-3xl">{stats.contents}+</p>
                <p className="mt-1 text-sm text-dark-400">Tartalom</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white sm:text-3xl">{stats.users}+</p>
                <p className="mt-1 text-sm text-dark-400">Felhasználó</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kiemelt tartalmak */}
      {featuredContent.length > 0 && (
        <section className="bg-dark-900">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Kiemelt tartalmak
                </h2>
                <p className="mt-2 text-dark-400">
                  A legjobb minőségű tartalmak, kézzel válogatva
                </p>
              </div>
              <Link
                href="/explore"
                className="hidden text-sm font-medium text-brand-400 transition-colors hover:text-brand-300 sm:block"
              >
                Összes megtekintése &rarr;
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredContent.map((item) => (
                <ContentCard key={item.id} content={item} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/explore"
                className="text-sm font-medium text-brand-400 transition-colors hover:text-brand-300"
              >
                Összes megtekintése &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Közelgő élő események */}
      {upcomingEvents.length > 0 && (
        <section className="border-t border-dark-700/50 bg-dark-850">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Közelgő élő események
                </h2>
                <p className="mt-2 text-dark-400">
                  Ne maradj le az exkluzív élő közvetítésekről
                </p>
              </div>
              <Link
                href="/live"
                className="hidden text-sm font-medium text-brand-400 transition-colors hover:text-brand-300 sm:block"
              >
                Összes megtekintése &rarr;
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {upcomingEvents.map((event) => (
                <LiveEventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Népszerű alkotók */}
      {creators.length > 0 && (
        <section className="bg-dark-900">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Népszerű alkotók
                </h2>
                <p className="mt-2 text-dark-400">
                  Ismerd meg a platform legkedveltebb alkotóit
                </p>
              </div>
              <Link
                href="/explore"
                className="hidden text-sm font-medium text-brand-400 transition-colors hover:text-brand-300 sm:block"
              >
                Összes alkotó &rarr;
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {creators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-t border-dark-700/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-8 py-16 text-center shadow-2xl shadow-brand-500/20 sm:px-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
            <div className="relative">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Legyél te is alkotó!
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
                Oszd meg tudásodat, építsd a közösséged és keress pénzt a
                tartalmaid után. Csatlakozz a ShopStream alkotói közösségéhez.
              </p>
              <div className="mt-8">
                <Link
                  href="/auth/bejelentkezes"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-brand-600 transition-colors hover:bg-brand-50"
                >
                  Regisztrálj alkotóként
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
