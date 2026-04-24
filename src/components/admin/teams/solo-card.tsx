import { Lightbulb } from "lucide-react";

import { MemberRow } from "./member-row";
import type { Member } from "./types";

interface SoloCardProps {
  member: Member;
}

export function SoloCard({ member }: SoloCardProps) {
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
