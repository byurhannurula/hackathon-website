"use client";

import { useState } from "react";
import { X } from "lucide-react";

import type { Registration, RegistrationStatus } from "@/lib/types";
import type { SheetTab } from "@/constants";
import { StatusBadge } from "./status-badge";
import { AnalyticsTab } from "./analytics-tab";
import { NotesSection } from "./notes-section";
import { TabButton } from "./tab-button";
import { getRegistrationFields } from "./registration-fields";

interface RegistrationSheetProps {
  reg: Registration;
  onClose: () => void;
  onUpdateStatus: (reg: Registration, status: RegistrationStatus) => void;
  isLoading: boolean;
  onNotesUpdated: (reg: Registration, notes: string) => void;
  onError: (message: string) => void;
}

const TABS: { key: SheetTab; label: string }[] = [
  { key: "details", label: "Детайли" },
  { key: "analytics", label: "Анализ" },
];

export function RegistrationSheet({
  reg,
  onClose,
  onUpdateStatus,
  isLoading,
  onNotesUpdated,
  onError,
}: RegistrationSheetProps) {
  const [tab, setTab] = useState<SheetTab>("details");
  const fields = getRegistrationFields(reg);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] animate-[fadeIn_0.2s_ease]"
        onClick={onClose}
      />
      <aside className="fixed top-0 right-0 z-50 h-full w-full max-w-[520px] bg-bg border-l border-white/7 overflow-y-auto animate-[slideIn_0.25s_ease]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/7">
            <div>
              <div className="font-body text-xl font-bold text-white/95">{reg.full_name}</div>
              <div className="flex items-center gap-3 mt-1">
                <span className="font-mono text-[14px] text-acid/80">
                  #{String(reg.ticket_number).padStart(4, "0")}
                </span>
                <StatusBadge status={reg.registration_status} />
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/30 hover:text-white transition-colors cursor-pointer p-1"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex border-b border-white/7 px-6">
            {TABS.map((t) => (
              <TabButton key={t.key} active={tab === t.key} onClick={() => setTab(t.key)}>
                {t.label}
              </TabButton>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {tab === "details" ? (
              <>
                <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                  {fields.map(
                    ([label, value]) =>
                      value && (
                        <div key={label}>
                          <div className="font-mono text-[12px] text-white/50 uppercase tracking-widest mb-1">
                            {label}
                          </div>
                          <div className="font-mono text-[15px] text-white/90 break-words">
                            {value}
                          </div>
                        </div>
                      )
                  )}
                </div>

                <div>
                  <div className="font-mono text-[12px] text-white/50 uppercase tracking-widest mb-2">
                    Мотивация
                  </div>
                  <div className="font-mono text-[14px] text-white/80 leading-[1.8] bg-white/3 p-4 border border-white/8 break-words">
                    {reg.motivation}
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[12px] text-white/50 uppercase tracking-widest mb-2">
                    Очаквания
                  </div>
                  <div className="font-mono text-[14px] text-white/80 leading-[1.8] bg-white/3 p-4 border border-white/8 break-words">
                    {reg.expectations}
                  </div>
                </div>

                <NotesSection reg={reg} onNotesUpdated={onNotesUpdated} onError={onError} />
              </>
            ) : (
              <AnalyticsTab ticketId={reg.ticket_id} />
            )}
          </div>

          <div className="px-6 py-5 border-t border-white/7 flex gap-3">
            {reg.registration_status !== "approved" && (
              <button
                onClick={() => onUpdateStatus(reg, "approved")}
                disabled={isLoading}
                className="flex-1 font-mono text-[14px] tracking-[0.08em] uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-6 py-3 cursor-pointer transition-all hover:bg-emerald-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLoading ? "..." : "Одобри"}
              </button>
            )}
            {reg.registration_status !== "rejected" && (
              <button
                onClick={() => onUpdateStatus(reg, "rejected")}
                disabled={isLoading}
                className="flex-1 font-mono text-[14px] tracking-[0.08em] uppercase bg-red-500/20 text-red-400 border border-red-500/40 px-6 py-3 cursor-pointer transition-all hover:bg-red-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLoading ? "..." : "Отхвърли"}
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
