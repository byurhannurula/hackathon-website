"use client";

import { useAdminStats } from "@/hooks/use-admin-stats";
import { AdminNav } from "./admin-nav";
import { StatsSummary } from "./stats-summary";
import { BarChart } from "./charts/bar-chart";
import { TimelineChart } from "./charts/timeline-chart";

export function AdminStats() {
  const { stats, total, loading, error } = useAdminStats();

  return (
    <>
      <AdminNav />
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-[260px] bg-white/2 border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : error || !stats ? (
          <div className="flex items-center justify-center h-[60vh] font-mono text-white/40">
            Грешка при зареждане на статистиката
          </div>
        ) : (
          <>
            <StatsSummary
              total={total}
              approved={stats.status.approved || 0}
              pending={stats.status.pending || 0}
              rejected={stats.status.rejected || 0}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BarChart title="Роля" data={stats.role} total={total} />
              <BarChart title="Dev опит" data={stats.devExperience} total={total} ordered />
              <BarChart title="AI опит" data={stats.aiExperience} total={total} ordered />
              <BarChart
                title="Топ AI инструменти"
                data={stats.aiTools}
                total={total}
                color="acid"
              />
              <BarChart title="Възрастова група" data={stats.age} total={total} ordered />
              <div className="grid grid-rows-2 gap-6">
                <BarChart title="Има отбор" data={stats.hasTeam} total={total} />
                <BarChart title="Има идея/тема" data={stats.hasTheme} total={total} />
              </div>
              <BarChart title="Иска предизвикателство" data={stats.wantChallenge} total={total} />
              <BarChart
                title="Доброволец за организация"
                data={stats.volunteerHelp}
                total={total}
              />

              <div className="md:col-span-2">
                <TimelineChart title="Регистрации по дни" data={stats.timeline} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
