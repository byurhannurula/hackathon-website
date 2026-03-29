"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ROLE_OPTIONS,
  DEV_EXPERIENCE_OPTIONS,
  AI_EXPERIENCE_OPTIONS,
  YES_NO_OPTIONS,
  YES_NO_MAYBE_OPTIONS,
} from "@/constants";
import {
  FormLabel,
  FormInput,
  FormSelect,
  FormTextarea,
  FormCheckbox,
  FormButton,
  AvatarCircle,
  TextShimmer,
  TicketUnlockSequence,
} from "@/components/ui";
import { useAnalytics } from "@/components/analytics";
import {
  type TicketData,
  type Step1Data,
  type Step2Data,
  type Step3Data,
  step1Schema,
  step2Schema,
  step3Schema,
  cn,
  getGithubAvatarUrl,
} from "@/lib";

interface RegisterPageProps {
  onRegister: (data: TicketData) => void;
}

export function RegisterPage({ onRegister }: RegisterPageProps) {
  const { trackEvent } = useAnalytics();
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [hasThemeValue, setHasThemeValue] = useState<string>("");
  const [hasTeamValue, setHasTeamValue] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [pendingTicket, setPendingTicket] = useState<TicketData | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    mode: "onChange",
  });

  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    mode: "onChange",
  });

  const form3 = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    mode: "onChange",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleFetchAvatar = async () => {
    const handle = form1.getValues("handle")?.trim();
    if (!handle || handle.length < 2) return;

    const fallback = getGithubAvatarUrl(handle);
    setAvatarUrl(fallback);
    form1.setValue("avatarUrl", fallback);
  };

  const onStep1Submit = (data: Step1Data) => {
    trackEvent("registration_step_complete", { step: 1 });
    setStep1Data(data);
    setStep(2);
  };

  const onStep2Submit = (data: Step2Data) => {
    trackEvent("registration_step_complete", { step: 2 });
    setStep2Data(data);
    setStep(3);
  };

  const onStep3Submit = async (step3FormData: Step3Data) => {
    if (!step1Data || !step2Data) return;

    const fullRegistrationData = {
      ...step1Data,
      ...step2Data,
      ...step3FormData,
      handle: step1Data.handle || "",
      avatarUrl: avatarUrl || "",
    };

    try {
      setSubmitting(true);
      setApiError(null);

      // Brief button loader before full-screen transition
      await new Promise((r) => setTimeout(r, 600));
      setGenerating(true);

      const [apiResult] = await Promise.allSettled([
        fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fullRegistrationData),
        })
          .then(async (res) => {
            const json = await res.json();
            if (!res.ok) return { ok: false, ...json };
            return json;
          })
          .catch(() => ({ ok: false, error: "Грешка в мрежата. Моля, опитайте отново." })),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);

      const apiData = apiResult.status === "fulfilled" ? apiResult.value : null;

      if (!apiData?.ok || !apiData?.ticketNumber || !apiData?.ticketId) {
        setGenerating(false);
        setSubmitting(false);

        const errorMsg = apiData?.error || "Грешка при регистрацията. Моля, опитайте отново.";
        setApiError(errorMsg);

        // If duplicate email, go back to step 1 so user can fix it
        if (apiData?.code === "DUPLICATE_EMAIL") {
          setStep(1);
        }
        return;
      }

      const ticketData: TicketData = {
        name: step1Data.fullName.trim(),
        handle: step1Data.handle?.trim() || "",
        avatarUrl,
        ticketNum: apiData.ticketNumber,
        ticketId: apiData.ticketId,
      };

      setPendingTicket(ticketData);
    } catch (error) {
      console.error("Registration error:", error);
      setGenerating(false);
      setSubmitting(false);
      setApiError("Възникна грешка. Моля, опитайте отново.");
    }
  };

  const currentForm = step === 1 ? form1 : step === 2 ? form2 : form3;
  const isValid = currentForm.formState.isValid;

  // ── UNLOCK SEQUENCE (plays after API success, before redirect) ──
  if (pendingTicket) {
    return <TicketUnlockSequence enabled onComplete={() => onRegister(pendingTicket)} />;
  }

  // ── GENERATING STATE (API in flight) ──
  if (generating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          <TextShimmer
            duration={1.8}
            className="font-mono text-xl dark:[--base-gradient-color:theme(--color-acid)]"
          >
            Свързване със сървъра...
          </TextShimmer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
      <div className="absolute inset-0 z-0 bg-grid-white" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vw] pointer-events-none z-0 bg-glow-acid-subtle" />

      <Link
        href="/"
        className="relative z-1 mb-8 font-mono text-[11px] tracking-[0.14em] text-white/30 no-underline transition-colors duration-200 hover:text-white/60"
      >
        ← Към Началото
      </Link>

      <div className="relative z-1 text-center mb-10 max-w-[600px]">
        <div className="font-mono text-[10px] tracking-[0.2em] text-acid/60 uppercase mb-4">
          СТЪПКА {step} ОТ 3
        </div>
        <h1 className="font-display text-[clamp(48px,8vw,64px)] leading-[0.9] mb-3">
          ЗАЕМИ СВОЕТО <span className="text-acid">МЯСТО</span>
        </h1>
        <p className="font-mono text-xs text-muted leading-relaxed">
          Попълнете формата, за да се регистрирате и да генерирате уникалния си хакерски билет.
        </p>
      </div>

      <div className="w-full max-w-[580px] animate-slide-in" key={step}>
        {/* Error banner */}
        {apiError && (
          <div className="mb-6 border border-red-500/30 bg-red-500/10 rounded-sm px-4 py-3 flex items-start gap-3">
            <span className="text-red-400 text-lg leading-none mt-0.5">!</span>
            <div>
              <p className="font-mono text-xs text-red-400 leading-relaxed">{apiError}</p>
              <button
                onClick={() => setApiError(null)}
                className="font-mono text-[10px] text-red-400/60 hover:text-red-400 mt-1 underline cursor-pointer"
              >
                Затвори
              </button>
            </div>
          </div>
        )}

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-500",
                step >= s ? "bg-acid" : "bg-white/10",
                step === s && "shadow-[0_0_8px_rgba(254,238,4,0.5)] animate-pulse"
              )}
            />
          ))}
        </div>

        <h2 className="font-display text-[clamp(24px,6vw,32px)] leading-[0.9] mb-3">
          {step === 1 && (
            <>
              ЛИЧНА И <span className="text-acid">ПРОФЕСИОНАЛНА</span>
            </>
          )}
          {step === 2 && (
            <>
              AI ОПИТ И <span className="text-acid">МОТИВАЦИЯ</span>
            </>
          )}
          {step === 3 && (
            <>
              ПРОЕКТ И <span className="text-acid">УЧАСТИЕ</span>
            </>
          )}
        </h2>
        <p className="font-mono text-xs text-muted leading-relaxed mb-10">
          {step === 1 && "Разкажете ни за себе си и опита си."}
          {step === 2 && "Споделете своя AI път и защо искате да се присъедините."}
          {step === 3 && "Последни детайли за участието ви в хакатона."}
        </p>

        {/* STEP 1: Personal & Professional */}
        {step === 1 && (
          <form onSubmit={form1.handleSubmit(onStep1Submit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <FormLabel>Име и фамилия</FormLabel>
                <FormInput
                  {...form1.register("fullName", {
                    onChange: (e) => setFullName(e.target.value),
                  })}
                  placeholder="Иван Иванов"
                  error={form1.formState.errors.fullName?.message}
                />
              </div>

              <div>
                <FormLabel>Email</FormLabel>
                <FormInput
                  {...form1.register("email")}
                  type="email"
                  placeholder="you@example.com"
                  error={form1.formState.errors.email?.message}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <FormLabel>Телефон</FormLabel>
                <FormInput
                  {...form1.register("phone")}
                  type="tel"
                  placeholder="+359 888 123 456"
                  error={form1.formState.errors.phone?.message}
                />
              </div>

              <div>
                <FormLabel>Вашата възраст на 24 април 2026 г.</FormLabel>
                <FormInput
                  {...form1.register("age")}
                  type="number"
                  placeholder="25"
                  error={form1.formState.errors.age?.message}
                />
              </div>
            </div>

            <div>
              <FormLabel>Вие сте:</FormLabel>
              <FormSelect
                {...form1.register("role")}
                options={ROLE_OPTIONS}
                error={form1.formState.errors.role?.message}
              />
            </div>

            <div>
              <FormLabel>
                Организация или образователна институция (напишете NA ако няма такава)
              </FormLabel>
              <FormInput
                {...form1.register("organization")}
                placeholder="Русенски университет, Acme Corp и др."
                error={form1.formState.errors.organization?.message}
              />
            </div>

            <div>
              <FormLabel>Опит в софтуерна разработка</FormLabel>
              <FormSelect
                {...form1.register("devExperience")}
                options={DEV_EXPERIENCE_OPTIONS}
                error={form1.formState.errors.devExperience?.message}
              />
            </div>

            {/* GitHub Handle + Avatar (optional) */}
            <div>
              <FormLabel>GitHub потребителско име (опционално)</FormLabel>
              <div className="flex gap-2">
                <FormInput
                  placeholder="username"
                  className="flex-1"
                  {...form1.register("handle")}
                />
                <FormButton
                  size="md"
                  type="button"
                  variant="secondary"
                  className="font-mono text-[11px] font-bold"
                  onClick={handleFetchAvatar}
                >
                  Зареди
                </FormButton>
              </div>
            </div>

            <p className="font-mono text-[10px] text-white/50 -mt-3">
              Само потребителското име, не email. Напр. octocat
            </p>

            <div className="flex items-center gap-4">
              <AvatarCircle name={fullName || "?"} avatarUrl={avatarUrl} size={48} />
              <div className="font-mono text-[11px] text-white/40">
                {avatarUrl ? "Аватарът е зареден" : "Няма аватар"}
              </div>
            </div>

            <FormButton type="submit" disabled={!isValid} size="md" className="w-full">
              ПРОДЪЛЖИ →
            </FormButton>
          </form>
        )}

        {/* STEP 2: AI & Motivation */}
        {step === 2 && (
          <form onSubmit={form2.handleSubmit(onStep2Submit)} className="space-y-6">
            <div>
              <FormLabel>Опит от използване на AI за vibe coding</FormLabel>
              <FormSelect
                {...form2.register("aiExperience")}
                options={AI_EXPERIENCE_OPTIONS}
                error={form2.formState.errors.aiExperience?.message}
              />
            </div>

            <div>
              <FormLabel>Кои AI инструменти и платформи използвате най-често?</FormLabel>
              <FormInput
                {...form2.register("aiTools")}
                placeholder="v0, Cursor, Claude, ChatGPT, Copilot и др."
                error={form2.formState.errors.aiTools?.message}
              />
            </div>

            <div>
              <FormLabel>
                Защо се регистрирате в Ruse AI Hack? (Опишете мотивация си в минимум три изречения.
                Непълен, несериозен или AI генериран отговор може да означава отказана регистрация.)
              </FormLabel>
              <FormTextarea
                {...form2.register("motivation")}
                placeholder="Искам да участвам, защото..."
                rows={6}
                error={form2.formState.errors.motivation?.message}
              />
            </div>

            <div>
              <FormLabel>
                Какви са очакванията Ви за събитието? Кои резултати ще Ви дадат удовлетворение?
              </FormLabel>
              <FormTextarea
                {...form2.register("expectations")}
                placeholder="Очаквам да науча..."
                rows={4}
                error={form2.formState.errors.expectations?.message}
              />
            </div>

            <div className="flex gap-3">
              <FormButton
                type="button"
                onClick={() => setStep(1)}
                variant="outline"
                size="md"
                className="flex-1"
              >
                ← НАЗАД
              </FormButton>
              <FormButton type="submit" disabled={!isValid} size="md" className="flex-1">
                ПРОДЪЛЖИ →
              </FormButton>
            </div>
          </form>
        )}

        {/* STEP 3: Project & Participation */}
        {step === 3 && (
          <form onSubmit={form3.handleSubmit(onStep3Submit)} className="space-y-6">
            <div>
              <FormLabel>Имате ли избрана тема за разработка?</FormLabel>
              <FormSelect
                {...form3.register("hasTheme", {
                  onChange: (e) => setHasThemeValue(e.target.value),
                })}
                options={YES_NO_OPTIONS}
                error={form3.formState.errors.hasTheme?.message}
              />
            </div>

            {hasThemeValue === "Да" && (
              <div>
                <FormLabel>Опишете темата (незадължително)</FormLabel>
                <FormTextarea
                  {...form3.register("themeDescription")}
                  placeholder="Кратко опишете какво искате да създадете..."
                  rows={3}
                  error={form3.formState.errors.themeDescription?.message}
                />
              </div>
            )}

            <div>
              <FormLabel>Имате ли вече формиран екип?</FormLabel>
              <FormSelect
                {...form3.register("hasTeam", {
                  onChange: (e) => setHasTeamValue(e.target.value),
                })}
                options={YES_NO_OPTIONS}
                error={form3.formState.errors.hasTeam?.message}
              />
            </div>

            {hasTeamValue === "Да" && (
              <div>
                <FormLabel>Име на екипа</FormLabel>
                <FormInput
                  {...form3.register("teamName")}
                  placeholder="Напр. Team Vibe, AI Legends и др."
                  error={form3.formState.errors.teamName?.message}
                />
              </div>
            )}

            <div>
              <FormLabel>
                Желаете ли да работите по предизвикателство, което ще се предостави в рамките на
                състезанието?
              </FormLabel>
              <FormSelect
                {...form3.register("wantChallenge")}
                options={YES_NO_MAYBE_OPTIONS}
                error={form3.formState.errors.wantChallenge?.message}
              />
            </div>

            <div>
              <FormLabel>
                Желаете ли да бъдете доброволци за промотиране на събитието и да помагате в
                организацията?
              </FormLabel>
              <FormSelect
                {...form3.register("volunteerHelp")}
                options={YES_NO_MAYBE_OPTIONS}
                error={form3.formState.errors.volunteerHelp?.message}
              />
            </div>

            <div>
              <FormCheckbox
                {...form3.register("agreeRandomTeams")}
                label={
                  <>
                    Запознат/а съм и приемам{" "}
                    <Link
                      href="/rules"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-acid/70 underline hover:text-acid"
                    >
                      Правилата и условията за участие
                    </Link>{" "}
                    в Ruse AI Hack | App in a Snap, включително разпределение на отборите на
                    произволен принцип чрез комбиниране на хора с различен опит.
                  </>
                }
                error={form3.formState.errors.agreeRandomTeams?.message}
              />
            </div>

            <div>
              <FormCheckbox
                {...form3.register("gdprConsent")}
                label="Давам съгласие личните ми данни да бъдат обработвани за целите на организацията и провеждането на събитието."
                error={form3.formState.errors.gdprConsent?.message}
              />
            </div>

            <div>
              <FormCheckbox
                {...form3.register("registrationNotGuaranteed")}
                label="Разбирам, че регистрацията не означава автоматично одобрение за участие."
                error={form3.formState.errors.registrationNotGuaranteed?.message}
              />
            </div>

            <div>
              <FormLabel>Имате ли други въпроси или предложения?</FormLabel>
              <FormTextarea
                {...form3.register("additionalQuestions")}
                placeholder="Незадължителни коментари или въпроси..."
                rows={4}
                error={form3.formState.errors.additionalQuestions?.message}
              />
            </div>

            <div className="flex gap-3">
              <FormButton
                type="button"
                onClick={() => setStep(2)}
                variant="outline"
                size="md"
                className="flex-1"
              >
                ← НАЗАД
              </FormButton>
              <FormButton
                type="submit"
                disabled={!isValid || submitting}
                size="md"
                className="flex-1"
              >
                ВЗЕМИ БИЛЕТ ✦
              </FormButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
