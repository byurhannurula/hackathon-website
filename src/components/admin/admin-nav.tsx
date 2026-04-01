import Link from "next/link";

interface AdminNavProps {
  regOpen: boolean;
  regToggleLoading: boolean;
  onToggleClick: () => void;
  onLogout: () => void;
}

export function AdminNav({ regOpen, regToggleLoading, onToggleClick, onLogout }: AdminNavProps) {
  return (
    <header className="border-b border-white/7 px-4 md:px-8 py-4 flex items-center justify-between">
      <Link href="/">
        <span className="font-display text-xl">
          <span className="text-acid">RUSE</span> AI HACK
        </span>
        <span className="font-mono text-[10px] text-white/30 ml-3 tracking-[0.14em]">ADMIN</span>
      </Link>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10px] tracking-[0.1em] text-white/40 uppercase">
            Регистрация
          </span>
          <button
            onClick={onToggleClick}
            disabled={regToggleLoading}
            className={`relative w-11 h-6 rounded-full border transition-colors duration-200 cursor-pointer disabled:opacity-50 ${
              regOpen
                ? "bg-emerald-500/20 border-emerald-500/40"
                : "bg-red-500/15 border-red-500/30"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-200 ${
                regOpen ? "translate-x-5 bg-emerald-400" : "translate-x-0 bg-red-400"
              }`}
            />
          </button>
          <span
            className={`font-mono text-[10px] tracking-widest uppercase ${
              regOpen ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {regOpen ? "ON" : "OFF"}
          </span>
        </div>
        <button
          onClick={onLogout}
          className="font-mono text-[11px] text-white/40 hover:text-white transition-colors cursor-pointer"
        >
          Изход
        </button>
      </div>
    </header>
  );
}
