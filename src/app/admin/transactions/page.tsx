export default function AdminTransactionsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark-50">Tranzakciók</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        <div className="card">
          <p className="text-sm text-dark-400">Mai forgalom</p>
          <p className="mt-1 text-2xl font-bold text-dark-50">0 Ft</p>
        </div>
        <div className="card">
          <p className="text-sm text-dark-400">Heti forgalom</p>
          <p className="mt-1 text-2xl font-bold text-dark-50">0 Ft</p>
        </div>
        <div className="card">
          <p className="text-sm text-dark-400">Havi forgalom</p>
          <p className="mt-1 text-2xl font-bold text-dark-50">0 Ft</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-700">
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-300">
                Azonosító
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-300">
                Vásárló
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-300">
                Összeg
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-300">
                Típus
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-300">
                Dátum
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-300">
                Státusz
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={6}
                className="px-4 py-12 text-center text-sm text-dark-400"
              >
                Nincsenek tranzakciók.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
