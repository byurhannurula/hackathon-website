import { Sparkles } from "lucide-react";

import { MemberRow } from "./member-row";
import { IdeaBlock } from "./idea-block";
import { SuggestionWhyButton } from "./suggestion-why-button";
import type { SuggestedTeam } from "./types";

interface SuggestedCardProps {
  index: number;
  suggestion: SuggestedTeam;
}

export function SuggestedCard({ index, suggestion }: SuggestedCardProps) {
  const ideas = suggestion.members.filter(
    (m) => m.has_theme === "Да" && m.theme_description?.trim()
  );

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
      <IdeaBlock ideas={ideas} borderColor="border-acid/10" />
    </div>
  );
}
