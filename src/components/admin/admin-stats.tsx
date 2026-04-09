"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface StatsData {
  status: Record<string, number>;
  role: Record<string, number>;
  devExperience: Record<string, number>;
  aiExperience: Record<string, number>;
  aiTools: Record<string, number>;
  hasTeam: Record<string, number>;
  hasTheme: Record<string, number>;
  wantChallenge: Record<string, number>;
  volunteerHelp: Record<string, number>;
  age: Record<string, number>;
  timeline: Record<string, number>;
}

export function AdminStats() {
  const router = useRouter();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/kcah-ia-esur/stats")
      .then((r) => {
        if (r.status === 401) {
          router.push("/kcah-ia-esur/login");
          return null;
        }
        return r.json();
      })
      .then((json) => {
        if (!json) return;
        if (json.ok) {
          setStats(json.stats);
          setTotal(json.total);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleLogout() {
    await fetch("/api/kcah-ia-esur/auth", { method: "DELETE" });
    router.push("/kcah-ia-esur/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg text-white">
        <Header onLogout={handleLogout} />
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-[260px] bg-white/2 border border-white/5 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-bg text-white">
        <Header onLogout={handleLogout} />
        <div className="flex items-center justify-center h-[60vh] font-mono text-white/40">
          Грешка при зареждане на статистиката
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-white">
      <Header onLogout={handleLogout} />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6">
        {/* Total */}
        <div className="mb-8 border border-white/10 bg-card p-6">
          <div className="font-mono text-[12px] tracking-[0.14em] text-white/55 uppercase">
            Общо регистрации
          </div>
          <div className="font-display text-5xl mt-1 text-white">{total}</div>
          <div className="flex gap-4 mt-3 font-mono text-[13px]">
            <span className="text-emerald-400">{stats.status.approved || 0} одобрени</span>
            <span className="text-white/60">{stats.status.pending || 0} изчакващи</span>
            <span className="text-red-400">{stats.status.rejected || 0} отхвърлени</span>
          </div>
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BarChart title="Роля" data={stats.role} total={total} />
          <BarChart title="Dev опит" data={stats.devExperience} total={total} ordered />
          <BarChart title="AI опит" data={stats.aiExperience} total={total} ordered />
          <BarChart title="Топ AI инструменти" data={stats.aiTools} total={total} color="acid" />
          <BarChart title="Възрастова група" data={stats.age} total={total} ordered />
          <div className="grid grid-rows-2 gap-6">
            <BarChart title="Има отбор" data={stats.hasTeam} total={total} />
            <BarChart title="Има идея/тема" data={stats.hasTheme} total={total} />
          </div>
          <BarChart title="Иска предизвикателство" data={stats.wantChallenge} total={total} />
          <BarChart title="Доброволец за организация" data={stats.volunteerHelp} total={total} />

          {/* Timeline - full width */}
          <div className="md:col-span-2">
            <TimelineChart title="Регистрации по дни" data={stats.timeline} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────

function Header({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="border-b border-white/7 px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/">
          <span className="font-display text-xl">
            <span className="text-acid">RUSE</span> AI HACK
          </span>
          <span className="font-mono text-[12px] text-white/40 ml-3 tracking-[0.14em]">ADMIN</span>
        </Link>
        <nav className="flex gap-1">
          <Link
            href="/kcah-ia-esur"
            className="font-mono text-[13px] tracking-[0.08em] text-white/50 hover:text-white transition-colors px-3 py-1.5"
          >
            Регистрации
          </Link>
          <Link
            href="/kcah-ia-esur/stats"
            className="font-mono text-[13px] tracking-[0.08em] text-acid px-3 py-1.5 border-b-2 border-acid"
          >
            Статистика
          </Link>
        </nav>
      </div>
      <button
        onClick={onLogout}
        className="font-mono text-[13px] text-white/50 hover:text-white transition-colors cursor-pointer"
      >
        Изход
      </button>
    </header>
  );
}

// ─── Bar Chart ───────────────────────────────────────────────

function BarChart({
  title,
  data,
  total,
  color = "white",
  ordered = false,
}: {
  title: string;
  data: Record<string, number>;
  total: number;
  color?: "white" | "acid";
  ordered?: boolean;
}) {
  const entries = ordered ? Object.entries(data) : Object.entries(data).sort((a, b) => b[1] - a[1]);

  const max = Math.max(...entries.map(([, v]) => v), 1);

  const barColor = color === "acid" ? "bg-acid/60" : "bg-white/30";
  const textColor = color === "acid" ? "text-acid" : "text-white/90";

  return (
    <div className="border border-white/10 bg-card p-5">
      <div className="font-mono text-[12px] tracking-[0.14em] text-white/55 uppercase mb-4">
        {title}
      </div>
      <div className="space-y-2.5">
        {entries.map(([label, count]) => {
          const pct = total > 0 ? ((count / total) * 100).toFixed(1) : "0";
          const barWidth = max > 0 ? (count / max) * 100 : 0;

          return (
            <div key={label}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[13px] text-white/75 truncate mr-3 max-w-[70%]">
                  {label}
                </span>
                <span className={`font-mono text-[13px] ${textColor} whitespace-nowrap`}>
                  {count} <span className="text-white/35 text-[11px]">({pct}%)</span>
                </span>
              </div>
              <div className="h-2 bg-white/5 w-full">
                <div
                  className={`h-full ${barColor} transition-all duration-500 ease-out`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
        {entries.length === 0 && (
          <div className="font-mono text-[13px] text-white/30 py-4 text-center">Няма данни</div>
        )}
      </div>
    </div>
  );
}

// ─── Timeline Chart ──────────────────────────────────────────

function TimelineChart({ title, data }: { title: string; data: Record<string, number> }) {
  const entries = Object.entries(data);
  const max = Math.max(...entries.map(([, v]) => v), 1);
  const totalReg = entries.reduce((sum, [, v]) => sum + v, 0);

  // Cumulative
  let cumulative = 0;

  return (
    <div className="border border-white/10 bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono text-[12px] tracking-[0.14em] text-white/55 uppercase">
          {title}
        </div>
        <div className="font-mono text-[12px] text-white/40">{entries.length} дни</div>
      </div>

      {entries.length === 0 ? (
        <div className="font-mono text-[13px] text-white/30 py-8 text-center">Няма данни</div>
      ) : (
        <div className="space-y-1.5">
          {entries.map(([date, count]) => {
            cumulative += count;
            const barWidth = (count / max) * 100;
            const fmtDate = new Date(date + "T00:00:00").toLocaleDateString("bg-BG", {
              day: "2-digit",
              month: "2-digit",
            });

            return (
              <div key={date} className="flex items-center gap-3">
                <span className="font-mono text-[12px] text-white/45 w-[42px] shrink-0 text-right">
                  {fmtDate}
                </span>
                <div className="flex-1 h-5 bg-white/5 relative">
                  <div
                    className="h-full bg-acid/50 transition-all duration-500 ease-out"
                    style={{ width: `${barWidth}%` }}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[11px] text-white/50">
                    {count}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-white/25 w-[40px] shrink-0 text-right">
                  Σ{cumulative}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {entries.length > 0 && (
        <div className="mt-4 pt-3 border-t border-white/5 flex gap-6 font-mono text-[12px] text-white/40">
          <span>
            Среден брой на ден:{" "}
            <span className="text-white/70">{(totalReg / entries.length).toFixed(1)}</span>
          </span>
          <span>
            Пик: <span className="text-acid/80">{max}</span>
          </span>
        </div>
      )}
    </div>
  );
}
