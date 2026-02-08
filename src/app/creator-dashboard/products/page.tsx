export default function ProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark-50">Termékek</h1>
        <button className="btn-primary">+ Új termék</button>
      </div>

      <div className="card">
        <div className="flex flex-col items-center justify-center py-12">
          <svg
            className="h-16 w-16 text-dark-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <p className="text-dark-400 text-sm mb-2">
            Még nincsenek termékeid.
          </p>
          <p className="text-dark-500 text-xs">
            Adj hozzá termékeket, amelyeket élő közvetítések során kínálhatsz.
          </p>
        </div>
      </div>
    </div>
  );
}
