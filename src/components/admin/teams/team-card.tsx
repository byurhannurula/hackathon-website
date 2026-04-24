import { Users } from "lucide-react";

import { MemberRow } from "./member-row";
import type { Team } from "./types";

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
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
    </div>
  );
}
