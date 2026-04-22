import type { AgendaEntry } from "@/lib/types";

export interface AgendaDay {
  day: string;
  date: string;
  items: AgendaEntry[];
}

export const AGENDA_DAYS: AgendaDay[] = [
  {
    day: "ДЕН 1 | Start & Team Up",
    date: "Петък",
    items: [
      {
        time: "17:30 – 18:30",
        label: "Регистрация и welcome networking",
        desc: "",
      },
      { time: "18:30 – 19:00", label: "Официално откриване", desc: "" },
      {
        time: "19:00 – 19:30",
        label: "Представяне на партньори, формат и правила",
        desc: "",
      },
      {
        time: "19:30 – 20:15",
        label: "Презентиране на идеи и сформиране на отбори",
        desc: "",
      },
      { time: "20:15 – 21:00", label: "Кетъринг", desc: "" },
      { time: "21:00 – 23:00", label: "Първа сесия AI hacking", desc: "" },
    ],
  },
  {
    day: "ДЕН 2 | Build Day",
    date: "Събота",
    items: [
      { time: "08:30 – 09:00", label: "Отваряне на залата и кафе", desc: "" },
      { time: "09:00 – 12:00", label: "Втора сесия AI hacking", desc: "" },
      { time: "12:00 – 13:00", label: "Срещи с ментори", desc: "" },
      { time: "13:00 – 14:00", label: "Обяд", desc: "" },
      { time: "14:00 – 15:00", label: "Практически workshop", desc: "" },
      { time: "15:00 – 17:30", label: "Трета сесия AI hacking", desc: "" },
      {
        time: "17:30 – 19:00",
        label: "Checkpoint и менторски сесии",
        desc: "",
      },
      { time: "19:00 – 20:00", label: "Вечеря", desc: "" },
      { time: "20:00 – 23:00", label: "Четвърта сесия AI hacking", desc: "" },
    ],
  },
  {
    day: "ДЕН 3 | Demo & Awards",
    date: "Неделя",
    items: [
      { time: "08:30 – 09:00", label: "Отваряне на залата", desc: "" },
      {
        time: "09:00 – 12:00",
        label: "Финални корекции и подготовка на демо",
        desc: "",
      },
      {
        time: "12:00",
        label: "Краен срок за предаване на проектите",
        desc: "",
      },
      { time: "12:00 – 13:00", label: "Обяд", desc: "" },
      { time: "13:00 – 15:30", label: "Представяне на проектите", desc: "" },
      { time: "15:30 – 16:15", label: "Оценяване от жури", desc: "" },
      { time: "16:15 – 17:00", label: "Награждаване", desc: "" },
      { time: "17:00 – 18:00", label: "Networking и снимки", desc: "" },
    ],
  },
];
