import type { Person, InfoCriterion } from "@/lib/types";

export const JURY_MEMBERS: Person[] = [
  { name: "Предстои", role: "Жури", org: "-", image: "", linkedin: "" },
  { name: "Предстои", role: "Жури", org: "-", image: "", linkedin: "" },
  { name: "Предстои", role: "Жури", org: "-", image: "", linkedin: "" },
  { name: "Предстои", role: "Жури", org: "-", image: "", linkedin: "" },
  { name: "Предстои", role: "Жури", org: "-", image: "", linkedin: "" },
  { name: "Предстои", role: "Жури", org: "-", image: "", linkedin: "" },
];

export const MENTORS: Person[] = [
  {
    name: "Людмил Радулов",
    role: "Ментор",
    org: "Software Roastery",
    image: "/avatars/mentors/lyudmil-radulov.jpg",
    linkedin: "https://www.linkedin.com/in/lyudmil-radulov/",
  },
  {
    name: "Веселин Стоянов",
    role: "Ментор",
    org: "Software Roastery",
    image: "/avatars/mentors/veselin-stoyanov.jpg",
    linkedin: "https://www.linkedin.com/in/stoyanov-veselin-8b083111/",
  },
  {
    name: "Милко Янков",
    role: "Ментор",
    org: "Reward Gateway",
    image: "/avatars/mentors/milko-yankov.jpg",
    linkedin: "https://www.linkedin.com/in/milkoyankov/ ",
  },
  {
    name: "Ангел Манчев",
    role: "Ментор",
    org: "Reward Gateway",
    image: "/avatars/mentors/angel-manchev.jpg",
    linkedin: "https://www.linkedin.com/in/angelmanchev/",
  },
  {
    name: "Стефан Атанасов",
    role: "Ментор",
    org: "Reward Gateway",
    image: "/avatars/mentors/stefan.png",
    linkedin: "https://www.linkedin.com/in/stefan-atanasov-95968a65/",
  },
  {
    name: "Петър Стоянов",
    role: "Ментор",
    org: "Reward Gateway",
    image: "/avatars/mentors/petar-stoyanov.jpg",
    linkedin: "https://www.linkedin.com/in/peterstoyanov1/",
  },
  {
    name: "Ивелин Павлов",
    role: "Ментор",
    org: "Reward Gateway",
    image: "/avatars/mentors/ivelin-pavlov.jpg",
    linkedin: "https://www.linkedin.com/in/ibpavlov/",
  },
  {
    name: "Юзджан Мехмедов",
    role: "Ментор",
    org: "JetHost",
    image: "/avatars/mentors/yuzdzhan-mehmedov.jpg",
    linkedin: "https://www.linkedin.com/in/yuzdzhan-mehmedov-8b155569/",
  },
  {
    name: "Иво Русев",
    role: "Ментор",
    org: "Graphwise",
    image: "/avatars/mentors/ivo-rusev.jpg",
    linkedin: "https://www.linkedin.com/in/ivo-rusev-b2bb149b/",
  },
  {
    name: "Александър Кондов",
    role: "Ментор",
    org: "SumUp",
    image: "/avatars/mentors/alexander-kondov.jpg",
    linkedin: "https://www.linkedin.com/in/alexander-kondov-2a8b25a9/",
  },
  {
    name: "Пламен Кутинчев",
    role: "Ментор",
    org: "SumUp",
    image: "/avatars/mentors/plamen-kutinchev.jpg",
    linkedin: "https://www.linkedin.com/in/cuctemeh/",
  },
  {
    name: "Ивелин Белчев",
    role: "Ментор",
    org: "Freelance, Checkpoint",
    image: "/avatars/mentors/ivelin-belchev.jpg",
    linkedin: "https://www.linkedin.com/in/ivelin-belchev/",
  },
  {
    name: "ас. Мартин Джуров",
    role: "Ментор",
    org: "Катедра ИИТ, РУ",
    image: "/avatars/mentors/martin-dzhurov.jpg",
    linkedin: "https://www.linkedin.com/in/martin-s-dzhurov/",
  },
  {
    name: "ас. Кристиан Спасов",
    role: "Ментор",
    org: "Катедра ИИТ, РУ",
    image: "/avatars/mentors/kristian.png",
    linkedin:
      "https://www.linkedin.com/in/%D0%BA%D1%80%D0%B8%D1%81%D1%82%D0%B8%D0%B0%D0%BD-%D1%81-744985121/",
  },
  {
    name: "Серкан Садулов",
    role: "Ментор",
    org: "Катедра ИИТ, РУ",
    image: "/avatars/mentors/serkan-sadulov.jpg",
    linkedin: "https://www.linkedin.com/in/serkan-sadulov/",
  },
  {
    name: "Борислав Копрински",
    role: "Ментор",
    org: "1ForFit",
    image: "/avatars/mentors/borislav-koprinski.jpg",
    linkedin: "https://www.linkedin.com/in/borislav-koprinski/",
  },
  {
    name: "Красимир Кехайов",
    role: "Ментор",
    org: "-",
    image: "/avatars/mentors/krasimir-kehayov.jpg",
    linkedin: "https://www.linkedin.com/in/krasimir-kehayov-vc/",
  },
  {
    name: "Искрен Балчев",
    role: "Ментор",
    org: "-",
    image: "/avatars/mentors/iskren-balchev.jpg",
    linkedin: "https://www.linkedin.com/in/iskrenbalchev/",
  },
  {
    name: "Елисей Йорданов",
    role: "Ментор",
    org: "-",
    image: "/avatars/mentors/elisey-yordanov.jpg",
    linkedin: "https://www.linkedin.com/in/elisey-yordanov-19625a1a0/",
  },
  {
    name: "Николай Нинов",
    role: "Ментор",
    org: "-",
    image: "/avatars/mentors/nikolay-ninov.jpg",
    linkedin: "https://www.linkedin.com/in/nick-ninov/",
  },
];

export const JUDGING_CRITERIA: InfoCriterion[] = [
  {
    title: "Идея и потенциал",
    pct: "30%",
    desc: "Има ли потенциал за развитие след хакатона? Решава ли реален проблем?",
  },
  {
    title: "AI интеграция",
    pct: "25%",
    desc: "Доколко ефективно е използван AI? Vibe coding подход и дълбочина на AI решението.",
  },
  {
    title: "UI/UX и презентация",
    pct: "25%",
    desc: "Яснота, лекота на използване и практичност на интерфейса. Качество на демо презентацията.",
  },
  {
    title: "Продукт и изпълнение",
    pct: "20%",
    desc: "Има ли работеща функционалност и реална стойност? Качество на изпълнението.",
  },
];
