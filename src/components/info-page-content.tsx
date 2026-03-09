"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { INFO_CRITERIA } from "@/constants";

const sectionCls = "py-16 px-6 md:px-12 border-b border-border";
const containerCls = "max-w-[800px] mx-auto";
const h2Cls = "font-display text-[clamp(36px,6vw,56px)] leading-[0.95] mb-6";
const h3Cls = "font-display text-2xl text-acid mb-3 mt-8";
const pCls = "font-mono text-sm text-white/70 leading-[1.9] mb-4";
const listCls = "font-mono text-sm text-white/70 leading-[2] list-disc pl-5 mb-6";

export function InfoPageContent() {
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
            ИНФОРМАЦИЯ <span className="text-acid">ЗА ХАКАТОНА</span>
          </h1>
          <p className="font-mono text-sm text-white/55 leading-[1.9] mt-6 max-w-[600px]">
            Всичко, което трябва да знаете за RUSE AI HACK &apos;26 — формат, правила, изисквания и
            полезна информация за участниците.
          </p>
        </div>
      </section>

      {/* Format & Rules */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            ФОРМАТ <span className="text-acid">&</span> ПРАВИЛА
          </h2>

          <h3 className={h3Cls}>Формат на събитието</h3>
          <p className={pCls}>
            RUSE AI HACK &apos;26 е 48-часов присъствен хакатон, провеждащ се в Русенски
            университет. Отборите са от 2 до 5 човека. Можете да дойдете с готов отбор или да
            сформирате такъв на място по време на opening mixer-а в петък вечерта.
          </p>

          <h3 className={h3Cls}>Програма</h3>
          <ul className={listCls}>
            <li>
              Петък (вечер): Регистрация, opening mixer, формиране на отбори, начало на хакатона
            </li>
            <li>Събота (цял ден): Хакинг, менторски сесии, workshop-и</li>
            <li>Неделя (до обяд): Финални корекции, демо презентации, награждаване</li>
          </ul>

          <h3 className={h3Cls}>Правила</h3>
          <ul className={listCls}>
            <li>Всички проекти трябва да бъдат създадени по време на хакатона</li>
            <li>AI инструменти и vibe coding се насърчават — те са основната тема</li>
            <li>Проектите трябва да имат работещо демо до крайния срок</li>
            <li>Кодът трябва да бъде качен в публичен GitHub repository</li>
            <li>Всеки участник трябва да спазва кодекса на поведение</li>
          </ul>
        </div>
      </section>

      {/* Judging Criteria */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            КРИТЕРИИ ЗА <span className="text-acid">ОЦЕНЯВАНЕ</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {INFO_CRITERIA.map((c, i) => (
              <div key={i} className="border border-white/10 p-6 bg-white/2">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-display text-lg text-white">{c.title}</span>
                  <span className="font-mono text-sm text-acid">{c.pct}</span>
                </div>
                <p className="font-mono text-xs text-white/50 leading-[1.8]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Bring */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            КАКВО ДА <span className="text-acid">НОСИТЕ</span>
          </h2>
          <ul className={listCls}>
            <li>Лаптоп и зарядно</li>
            <li>Удължители / разклонители (ще има ограничен брой контакти)</li>
            <li>Слушалки</li>
            <li>Ентусиазъм и желание за учене</li>
            <li>Предварително настроена среда за разработка</li>
          </ul>
          <p className={pCls}>
            Храна, напитки и кафе ще бъдат осигурени от организаторите. Няма нужда да носите нищо
            допълнително за изхранване.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 text-center">
        <div className={containerCls}>
          <h2 className="font-display text-[clamp(36px,6vw,56px)] leading-[0.95] mb-6">
            ГОТОВ ЛИ СИ? <span className="text-acid">РЕГИСТРИРАЙ СЕ</span>
          </h2>
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
