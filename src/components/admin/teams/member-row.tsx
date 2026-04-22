import { Clock, Lightbulb } from "lucide-react";

import { cn } from "@/lib";
import { Tip } from "./tip";
import { AI_SHORT, DEV_COLOR, DEV_SHORT, type Member } from "./types";

interface MemberRowProps {
  member: Member;
  expanded?: boolean;
}

export function MemberRow({ member, expanded = false }: MemberRowProps) {
  const devShort = DEV_SHORT[member.dev_experience] || "?";
  const aiShort = AI_SHORT[member.ai_experience] || "?";
  const devColor = DEV_COLOR[member.dev_experience] || "bg-white/10 text-white/50";

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
