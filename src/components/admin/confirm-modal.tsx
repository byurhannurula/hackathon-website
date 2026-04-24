"use client";

import type { ConfirmAction } from "@/constants";
import { ModalShell, ModalButton } from "./modal-shell";

interface ConfirmModalProps {
  confirmAction: ConfirmAction;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmModal({ confirmAction, onCancel, onConfirm }: ConfirmModalProps) {
  const approved = confirmAction.status === "approved";
  const tone = approved ? "emerald" : "red";

  return (
    <ModalShell
      onClose={onCancel}
      labelledBy="confirm-dialog-title"
      maxWidth="max-w-[400px]"
      backdropOpacity="medium"
    >
      <div id="confirm-dialog-title" className="font-display text-2xl mb-2">
        {approved ? "ОДОБРЯВАНЕ" : "ОТХВЪРЛЯНЕ"}
      </div>
      <p className="font-mono text-sm text-white/70 leading-[1.7] mb-2">
        {approved ? "Сигурен ли си, че искаш да одобриш" : "Сигурен ли си, че искаш да отхвърлиш"}{" "}
        <span className="text-white font-bold">{confirmAction.reg.full_name}</span>?
      </p>
      <p className="font-mono text-[13px] text-white/50 mb-6">
        Ще бъде изпратен имейл до {confirmAction.reg.email}
      </p>
      <div className="flex gap-3">
        <ModalButton onClick={onCancel}>Отказ</ModalButton>
        <ModalButton tone={tone} variant="solid" onClick={onConfirm}>
          {approved ? "Одобри" : "Отхвърли"}
        </ModalButton>
      </div>
    </ModalShell>
  );
}
