export interface ShowcasePhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
  featured?: boolean;
  span?: "wide" | "tall" | "large";
}

export interface ShowcaseStat {
  value: string;
  label: string;
}

export const SHOWCASE_PHOTOS: ShowcasePhoto[] = [
  // ── Featured (shown on /showcase) ──
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&h=1000&fit=crop&q=80",
    alt: "Участници работят по проекти",
    width: 1600,
    height: 1000,
    featured: true,
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&h=1400&fit=crop&q=80",
    alt: "Екипна работа по време на хакатона",
    width: 1000,
    height: 1400,
    featured: true,
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop&q=80",
    alt: "Програмиране на лаптопи",
    width: 1200,
    height: 800,
    featured: true,
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80",
    alt: "Презентация пред жури",
    width: 1200,
    height: 800,
    featured: true,
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&h=1000&fit=crop&q=80",
    alt: "Работна атмосфера",
    width: 1600,
    height: 1000,
    featured: true,
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&q=80",
    alt: "Сътрудничество между участници",
    width: 1200,
    height: 800,
    featured: true,
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&h=1400&fit=crop&q=80",
    alt: "Код на екрана",
    width: 1000,
    height: 1400,
    featured: true,
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop&q=80",
    alt: "Разработка на приложения",
    width: 1200,
    height: 800,
    featured: true,
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&h=1400&fit=crop&q=80",
    alt: "Конферентна зала на събитието",
    width: 1400,
    height: 1400,
    featured: true,
    span: "large",
  },
  {
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=800&fit=crop&q=80",
    alt: "Менторска сесия",
    width: 1200,
    height: 800,
    featured: true,
  },
  {
    src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&h=800&fit=crop&q=80",
    alt: "Групова снимка на участниците",
    width: 1200,
    height: 800,
    featured: true,
  },
  {
    src: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1200&h=800&fit=crop&q=80",
    alt: "Щастливи участници",
    width: 1200,
    height: 800,
    featured: true,
  },
  {
    src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=800&fit=crop&q=80",
    alt: "Работа с AI инструменти",
    width: 1200,
    height: 800,
    featured: true,
  },
  {
    src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1600&h=1000&fit=crop&q=80",
    alt: "Демо ден",
    width: 1600,
    height: 1000,
    featured: true,
    span: "wide",
  },
  // ── Full gallery only ──
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop&q=80",
    alt: "Интензивно програмиране",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=800&fit=crop&q=80",
    alt: "Дебъгване на код",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop&q=80",
    alt: "Представяне на проект",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=800&fit=crop&q=80",
    alt: "Дискусия между отбори",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&h=800&fit=crop&q=80",
    alt: "Финално представяне",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop&q=80",
    alt: "Програмиране до късно",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=1000&h=1400&fit=crop&q=80",
    alt: "Фокусиран разработчик",
    width: 1000,
    height: 1400,
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop&q=80",
    alt: "Whiteboard планиране",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&h=1000&fit=crop&q=80",
    alt: "Хакатон атмосфера",
    width: 1600,
    height: 1000,
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=1200&h=800&fit=crop&q=80",
    alt: "Нетуъркинг между участници",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop&q=80",
    alt: "Победителите празнуват",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=800&fit=crop&q=80",
    alt: "Презентация на сцена",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80",
    alt: "Екипна дискусия",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&fit=crop&q=80",
    alt: "Сътрудничество на работно място",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&h=800&fit=crop&q=80",
    alt: "Бизнес среща",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=1200&h=800&fit=crop&q=80",
    alt: "Мозъчна атака с post-it",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=1000&h=1400&fit=crop&q=80",
    alt: "Програмиране на терминал",
    width: 1000,
    height: 1400,
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&h=1000&fit=crop&q=80",
    alt: "AI визуализация",
    width: 1600,
    height: 1000,
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&fit=crop&q=80&crop=top",
    alt: "Колаборативна работа",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=1200&h=800&fit=crop&q=80",
    alt: "Дизайн на потребителски интерфейс",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop&q=80",
    alt: "Лаптоп с код",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=800&fit=crop&q=80",
    alt: "Стартъп планиране",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=1200&h=800&fit=crop&q=80",
    alt: "Технологична конференция",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1558403194-611308249627?w=1200&h=800&fit=crop&q=80",
    alt: "Екипна координация",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=1200&h=800&fit=crop&q=80",
    alt: "Работа с данни",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&h=1000&fit=crop&q=80",
    alt: "Модерно работно пространство",
    width: 1600,
    height: 1000,
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop&q=80",
    alt: "Награждаване",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=1200&h=800&fit=crop&q=80",
    alt: "Маратонско кодиране",
    width: 1200,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=1200&h=800&fit=crop&q=80",
    alt: "Post-it стена с идеи",
    width: 1200,
    height: 800,
  },
];

export const SHOWCASE_STATS: ShowcaseStat[] = [
  { value: "100+", label: "Участници" },
  { value: "22", label: "Отбора" },
  { value: "48", label: "Часа хакатон" },
  { value: "€2,900", label: "Награден фонд" },
];

export const SHOWCASE_VIDEO_ID = "QTPSSerVZsc";
