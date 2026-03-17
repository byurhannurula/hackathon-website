"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const sectionCls = "py-16 px-6 md:px-12 border-b border-border";
const containerCls = "max-w-[800px] mx-auto";
const h2Cls = "font-display text-[clamp(36px,6vw,56px)] leading-[0.95] mb-6";
const h3Cls = "font-display text-2xl text-acid mb-3 mt-8";
const pCls = "font-mono text-sm text-white/70 leading-[1.9] mb-4";
const listCls = "font-mono text-sm text-white/70 leading-[2] list-disc pl-5 mb-6";

export function RulesPageContent() {
  const router = useRouter();
  const handleRegister = () => router.push("/register");

  return (
    <div className="bg-bg min-h-screen">
      <Nav onRegister={handleRegister} />

      {/* Header */}
      <section className="pt-[140px] pb-16 px-6 md:px-12">
        <div className={containerCls}>
          <Link
            href="/"
            className="font-mono text-xs text-muted no-underline tracking-widest transition-colors duration-200 hover:text-white mb-8 inline-block"
          >
            ← Към Началото
          </Link>
          <h1 className="font-display text-[clamp(48px,8vw,80px)] leading-[0.9]">
            ПРАВИЛА <span className="text-acid">& УСЛОВИЯ</span>
          </h1>
          <p className="font-mono text-sm text-white/55 leading-[1.9] mt-6 max-w-[600px]">
            Подробни правила, кодекс на поведение и условия за участие в RUSE AI HACK &apos;26.
            Регистрирайки се, вие приемате всички условия описани по-долу.
          </p>
        </div>
      </section>

      {/* General Rules */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            ОБЩИ <span className="text-acid">ПРАВИЛА</span>
          </h2>

          <h3 className={h3Cls}>Участие</h3>
          <ul className={listCls}>
            <li>Хакатонът е отворен за всички — ученици, студенти и професионалисти</li>
            <li>Минимална възраст за участие: 16 години (непълнолетни участват с декларация от родител/настойник)</li>
            <li>Участието е безплатно и включва храна, напитки и достъп до всички менторски сесии</li>
            <li>Максимален брой участници: 100</li>
          </ul>

          <h3 className={h3Cls}>Отбори</h3>
          <ul className={listCls}>
            <li>Отборите са от 2 до 5 човека</li>
            <li>Можете да дойдете с готов отбор или да сформирате такъв на място</li>
            <li>Самостоятелно участие не е разрешено — всеки трябва да бъде част от отбор</li>
            <li>Организаторите си запазват правото да преразпределят участници без отбор</li>
          </ul>

          <h3 className={h3Cls}>Проекти</h3>
          <ul className={listCls}>
            <li>Всички проекти трябва да бъдат създадени по време на хакатона (48 часа)</li>
            <li>Предварително написан код, шаблони и boilerplate-и са забранени</li>
            <li>Използването на публични библиотеки, API-та и open-source инструменти е разрешено</li>
            <li>AI инструменти и vibe coding се насърчават — те са основната тема на събитието</li>
            <li>Проектите трябва да имат работещо демо до крайния срок за предаване</li>
            <li>Кодът трябва да бъде качен в публичен GitHub repository преди крайния срок</li>
          </ul>
        </div>
      </section>

      {/* Code of Conduct */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            КОДЕКС НА <span className="text-acid">ПОВЕДЕНИЕ</span>
          </h2>
          <p className={pCls}>
            RUSE AI HACK &apos;26 е събитие за всички, независимо от пол, сексуална ориентация,
            увреждане, външен вид, раса, етническа принадлежност или религия. Не толерираме тормоз
            на участници в каквато и да било форма.
          </p>

          <h3 className={h3Cls}>Очаквано поведение</h3>
          <ul className={listCls}>
            <li>Уважавайте всички участници, ментори, жури и организатори</li>
            <li>Бъдете отворени към различни гледни точки и опит</li>
            <li>Давайте и приемайте конструктивна критика с уважение</li>
            <li>Съсредоточете се върху това, което е най-добро за общността</li>
            <li>Поддържайте чиста и подредена работна среда</li>
          </ul>

          <h3 className={h3Cls}>Неприемливо поведение</h3>
          <ul className={listCls}>
            <li>Тормоз, заплахи или дискриминация от всякакъв характер</li>
            <li>Обидни коментари, свързани с лични характеристики</li>
            <li>Нежелано физическо взаимодействие или внимание</li>
            <li>Умишлено сплашване, преследване или следене</li>
            <li>Разрушаване на работата на други отбори (саботаж на код, хардуер и др.)</li>
          </ul>

          <h3 className={h3Cls}>Последствия</h3>
          <p className={pCls}>
            Участници, нарушаващи кодекса на поведение, могат да бъдат предупредени, отстранени от
            събитието или дисквалифицирани от състезанието по преценка на организаторите. При
            дисквалификация отборът губи правото си на награди.
          </p>
        </div>
      </section>

      {/* IP & Ownership */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            ИНТЕЛЕКТУАЛНА <span className="text-acid">СОБСТВЕНОСТ</span>
          </h2>
          <ul className={listCls}>
            <li>Всички права върху създадения проект принадлежат на отбора, който го е създал</li>
            <li>Организаторите имат право да използват името, описанието и демо на проекта за промоционални цели</li>
            <li>С участието си, вие давате съгласие за заснемане (снимки и видео) по време на събитието</li>
            <li>Участниците се задължават да не нарушават авторски права на трети лица</li>
          </ul>
        </div>
      </section>

      {/* Prizes & Judging */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            НАГРАДИ <span className="text-acid">& ОЦЕНЯВАНЕ</span>
          </h2>

          <h3 className={h3Cls}>Процес на оценяване</h3>
          <ul className={listCls}>
            <li>Всеки отбор представя проекта си пред журито в рамките на 5 минути + 2 мин. въпроси</li>
            <li>Журито оценява по критериите: иновативност, техническо изпълнение, дизайн/UX, приложимост и презентация</li>
            <li>Решението на журито е окончателно и не подлежи на обжалване</li>
          </ul>

          <h3 className={h3Cls}>Условия за награди</h3>
          <ul className={listCls}>
            <li>Наградите се изплащат на отбора като цяло, не на отделни участници</li>
            <li>За получаване на парична награда е необходимо предоставяне на банкова сметка (IBAN)</li>
            <li>Организаторите си запазват правото да не присъдят награда, ако нито един проект не отговаря на минималните стандарти</li>
            <li>Данъчното облагане на наградите е отговорност на получателя</li>
          </ul>
        </div>
      </section>

      {/* Disqualification */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            ДИСКВАЛИФИКАЦИЯ
          </h2>
          <p className={pCls}>Отбор може да бъде дисквалифициран при:</p>
          <ul className={listCls}>
            <li>Използване на предварително написан код (извън публични библиотеки)</li>
            <li>Плагиатство или нарушение на авторски права</li>
            <li>Нарушение на кодекса на поведение</li>
            <li>Непредставяне на проект до крайния срок</li>
            <li>Предоставяне на невярна информация при регистрацията</li>
            <li>Всяко друго действие, което организаторите считат за несъвместимо с духа на събитието</li>
          </ul>
        </div>
      </section>

      {/* Data & Privacy */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            ЛИЧНИ <span className="text-acid">ДАННИ</span>
          </h2>
          <ul className={listCls}>
            <li>Личните данни се събират и обработват единствено за целите на организацията на събитието</li>
            <li>Данните се съхраняват сигурно и не се споделят с трети лица, освен за целите на събитието</li>
            <li>Участниците имат право да поискат изтриване на данните си след приключване на събитието</li>
            <li>За въпроси относно лични данни: info@startupfactory.bg</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 text-center">
        <div className={containerCls}>
          <h2 className="font-display text-[clamp(36px,6vw,56px)] leading-[0.95] mb-6">
            СЪГЛАСЕН ЛИ СИ? <span className="text-acid">РЕГИСТРИРАЙ СЕ</span>
          </h2>
          <p className="font-mono text-sm text-white/50 mb-8 max-w-[480px] mx-auto leading-[1.8]">
            С регистрацията си приемате всички правила и условия описани на тази страница.
          </p>
          <Link
            href="/register"
            className="inline-block font-display text-xl tracking-[0.08em] bg-acid text-black border-none py-5 px-12 no-underline cursor-pointer transition-all duration-200 hover:bg-white hover:-translate-y-0.5 mt-4"
          >
            ВЗЕМИ БИЛЕТ →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
