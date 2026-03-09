import type { Person, Criterion } from "@/lib/types";

export const JURY_MEMBERS: Person[] = [
  {
    name: "д-р Елена Петрова",
    role: "Ръководител AI изследвания",
    org: "Софийски университет",
    image: "https://i.pravatar.cc/300?img=32",
  },
  {
    name: "Николай Димитров",
    role: "CTO",
    org: "TechHub Bulgaria",
    image: "https://i.pravatar.cc/300?img=11",
  },
  {
    name: "Мария Иванова",
    role: "Директор продукти",
    org: "Vercel",
    image: "https://i.pravatar.cc/300?img=26",
  },
  {
    name: "Стефан Георгиев",
    role: "Венчър партньор",
    org: "Eleven Ventures",
    image: "https://i.pravatar.cc/300?img=53",
  },
];

export const MENTORS: Person[] = [
  {
    name: "Алекс Тодоров",
    role: "Full-Stack инженер",
    org: "Supabase",
    image: "https://i.pravatar.cc/300?img=12",
  },
  {
    name: "Яна Колева",
    role: "UX ръководител",
    org: "Figma",
    image: "https://i.pravatar.cc/300?img=23",
  },
  {
    name: "Димитър Русев",
    role: "AI инженер",
    org: "OpenAI",
    image: "https://i.pravatar.cc/300?img=59",
  },
  {
    name: "Ива Стоянова",
    role: "Ръководител растеж",
    org: "StartupFactory",
    image: "https://i.pravatar.cc/300?img=20",
  },
];

export const JUDGING_CRITERIA: Criterion[] = [
  { title: "Работещ продукт", desc: "Работи ли? Живо демо е задължително." },
  { title: "Реална полза", desc: "Решава реален проблем за реални хора." },
  { title: "AI интеграция", desc: "Качество и дълбочина на AI стека." },
  { title: "UI и дизайн", desc: "Чист интерфейс, добро потребителско изживяване." },
  { title: "Потенциал за растеж", desc: "Може ли да стане реален продукт?" },
];
