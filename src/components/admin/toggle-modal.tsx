"use client";

import { ModalShell, ModalButton } from "./modal-shell";

interface ToggleModalProps {
  regOpen: boolean;
  step: 1 | 2;
  onStepChange: (step: 0 | 1 | 2) => void;
  onConfirm: () => void;
}

export function ToggleModal({ regOpen, step, onStepChange, onConfirm }: ToggleModalProps) {
  const tone = regOpen ? "red" : "emerald";
  const titleColor = regOpen ? "text-red-400" : "text-emerald-400";

  return (
    <ModalShell onClose={() => onStepChange(0)} labelledBy="confirm-reg-toggle-title">
      {step === 1 ? (
        <>
          <div id="confirm-reg-toggle-title" className={`font-display text-2xl mb-3 ${titleColor}`}>
            {regOpen ? "ЗАТВАРЯНЕ НА РЕГИСТРАЦИЯТА" : "ОТВАРЯНЕ НА РЕГИСТРАЦИЯТА"}
          </div>
          <div className="font-mono text-sm text-white/70 leading-[1.8] mb-4 space-y-2">
            {regOpen ? (
              <>
                <p>
                  Това ще <span className="text-red-400 font-bold">блокира</span> всички нови
                  регистрации:
                </p>
                <ul className="list-disc list-inside text-white/55 space-y-1 pl-1">
                  <li>Формата за регистрация ще покаже &quot;Регистрацията е затворена&quot;</li>
                  <li>API-то ще отхвърля нови заявки</li>
                  <li>Бутоните за регистрация ще бъдат деактивирани на сайта</li>
                </ul>
              </>
            ) : (
              <>
                <p>
                  Това ще <span className="text-emerald-400 font-bold">отвори</span> регистрациите
                  отново:
                </p>
                <ul className="list-disc list-inside text-white/55 space-y-1 pl-1">
                  <li>Потребителите ще могат да се регистрират</li>
                  <li>Формата и бутоните ще бъдат активни на сайта</li>
                  <li>API-то ще приема нови заявки</li>
                </ul>
              </>
            )}
          </div>
          <p className="font-mono text-[13px] text-white/40 mb-6">
            Промяната влиза в сила веднага за всички потребители.
          </p>
          <div className="flex gap-3">
            <ModalButton onClick={() => onStepChange(0)}>Отказ</ModalButton>
            <ModalButton tone={tone} variant="solid" onClick={() => onStepChange(2)}>
              Продължи →
            </ModalButton>
          </div>
        </>
      ) : (
        <>
          <div className={`font-display text-2xl mb-3 ${titleColor}`}>СИГУРЕН ЛИ СИ?</div>
          <p className="font-mono text-[15px] text-white/80 leading-[1.8] mb-2">
            {regOpen
              ? "Потвърди, че искаш да ЗАТВОРИШ регистрацията."
              : "Потвърди, че искаш да ОТВОРИШ регистрацията."}
          </p>
          <p className="font-mono text-[13px] text-white/40 mb-6">
            Тази стъпка не може да бъде отменена автоматично — ще трябва ръчно да превключиш
            обратно.
          </p>
          <div className="flex gap-3">
            <ModalButton onClick={() => onStepChange(1)}>← Назад</ModalButton>
            <ModalButton tone={tone} variant="solid" bold onClick={onConfirm}>
              {regOpen ? "ЗАТВОРИ РЕГИСТРАЦИЯТА" : "ОТВОРИ РЕГИСТРАЦИЯТА"}
            </ModalButton>
          </div>
        </>
      )}
    </ModalShell>
  );
}
