import { X } from "lucide-react";

import type { Registration, RegistrationStatus } from "@/lib/types";
import { StatusBadge } from "./status-badge";

interface RegistrationSheetProps {
  reg: Registration;
  onClose: () => void;
  onUpdateStatus: (reg: Registration, status: RegistrationStatus) => void;
  isLoading: boolean;
  fmtDate: (iso: string) => string;
}

export function RegistrationSheet({
  reg,
  onClose,
  onUpdateStatus,
  isLoading,
  fmtDate,
}: RegistrationSheetProps) {
  const fields: [string, string | null][] = [
    ["Телефон", reg.phone],
    ["Възраст", reg.age],
    ["Организация", reg.organization],
    ["Dev опит", reg.dev_experience],
    ["AI опит", reg.ai_experience],
    ["AI инструменти", reg.ai_tools],
    ["Има тема", reg.has_theme],
    ["Описание на тема", reg.theme_description],
    ["Има отбор", reg.has_team],
    ["Име на отбор", reg.team_name],
    ["Иска предизвикателство", reg.want_challenge],
    ["Доброволец", reg.volunteer_help],
    ["GitHub", reg.github_handle],
  ];

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] animate-[fadeIn_0.2s_ease]"
        onClick={onClose}
      />
      <aside className="fixed top-0 right-0 z-50 h-full w-full max-w-[520px] bg-bg border-l border-white/7 overflow-y-auto animate-[slideIn_0.25s_ease]">
        <div className="flex flex-col h-full">
          {/* Sheet header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/7">
            <div>
              <div className="font-body text-lg font-bold">{reg.full_name}</div>
              <div className="flex items-center gap-3 mt-1">
                <span className="font-mono text-[12px] text-acid/70">
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

          {/* Sheet body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {/* Contact */}
            <div className="flex items-center gap-4 font-mono text-[13px]">
              <span className="text-white/50">{reg.email}</span>
              <span className="text-white/20">·</span>
              <span className="text-white/40">{reg.role}</span>
              <span className="text-white/20">·</span>
              <span className="text-white/30">{fmtDate(reg.created_at)}</span>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              {fields.map(
                ([label, value]) =>
                  value && (
                    <div key={label}>
                      <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-1">
                        {label}
                      </div>
                      <div className="font-mono text-[14px] text-white/85">{value}</div>
                    </div>
                  )
              )}
            </div>

            {/* Motivation */}
            <div>
              <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-2">
                Мотивация
              </div>
              <div className="font-mono text-[13px] text-white/70 leading-[1.8] bg-white/2 p-4 border border-white/5">
                {reg.motivation}
              </div>
            </div>

            {/* Expectations */}
            <div>
              <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-2">
                Очаквания
              </div>
              <div className="font-mono text-[13px] text-white/70 leading-[1.8] bg-white/2 p-4 border border-white/5">
                {reg.expectations}
              </div>
            </div>

            {/* Notes */}
            {reg.notes && (
              <div>
                <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-2">
                  Бележки
                </div>
                <div className="font-mono text-[13px] text-white/60 leading-[1.8]">{reg.notes}</div>
              </div>
            )}
          </div>

          {/* Sheet footer with actions */}
          <div className="px-6 py-5 border-t border-white/7 flex gap-3">
            {reg.registration_status !== "approved" && (
              <button
                onClick={() => onUpdateStatus(reg, "approved")}
                disabled={isLoading}
                className="flex-1 font-mono text-[12px] tracking-[0.08em] uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-6 py-2.5 cursor-pointer transition-all hover:bg-emerald-500/25 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLoading ? "..." : "Одобри"}
              </button>
            )}
            {reg.registration_status !== "rejected" && (
              <button
                onClick={() => onUpdateStatus(reg, "rejected")}
                disabled={isLoading}
                className="flex-1 font-mono text-[12px] tracking-[0.08em] uppercase bg-red-500/15 text-red-400 border border-red-500/30 px-6 py-2.5 cursor-pointer transition-all hover:bg-red-500/25 disabled:opacity-40 disabled:cursor-not-allowed"
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
