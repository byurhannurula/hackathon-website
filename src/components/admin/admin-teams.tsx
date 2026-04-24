"use client";

import { useState } from "react";
import { Users, User, Sparkles } from "lucide-react";

import { useAdminTeams } from "@/hooks";
import { AdminNav } from "./admin-nav";
import { StatCard } from "./stat-card";
import { TabButton } from "./tab-button";
import { TeamCard } from "./teams/team-card";
import { SuggestedCard } from "./teams/suggested-card";
import { SoloCard } from "./teams/solo-card";
import { AlgorithmInfoButton } from "./teams/algorithm-info-button";

type Tab = "formed" | "potential";

export function AdminTeams() {
  const { teams, solos, suggestions, summary, loading, error } = useAdminTeams();
  const [tab, setTab] = useState<Tab>("formed");

  if (loading) {
    return (
      <>
        <AdminNav />
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[200px] bg-white/2 border border-white/5 animate-pulse" />
            ))}
          </div>
        </div>
      </>
    );
  }

  if (error || !summary) {
    return (
      <>
        <AdminNav />
        <div className="flex items-center justify-center h-[60vh] font-mono text-white/40">
          Грешка при зареждане
        </div>
      </>
    );
  }

  const suggestedIds = new Set(suggestions.flatMap((s) => s.members.map((m) => m.id)));
  const unmatched = solos.filter((s) => !suggestedIds.has(s.id));

  return (
    <>
      <AdminNav />
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <StatCard label="Общо" value={summary.totalApproved} />
          <StatCard label="Чакащи" value={summary.pendingCount} className="text-amber-400" />
          <StatCard label="Отбори" value={summary.formedTeams} className="text-emerald-400" />
          <StatCard label="Без отбор" value={summary.soloCount} className="text-white/70" />
          <StatCard label="Соло с идея" value={summary.solosWithIdea} className="text-acid" />
        </div>

        <div className="flex border-b border-white/7 mb-6">
          <TabButton active={tab === "formed"} onClick={() => setTab("formed")} tone="emerald">
            <span className="inline-flex items-center gap-2">
              <Users size={14} />
              Формирани ({teams.length})
            </span>
          </TabButton>
          <TabButton active={tab === "potential"} onClick={() => setTab("potential")} tone="acid">
            <span className="inline-flex items-center gap-2">
              <Sparkles size={14} />
              Потенциални ({suggestions.length})
            </span>
          </TabButton>
        </div>

        {tab === "formed" ? (
          teams.length === 0 ? (
            <div className="text-center py-16 font-mono text-sm text-white/30">
              Няма формирани отбори
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.map((team) => (
                <TeamCard key={team.name} team={team} />
              ))}
            </div>
          )
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
    </>
  );
}
