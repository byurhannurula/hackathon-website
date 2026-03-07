import { siteConfig } from "./site";

const e = siteConfig.event;

export const HACKATHON_INFO = {
  name: e.name,
  organizer: e.organizer,
  location: e.location,
  date: e.date,
  duration: `${e.duration} HACKATHON`,
  fullDate: `${e.date} \u00B7 ${e.location.split(",")[0].toUpperCase()}, BG`,
  shortDescription:
    "Ruse AI Hack — App in a Snap е 48-часов AI хакатон, посветен на създаването на реални, работещи приложения с помощта на изкуствен интелект.",
  longDescription:
    "Ruse AI Hack — App in a Snap е 48-часов AI хакатон, посветен на създаването на реални, работещи приложения с помощта на изкуствен интелект.",
  prizesPool: e.prizesPool,
  buildersCount: e.buildersCount,
};

export const SPONSORS = [
  "Vercel",
  "Supabase",
  "GitHub",
  "Resend",
  "Clerk",
  "Stripe",
  "Neon",
  "Tailwind CSS",
  "Prisma",
  "PlanetScale",
  "Cloudflare",
  "Railway",
];

// ─── JURY & MENTORS ────────────────────────────────────────────────────────

export interface Person {
  name: string;
  role: string;
  org: string;
  image: string;
}

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

export interface Criterion {
  title: string;
  desc: string;
}

export const JUDGING_CRITERIA: Criterion[] = [
  { title: "Работещ продукт", desc: "Работи ли? Живо демо е задължително." },
  { title: "Реална полза", desc: "Решава реален проблем за реални хора." },
  { title: "AI интеграция", desc: "Качество и дълбочина на AI стека." },
  { title: "UI и дизайн", desc: "Чист интерфейс, добро потребителско изживяване." },
  { title: "Потенциал за растеж", desc: "Може ли да стане реален продукт?" },
];

// ─── AGENDA ────────────────────────────────────────────────────────────────

export interface AgendaEntry {
  time: string;
  label: string;
  desc: string;
}

export const AGENDA_ITEMS: AgendaEntry[] = [
  {
    time: "ДЕН 1",
    label: "Откриване",
    desc: "Откриване на събитието. Представяне на теми и предизвикателства. Формиране на екипи. Начало на разработката.",
  },
  {
    time: "11:00",
    label: "Уъркшоп: AI Stack 2026",
    desc: "v0 + Cursor + Bolt + Vercel на живо демо.",
  },
  {
    time: "ДЕН 2",
    label: "Работа по проектите",
    desc: "Менторски сесии. Техническа подкрепа от експерти. Интензивна разработка.",
  },
  {
    time: "14:00",
    label: "Междинна проверка",
    desc: "Демота на напредъка, обратна връзка, проверка на вайба.",
  },
  {
    time: "ДЕН 3",
    label: "Финализиране",
    desc: "Финализиране на проектите. Презентации и демо. Оценяване от журито.",
  },
  {
    time: "16:00",
    label: "Награждаване",
    desc: "Гласуване от общността + експертно жури. Парични награди + кредити.",
  },
];

// ─── PRIZES ────────────────────────────────────────────────────────────────

export interface Prize {
  place: string;
  amount: string;
  desc: string;
}

export const PRIZES: Prize[] = [
  {
    place: "1-ВО",
    amount: "€3,000",
    desc: "Пари + €2K облачни кредити + участие в StartupFactory",
  },
  { place: "2-РО", amount: "€1,500", desc: "Пари + €1K облачни кредити" },
  { place: "3-ТО", amount: "€750", desc: "Пари + пакет с мърч" },
  {
    place: "НАЙ-ДОБЪР СОЛО",
    amount: "€500",
    desc: "За соло строители, доставящи от край до край",
  },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────

export interface FaqEntry {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqEntry[] = [
  {
    question: "Кой може да участва?",
    answer:
      "Всеки с интерес към технологиите и AI — ученици, студенти, професионалисти и ентусиасти.",
  },
  {
    question: "Трябва ли да имам екип?",
    answer: "Не. Можеш да се регистрираш сам и да намериш екип на място.",
  },
  { question: "Безплатно ли е участието?", answer: "Да, участието е безплатно." },
  {
    question: "Какви технологии могат да се използват?",
    answer: "Участниците могат да използват всякакви AI инструменти, платформи и технологии.",
  },
  {
    question: "Дистанционно или присъствено?",
    answer: "Присъствено в Русе, България. Дистанционна писта за международни участници.",
  },
  {
    question: "Какво е vibe coding?",
    answer: "Опиши → AI генерира → ти доставяш. Скорост пред перфекция. Ако вайбва, живее.",
  },
];

// ─── ABOUT SECTION DATA ────────────────────────────────────────────────────

export const ABOUT_CARDS = {
  what: {
    title: "48ч AI Хакатон",
    desc: "48 часа интензивна разработка. Работа в екип с други мотивирани участници. Ментори от технологичната индустрия. Реални AI инструменти и модели.",
  },
  who: {
    title: "Кой Може да Участва",
    desc: "Ученици, студенти, програмисти, дизайнери, маркетинг специалисти, продуктови мениджъри, предприемачи и всички, които искат да експериментират с AI технологии.",
  },
  format: {
    title: "Формат и Място",
    desc: "Петък до неделя в Русенски университет. Екипи от 2 до 5 участници. Сформирайте се предварително или на място по време на networking сесията.",
  },
  requirements: {
    title: "Какво Предавате",
    desc: "Работещо AI приложение (web, chatbot, mobile, API и др.). Live демо. Кратка презентация на проекта. Обяснение на използваните AI инструменти и модели.",
  },
  goals: {
    title: "Защо го Правим",
    desc: "Да насърчи практическото използване на AI. Да изгради умения за бързо прототипиране. Да стимулира работа в екип. Да свърже млади таланти с бизнеса и технологичната общност.",
  },
};

export const ABOUT_THEMES = ["Образование", "Гражданско общество", "Продуктивност", "Отговорен AI"];

// ─── INFO PAGE DATA ────────────────────────────────────────────────────────

export interface InfoCriterion {
  title: string;
  pct: string;
  desc: string;
}

export const INFO_CRITERIA: InfoCriterion[] = [
  {
    title: "Продуктова стойност",
    pct: "25%",
    desc: "Решава ли реален проблем? Има ли потенциал за растеж?",
  },
  {
    title: "AI интеграция",
    pct: "25%",
    desc: "Доколко ефективно е използван AI? Vibe coding подход?",
  },
  {
    title: "Техническо изпълнение",
    pct: "25%",
    desc: "Качество на кода, архитектура, работещо демо.",
  },
  {
    title: "UI/UX & Презентация",
    pct: "25%",
    desc: "Дизайн, потребителско изживяване, яснота на демото.",
  },
];

// ─── REGISTER FORM OPTIONS ─────────────────────────────────────────────────

export const ROLE_OPTIONS = [
  "Ученик",
  "Студент",
  "Служител",
  "На свободна практика",
  "Предприемач",
  "Друго",
];

export const DEV_EXPERIENCE_OPTIONS = [
  "Нямам опит",
  "Минимален - под 1 година",
  "Начално ниво - между 1 и 3 години",
  "Средно ниво - между 4 и 7 години",
  "Високо ниво - над 8 години",
];

export const AI_EXPERIENCE_OPTIONS = [
  "Нямам опит",
  "Между 1 и 6 месеца",
  "Между 7 и 12 месеца",
  "Повече от 12 месеца",
];

export const YES_NO_OPTIONS = ["Да", "Не"];
export const YES_NO_MAYBE_OPTIONS = ["Да", "Не", "Възможно"];
