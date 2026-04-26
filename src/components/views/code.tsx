import { DecryptLink, Link, RunawayLink } from "@/components/ui";

const REPO_URL = "https://github.com/byurhannurula/hackathon-website";

const sectionCls = "py-16 px-6 md:px-12 border-b border-border";
const containerCls = "max-w-[860px] mx-auto";
const h2Cls = "font-display text-[clamp(36px,6vw,56px)] leading-[1.02] mb-6";
const h3Cls = "font-display text-2xl text-acid mb-3 mt-8";
const pCls = "font-mono text-sm text-white/70 leading-[1.9] mb-4";
const listCls = "font-mono text-sm text-white/70 leading-[2] list-disc pl-5 mb-6";
const inlineLinkCls = "text-acid hover:text-white transition-colors";
const codeTagCls =
  "font-mono text-[12px] text-white/85 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-sm";

const platformParts = [
  {
    title: "Публичен сайт за хакатона",
    text: "Начална страница, програма, жури, спонсори, правила и цялата информация, която трябва да е ясна още преди регистрацията.",
  },
  {
    title: "Регистрационен поток в 3 стъпки",
    text: "Форма с валидация, проверка на статуса на регистрацията, обработка на дублирани имейли и плавен преход към личен билет.",
  },
  {
    title: "Персонален билет за всеки участник",
    text: "Автоматично генериран ticket number, GitHub avatar, PNG export и споделяне. Това е и най-разпознаваемата UI част на проекта.",
  },
  {
    title: "Админ зона за организаторите",
    text: "Скрита секция за преглед на регистрации, смяна на статуси, статистики, CSV export, имейли и контрол върху отварянето на регистрацията.",
  },
  {
    title: "Showcase режим след събитието",
    text: "Същата кодова база може да се превключи от registration mode към archive/showcase mode и да покаже победители, снимки и recap съдържание.",
  },
];

const stackGroups = [
  {
    title: "Core",
    items: ["Next.js 16 (App Router, route groups, Server Components)", "React 19", "TypeScript 5"],
  },
  {
    title: "UI & styling",
    items: ["Tailwind CSS v4", "lucide-react", "`clsx` + `tailwind-merge` през `cn()` helper"],
  },
  {
    title: "Animations & effects",
    items: ["three.js", "vanilla-tilt", "canvas-confetti", "html-to-image"],
  },
  {
    title: "Forms & backend",
    items: ["react-hook-form + Zod", "Supabase + Postgres", "Resend + React Email"],
  },
  {
    title: "Tooling",
    items: ["Vitest + Testing Library", "ESLint 9", "Prettier", "Husky + lint-staged"],
  },
];

const performanceNotes = [
  'Server Components са default. `"use client"` се слага само там, където наистина има интеракция.',
  "Тежките ефекти не участват в първоначалния SSR. `dotted-surface`, `cursor-trail` и `konami-easter-egg` се зареждат динамично само в браузъра.",
  "`three`, `vanilla-tilt`, `canvas-confetti` и `html-to-image` се import-ват чак когато потрябват, вместо да надуват началния bundle.",
  "Tilt ефектът е изключен на touch устройства, за да няма излишен JavaScript там, където ефектът не носи реална стойност.",
  "Live registration count е решен с лек polling модел и споделен module-level store, вместо по-скъп realtime subscription за толкова проста метрика.",
  "В `next.config.ts` има image optimization, компресия, package import optimization и caching headers за по-добро реално поведение в production.",
];

const securityNotes = [
  "Формата не разчита само на client-side проверки. Данните се валидират отново на сървъра със Zod преди запис.",
  "Има guard за твърде големи заявки и ясна обработка на duplicate email случаи.",
  "Supabase схемата е с Row Level Security, а публичният достъп е ограничен само до безопасните операции, които са нужни.",
  "Админ частта е зад отделен route group, session cookie и HMAC подписване с `ADMIN_SECRET`, плюс constant-time compare при проверка.",
  "В `next.config.ts` има CSP, HSTS, `X-Frame-Options`, `nosniff`, `Permissions-Policy` и други защитни headers.",
  "Production browser source maps са изключени, а чувствителните операции минават през server routes, не през клиентски ключове.",
];

const designNotes = [
  "Билетът е най-силно вдъхновен от виртуалните event системи на Next.js Conf, но е адаптиран към идентичността на RUSE AI HACK.",
  "Hero секцията използва custom Three.js dotted surface вместо генеричен background, за да създаде собствена атмосфера още от първия екран.",
  "Decrypt текстът, shimmer ефектите, glitch елементите и console easter egg-ите подсилват hacker/AI настроението, без сайтът да изглежда като клише template.",
  "Анимациите не са самоцелни. Те са ограничени, lazy-loaded и използвани основно там, където носят емоция: hero, ticket reveal, микровзаимодействия.",
  "Вдъхновение има и от places като 21st.dev, но реалната стойност е в това как идеите са пречупени през конкретен event продукт.",
];

export function Code() {
  return (
    <>
      <section className="pt-[140px] pb-16 px-6 md:px-12">
        <div className={containerCls}>
          <Link
            href="/"
            className="font-mono text-xs text-muted no-underline tracking-widest transition-colors duration-200 hover:text-white mb-8 inline-block"
          >
            ← Към Началото
          </Link>
          <h1 className="font-display text-[clamp(48px,8vw,80px)] leading-[0.9]">
            КАКВО ИМА <span className="text-acid">ПОД КАПАКА</span>
          </h1>
          <p className="font-mono text-sm text-white/55 leading-[1.9] mt-6 max-w-[680px]">
            Тази страница е за хората, на които им е любопитно как е направен сайтът. RUSE AI HACK
            не е само landing page, а малка платформа за събитието: публичен сайт, регистрации,
            билети, админ панел и showcase режим в една кодова база.
          </p>
          <p className="font-mono text-sm text-white/55 leading-[1.9] mt-4 max-w-[680px]">
            Тук ще намериш стека, библиотеките, техниките и част от решенията зад проекта: как е
            направен, как е оптимизиран и какво използваме за анимации, дизайн, performance и
            backend логика.
          </p>
          <div className="mt-2 mb-4">
            <RunawayLink href={REPO_URL}>github ↗</RunawayLink>
          </div>
          <p className={pCls}>
            Кодът е публичен под MIT лиценз. Ако ти хрумне подобрение или откриеш нещо интересно,
            issues и PR-и са добре дошли.
          </p>
        </div>
      </section>

      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            КАКВО ПРАВИ <span className="text-acid">ПЛАТФОРМАТА</span>
          </h2>
          <p className={pCls}>
            Преди да говорим за библиотеки, по-важно е да е ясно какъв проблем решава проектът. Това
            не е просто “сайт за събитието”, а цялостен event flow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {platformParts.map((item) => (
              <div key={item.title} className="border border-white/10 bg-white/[0.02] p-5">
                <h3 className="font-display text-xl text-white mb-3">{item.title}</h3>
                <p className="font-mono text-sm text-white/60 leading-[1.8]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            СТЕК <span className="text-acid">&</span> ИЗБОРИ
          </h2>
          <p className={pCls}>
            Технологиите тук не са подбрани, за да звучат модерно, а защото вършат конкретна работа
            добре за малък, бърз и поддържим продукт.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {stackGroups.map((group) => (
              <div key={group.title} className="border border-white/10 bg-white/[0.02] p-5">
                <h3 className="font-display text-xl text-white mb-3">{group.title}</h3>
                <ul className="font-mono text-sm text-white/65 leading-[1.9] list-disc pl-5">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 className={h3Cls}>Как е организирано</h3>
          <ul className={listCls}>
            <li>
              <code className={codeTagCls}>src/app/(site)</code> държи публичните страници.
            </li>
            <li>
              <code className={codeTagCls}>src/app/(admin)</code> е отделен route group за
              организаторските инструменти.
            </li>
            <li>
              <code className={codeTagCls}>src/components/views</code> съдържа page-level изгледите,
              а <code className={codeTagCls}>src/components/sections</code> разбива landing page-а
              на преизползваеми секции.
            </li>
            <li>
              <code className={codeTagCls}>src/lib</code> и{" "}
              <code className={codeTagCls}>src/hooks</code> пазят бизнес логиката отделно от UI.
            </li>
          </ul>
        </div>
      </section>

      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            ЗАЩО Е <span className="text-acid">БЪРЗ</span>
          </h2>
          <p className={pCls}>
            Сайтът изглежда ефектно, но идеята не е да се жертва скоростта заради визуалности. Точно
            обратното: по-тежките неща са изолирани така, че да не пречат на първото зареждане.
          </p>
          <ul className={listCls}>
            {performanceNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className={h3Cls}>Конкретни примери</h3>
          <p className={pCls}>
            <code className={codeTagCls}>dotted-surface.tsx</code> зарежда{" "}
            <code className={codeTagCls}>three</code> вътре в{" "}
            <code className={codeTagCls}>useEffect</code>, а не още при първия render.{" "}
            <code className={codeTagCls}>ticket-visual.tsx</code> активира{" "}
            <code className={codeTagCls}>vanilla-tilt</code> само ако устройството има fine pointer.
            За download на билета <code className={codeTagCls}>html-to-image</code> се вика чак при
            натискане на бутона, не предварително.
          </p>
        </div>
      </section>

      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            СИГУРНОСТ <span className="text-acid">&</span> ДОВЕРИЕ
          </h2>
          <p className={pCls}>
            При форма за събиране на лични данни и админ достъп не е достатъчно всичко да изглежда
            добре. Трябва да има и разумни защитни слоеве.
          </p>
          <ul className={listCls}>
            {securityNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={pCls}>
            Това не превръща приложението в банков софтуер, но е добър пример как дори малък проект
            може да мисли за сигурност от самото начало, а не чак когато стане проблем.
          </p>
        </div>
      </section>

      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            АНИМАЦИИ <span className="text-acid">&</span> ДИЗАЙН
          </h2>
          <p className={pCls}>
            Визията е важна, защото сайтът е част от преживяването на хакатона. Добрата новина е, че
            много от по-интересните идеи вътре са напълно разглобяеми и можеш да ги изучиш
            поотделно.
          </p>
          <ul className={listCls}>
            {designNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            РЕСУРСИ <span className="text-acid">&</span> КРЕДИТИ
          </h2>

          <h3 className={h3Cls}>Репо и документация</h3>
          <ul className={listCls}>
            <li>
              <DecryptLink href={REPO_URL} className={inlineLinkCls}>
                GitHub repository
              </DecryptLink>{" "}
              — пълният source code
            </li>
            <li>
              <DecryptLink href="https://nextjs.org/docs" className={inlineLinkCls}>
                Next.js docs
              </DecryptLink>{" "}
              — за routing, metadata, server/client boundaries
            </li>
            <li>
              <DecryptLink href="https://react.dev" className={inlineLinkCls}>
                React docs
              </DecryptLink>{" "}
              — за component model и hooks
            </li>
            <li>
              <DecryptLink href="https://supabase.com/docs" className={inlineLinkCls}>
                Supabase docs
              </DecryptLink>{" "}
              — за Postgres, policies и backend layer-а
            </li>
          </ul>

          <h3 className={h3Cls}>Вдъхновения</h3>
          <ul className={listCls}>
            <li>
              <DecryptLink
                href="https://github.com/vercel/virtual-event-starter-kit"
                className={inlineLinkCls}
              >
                Vercel virtual event starter kit
              </DecryptLink>{" "}
              — важна отправна точка за идеята с персоналния билет
            </li>
            <li>
              <DecryptLink href="https://21st.dev" className={inlineLinkCls}>
                21st.dev
              </DecryptLink>{" "}
              — библиотека от модерни UI идеи, от които често тръгват експерименти
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
