import type {
  ShowcaseStat,
  ShowcaseWinner,
  ShowcasePhoto,
  ShowcaseFunCounter,
  ShowcaseHonorableMention,
  ShowcaseTestimonial,
  ShowcaseMediaItem,
} from "@/lib/types";
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

// ── Additional prizes (special sponsor awards) ─────────────────────────────

export const SHOWCASE_HONORABLE_MENTIONS: ShowcaseHonorableMention[] = [
  {
    category: "Най-млад отбор",
    teamName: "Synthetics",
    projectName: "SeaMind",
    pitch: "Награда за най-младия отбор в хакатона.",
    members: [],
    sponsor: "Ocean Investments",
  },
  {
    category: "Специална тема",
    teamName: "VALOX",
    projectName: "AssetForge",
    pitch: "Инструмент за генериране на 3D AI модели.",
    members: [],
    sponsor: "Reward Gateway",
  },
  {
    category: "Най-голям ентусиазъм",
    teamName: "Fast and Furious",
    projectName: "Start2Drive",
    pitch: "Награда за енергия и упоритост по време на 48-те часа + комплект настолни игри.",
    members: [],
    sponsor: "Checkpoint",
  },
  {
    category: "Storytelling Mastery",
    teamName: "Хакатонци вайб кодери",
    projectName: "Евенто пулс",
    pitch: "Достъп до Storytelling Mastery курса.",
    members: [],
    sponsor: "Георги Къдрев",
  },
  {
    category: "Blockchain награда",
    teamName: "Earth care",
    projectName: "EcoClaim",
    pitch: "Blockchain награда и 5 часа консултация за реализация на проекта.",
    members: [],
    sponsor: "Logos & ReCheck",
  },
  {
    category: "Специална тема",
    teamName: "Kernel panic",
    projectName: "VEINS",
    pitch: "Диагностика на burnout — специална тема на Reward Gateway.",
    members: [],
    sponsor: "Reward Gateway",
  },
  {
    category: "Специална тема",
    teamName: "Legends",
    projectName: "LinkGuard Pro",
    pitch: "Специална тема на Reward Gateway.",
    members: [],
    sponsor: "Reward Gateway",
  },
];

// ── Testimonials ───────────────────────────────────────────────────────────

export const SHOWCASE_TESTIMONIALS: ShowcaseTestimonial[] = [
  {
    quote:
      "За мен събитието беше изключително вдъхновяващо и динамично преживяване. Още от самото начало атмосферата беше заредена с енергия, мотивация и желание за създаване на нещо стойностно.\n\nРаботата в екип ми помогна не само да приложа знанията си на практика, но и да се науча да комуникирам по-добре, да разпределяме задачите ефективно и да мислим креативно под напрежение.\n\nНай-много ме впечатли колко различни и интересни идеи имаха участниците, както и подкрепата от менторите, които винаги бяха готови да помогнат и да дадат ценни насоки. Това наистина направи преживяването още по-полезно и мотивиращо.",
    name: "Даная Букева",
    role: "Участник",
  },
  {
    quote:
      "Това, което ме впечатли, е че имаше много различни награди и презентацията със специалния гост — защото не само първите три отбора получиха награда, а се оценява трудът на повече отбори.\n\nЧувствам се чудесно след финала, не само защото нашият отбор спечели, но и защото като отбор се сформирахме без да се познаваме и всеки работеше усърдно и си помагахме един на друг.\n\nСъс сигурност ще ми останат трайни спомени за събитието и бих се радвал да участвам пак!",
    name: "Деян Николаев Събев",
    role: "Участник",
  },
  {
    quote:
      "Аз съм графичен дизайнер — истината е, че тази професия в настоящия момент заради навлизането на изкуствения интелект започва да изпада от обявите за работа. Събитието надмина очакванията ми. Запознах се с хора, с които имаме бъдещи планове да развием приложението, чието демо представихме.\n\nУчудващо е как добре се получи екипът и как всеки беше на мястото си.",
    name: "Силвия Станева",
    role: "Участник",
  },
  {
    quote:
      "Събитието беше с много добра организация и продуктивна среда за работа. Много ми хареса, че организаторите се бяха погрижили да имаме обяди и толкова много снаксове и напитки.\n\nИ преди съм бил на хакатони, но хакатон с толкова много ментори никога не бях виждал — и това ме впечатли най-много. Имахме възможност постоянно да задаваме въпроси и да ни помагат.\n\nБеше едно страхотно събитие и преживяване — запознах се с много готини хора и през тези три дни си изкарах наистина супер.",
    name: "Венелин Мирчев",
    role: "Участник",
  },
  {
    quote:
      "От моя гледна точка събитието премина страхотно. Запознах се с много хора с общи и различни интереси, проведохме доста интересни разговори по различни казуси и получих много нужна помощ от менторите и доброволците!\n\nНай-много ме впечатли колко open-minded и дружелюбни бяха хората, приветливи, със чувство за хумор — и колко приятно ме накараха да се почувствам!\n\nЧувствата след финала са смесени — радвам се за постигнатия успех на отбора ми, както и за успеха на другите участници, от които доста станаха мои приятели; но има и лека носталгия, че приключи. 10/10 — would surely do it again!",
    name: "Кристиян Тодоров",
    role: "Участник",
  },
  {
    quote:
      "We are exchange students from Azerbaijan, and last month we saw the poster for this hackathon in the university hallway. We became interested, searched for more information, and decided to register. In our country, similar hackathons are organized quite often, and we enjoy participating in them, so we thought, “Why not join this one as well?”\n\nFrom our perspective, the event was very well organized. There were many mentors available, and their support was very helpful throughout the competition. We also found the seminars and presentations useful and supportive for developing our ideas.\n\nIn the end, we achieved 3rd place, and we are very happy and proud of this result. Overall, RUSE AI HACK '26 was a great experience for us, and we would be glad to participate again in future events.",
    name: "Shamil Mantashli",
    role: "Участник · Azerbaijan",
  },
  {
    quote:
      "Бях ментор и това, което ме накара да помогна, бяха младите и ентусиазирани участници. Това, което ме впечатли, е че дори хора без IT бекграунд успяха да произведат завършена идея!",
    name: "Ментор",
    role: "Ментор",
  },
  {
    quote:
      "Атмосферата беше мотивираща, а организацията — на много високо ниво, което направи цялото изживяване още по-приятно и ползотворно. Работата в екип, кратките срокове и интензивният процес на разработка наистина ме накараха да изляза от зоната си на комфорт и да дам най-доброто от себе си.\n\nНай-силно ме впечатли креативността на участниците и разнообразието от идеи, които бяха представени. Беше вдъхновяващо да видя колко различни подходи могат да се приложат за решаването на реални проблеми чрез технологии и изкуствен интелект.\n\nСлед финала се чувствам изключително удовлетворена и мотивирана. Участието ми даде ценен опит, нови знания и още по-голямо желание да се развивам в тази сфера. Определено бих участвала отново и препоръчвам подобни събития на всеки, който има интерес към технологиите и иновациите.",
    name: "Виктория Василева",
    role: "Участник",
  },
];

// ── Media coverage ─────────────────────────────────────────────────────────

export const SHOWCASE_MEDIA: ShowcaseMediaItem[] = [
  {
    outlet: "Bloomberg TV",
    title: "България има шанс да хване AI вълната, но още изостава в дигитализацията",
    url: "https://www.bloombergtv.bg/a/16-biznes-start/159229-balgariya-ima-shans-da-hvane-ai-valnata-no-oshte-izostava-v-digitalizatsiyata",
  },
  {
    outlet: "Утро Русе",
    title:
      "Иновации могат да се създават и тук. Ще дадем тласък за хората, които желаят да приложат изкуствен интелект в работата си",
    url: "https://utroruse.com/article/1242176/",
  },
  {
    outlet: "БТА",
    title:
      "Над 70 ученици, студенти и специалисти от България, Азербайджан и Грузия се събраха на AI хакатона в Русе",
    url: "https://www.bta.bg/bg/news/lik/1112917-nad-70-uchenitsi-studenti-i-spetsialisti-ot-balgariya-azerbaydzhan-i-gruziya-s",
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
