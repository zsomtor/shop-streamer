import Link from "next/link";

const PLACEHOLDER_CONTENT = [
  {
    id: 1,
    title: "Fotózás alapjai: Természetes fény mesterkurzus",
    creator: "Kovács Anna",
    price: "4 990 Ft",
    category: "Fotózás",
  },
  {
    id: 2,
    title: "Digitális illusztráció haladóknak",
    creator: "Szabó Márton",
    price: "7 490 Ft",
    category: "Design",
  },
  {
    id: 3,
    title: "Webfejlesztés A-tól Z-ig: React kurzus",
    creator: "Nagy Péter",
    price: "12 990 Ft",
    category: "Fejlesztés",
  },
  {
    id: 4,
    title: "Kézműves ékszerkészítés otthon",
    creator: "Tóth Eszter",
    price: "3 490 Ft",
    category: "Kézműves",
  },
  {
    id: 5,
    title: "Gasztro vlog: Magyar konyhák titkai",
    creator: "Fekete Gábor",
    price: "2 990 Ft",
    category: "Gasztro",
  },
  {
    id: 6,
    title: "Személyes márkaépítés lépésről lépésre",
    creator: "Balogh Réka",
    price: "8 990 Ft",
    category: "Marketing",
  },
];

const PLACEHOLDER_LIVE_EVENTS = [
  {
    id: 1,
    title: "Tavaszi kollekció bemutató - Élő vásárlás",
    creator: "Varga Dóra",
    viewers: 342,
    isLive: true,
  },
  {
    id: 2,
    title: "Vintage bútor felújítás workshop",
    creator: "Kiss László",
    viewers: 128,
    isLive: true,
  },
  {
    id: 3,
    title: "Kézműves szappan készítés - Karácsonyi ajándékok",
    creator: "Molnár Júlia",
    startsAt: "Ma 18:00",
    isLive: false,
  },
];

const PLACEHOLDER_CREATORS = [
  { id: 1, name: "Kovács Anna", category: "Fotózás", followers: "12.4k" },
  { id: 2, name: "Szabó Márton", category: "Design", followers: "8.7k" },
  { id: 3, name: "Nagy Péter", category: "Fejlesztés", followers: "23.1k" },
  { id: 4, name: "Tóth Eszter", category: "Kézműves", followers: "15.2k" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-600/10 via-transparent to-transparent" />

        {/* Decorative grid */}
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-400">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              3 alkotó most közvetít
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Exkluzív tartalmak,{" "}
              <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                élő vásárlás
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dark-300 sm:text-xl">
              Fedezd fel a legjobb magyar alkotók prémium tartalmait. Csatlakozz
              élő közvetítésekhez, vásárolj egyedi termékeket és támogasd kedvenc
              alkotóidat -- mindezt egy helyen.
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
                <p className="text-2xl font-bold text-white sm:text-3xl">500+</p>
                <p className="mt-1 text-sm text-dark-400">Alkotó</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white sm:text-3xl">10 000+</p>
                <p className="mt-1 text-sm text-dark-400">Tartalom</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white sm:text-3xl">50 000+</p>
                <p className="mt-1 text-sm text-dark-400">Felhasználó</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Now Teaser */}
      <section className="border-y border-dark-700/50 bg-dark-850">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="badge-live">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Élő
              </span>
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Most közvetítenek
              </h2>
            </div>
            <Link
              href="/live"
              className="text-sm font-medium text-brand-400 transition-colors hover:text-brand-300"
            >
              Összes megtekintése &rarr;
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PLACEHOLDER_LIVE_EVENTS.map((event) => (
              <Link
                key={event.id}
                href={`/live/${event.id}`}
                className="group rounded-xl border border-dark-700 bg-dark-800 transition-all hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/5"
              >
                {/* Thumbnail placeholder */}
                <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-dark-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-dark-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>

                  {event.isLive ? (
                    <div className="absolute left-3 top-3 flex items-center gap-2">
                      <span className="badge-live">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        Élő
                      </span>
                      <span className="rounded-full bg-dark-900/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                        {event.viewers} néző
                      </span>
                    </div>
                  ) : (
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-dark-900/80 px-2.5 py-1 text-xs font-medium text-brand-400 backdrop-blur-sm">
                        {event.startsAt}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-white line-clamp-1 group-hover:text-brand-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm text-dark-400">{event.creator}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Kiemelt tartalmak */}
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
            {PLACEHOLDER_CONTENT.map((item) => (
              <Link
                key={item.id}
                href={`/content/${item.id}`}
                className="card group cursor-pointer"
              >
                {/* Thumbnail placeholder */}
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-dark-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="h-10 w-10 text-dark-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                      />
                    </svg>
                  </div>

                  {/* Category badge */}
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-dark-900/80 px-2.5 py-1 text-xs font-medium text-dark-200 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-white line-clamp-2 group-hover:text-brand-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-dark-400">{item.creator}</p>
                  <p className="mt-2 text-sm font-bold text-brand-400">
                    {item.price}
                  </p>
                </div>
              </Link>
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

      {/* Közelgő élő események */}
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
            {[
              {
                title: "Nyári divat kollekció premier",
                creator: "Varga Dóra",
                date: "Feb 10, 18:00",
                attendees: 156,
              },
              {
                title: "Gasztro est: Street food otthon",
                creator: "Fekete Gábor",
                date: "Feb 11, 19:30",
                attendees: 89,
              },
              {
                title: "Tech talk: AI a mindennapokban",
                creator: "Nagy Péter",
                date: "Feb 12, 17:00",
                attendees: 234,
              },
              {
                title: "Kézműves workshop: Makramé alapok",
                creator: "Molnár Júlia",
                date: "Feb 13, 16:00",
                attendees: 67,
              },
            ].map((event, i) => (
              <Link
                key={i}
                href={`/live/${i + 10}`}
                className="group rounded-xl border border-dark-700 bg-dark-800 p-5 transition-all hover:border-brand-500/50"
              >
                <div className="flex items-center gap-2 text-xs text-brand-400">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                  {event.date}
                </div>
                <h3 className="mt-3 font-semibold text-white line-clamp-2 group-hover:text-brand-400 transition-colors">
                  {event.title}
                </h3>
                <p className="mt-1.5 text-sm text-dark-400">{event.creator}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-dark-500">
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  {event.attendees} érdeklődő
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/live"
              className="text-sm font-medium text-brand-400 transition-colors hover:text-brand-300"
            >
              Összes megtekintése &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Népszerű alkotók */}
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
            {PLACEHOLDER_CREATORS.map((creator) => (
              <Link
                key={creator.id}
                href={`/creator/${creator.id}`}
                className="group rounded-xl border border-dark-700 bg-dark-800 p-6 text-center transition-all hover:border-brand-500/50"
              >
                {/* Avatar placeholder */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/20 ring-2 ring-dark-600 group-hover:ring-brand-500/50 transition-all">
                  <span className="text-2xl font-bold text-brand-400">
                    {creator.name[0]}
                  </span>
                </div>

                <h3 className="mt-4 font-semibold text-white group-hover:text-brand-400 transition-colors">
                  {creator.name}
                </h3>
                <p className="mt-1 text-sm text-dark-400">{creator.category}</p>
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  {creator.followers} követő
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/explore"
              className="text-sm font-medium text-brand-400 transition-colors hover:text-brand-300"
            >
              Összes alkotó &rarr;
            </Link>
          </div>
        </div>
      </section>

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
                  href="#"
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
