import { describe, it, expect } from "vitest";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  adminLoginSchema,
  updateStatusSchema,
  sendEmailSchema,
} from "@/lib/schemas";

// ─── Helpers ────────────────────────────────────────────────

const validStep1 = {
  fullName: "Иван Иванов",
  email: "ivan@example.com",
  phone: "+359 888 123 456",
  age: "25",
  role: "Developer",
  organization: "Русенски университет",
  devExperience: "3-5 години",
};

const validStep2 = {
  aiExperience: "Среден",
  aiTools: "ChatGPT, Claude, Cursor",
  motivation:
    "Искам да участвам защото обичам AI технологиите и искам да науча нови неща. Вярвам че този хакатон ще бъде невероятна възможност за учене и нетуъркинг.",
  expectations: "Очаквам да науча нови неща и да се запозная с интересни хора",
};

const validStep3 = {
  hasTheme: "Да",
  hasTeam: "Не",
  wantChallenge: "Да",
  volunteerHelp: "Може би",
  agreeRandomTeams: true as const,
  gdprConsent: true as const,
  registrationNotGuaranteed: true as const,
};

// ─── Step 1 Schema ──────────────────────────────────────────

describe("step1Schema", () => {
  it("accepts valid step 1 data", () => {
    const result = step1Schema.safeParse(validStep1);
    expect(result.success).toBe(true);
  });

  it("accepts optional handle and avatarUrl", () => {
    const result = step1Schema.safeParse({
      ...validStep1,
      handle: "octocat",
      avatarUrl: "https://github.com/octocat.png",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty fullName", () => {
    const result = step1Schema.safeParse({ ...validStep1, fullName: "" });
    expect(result.success).toBe(false);
  });

  it("rejects single-char fullName", () => {
    const result = step1Schema.safeParse({ ...validStep1, fullName: "A" });
    expect(result.success).toBe(false);
  });

  it("rejects fullName over 100 chars", () => {
    const result = step1Schema.safeParse({ ...validStep1, fullName: "A".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = step1Schema.safeParse({ ...validStep1, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects empty email", () => {
    const result = step1Schema.safeParse({ ...validStep1, email: "" });
    expect(result.success).toBe(false);
  });

  it("rejects email over 255 chars", () => {
    const result = step1Schema.safeParse({
      ...validStep1,
      email: "a".repeat(250) + "@b.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty phone", () => {
    const result = step1Schema.safeParse({ ...validStep1, phone: "" });
    expect(result.success).toBe(false);
  });

  it("rejects phone over 20 chars", () => {
    const result = step1Schema.safeParse({ ...validStep1, phone: "1".repeat(21) });
    expect(result.success).toBe(false);
  });

  it("rejects empty age", () => {
    const result = step1Schema.safeParse({ ...validStep1, age: "" });
    expect(result.success).toBe(false);
  });

  it("rejects empty role", () => {
    const result = step1Schema.safeParse({ ...validStep1, role: "" });
    expect(result.success).toBe(false);
  });

  it("rejects empty organization", () => {
    const result = step1Schema.safeParse({ ...validStep1, organization: "" });
    expect(result.success).toBe(false);
  });

  it("rejects empty devExperience", () => {
    const result = step1Schema.safeParse({ ...validStep1, devExperience: "" });
    expect(result.success).toBe(false);
  });

  it("rejects handle over 100 chars", () => {
    const result = step1Schema.safeParse({ ...validStep1, handle: "a".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("rejects missing required fields", () => {
    const result = step1Schema.safeParse({});
    expect(result.success).toBe(false);
  });
});

// ─── Step 2 Schema ──────────────────────────────────────────

describe("step2Schema", () => {
  it("accepts valid step 2 data", () => {
    const result = step2Schema.safeParse(validStep2);
    expect(result.success).toBe(true);
  });

  it("rejects motivation under 100 chars", () => {
    const result = step2Schema.safeParse({
      ...validStep2,
      motivation: "Too short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects motivation over 2000 chars", () => {
    const result = step2Schema.safeParse({
      ...validStep2,
      motivation: "A".repeat(2001),
    });
    expect(result.success).toBe(false);
  });

  it("accepts motivation at exactly 100 chars", () => {
    const result = step2Schema.safeParse({
      ...validStep2,
      motivation: "A".repeat(100),
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty aiExperience", () => {
    const result = step2Schema.safeParse({ ...validStep2, aiExperience: "" });
    expect(result.success).toBe(false);
  });

  it("rejects empty aiTools", () => {
    const result = step2Schema.safeParse({ ...validStep2, aiTools: "" });
    expect(result.success).toBe(false);
  });

  it("rejects aiTools over 500 chars", () => {
    const result = step2Schema.safeParse({ ...validStep2, aiTools: "X".repeat(501) });
    expect(result.success).toBe(false);
  });

  it("rejects empty expectations", () => {
    const result = step2Schema.safeParse({ ...validStep2, expectations: "" });
    expect(result.success).toBe(false);
  });

  it("rejects expectations over 1000 chars", () => {
    const result = step2Schema.safeParse({ ...validStep2, expectations: "X".repeat(1001) });
    expect(result.success).toBe(false);
  });
});

// ─── Step 3 Schema ──────────────────────────────────────────

describe("step3Schema", () => {
  it("accepts valid step 3 data", () => {
    const result = step3Schema.safeParse(validStep3);
    expect(result.success).toBe(true);
  });

  it("accepts optional themeDescription", () => {
    const result = step3Schema.safeParse({
      ...validStep3,
      themeDescription: "AI chatbot for customer support",
    });
    expect(result.success).toBe(true);
  });

  it("accepts optional teamName", () => {
    const result = step3Schema.safeParse({
      ...validStep3,
      teamName: "Team Vibe",
    });
    expect(result.success).toBe(true);
  });

  it("accepts optional additionalQuestions", () => {
    const result = step3Schema.safeParse({
      ...validStep3,
      additionalQuestions: "Ще има ли паркинг?",
    });
    expect(result.success).toBe(true);
  });

  it("rejects agreeRandomTeams = false", () => {
    const result = step3Schema.safeParse({ ...validStep3, agreeRandomTeams: false });
    expect(result.success).toBe(false);
  });

  it("rejects gdprConsent = false", () => {
    const result = step3Schema.safeParse({ ...validStep3, gdprConsent: false });
    expect(result.success).toBe(false);
  });

  it("rejects registrationNotGuaranteed = false", () => {
    const result = step3Schema.safeParse({ ...validStep3, registrationNotGuaranteed: false });
    expect(result.success).toBe(false);
  });

  it("rejects empty hasTheme", () => {
    const result = step3Schema.safeParse({ ...validStep3, hasTheme: "" });
    expect(result.success).toBe(false);
  });

  it("rejects empty hasTeam", () => {
    const result = step3Schema.safeParse({ ...validStep3, hasTeam: "" });
    expect(result.success).toBe(false);
  });

  it("rejects empty wantChallenge", () => {
    const result = step3Schema.safeParse({ ...validStep3, wantChallenge: "" });
    expect(result.success).toBe(false);
  });

  it("rejects empty volunteerHelp", () => {
    const result = step3Schema.safeParse({ ...validStep3, volunteerHelp: "" });
    expect(result.success).toBe(false);
  });

  it("rejects themeDescription over 1000 chars", () => {
    const result = step3Schema.safeParse({
      ...validStep3,
      themeDescription: "A".repeat(1001),
    });
    expect(result.success).toBe(false);
  });

  it("rejects teamName over 100 chars", () => {
    const result = step3Schema.safeParse({
      ...validStep3,
      teamName: "A".repeat(101),
    });
    expect(result.success).toBe(false);
  });

  it("rejects additionalQuestions over 2000 chars", () => {
    const result = step3Schema.safeParse({
      ...validStep3,
      additionalQuestions: "A".repeat(2001),
    });
    expect(result.success).toBe(false);
  });
});

// ─── Merged Registration Schema ─────────────────────────────

describe("merged registration schema", () => {
  const registrationSchema = step1Schema.merge(step2Schema).merge(step3Schema);

  it("accepts full valid registration data", () => {
    const result = registrationSchema.safeParse({
      ...validStep1,
      ...validStep2,
      ...validStep3,
    });
    expect(result.success).toBe(true);
  });

  it("rejects partial data (missing step 2)", () => {
    const result = registrationSchema.safeParse({
      ...validStep1,
      ...validStep3,
    });
    expect(result.success).toBe(false);
  });

  it("rejects partial data (missing step 3)", () => {
    const result = registrationSchema.safeParse({
      ...validStep1,
      ...validStep2,
    });
    expect(result.success).toBe(false);
  });
});

// ─── Admin Schemas ──────────────────────────────────────────

describe("adminLoginSchema", () => {
  it("accepts valid password", () => {
    const result = adminLoginSchema.safeParse({ password: "secret123" });
    expect(result.success).toBe(true);
  });

  it("rejects empty password", () => {
    const result = adminLoginSchema.safeParse({ password: "" });
    expect(result.success).toBe(false);
  });

  it("rejects missing password", () => {
    const result = adminLoginSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("updateStatusSchema", () => {
  it("accepts approved status", () => {
    const result = updateStatusSchema.safeParse({ registration_status: "approved" });
    expect(result.success).toBe(true);
  });

  it("accepts rejected status", () => {
    const result = updateStatusSchema.safeParse({ registration_status: "rejected" });
    expect(result.success).toBe(true);
  });

  it("accepts optional notes", () => {
    const result = updateStatusSchema.safeParse({
      registration_status: "approved",
      notes: "Great candidate",
    });
    expect(result.success).toBe(true);
  });

  it("rejects pending status (only approved/rejected allowed)", () => {
    const result = updateStatusSchema.safeParse({ registration_status: "pending" });
    expect(result.success).toBe(false);
  });

  it("rejects arbitrary status", () => {
    const result = updateStatusSchema.safeParse({ registration_status: "unknown" });
    expect(result.success).toBe(false);
  });

  it("rejects notes over 2000 chars", () => {
    const result = updateStatusSchema.safeParse({
      registration_status: "approved",
      notes: "A".repeat(2001),
    });
    expect(result.success).toBe(false);
  });
});

describe("sendEmailSchema", () => {
  const validEmail = {
    registrationId: "550e8400-e29b-41d4-a716-446655440000",
    email: "test@example.com",
    fullName: "Test User",
    status: "approved" as const,
    ticketNumber: 42,
    ticketId: "abc-123",
  };

  it("accepts valid email data", () => {
    const result = sendEmailSchema.safeParse(validEmail);
    expect(result.success).toBe(true);
  });

  it("rejects invalid UUID for registrationId", () => {
    const result = sendEmailSchema.safeParse({ ...validEmail, registrationId: "not-a-uuid" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email address", () => {
    const result = sendEmailSchema.safeParse({ ...validEmail, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid status", () => {
    const result = sendEmailSchema.safeParse({ ...validEmail, status: "pending" });
    expect(result.success).toBe(false);
  });

  it("rejects non-number ticketNumber", () => {
    const result = sendEmailSchema.safeParse({ ...validEmail, ticketNumber: "42" });
    expect(result.success).toBe(false);
  });
});
