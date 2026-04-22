"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm, useWatch, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type Step1Data, step1Schema, getGithubAvatarUrl } from "@/lib";

const STEP1_SYNC_FIELDS = ["fullName", "email", "phone", "age", "organization", "handle"] as const;

interface UseStep1FormOptions {
  onSuccess: (data: Step1Data) => void;
  setSubmitAttempted: (v: boolean) => void;
  trackEvent: (name: string, props: Record<string, unknown>) => void;
}

interface UseStep1FormReturn {
  form: UseFormReturn<Step1Data>;
  avatarUrl: string;
  fullName: string;
  submitStep1: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFetchAvatar: () => Promise<void>;
}

export function useStep1Form({
  onSuccess,
  setSubmitAttempted,
  trackEvent,
}: UseStep1FormOptions): UseStep1FormReturn {
  const form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      age: "",
      role: "",
      organization: "",
      devExperience: "",
      handle: "",
      avatarUrl: "",
    },
  });

  const [avatarUrl, setAvatarUrl] = useState("");
  const fullName = useWatch({ control: form.control, name: "fullName" }) ?? "";

  // ── Autofill sync ──────────────────────────────────────────────
  const syncStep1Autofill = useCallback(() => {
    let changed = false;

    for (const name of STEP1_SYNC_FIELDS) {
      const el = document.querySelector<HTMLInputElement>(`input[name="${name}"]`);
      if (!el) continue;

      const domValue = el.value?.trim() ?? "";
      const formValue = String(form.getValues(name) ?? "").trim();

      if (domValue && domValue !== formValue) {
        form.setValue(name, domValue as Step1Data[typeof name], {
          shouldDirty: true,
          shouldTouch: false,
          shouldValidate: true,
        });
        changed = true;
      }
    }

    if (changed) {
      form.trigger();
    }
  }, [form]);

  // Run sync on mount (staggered), window focus, and tab visibility
  useEffect(() => {
    const run = () => syncStep1Autofill();

    const timers = [100, 400, 1000, 2000].map((ms) => setTimeout(run, ms));

    const onVisChange = () => {
      if (document.visibilityState === "visible") run();
    };

    window.addEventListener("focus", run);
    document.addEventListener("visibilitychange", onVisChange);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("focus", run);
      document.removeEventListener("visibilitychange", onVisChange);
    };
  }, [syncStep1Autofill]);

  // Re-validate when fields become dirty without being touched (autofill signal)
  const { dirtyFields, touchedFields } = form.formState;

  useEffect(() => {
    const dirtyCount = Object.keys(dirtyFields).length;
    const touchedCount = Object.keys(touchedFields).length;
    if (dirtyCount > 0 && dirtyCount > touchedCount) {
      form.trigger();
    }
  }, [dirtyFields, touchedFields, form]);

  // ── Avatar ─────────────────────────────────────────────────────
  const handleFetchAvatar = useCallback(async () => {
    const handle = form.getValues("handle")?.trim();
    if (!handle || handle.length < 2) return;

    const url = getGithubAvatarUrl(handle);
    setAvatarUrl(url);
    form.setValue("avatarUrl", url);
  }, [form]);

  // ── Focus first error ──────────────────────────────────────────
  const focusFirstError = useCallback(() => {
    const firstKey = Object.keys(form.formState.errors)[0] as keyof Step1Data | undefined;
    if (firstKey) {
      try {
        form.setFocus(firstKey);
      } catch {
        // fallback for fields that don't support setFocus (e.g. selects)
        const el = document.querySelector<HTMLElement>(`[name="${firstKey}"]`);
        el?.focus();
      }
      const el = document.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [form]);

  // ── Submit handler ─────────────────────────────────────────────
  const submitStep1 = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitAttempted(true);
      syncStep1Autofill();
      form.handleSubmit(
        (data) => {
          trackEvent("registration_step_complete", { step: 1 });
          onSuccess(data);
        },
        () => focusFirstError()
      )();
    },
    [form, syncStep1Autofill, focusFirstError, onSuccess, setSubmitAttempted, trackEvent]
  );

  return {
    form,
    avatarUrl,
    fullName,
    submitStep1,
    handleFetchAvatar,
  };
}
