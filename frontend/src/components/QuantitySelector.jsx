export default function QuantitySelector({ packOptions = [], selected, onSelect, count = 1, oncountchange }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-forest-700 mb-2">Pack Size</p>
        <div className="flex flex-wrap gap-2">
          {packOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => onSelect(opt)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selected.label === opt.label
                  ? "border-forest-700 bg-forest-700 text-cream-50"
                  : "border-forest-200 text-forest-700 hover:border-forest-500"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-forest-700 mb-2">Quantity</p>
        <div className="flex items-center gap-3 w-fit rounded-full border border-forest-200 px-2">
          <button
            onClick={() => onCountChange(Math.max(1, count - 1))}
            className="px-3 py-2 text-lg font-bold text-forest-700"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-[2ch] text-center font-semibold">{count}</span>
          <button
            onClick={() => onCountChange(count + 1)}
            className="px-3 py-2 text-lg font-bold text-forest-700"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
