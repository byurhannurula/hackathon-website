interface ControlsBarProps {
  search: string;
  onSearch: (val: string) => void;
  statusFilter: string;
  onStatusFilter: (val: string) => void;
  onBroadcast: () => void;
}

export function ControlsBar({
  search,
  onSearch,
  statusFilter,
  onStatusFilter,
  onBroadcast,
}: ControlsBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Търси по име или имейл..."
        className="flex-1 py-3 px-4 text-sm bg-white/4 border border-white/15 text-white font-mono outline-none transition-colors duration-200 focus:border-acid placeholder:text-white/30"
      />
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilter(e.target.value)}
        className="py-3 px-4 text-sm bg-white/4 border border-white/15 text-white font-mono outline-none cursor-pointer"
      >
        <option value="all" style={{ background: "#0a0a0a", color: "#fff" }}>
          Всички статуси
        </option>
        <option value="pending" style={{ background: "#0a0a0a", color: "#fff" }}>
          Изчакващи
        </option>
        <option value="approved" style={{ background: "#0a0a0a", color: "#fff" }}>
          Одобрени
        </option>
        <option value="rejected" style={{ background: "#0a0a0a", color: "#fff" }}>
          Отхвърлени
        </option>
      </select>
      <button
        onClick={onBroadcast}
        className="py-3 px-5 text-sm bg-acid/5 border border-acid/20 text-acid/80 font-mono transition-colors duration-200 hover:text-acid hover:border-acid/40 cursor-pointer whitespace-nowrap"
      >
        ✉ Съобщение
      </button>
      <a
        href="/api/kcah-ia-esur/export-csv"
        download
        className="py-3 px-5 text-sm bg-white/4 border border-white/15 text-white/70 font-mono transition-colors duration-200 hover:text-acid hover:border-acid/30 no-underline whitespace-nowrap text-center"
      >
        ↓ CSV Export
      </a>
    </div>
  );
}
