interface ToggleModalProps {
  regOpen: boolean;
  step: 1 | 2;
  onStepChange: (step: 0 | 1 | 2) => void;
  onConfirm: () => void;
}

export function ToggleModal({ regOpen, step, onStepChange, onConfirm }: ToggleModalProps) {
  return (
    <>
      <div
        className="fixed inset-0 z-60 bg-black/80 backdrop-blur-[4px] animate-[fadeIn_0.15s_ease]"
        onClick={() => onStepChange(0)}
      />
      <div className="fixed inset-0 z-61 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-labelledby="confirm-reg-toggle-title"
          aria-modal="true"
          className="bg-card border border-white/10 p-7 max-w-[460px] w-full animate-[fadeUp_0.2s_ease] shadow-2xl"
        >
          {step === 1 ? (
            <>
              <div
                id="confirm-reg-toggle-title"
                className={`font-display text-2xl mb-3 ${regOpen ? "text-red-400" : "text-emerald-400"}`}
              >
                {regOpen ? "ЗАТВАРЯНЕ НА РЕГИСТРАЦИЯТА" : "ОТВАРЯНЕ НА РЕГИСТРАЦИЯТА"}
              </div>
              <div className="font-mono text-[13px] text-white/60 leading-[1.8] mb-4 space-y-2">
                {regOpen ? (
                  <>
                    <p>
                      Това ще <span className="text-red-400 font-bold">блокира</span> всички нови
                      регистрации:
                    </p>
                    <ul className="list-disc list-inside text-white/45 space-y-1 pl-1">
                      <li>
                        Формата за регистрация ще покаже &quot;Регистрацията е затворена&quot;
                      </li>
                      <li>API-то ще отхвърля нови заявки</li>
                      <li>Бутоните за регистрация ще бъдат деактивирани на сайта</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p>
                      Това ще <span className="text-emerald-400 font-bold">отвори</span>{" "}
                      регистрациите отново:
                    </p>
                    <ul className="list-disc list-inside text-white/45 space-y-1 pl-1">
                      <li>Потребителите ще могат да се регистрират</li>
                      <li>Формата и бутоните ще бъдат активни на сайта</li>
                      <li>API-то ще приема нови заявки</li>
                    </ul>
                  </>
                )}
              </div>
              <p className="font-mono text-[11px] text-white/30 mb-6">
                Промяната влиза в сила веднага за всички потребители.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => onStepChange(0)}
                  className="flex-1 font-mono text-[12px] tracking-[0.08em] uppercase border border-white/15 text-white/50 px-5 py-3 cursor-pointer transition-all hover:text-white hover:border-white/30"
                >
                  Отказ
                </button>
                <button
                  onClick={() => onStepChange(2)}
                  className={`flex-1 font-mono text-[12px] tracking-[0.08em] uppercase px-5 py-3 cursor-pointer transition-all ${
                    regOpen
                      ? "bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25"
                      : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                  }`}
                >
                  Продължи →
                </button>
              </div>
            </>
          ) : (
            <>
              <div
                className={`font-display text-2xl mb-3 ${regOpen ? "text-red-400" : "text-emerald-400"}`}
              >
                СИГУРЕН ЛИ СИ?
              </div>
              <p className="font-mono text-[14px] text-white/70 leading-[1.8] mb-2">
                {regOpen
                  ? "Потвърди, че искаш да ЗАТВОРИШ регистрацията."
                  : "Потвърди, че искаш да ОТВОРИШ регистрацията."}
              </p>
              <p className="font-mono text-[11px] text-white/30 mb-6">
                Тази стъпка не може да бъде отменена автоматично — ще трябва ръчно да превключиш
                обратно.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => onStepChange(1)}
                  className="flex-1 font-mono text-[12px] tracking-[0.08em] uppercase border border-white/15 text-white/50 px-5 py-3 cursor-pointer transition-all hover:text-white hover:border-white/30"
                >
                  ← Назад
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 font-mono text-[12px] tracking-[0.08em] uppercase px-5 py-3 cursor-pointer transition-all font-bold ${
                    regOpen
                      ? "bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30"
                      : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                  }`}
                >
                  {regOpen ? "ЗАТВОРИ РЕГИСТРАЦИЯТА" : "ОТВОРИ РЕГИСТРАЦИЯТА"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
