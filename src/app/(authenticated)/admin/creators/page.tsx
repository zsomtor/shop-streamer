export default function AdminCreatorsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark-50">Alkotók kezelése</h1>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-700">
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-300">
                Név
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-300">
                Tartalmak
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-300">
                Bevétel
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-300">
                Státusz
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-300">
                Műveletek
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={5}
                className="px-4 py-12 text-center text-sm text-dark-400"
              >
                Nincsenek még regisztrált alkotók.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
