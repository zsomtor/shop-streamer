export default function AdminPage() {
  const platformStats = [
    {
      label: "Összes felhasználó",
      value: "12 430",
    },
    {
      label: "Aktív alkotók",
      value: "348",
    },
    {
      label: "Összes tartalom",
      value: "2 156",
    },
    {
      label: "Havi bevétel",
      value: "8 425 000 Ft",
    },
    {
      label: "Aktív előfizetések",
      value: "3 892",
    },
    {
      label: "Moderálásra vár",
      value: "14",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-50 mb-6">Admin Panel</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platformStats.map((stat) => (
          <div key={stat.label} className="card">
            <p className="text-sm text-dark-400">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-dark-50">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">
            Legutóbbi regisztrációk
          </h2>
          <p className="text-sm text-dark-400">
            Az utolsó regisztrációk megjelenítése itt lesz elérhető.
          </p>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">
            Rendszerállapot
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-400">Szerver</span>
              <span className="flex items-center gap-1.5 text-sm text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Működik
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-400">Adatbázis</span>
              <span className="flex items-center gap-1.5 text-sm text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Működik
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-400">Fizetési rendszer</span>
              <span className="flex items-center gap-1.5 text-sm text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Működik
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
