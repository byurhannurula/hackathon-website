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

export interface ShowcaseWinner {
  place: 1 | 2 | 3;
  teamName: string;
  projectName: string;
  pitch: string;
  members: string[];
  repoUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  prize?: string;
}

export interface ShowcaseProject {
  teamName: string;
  projectName: string;
  description: string;
  tech?: string[];
  repoUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
}

export interface ShowcaseTestimonial {
  quote: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface ShowcaseFunCounter {
  value: string;
  label: string;
  hint?: string;
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

export const SHOWCASE_VIDEO_ID = process.env.NEXT_PUBLIC_SHOWCASE_VIDEO_ID ?? "";

// ── Post-event content ─────────────────────────────────────────────────────
// Populate these after the event; sections auto-hide while arrays are empty.

export const SHOWCASE_WINNERS: ShowcaseWinner[] = [
  {
    place: 1,
    teamName: "Team Neural",
    projectName: "VibeCheck AI",
    pitch:
      "AI асистент, който анализира настроението в класната стая в реално време и помага на учителите да адаптират урока.",
    members: ["Иван Петров", "Мария Георгиева", "Алекс Димитров", "Николай Стоянов"],
    prize: "€1,500 + менторство",
    repoUrl: "https://github.com",
    demoUrl: "https://example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop&q=80",
  },
  {
    place: 2,
    teamName: "Prompt Masters",
    projectName: "StudyBuddy",
    pitch:
      "Персонализиран AI тютор, който превръща учебниците в интерактивни куизове и обяснения на прост език.",
    members: ["Виктория Иванова", "Георги Тодоров", "Петър Колев"],
    prize: "€800",
    repoUrl: "https://github.com",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop&q=80",
  },
  {
    place: 3,
    teamName: "Caffeine Overflow",
    projectName: "RouteSense",
    pitch:
      "Агент, който планира най-краткия маршрут из Русе, включително градски транспорт и време за ходене пеша.",
    members: ["Димитър Ангелов", "София Христова", "Мартин Николов"],
    prize: "€400",
    demoUrl: "https://example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop&q=80",
  },
];

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    teamName: "Byte Builders",
    projectName: "ChefGPT",
    description:
      "Снимай какво имаш в хладилника — AI предлага 3 рецепти с оценка за време и трудност.",
    tech: ["Next.js", "OpenAI", "Supabase"],
    repoUrl: "https://github.com",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop&q=80",
  },
  {
    teamName: "Team Echo",
    projectName: "PodcastMind",
    description:
      "Качи подкаст епизод и получаваш резюме, глави и ключови цитати за по-малко от минута.",
    tech: ["Python", "Whisper", "Claude"],
    demoUrl: "https://example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop&q=80",
  },
  {
    teamName: "Pixel Pirates",
    projectName: "DressCode",
    description: "AI стилист, който комбинира дрехи от гардероба ти на база времето и случая.",
    tech: ["React Native", "Gemini Vision"],
    imageUrl:
      "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=1200&h=800&fit=crop&q=80",
  },
  {
    teamName: "Null Pointer",
    projectName: "BugHunter",
    description:
      "Copilot разширение, което открива security bugs, преди да ги commit-неш в main branch.",
    tech: ["TypeScript", "LLM", "VSCode API"],
    repoUrl: "https://github.com",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop&q=80",
  },
  {
    teamName: "Quantum Leap",
    projectName: "GreenRoute",
    description: "Логистичен агент, който оптимизира доставки спрямо CO2 отпечатък.",
    tech: ["Go", "LangChain"],
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop&q=80",
  },
  {
    teamName: "Syntax Error",
    projectName: "Memoria",
    description:
      "Приложение, което помага на възрастни хора да си спомнят имена и лица чрез AI flashcards.",
    tech: ["Flutter", "Firebase", "Gemini"],
    demoUrl: "https://example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=800&fit=crop&q=80",
  },
];

export const SHOWCASE_TESTIMONIALS: ShowcaseTestimonial[] = [
  {
    quote:
      "Никога не съм мислила, че за 48 часа можеш да построиш нещо работещо с AI. Сега вече съм сигурна, че мога.",
    name: "Мария Георгиева",
    role: "Студент · ТУ-Варна",
  },
  {
    quote:
      "Атмосферата беше електрическа. Обмен на идеи, безплатна пица и ментори, които реално искаха да ти помогнат.",
    name: "Иван Петров",
    role: "11 клас · МГ Русе",
  },
  {
    quote:
      "Организация на най-високо ниво. Първият хакатон, на който всичко започна точно навреме — и свърши навреме.",
    name: "Алекс Димитров",
    role: "Ментор · Senior Engineer",
  },
  {
    quote:
      "Отборът ми се събра буквално часове преди старта. Излязохме с приятели за цял живот и работещ MVP.",
    name: "Виктория Иванова",
    role: "Участник",
  },
];

export const SHOWCASE_FUN_COUNTERS: ShowcaseFunCounter[] = [
  {
    value: "14,823",
    label: "Чаши кафе",
    hint: "Средно по 148 на участник. Някой брои ли?",
  },
  {
    value: "72%",
    label: "Ученици и студенти",
    hint: "Остатъкът — ментори, жури и смели първокурсници.",
  },
  {
    value: "92",
    label: "Git commits в последния час",
    hint: "Последната минута преди deadline беше особено бурна.",
  },
  {
    value: "6",
    label: "Часа сън средно",
    hint: "Общо. Не на нощ.",
  },
  {
    value: "312",
    label: "Пица резена",
    hint: "Маргарита води с пепперони на близка втора позиция.",
  },
  {
    value: "1.2M",
    label: "AI токена изгорени",
    hint: "Благодарим на всички API лимити, които издържаха.",
  },
];
