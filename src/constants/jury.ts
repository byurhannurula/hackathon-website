import type { Person, InfoCriterion } from "@/lib/types";

export const JURY_MEMBERS: Person[] = [
  { name: "Предстои", role: "Жури", org: "", image: "", linkedin: "" },
  { name: "Предстои", role: "Жури", org: "", image: "", linkedin: "" },
  { name: "Предстои", role: "Жури", org: "", image: "", linkedin: "" },
  { name: "Предстои", role: "Жури", org: "", image: "", linkedin: "" },
  { name: "Предстои", role: "Жури", org: "", image: "", linkedin: "" },
  { name: "Предстои", role: "Жури", org: "", image: "", linkedin: "" },
];

export const MENTORS: Person[] = [
  { name: "Предстои", role: "Ментор", org: "", image: "", linkedin: "" },
  { name: "Предстои", role: "Ментор", org: "", image: "", linkedin: "" },
  { name: "Предстои", role: "Ментор", org: "", image: "", linkedin: "" },
  { name: "Предстои", role: "Ментор", org: "", image: "", linkedin: "" },
  { name: "Предстои", role: "Ментор", org: "", image: "", linkedin: "" },
  { name: "Предстои", role: "Ментор", org: "", image: "", linkedin: "" },
];

export const JUDGING_CRITERIA: InfoCriterion[] = [
  {
    title: "Продукт и иновация",
    pct: "30%",
    desc: "Решава ли реален проблем? Има ли работеща функционалност и реална стойност?",
  },
  {
    title: "AI интеграция",
    pct: "25%",
    desc: "Доколко ефективно е използван AI? Vibe coding подход и дълбочина на AI решението.",
  },
  {
    title: "UI/UX & Презентация",
    pct: "20%",
    desc: "Яснота, лекота на използване и практичност на интерфейса. Качество на демо презентацията.",
  },
  {
    title: "Потенциал за развитие",
    pct: "25%",
    desc: "Има ли проектът потенциал да се превърне в реален продукт или услуга след хакатона?",
  },
];
