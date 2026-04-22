"use client";

import { useRef, useState } from "react";
import { Info, X } from "lucide-react";

import { cn } from "@/lib";
import { useClickOutside } from "@/hooks";
import { AI_SHORT, DEV_LEVEL_ORDER, DEV_SHORT, type SuggestedTeam } from "./types";

interface SuggestionWhyButtonProps {
  suggestion: SuggestedTeam;
}

export function SuggestionWhyButton({ suggestion }: SuggestionWhyButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false), open);

  const isPass1 = suggestion.reason.startsWith("Сходни интереси");
  const keywords = isPass1
    ? suggestion.reason
        .replace("Сходни интереси:", "")
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : [];

  const levels = suggestion.members.map((m) => ({
    name: m.full_name,
    dev: m.dev_experience,
    ai: m.ai_experience,
    role: m.role,
    hasIdea: m.has_theme === "Да",
  }));

  const devLevelsNumeric = levels.map((l) =>
    DEV_LEVEL_ORDER.indexOf(l.dev as (typeof DEV_LEVEL_ORDER)[number])
  );
  const spread = Math.max(...devLevelsNumeric) - Math.min(...devLevelsNumeric);
  const ideasCount = levels.filter((l) => l.hasIdea).length;
  const uniqueRoles = new Set(levels.map((l) => l.role));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className={cn(
          "inline-flex items-center justify-center p-1 -m-1 cursor-pointer transition-colors",
          open ? "text-acid" : "text-white/30 hover:text-white/70"
        )}
        aria-label="Защо тези хора са заедно"
      >
        <Info size={13} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-[min(88vw,360px)] bg-neutral-950 border border-acid/20 shadow-xl z-30 p-4">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h4 className="font-display text-[14px] text-white">Защо са групирани?</h4>
            <button
              onClick={() => setOpen(false)}
              className="text-white/30 hover:text-white/70 transition-colors cursor-pointer -mr-1 -mt-1 p-1"
              aria-label="Затвори"
            >
              <X size={12} />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-1">
                Метод
              </div>
              <div className="font-mono text-[11px] text-white/70 leading-[1.6]">
                {isPass1 ? (
                  <>
                    <span className="text-acid">Стъпка 1</span> — съчетани по общи ключови думи в
                    описанията на идеите (поне 2 общи).
                  </>
                ) : (
                  <>
                    <span className="text-white/80">Стъпка 2</span> — никой в групата няма
                    припокриваща се идея с друг, затова са балансирани по dev опит (snake draft).
                  </>
                )}
              </div>
            </div>

            {isPass1 && keywords.length > 0 && (
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-1.5">
                  Общи ключови думи
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="font-mono text-[11px] px-2 py-0.5 bg-acid/10 text-acid border border-acid/20"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-1.5">
                Dev опит в отбора
              </div>
              <div className="space-y-1">
                {levels.map((l, i) => (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] text-white/60 truncate">{l.name}</span>
                    <span className="font-mono text-[10px] text-white/45 shrink-0">
                      {DEV_SHORT[l.dev] || "?"} · AI {AI_SHORT[l.ai] || "?"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="font-mono text-[10px] text-white/35 mt-1.5">
                Разлика в нивата: <span className="text-white/60">{spread}</span> стъпки{" "}
                {spread >= 2 ? "(добър микс)" : "(близки нива)"}
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-0.5">
                  С идея
                </div>
                <div className="font-mono text-[12px] text-white/70">
                  {ideasCount} / {levels.length}
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-0.5">
                  Уникални роли
                </div>
                <div className="font-mono text-[12px] text-white/70">
                  {uniqueRoles.size} / {levels.length}
                </div>
              </div>
            </div>

            {uniqueRoles.size < levels.length && (
              <div className="pt-2 border-t border-white/5">
                <div className="font-mono text-[10px] text-amber-400/80 leading-[1.6]">
                  ⚠ Повтарящи се роли — алгоритъмът не балансира по роля. Провери на ръка.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
