import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-dark-700 bg-dark-800 p-8 text-center">
        {/* Error icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
          <svg
            className="h-8 w-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white">Hiba történt</h1>
        <p className="mt-3 text-sm text-dark-400">
          A hitelesítés során hiba lépett fel. Kérjük, próbáld újra, vagy
          válassz másik bejelentkezési módot.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link href="/auth/bejelentkezes" className="btn-primary w-full">
            Vissza a bejelentkezéshez
          </Link>
          <Link
            href="/"
            className="btn-secondary w-full"
          >
            Főoldal
          </Link>
        </div>
      </div>
    </div>
  );
}
