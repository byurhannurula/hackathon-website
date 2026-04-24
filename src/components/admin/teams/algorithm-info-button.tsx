"use client";

import { useRef, useState } from "react";
import { Info, Sparkles, X } from "lucide-react";

import { cn } from "@/lib";
import { useClickOutside } from "@/hooks";

export function AlgorithmInfoButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false), open);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] px-2.5 py-1.5 border cursor-pointer transition-colors",
          open
            ? "border-acid/40 text-acid bg-acid/5"
            : "border-white/10 text-white/50 hover:border-white/25 hover:text-white/80"
        )}
        aria-label="Как се генерират предложенията"
      >
        <Info size={12} />
        Как работи
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[min(92vw,440px)] bg-neutral-950 border border-white/10 shadow-xl z-40 p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-acid" />
              <h3 className="font-display text-base text-white">Как се генерират предложенията</h3>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/40 hover:text-white/80 transition-colors cursor-pointer -mr-1 -mt-1 p-1"
              aria-label="Затвори"
            >
              <X size={14} />
            </button>
          </div>

          <p className="font-mono text-[12px] text-white/60 leading-[1.7] mb-4">
            Участниците без отбор се групират в две стъпки. Човек, който е разпределен в стъпка 1,
            не участва в стъпка 2.
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[10px] px-1.5 py-0.5 bg-acid/15 text-acid">
                  СТЪПКА 1
                </span>
                <span className="font-display text-[13px] text-white/90">Съчетаване по идея</span>
              </div>
              <p className="font-mono text-[11px] text-white/50 leading-[1.7]">
                За всеки, който е описал идея, извличаме ключови думи от текста (без стоп-думи и
                шум). Ако двама души имат{" "}
                <span className="text-acid">поне 2 общи ключови думи</span>, попадат в една група —
                до 4 души. Добавяме и един човек без идея за баланс. Reason-ът на картата показва
                общите ключови думи.
              </p>
              <p className="font-mono text-[10px] text-white/35 leading-[1.7] mt-1.5 italic">
                Забележка: ако някой е маркирал „имам идея", но е оставил описанието празно, го
                третираме като <span className="text-white/55">без идея</span> — не влиза в това
                съчетаване.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[10px] px-1.5 py-0.5 bg-white/10 text-white/70">
                  СТЪПКА 2
                </span>
                <span className="font-display text-[13px] text-white/90">
                  Баланс по опит в програмирането
                </span>
              </div>
              <p className="font-mono text-[11px] text-white/50 leading-[1.7]">
                Останалите сортираме по ниво на dev опит и раздаваме „змийски" (snake draft) в
                отбори по 3, така че всеки отбор да има микс от начинаещи и опитни. Reason-ът
                показва дали отборът има идея, смесени нива, и двете, или нито едно.
              </p>
            </div>

            <div className="pt-3 border-t border-white/5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-amber-400/80 mb-1.5">
                Какво НЕ гледаме
              </div>
              <p className="font-mono text-[11px] text-white/45 leading-[1.7]">
                Роля (дизайнер / бекенд / PM), AI опит, организация, град. Проверявай ги на ръка
                преди да финализираш отбор.
              </p>
            </div>

            <div className="pt-3 border-t border-white/5">
              <p className="font-mono text-[11px] text-white/45 leading-[1.7] italic">
                Това са предложения, не финални отбори. Използвай ги като стартова точка —
                размествай, сливай или игнорирай свободно.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
