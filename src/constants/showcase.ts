import type { ShowcaseStat, ShowcaseWinner, ShowcasePhoto, ShowcaseFunCounter } from "@/lib/types";
import { MENTORS } from "./jury";
import { SPONSORS } from "./sponsors";

// Order mirrors the showcase page layout:

// ── Video ──────────────────────────────────────────────────────────────────

export const SHOWCASE_VIDEO_ID = process.env.NEXT_PUBLIC_SHOWCASE_VIDEO_ID ?? "";

// ── Stats ──────────────────────────────────────────────────────────────────

export const SHOWCASE_STATS: ShowcaseStat[] = [
  { value: "70+", label: "Участници" },
  { value: "20", label: "Отбора" },
  { value: "48", label: "Часа хакатон" },
  { value: "€2,900+", label: "Награден фонд" },
];

// ── Winners ────────────────────────────────────────────────────────────────

export const SHOWCASE_WINNERS: ShowcaseWinner[] = [
  {
    place: 1,
    teamName: "Golden 4",
    projectName: "FormWise",
    pitch: "AI асистент за бюрокрация без главоболие. Поддържа 20+ държави и 4 режима на работа.",
    members: [],
    imageUrl: "/photos/winners/1st-place.jpg",
  },
  {
    place: 2,
    teamName: "VM solutions",
    projectName: "VM solutions",
    pitch: "Автоматизирана комуникация и AI асистент за модерния бизнес.",
    members: [],
    imageUrl: "/photos/winners/2nd-place.jpg",
  },
  {
    place: 3,
    teamName: "HAL9000.dev",
    projectName: "ERASMuse",
    pitch:
      "All assistance you need in one place — AI асистент за студенти по Erasmus: езикови бариери, навигация, транспорт и разбиране на документи.",
    members: [],
    imageUrl: "/photos/winners/3rd-place.jpg",
  },
];

// ── Photos ─────────────────────────────────────────────────────────────────

// Photos live in /public/photos, named 1.jpg → N.jpg. Order is not semantic.
// Originals are kept under /public/photos/originals for reference.
export const SHOWCASE_PHOTOS: ShowcasePhoto[] = [
  {
    src: "/photos/1.jpg",
    alt: "Последни инструкции преди старта на хакатона",
    width: 2400,
    height: 1596,
  },
  {
    src: "/photos/2.jpg",
    alt: "Тениски, значки и комплекти, готови за участниците",
    width: 2400,
    height: 1800,
  },
  {
    src: "/photos/3.jpg",
    alt: "Залата в пълен работен режим",
    width: 2400,
    height: 1800,
  },
  {
    src: "/photos/4.jpg",
    alt: "Доброволец подава тениска на регистрацията",
    width: 2400,
    height: 1600,
  },
  {
    src: "/photos/5.jpg",
    alt: "Опашка за тениски и комплекти при регистрацията",
    width: 2400,
    height: 1600,
  },
  {
    src: "/photos/6.jpg",
    alt: "Разглеждане на значките и сувенирите",
    width: 2400,
    height: 3600,
    span: "tall",
  },
  {
    src: "/photos/7.jpg",
    alt: "Стикерите „Ментор“ — готови за раздаване",
    width: 2400,
    height: 1350,
  },
  {
    src: "/photos/8.jpg",
    alt: "Хакване в пълен ход",
    width: 2400,
    height: 1802,
  },
  {
    src: "/photos/9.jpg",
    alt: "Концентрация по време на работа",
    width: 2400,
    height: 1802,
  },
  {
    src: "/photos/10.jpg",
    alt: "Бърза дискусия между чиновете",
    width: 2400,
    height: 1596,
  },
  {
    src: "/photos/11.jpg",
    alt: "Екипът на SumUp на своя щанд във фоайето",
    width: 2400,
    height: 1596,
    span: "wide",
  },
  {
    src: "/photos/12.jpg",
    alt: "Залата по време на работа",
    width: 2400,
    height: 1600,
  },
  {
    src: "/photos/13.jpg",
    alt: "Внимание по време на презентацията",
    width: 2400,
    height: 1600,
  },
  {
    src: "/photos/14.jpg",
    alt: "Sirma връчва специалната си награда",
    width: 2400,
    height: 1600,
  },
  {
    src: "/photos/15.jpg",
    alt: "Грамота за третото място",
    width: 2400,
    height: 1600,
  },
  {
    src: "/photos/16.jpg",
    alt: "Селфи с грамотата за първо място — Golden 4",
    width: 2400,
    height: 1600,
    span: "wide",
  },
  {
    src: "/photos/17.jpg",
    alt: "Момент от награждаването",
    width: 2400,
    height: 1600,
  },
  {
    src: "/photos/18.jpg",
    alt: "Втора награда: VM Solutions",
    width: 2400,
    height: 1800,
  },
  {
    src: "/photos/19.jpg",
    alt: "Грамотата на Golden 4 — първо място",
    width: 2400,
    height: 1800,
  },
  {
    src: "/photos/20.jpg",
    alt: "Финалната церемония по награждаване",
    width: 2400,
    height: 1600,
  },
  {
    src: "/photos/21.jpg",
    alt: "Групова снимка пред Русенски университет",
    width: 2400,
    height: 1600,
  },
  {
    src: "/photos/22.jpg",
    alt: "Цялото семейство на хакатона пред университета",
    width: 2400,
    height: 3599,
    span: "tall",
  },
  {
    src: "/photos/23.jpg",
    alt: "Банерът на RUSE AI HACK",
    width: 2400,
    height: 3600,
    span: "tall",
  },
  {
    src: "/photos/24.jpg",
    alt: "Тениски „APP IN A SNAP“ и тефтери от SoftServe",
    width: 2400,
    height: 1600,
  },
  {
    src: "/photos/25.jpg",
    alt: "Доброволци раздават тениските и комплектите",
    width: 2400,
    height: 1600,
  },
  {
    src: "/photos/26.jpg",
    alt: "Кратка пауза на щанда",
    width: 2400,
    height: 3600,
    span: "tall",
  },
  {
    src: "/photos/27.jpg",
    alt: "На щанда — избор на сувенири",
    width: 2400,
    height: 3600,
    span: "tall",
  },
  {
    src: "/photos/28.jpg",
    alt: "Усмивка в работната зала",
    width: 2400,
    height: 1600,
  },
  {
    src: "/photos/29.jpg",
    alt: "Доброволците на щанда с тениските",
    width: 2400,
    height: 1600,
  },
  {
    src: "/photos/30.jpg",
    alt: "Усмихнато трио на регистрацията",
    width: 2400,
    height: 1600,
  },
  {
    src: "/photos/31.jpg",
    alt: "Кофеинът върши работа",
    width: 2400,
    height: 1600,
  },
  {
    src: "/photos/32.jpg",
    alt: "Банерите на Avenga и Reward Gateway",
    width: 2400,
    height: 3600,
    span: "tall",
  },
  {
    src: "/photos/33.jpg",
    alt: "На щанда с тениските и комплектите",
    width: 2400,
    height: 3600,
    span: "tall",
  },
  {
    src: "/photos/34.jpg",
    alt: "Менторите — на разположение по време на сесията",
    width: 2400,
    height: 1600,
  },
  {
    src: "/photos/35.jpg",
    alt: "Екипът на организаторите",
    width: 2400,
    height: 1800,
  },
];

// ── Fun counters ───────────────────────────────────────────────────────────

export const SHOWCASE_FUN_COUNTERS: ShowcaseFunCounter[] = [
  {
    value: String(MENTORS.length),
    label: "Ментори",
    hint: "От Reward Gateway, Software Roastery, SumUp и още.",
  },
  {
    value: String(SPONSORS.length),
    label: "Партньори и спонсори",
    hint: "Без тях нямаше да има награден фонд, храна и зала.",
  },
  // {
  //   value: "3",
  //   label: "Града представени",
  //   hint: "Русе, Тутракан и Плевен.",
  // },
  {
    value: "80%",
    label: "Ученици и студенти",
    hint: "Остатъкът — ментори, жури и смели първокурсници.",
  },
  {
    value: "380+",
    label: "Пица резена",
    hint: "Пеперони поведе, маргарита не остана далеч назад.",
  },
];
