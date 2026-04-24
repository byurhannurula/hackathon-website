"use client";

import { useState } from "react";

import type { AdminStats, BroadcastFilter } from "@/constants";
import { ModalShell, ModalButton } from "./modal-shell";

interface BroadcastModalProps {
  stats: AdminStats;
  loading: boolean;
  onClose: () => void;
  onSend: (payload: { subject: string; body: string; recipientFilter: BroadcastFilter }) => void;
}

const FILTER_LABELS: Record<BroadcastFilter, string> = {
  all: "потребителя",
  approved: "одобрени",
  pending: "изчакващи",
  rejected: "отхвърлени",
};

function countFor(stats: AdminStats, filter: BroadcastFilter) {
  return filter === "all" ? stats.total : stats[filter];
}

export function BroadcastModal({ stats, loading, onClose, onSend }: BroadcastModalProps) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [filter, setFilter] = useState<BroadcastFilter>("all");
  const [confirm, setConfirm] = useState(false);

  const count = countFor(stats, filter);

  return (
    <ModalShell onClose={onClose} labelledBy="broadcast-dialog-title" maxWidth="max-w-[560px]">
      {!confirm ? (
        <>
          <div id="broadcast-dialog-title" className="font-display text-2xl mb-1 text-acid">
            ИЗПРАТИ СЪОБЩЕНИЕ
          </div>
          <p className="font-mono text-[13px] text-white/50 mb-6">
            Изпрати имейл до всички регистрирани потребители
          </p>

          <div className="mb-4">
            <label className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-2 block">
              Получатели
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as BroadcastFilter)}
              className="w-full py-3 px-4 text-sm bg-white/4 border border-white/15 text-white font-mono outline-none cursor-pointer transition-colors focus:border-acid"
            >
              <option value="all" style={{ background: "#0a0a0a", color: "#fff" }}>
                Всички ({stats.total})
              </option>
              <option value="approved" style={{ background: "#0a0a0a", color: "#fff" }}>
                Одобрени ({stats.approved})
              </option>
              <option value="pending" style={{ background: "#0a0a0a", color: "#fff" }}>
                Изчакващи ({stats.pending})
              </option>
              <option value="rejected" style={{ background: "#0a0a0a", color: "#fff" }}>
                Отхвърлени ({stats.rejected})
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-2 block">
              Тема
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Тема на имейла..."
              maxLength={200}
              className="w-full py-3 px-4 text-sm bg-white/4 border border-white/15 text-white font-mono outline-none transition-colors focus:border-acid placeholder:text-white/30"
            />
          </div>

          <div className="mb-6">
            <label className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-2 block">
              Съдържание
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Текст на съобщението... (нов ред = нов параграф)"
              rows={6}
              maxLength={5000}
              className="w-full py-3 px-4 text-sm bg-white/4 border border-white/15 text-white font-mono outline-none transition-colors focus:border-acid placeholder:text-white/30 resize-y leading-[1.8]"
            />
            <div className="font-mono text-[11px] text-white/25 mt-1 text-right">
              {body.length}/5000
            </div>
          </div>

          {count >= 80 && (
            <div
              className={`font-mono text-[13px] p-3 mb-4 border ${
                count >= 100
                  ? "bg-red-500/10 border-red-500/30 text-red-400"
                  : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
              }`}
            >
              {count >= 100
                ? `⚠ ${count} получателя надвишава дневния лимит от 100 имейла в Resend. Част от имейлите няма да бъдат доставени.`
                : `⚠ ${count} получателя е близо до дневния лимит от 100 имейла в Resend.`}
            </div>
          )}

          <div className="flex gap-3">
            <ModalButton onClick={onClose}>Отказ</ModalButton>
            <ModalButton
              tone="acid"
              variant="solid"
              onClick={() => setConfirm(true)}
              disabled={!subject.trim() || !body.trim()}
            >
              Продължи →
            </ModalButton>
          </div>
        </>
      ) : (
        <>
          <div className="font-display text-2xl mb-3 text-acid">ПОТВЪРЖДЕНИЕ</div>
          <div className="font-mono text-sm text-white/70 leading-[1.8] mb-2 space-y-2">
            <p>
              Ще изпратиш имейл до <span className="text-acid font-bold">{count}</span>{" "}
              {FILTER_LABELS[filter]}
            </p>
          </div>

          <div className="bg-white/3 border border-white/8 p-4 mb-2">
            <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-1">
              Тема
            </div>
            <div className="font-mono text-[14px] text-white/90">{subject}</div>
          </div>

          <div className="bg-white/3 border border-white/8 p-4 mb-6">
            <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-1">
              Съдържание
            </div>
            <div className="font-mono text-[13px] text-white/70 leading-[1.8] whitespace-pre-line">
              {body}
            </div>
          </div>

          {count >= 100 && (
            <div className="font-mono text-[13px] p-3 mb-4 border bg-red-500/10 border-red-500/30 text-red-400">
              ⚠ {count} получателя надвишава дневния лимит от 100 имейла в Resend. Част от имейлите
              няма да бъдат доставени.
            </div>
          )}

          <p className="font-mono text-[13px] text-red-400/70 mb-6">
            Това действие не може да бъде отменено.
          </p>

          <div className="flex gap-3">
            <ModalButton onClick={() => setConfirm(false)}>← Назад</ModalButton>
            <ModalButton
              tone="acid"
              variant="solid"
              bold
              onClick={() => onSend({ subject, body, recipientFilter: filter })}
              disabled={loading}
            >
              {loading ? "Изпращане..." : "ИЗПРАТИ"}
            </ModalButton>
          </div>
        </>
      )}
    </ModalShell>
  );
}
