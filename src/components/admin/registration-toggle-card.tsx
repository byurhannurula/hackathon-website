import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib";

interface RegistrationToggleCardProps {
  regOpen: boolean;
  loading: boolean;
  onClick: () => void;
}

export function RegistrationToggleCard({ regOpen, loading, onClick }: RegistrationToggleCardProps) {
  return (
    <div className="mt-12 mb-4 border border-white/7 bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-lg tracking-wide">РЕГИСТРАЦИЯ</h3>
          <p className="font-mono text-[13px] text-white/40 mt-1">
            Контрол на формата за регистрация
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "font-mono text-[12px] tracking-widest uppercase font-bold",
              regOpen ? "text-emerald-400" : "text-red-400"
            )}
          >
            {regOpen ? "ОТВОРЕНА" : "ЗАТВОРЕНА"}
          </span>
          <button
            onClick={onClick}
            disabled={loading}
            className={cn(
              "relative w-11 h-6 rounded-full border transition-colors duration-200 cursor-pointer disabled:opacity-50",
              regOpen
                ? "bg-emerald-500/20 border-emerald-500/40"
                : "bg-red-500/15 border-red-500/30"
            )}
            aria-label="Превключи регистрация"
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-200",
                regOpen ? "translate-x-5 bg-emerald-400" : "translate-x-0 bg-red-400"
              )}
            />
          </button>
        </div>
      </div>
      <div className="flex items-start gap-2.5 bg-white/3 border border-white/5 p-3.5">
        <AlertTriangle size={15} className="text-amber-400/70 mt-0.5 shrink-0" />
        <p className="font-mono text-[12px] text-white/45 leading-[1.7]">
          Превключването минава през двойно потвърждение. Промяната влиза в сила веднага — формата,
          бутоните и API-то се обновяват за всички потребители.
        </p>
      </div>
    </div>
  );
}
