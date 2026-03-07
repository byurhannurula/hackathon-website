"use client";

import { useState } from "react";
import { cn } from "@/lib";

interface FaqItemProps {
  question: string;
  answer: string;
}

export const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border py-4.5">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between cursor-pointer items-center"
      >
        <span
          className={cn(
            "font-body font-bold text-[15px] transition-colors duration-200",
            open ? "text-acid" : "text-white"
          )}
        >
          {question}
        </span>
        <span
          className={cn(
            "font-display text-[22px] text-acid shrink-0 ml-4 transition-transform duration-200",
            open && "rotate-45"
          )}
        >
          +
        </span>
      </div>
      {open && <p className="font-mono text-xs text-white/60 mt-3 leading-[1.9]">{answer}</p>}
    </div>
  );
};
