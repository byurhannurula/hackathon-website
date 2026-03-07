import { z } from "zod";

// Step 1: Personal & Professional Info (Fields 1-6)
export const step1Schema = z.object({
  fullName: z.string().min(2, "Минимум 2 символа"),
  email: z.string().email("Невалиден имейл"),
  phone: z.string().min(1, "Задължително поле"),
  role: z.string().min(1, "Изберете роля"),
  organization: z.string().min(1, "Задължително поле"),
  devExperience: z.string().min(1, "Изберете ниво"),
  handle: z.string().optional(),
  avatarUrl: z.string().optional(),
});

// Step 2: AI & Hackathon Experience (Fields 7-10)
export const step2Schema = z.object({
  aiExperience: z.string().min(1, "Изберете ниво"),
  aiTools: z.string().min(1, "Задължително поле"),
  motivation: z.string().min(100, "Минимум 100 символа (около 3 изречения)"),
  expectations: z.string().min(1, "Задължително поле"),
});

// Step 3: Project & Participation Details (Fields 11-15)
export const step3Schema = z.object({
  hasTheme: z.string().min(1, "Изберете опция"),
  themeDescription: z.string().optional(),
  wantChallenge: z.string().min(1, "Изберете опция"),
  volunteerHelp: z.string().min(1, "Изберете опция"),
  agreeRandomTeams: z.literal(true, { message: "Трябва да приемете правилата за отборите" }),
  additionalQuestions: z.string().optional(),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type RegistrationData = Step1Data & Step2Data & Step3Data;
