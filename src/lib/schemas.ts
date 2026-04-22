import { z } from "zod";

import {
  ROLE_OPTIONS,
  DEV_EXPERIENCE_OPTIONS,
  AI_EXPERIENCE_OPTIONS,
  YES_NO_OPTIONS,
  YES_NO_MAYBE_OPTIONS,
} from "@/constants/form-options";

// Step 1: Personal & Professional Info (Fields 1-6)
export const step1Schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Минимум 2 символа")
    .max(100, "Максимум 100 символа")
    .regex(/\p{L}/u, "Името трябва да съдържа поне една буква"),
  email: z.email({ error: "Невалиден имейл" }).trim().max(255, "Максимум 255 символа"),
  phone: z.string().trim().min(1, "Задължително поле").max(20, "Максимум 20 символа"),
  age: z
    .string()
    .trim()
    .min(1, "Задължително поле")
    .regex(/^\d+$/, "Въведете валидна възраст")
    .refine((v) => {
      const age = Number(v);
      return age >= 12 && age <= 120;
    }, "Въведете валидна възраст"),
  role: z.enum(ROLE_OPTIONS as [string, ...string[]], { error: "Изберете роля" }),
  organization: z.string().trim().min(1, "Задължително поле").max(150, "Максимум 150 символа"),
  devExperience: z.enum(DEV_EXPERIENCE_OPTIONS as [string, ...string[]], {
    error: "Изберете ниво",
  }),
  handle: z.string().trim().max(100, "Максимум 100 символа").optional().or(z.literal("")),
  avatarUrl: z.string().trim().max(500, "Невалиден URL").optional().or(z.literal("")),
});

// Step 2: AI & Hackathon Experience (Fields 7-10)
export const step2Schema = z.object({
  aiExperience: z.enum(AI_EXPERIENCE_OPTIONS as [string, ...string[]], {
    error: "Изберете ниво",
  }),
  aiTools: z.string().trim().min(1, "Задължително поле").max(500, "Максимум 500 символа"),
  motivation: z
    .string()
    .trim()
    .min(100, "Минимум 100 символа (около 3 изречения)")
    .max(2000, "Максимум 2000 символа"),
  expectations: z.string().trim().min(1, "Задължително поле").max(1000, "Максимум 1000 символа"),
});

// Step 3: Project & Participation Details (Fields 11-15)
export const step3Schema = z.object({
  hasTheme: z.enum(YES_NO_OPTIONS as [string, ...string[]], { error: "Изберете опция" }),
  themeDescription: z.string().trim().max(1000, "Максимум 1000 символа").optional(),
  hasTeam: z.enum(YES_NO_OPTIONS as [string, ...string[]], { error: "Изберете опция" }),
  teamName: z.string().trim().max(100, "Максимум 100 символа").optional(),
  wantChallenge: z.enum(YES_NO_MAYBE_OPTIONS as [string, ...string[]], {
    error: "Изберете опция",
  }),
  volunteerHelp: z.enum(YES_NO_MAYBE_OPTIONS as [string, ...string[]], {
    error: "Изберете опция",
  }),
  agreeRandomTeams: z.literal(true, {
    error: "Трябва да приемете правилата за участие",
  }),
  gdprConsent: z.literal(true, {
    error: "Трябва да дадете съгласие за обработка на данните",
  }),
  registrationNotGuaranteed: z.literal(true, {
    error: "Трябва да потвърдите, че разбирате условието",
  }),
  additionalQuestions: z.string().trim().max(2000, "Максимум 2000 символа").optional(),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type RegistrationData = Step1Data & Step2Data & Step3Data;

// ─── Admin schemas ────────────────────────────────────────────

export const adminLoginSchema = z.object({
  password: z.string().min(1),
});

export const updateStatusSchema = z
  .object({
    registration_status: z.enum(["pending", "approved", "rejected"]).optional(),
    notes: z.string().max(2000).optional(),
  })
  .refine((data) => data.registration_status !== undefined || data.notes !== undefined, {
    message: "At least one field is required",
  });

export const sendEmailSchema = z.object({
  registrationId: z.uuid(),
  email: z.email(),
  fullName: z.string().trim().min(1).max(100),
  status: z.enum(["approved", "rejected"]),
  ticketNumber: z.number(),
  ticketId: z.string(),
});

export const broadcastEmailSchema = z.object({
  subject: z
    .string()
    .min(1, "Задължително поле")
    .max(200, "Максимум 200 символа")
    .transform((v) => v.replace(/[\r\n\t]/g, " ")),
  body: z.string().min(1, "Задължително поле").max(5000, "Максимум 5000 символа"),
  recipientFilter: z.enum(["all", "approved", "pending", "rejected"]),
});
