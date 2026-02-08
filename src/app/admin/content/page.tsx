export default function AdminContentPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark-50">
          Tartalom moderáció
        </h1>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-400">
            0 moderálásra vár
          </span>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-700">
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-300">
                Tartalom
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-300">
                Alkotó
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-300">
                Típus
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-300">
                Beküldve
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
                Nincs moderálásra váró tartalom.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
