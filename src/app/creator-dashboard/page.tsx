export default function CreatorDashboardPage() {
  const stats = [
    {
      label: "Összes bevétel",
      value: "1 245 800 Ft",
      change: "+12.5%",
    },
    {
      label: "Elérhető egyenleg",
      value: "384 200 Ft",
      change: null,
    },
    {
      label: "Tartalmak száma",
      value: "47",
      change: "+3",
    },
    {
      label: "Megtekintések",
      value: "28 430",
      change: "+8.2%",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-50 mb-6">
        Alkotói Irányítópult
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <p className="text-sm text-dark-400">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-dark-50">
              {stat.value}
            </p>
            {stat.change && (
              <p className="mt-1 text-sm text-brand-500">{stat.change}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">
            Legutóbbi tartalmak
          </h2>
          <p className="text-sm text-dark-400">
            Még nincsenek tartalmaid. Kezdj el feltölteni!
          </p>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">
            Közelgő élő események
          </h2>
          <p className="text-sm text-dark-400">
            Nincs tervezett élő esemény.
          </p>
        </div>
      </div>
    </div>
  );
}
