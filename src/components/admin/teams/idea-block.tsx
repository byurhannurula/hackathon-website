import { Lightbulb } from "lucide-react";

import { cn } from "@/lib";
import type { Member } from "./types";

interface IdeaBlockProps {
  ideas: Member[];
  borderColor: string;
}

export function IdeaBlock({ ideas, borderColor }: IdeaBlockProps) {
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
