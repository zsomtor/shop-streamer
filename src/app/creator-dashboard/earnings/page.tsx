export default function EarningsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-50 mb-6">Bevételek</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <div className="card">
          <p className="text-sm text-dark-400">Összes bevétel</p>
          <p className="mt-1 text-2xl font-bold text-dark-50">
            1 245 800 Ft
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-dark-400">Elérhető egyenleg</p>
          <p className="mt-1 text-2xl font-bold text-brand-500">
            384 200 Ft
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-dark-400">Függőben lévő</p>
          <p className="mt-1 text-2xl font-bold text-dark-50">
            56 400 Ft
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">
          Tranzakció történet
        </h2>
        <p className="text-sm text-dark-400">
          Még nincsenek tranzakcióid.
        </p>
      </div>
    </div>
  );
}
