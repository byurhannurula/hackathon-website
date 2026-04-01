interface ControlsBarProps {
  search: string;
  onSearch: (val: string) => void;
  statusFilter: string;
  onStatusFilter: (val: string) => void;
}

export function ControlsBar({ search, onSearch, statusFilter, onStatusFilter }: ControlsBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Търси по име или имейл..."
        className="flex-1 py-2.5 px-3.5 text-xs bg-white/3 border border-white/12 text-white font-mono outline-none transition-colors duration-200 focus:border-acid placeholder:text-white/20"
      />
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilter(e.target.value)}
        className="py-2.5 px-3.5 text-xs bg-white/3 border border-white/12 text-white font-mono outline-none cursor-pointer"
      >
        <option value="all">Всички статуси</option>
        <option value="pending">Изчакващи</option>
        <option value="approved">Одобрени</option>
        <option value="rejected">Отхвърлени</option>
      </select>
      <a
        href="/api/kcah-ia-esur/export-csv"
        download
        className="py-2.5 px-4 text-xs bg-white/3 border border-white/12 text-white/60 font-mono transition-colors duration-200 hover:text-acid hover:border-acid/30 no-underline whitespace-nowrap text-center"
      >
        ↓ CSV Export
      </a>
    </div>
  );
}
