"use client";

import { useEffect, useRef, useState } from "react";
import { Users, User, Lightbulb, Sparkles, Clock, Info, X } from "lucide-react";

import { cn } from "@/lib";
import { useAdminAuth } from "@/hooks";
import { StatCard } from "./stat-card";

// ─── Types ──────────────────────────────────────────────────

interface Member {
  id: string;
  full_name: string;
  role: string;
  dev_experience: string;
  ai_experience: string;
  ai_tools: string;
  has_theme: string;
  theme_description: string | null;
  organization: string;
  github_handle: string | null;
  avatar_url: string | null;
  ticket_number: number;
  ticket_id: string;
  registration_status: string;
}

interface Team {
  name: string;
  members: Member[];
}

interface SuggestedTeam {
  reason: string;
  members: Member[];
}

interface Summary {
  totalApproved: number;
  formedTeams: number;
  soloCount: number;
  solosWithIdea: number;
  pendingCount: number;
}

// ─── Helpers ────────────────────────────────────────────────

const DEV_SHORT: Record<string, string> = {
  "Нямам опит": "Няма",
  "Минимален - под 1 година": "<1г",
  "Начално ниво - между 1 и 3 години": "1-3г",
  "Средно ниво - между 4 и 7 години": "4-7г",
  "Високо ниво - над 8 години": "8+г",
};

const AI_SHORT: Record<string, string> = {
  "Нямам опит": "Няма",
  "Между 1 и 6 месеца": "1-6м",
  "Между 7 и 12 месеца": "7-12м",
  "Повече от 12 месеца": "12+м",
};

const DEV_COLOR: Record<string, string> = {
  "Нямам опит": "bg-white/10 text-white/50",
  "Минимален - под 1 година": "bg-blue-500/15 text-blue-400",
  "Начално ниво - между 1 и 3 години": "bg-cyan-500/15 text-cyan-400",
  "Средно ниво - между 4 и 7 години": "bg-purple-500/15 text-purple-400",
  "Високо ниво - над 8 години": "bg-acid/15 text-acid",
};

type Tab = "formed" | "potential";

// ─── Main Component ─────────────────────────────────────────

export function AdminTeams() {
  const { adminFetch } = useAdminAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [solos, setSolos] = useState<Member[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestedTeam[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState<Tab>("formed");

  useEffect(() => {
    adminFetch("/api/kcah-ia-esur/teams")
      .then((r) => r?.json())
      .then((json) => {
        if (!json) return;
        if (json.ok) {
          setTeams(json.teams);
          setSolos(json.solos);
          setSuggestions(json.suggestions);
          setSummary(json.summary);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [adminFetch]);

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[200px] bg-white/2 border border-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="flex items-center justify-center h-[60vh] font-mono text-white/40">
        Грешка при зареждане
      </div>
    );
  }

  const suggestedIds = new Set(suggestions.flatMap((s) => s.members.map((m) => m.id)));
  const unmatched = solos.filter((s) => !suggestedIds.has(s.id));

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        <StatCard label="Общо" value={summary.totalApproved} />
        <StatCard label="Чакащи" value={summary.pendingCount} className="text-amber-400" />
        <StatCard label="Отбори" value={summary.formedTeams} className="text-emerald-400" />
        <StatCard label="Без отбор" value={summary.soloCount} className="text-white/70" />
        <StatCard label="Соло с идея" value={summary.solosWithIdea} className="text-acid" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/7 mb-6">
        <button
          onClick={() => setTab("formed")}
          className={cn(
            "font-mono text-[13px] tracking-[0.1em] uppercase px-5 py-3.5 cursor-pointer transition-colors border-b-2 -mb-px",
            tab === "formed"
              ? "text-emerald-400 border-emerald-400"
              : "text-white/50 border-transparent hover:text-white/70"
          )}
        >
          <span className="inline-flex items-center gap-2">
            <Users size={14} />
            Формирани ({teams.length})
          </span>
        </button>
        <button
          onClick={() => setTab("potential")}
          className={cn(
            "font-mono text-[13px] tracking-[0.1em] uppercase px-5 py-3.5 cursor-pointer transition-colors border-b-2 -mb-px",
            tab === "potential"
              ? "text-acid border-acid"
              : "text-white/50 border-transparent hover:text-white/70"
          )}
        >
          <span className="inline-flex items-center gap-2">
            <Sparkles size={14} />
            Потенциални ({suggestions.length})
          </span>
        </button>
      </div>

      {/* Tab content */}
      {tab === "formed" ? (
        <>
          {teams.length === 0 ? (
            <div className="text-center py-16 font-mono text-sm text-white/30">
              Няма формирани отбори
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.map((team) => (
                <TeamCard key={team.name} team={team} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {suggestions.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center justify-between gap-3 mb-4">
                <p className="font-mono text-[12px] text-white/35">
                  Препоръки на база умения и интереси — само идея за организаторите
                </p>
                <AlgorithmInfoButton />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestions.map((sg, i) => (
                  <SuggestedCard key={i} index={i + 1} suggestion={sg} />
                ))}
              </div>
            </section>
          )}

          {unmatched.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <User size={16} className="text-white/50" />
                <h2 className="font-display text-xl text-white">Без отбор (несъчетани)</h2>
                <span className="font-mono text-[12px] text-white/30 ml-1">
                  ({unmatched.length})
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {unmatched.map((member) => (
                  <SoloCard key={member.id} member={member} />
                ))}
              </div>
            </section>
          )}

          {suggestions.length === 0 && unmatched.length === 0 && (
            <div className="text-center py-16 font-mono text-sm text-white/30">
              Няма участници без отбор
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Team Card (formed) ─────────────────────────────────────

function TeamCard({ team }: { team: Team }) {
  return (
    <div className="border border-emerald-500/20 bg-card p-5 hover:border-emerald-500/35 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-emerald-400" />
          <span className="font-display text-lg text-white">{team.name}</span>
        </div>
        <span className="font-mono text-[12px] text-emerald-400/70">
          {team.members.length} {team.members.length === 1 ? "член" : "члена"}
        </span>
      </div>
      <div className="space-y-2.5">
        {team.members.map((m) => (
          <MemberRow key={m.id} member={m} />
        ))}
      </div>
      {/* <IdeaBlock
        ideas={team.members.filter((m) => m.has_theme === "Да" && m.theme_description?.trim())}
        borderColor="border-white/5"
      /> */}
    </div>
  );
}

// ─── Suggested Team Card ────────────────────────────────────

function SuggestedCard({ index, suggestion }: { index: number; suggestion: SuggestedTeam }) {
  return (
    <div className="border border-dashed border-acid/20 bg-acid/[0.02] p-5 hover:border-acid/35 transition-colors">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-acid/60" />
          <span className="font-display text-lg text-acid/80">Потенциален #{index}</span>
          <SuggestionWhyButton suggestion={suggestion} />
        </div>
        <span className="font-mono text-[12px] text-acid/50">
          {suggestion.members.length} {suggestion.members.length === 1 ? "член" : "члена"}
        </span>
      </div>
      <div className="font-mono text-[11px] text-white/35 mb-4">{suggestion.reason}</div>
      <div className="space-y-2.5">
        {suggestion.members.map((m) => (
          <MemberRow key={m.id} member={m} />
        ))}
      </div>
      <IdeaBlock
        ideas={suggestion.members.filter(
          (m) => m.has_theme === "Да" && m.theme_description?.trim()
        )}
        borderColor="border-acid/10"
      />
    </div>
  );
}

// ─── Solo Card ──────────────────────────────────────────────

function SoloCard({ member }: { member: Member }) {
  return (
    <div className="border border-white/8 bg-card p-5 hover:border-white/15 transition-colors">
      <MemberRow member={member} expanded />
      {member.has_theme === "Да" && member.theme_description?.trim() && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <div className="flex items-center gap-1.5 mb-1">
            <Lightbulb size={12} className="text-acid/50" />
            <span className="font-mono text-[11px] text-white/35 uppercase tracking-widest">
              Идея
            </span>
          </div>
          <p className="font-mono text-[12px] text-white/50 leading-[1.7]">
            {member.theme_description}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Idea Block (shared) ────────────────────────────────────

function IdeaBlock({ ideas, borderColor }: { ideas: Member[]; borderColor: string }) {
  if (ideas.length === 0) return null;

  return (
    <div className={cn("mt-4 pt-3 border-t", borderColor)}>
      {ideas.map((m) => (
        <div key={m.id} className="mb-2 last:mb-0">
          <div className="flex items-center gap-1.5 mb-1">
            <Lightbulb size={12} className="text-acid/50" />
            <span className="font-mono text-[11px] text-white/35">
              {ideas.length > 1 ? m.full_name : "Идея"}
            </span>
          </div>
          <p className="font-mono text-[12px] text-white/50 leading-[1.7]">{m.theme_description}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Member Row ─────────────────────────────────────────────

function MemberRow({ member, expanded = false }: { member: Member; expanded?: boolean }) {
  const devShort = DEV_SHORT[member.dev_experience] || "?";
  const aiShort = AI_SHORT[member.ai_experience] || "?";
  const devColor = DEV_COLOR[member.dev_experience] || "bg-white/10 text-white/50";

  // Parse top 3 tools
  const tools = member.ai_tools
    .split(/[,;/\n]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
    .slice(0, 3);

  return (
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={`/tickets/${member.ticket_id}?admin`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[14px] font-bold text-white/90 hover:text-acid transition-colors break-words"
          >
            {member.full_name}
          </a>
        </div>
        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
          <span className="font-mono text-[11px] text-white/40">{member.role}</span>
          <span className="text-white/15">·</span>
          <span className="font-mono text-[11px] text-white/35">{member.organization}</span>
        </div>
        {expanded && tools.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tools.map((tool, i) => (
              <span
                key={i}
                className="font-mono text-[10px] px-1.5 py-0.5 bg-white/5 text-white/40 border border-white/8"
              >
                {tool}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <Tip label={`Опит в програмирането: ${member.dev_experience}`}>
          <span className={cn("font-mono text-[10px] px-1.5 py-0.5", devColor)}>
            DEV {devShort}
          </span>
        </Tip>
        <Tip label={`Опит с AI: ${member.ai_experience}`}>
          <span className="font-mono text-[10px] px-1.5 py-0.5 bg-white/8 text-white/45">
            AI {aiShort}
          </span>
        </Tip>
        {member.registration_status === "pending" && (
          <Tip label="Потребителят очаква одобрение от администратор">
            <span className="inline-flex items-center gap-1 font-mono text-[10px] px-1.5 py-0.5 bg-amber-500/15 text-amber-400 shrink-0">
              <Clock size={10} />
            </span>
          </Tip>
        )}
        {member.has_theme === "Да" && member.theme_description?.trim() && (
          <Tip label={`Има идея за проект: ${member.theme_description}`}>
            <Lightbulb size={12} className="text-acid/50" />
          </Tip>
        )}
      </div>
    </div>
  );
}

// ─── Per-Suggestion Why Button ─────────────────────────────

function SuggestionWhyButton({ suggestion }: { suggestion: SuggestedTeam }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

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

  const devLevelsNumeric = levels.map((l) => {
    const order = [
      "Нямам опит",
      "Минимален - под 1 година",
      "Начално ниво - между 1 и 3 години",
      "Средно ниво - между 4 и 7 години",
      "Високо ниво - над 8 години",
    ];
    return order.indexOf(l.dev);
  });
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

// ─── Algorithm Info ────────────────────────────────────────

function AlgorithmInfoButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

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

// ─── Tooltip ───────────────────────────────────────────────

function Tip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="relative group/tip cursor-help" aria-label={label}>
      {children}
      <span className="pointer-events-none absolute bottom-full right-0 mb-1.5 px-2.5 py-1.5 bg-neutral-900 border border-white/10 text-white/80 font-mono text-[11px] leading-relaxed whitespace-normal opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 z-50 w-max max-w-[280px]">
        {label}
      </span>
    </span>
  );
}
