import { z } from "zod";

// Step 1: Personal & Professional Info (Fields 1-6)
export const step1Schema = z.object({
  fullName: z.string().min(2, "Минимум 2 символа").max(100, "Максимум 100 символа"),
  email: z.string().email("Невалиден имейл").max(255, "Максимум 255 символа"),
  phone: z.string().min(1, "Задължително поле").max(20, "Максимум 20 символа"),
  age: z.string().min(1, "Задължително поле").max(10, "Невалидна стойност"),
  role: z.string().min(1, "Изберете роля").max(100, "Максимум 100 символа"),
  organization: z.string().min(1, "Задължително поле").max(150, "Максимум 150 символа"),
  devExperience: z.string().min(1, "Изберете ниво").max(50, "Невалидна стойност"),
  handle: z.string().max(100, "Максимум 100 символа").optional(),
  avatarUrl: z.string().max(500, "Невалиден URL").optional(),
});

// Step 2: AI & Hackathon Experience (Fields 7-10)
export const step2Schema = z.object({
  aiExperience: z.string().min(1, "Изберете ниво").max(50, "Невалидна стойност"),
  aiTools: z.string().min(1, "Задължително поле").max(500, "Максимум 500 символа"),
  motivation: z
    .string()
    .min(100, "Минимум 100 символа (около 3 изречения)")
    .max(2000, "Максимум 2000 символа"),
  expectations: z.string().min(1, "Задължително поле").max(1000, "Максимум 1000 символа"),
});

// Step 3: Project & Participation Details (Fields 11-15)
export const step3Schema = z.object({
  hasTheme: z.string().min(1, "Изберете опция").max(50, "Невалидна стойност"),
  themeDescription: z.string().max(1000, "Максимум 1000 символа").optional(),
  hasTeam: z.string().min(1, "Изберете опция").max(50, "Невалидна стойност"),
  teamName: z.string().max(100, "Максимум 100 символа").optional(),
  wantChallenge: z.string().min(1, "Изберете опция").max(50, "Невалидна стойност"),
  volunteerHelp: z.string().min(1, "Изберете опция").max(50, "Невалидна стойност"),
  agreeRandomTeams: z.literal(true, { message: "Трябва да приемете правилата за участие" }),
  gdprConsent: z.literal(true, { message: "Трябва да дадете съгласие за обработка на данните" }),
  registrationNotGuaranteed: z.literal(true, {
    message: "Трябва да потвърдите, че разбирате условието",
  }),
  additionalQuestions: z.string().max(2000, "Максимум 2000 символа").optional(),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type RegistrationData = Step1Data & Step2Data & Step3Data;

// ─── Admin schemas ────────────────────────────────────────────

export const adminLoginSchema = z.object({
  password: z.string().min(1),
});

export const updateStatusSchema = z.object({
  registration_status: z.enum(["approved", "rejected"]),
  notes: z.string().max(2000).optional(),
});

export const sendEmailSchema = z.object({
  registrationId: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string(),
  status: z.enum(["approved", "rejected"]),
  ticketNumber: z.number(),
  ticketId: z.string(),
});
