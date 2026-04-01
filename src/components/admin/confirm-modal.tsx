import type { ConfirmAction } from "@/constants";

interface ConfirmModalProps {
  confirmAction: ConfirmAction;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmModal({ confirmAction, onCancel, onConfirm }: ConfirmModalProps) {
  return (
    <>
      <div
        className="fixed inset-0 z-60 bg-black/70 backdrop-blur-[3px] animate-[fadeIn_0.15s_ease]"
        onClick={onCancel}
      />
      <div className="fixed inset-0 z-61 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-labelledby="confirm-dialog-title"
          aria-modal="true"
          className="bg-card border border-white/10 p-6 max-w-[400px] w-full animate-[fadeUp_0.2s_ease]"
        >
          <div id="confirm-dialog-title" className="font-display text-xl mb-2">
            {confirmAction.status === "approved" ? "ОДОБРЯВАНЕ" : "ОТХВЪРЛЯНЕ"}
          </div>
          <p className="font-mono text-[13px] text-white/60 leading-[1.7] mb-2">
            {confirmAction.status === "approved"
              ? "Сигурен ли си, че искаш да одобриш"
              : "Сигурен ли си, че искаш да отхвърлиш"}{" "}
            <span className="text-white font-bold">{confirmAction.reg.full_name}</span>?
          </p>
          <p className="font-mono text-[11px] text-white/40 mb-6">
            Ще бъде изпратен имейл до {confirmAction.reg.email}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 font-mono text-[12px] tracking-[0.08em] uppercase border border-white/15 text-white/50 px-5 py-2.5 cursor-pointer transition-all hover:text-white hover:border-white/30"
            >
              Отказ
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 font-mono text-[12px] tracking-[0.08em] uppercase px-5 py-2.5 cursor-pointer transition-all ${
                confirmAction.status === "approved"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                  : "bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25"
              }`}
            >
              {confirmAction.status === "approved" ? "Одобри" : "Отхвърли"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
