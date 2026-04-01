import Link from "next/link";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { JUDGING_CRITERIA } from "@/constants";

const sectionCls = "py-16 px-6 md:px-12 border-b border-border";
const containerCls = "max-w-[800px] mx-auto";
const h2Cls = "font-display text-[clamp(36px,6vw,56px)] leading-[0.95] mb-6";
const h3Cls = "font-display text-2xl text-acid mb-3 mt-8";
const pCls = "font-mono text-sm text-white/70 leading-[1.9] mb-4";
const listCls = "font-mono text-sm text-white/70 leading-[2] list-disc pl-5 mb-6";

export function InfoPageContent() {
  return (
    <div className="bg-bg min-h-screen">
      <Nav />

      {/* Header */}
      <section className="pt-[140px] pb-16 px-6 md:px-12">
        <div className={containerCls}>
          <Link
            href="/"
            className="font-mono text-xs text-muted no-underline tracking-widest transition-colors duration-200 hover:text-white mb-8 inline-block"
          >
            ← Към Началото
          </Link>
          <h1 className="font-display text-[clamp(48px,8vw,80px)] leading-[0.9]">ИНФОРМАЦИЯ</h1>
          <p className="font-mono text-sm text-white/55 leading-[1.9] mt-6 max-w-[600px]">
            Практическа информация за участниците в RUSE AI HACK &apos;26 — какво да очакваш, как да
            се подготвиш и какво ще се случи на място.
          </p>
        </div>
      </section>

      {/* What is RUSE AI HACK */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            КАКВО Е <span className="text-acid">RUSE AI HACK</span>
          </h2>
          <p className={pCls}>
            RUSE AI HACK &apos;26 е първият 48-часов AI хакатон в Русе, организиран от Startup
            Factory, Software Roastery и Русенски Университет. Фокусът е върху бързото създаване на
            работещи прототипи с помощта на AI инструменти и vibe coding подходи.
          </p>
          <p className={pCls}>
            Събитието е присъствено и се провежда в Русенски Университет. Участието е безплатно, но
            местата са ограничени — регистрацията минава през селекция.
          </p>
        </div>
      </section>

      {/* Format & Schedule */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            ФОРМАТ <span className="text-acid">&</span> ПРОГРАМА
          </h2>

          <h3 className={h3Cls}>Как протича</h3>
          <p className={pCls}>
            Работи се на отбори от 2 до 5 човека. Можеш да дойдеш с готов отбор или да сформираш
            такъв на място в петък вечерта по време на opening mixer-а. Целта е за 48 часа да
            създадеш работещ AI прототип.
          </p>

          <h3 className={h3Cls}>Програма</h3>
          <ul className={listCls}>
            <li>
              <strong>Петък (вечер):</strong> Регистрация на място, opening mixer, формиране на
              отбори, обявяване на предизвикателства, старт на хакатона
            </li>
            <li>
              <strong>Събота (цял ден):</strong> Хакинг, менторски сесии, workshop-и, храна и кафе
              през целия ден
            </li>
            <li>
              <strong>Неделя (до обяд):</strong> Финални корекции, демо презентации пред журито,
              награждаване и closing ceremony
            </li>
          </ul>

          <h3 className={h3Cls}>Менторство</h3>
          <p className={pCls}>
            По време на хакатона ще имаш достъп до ментори — опитни разработчици, дизайнери и
            предприемачи, които ще ти помогнат с технически въпроси, идеи и насоки.
          </p>
        </div>
      </section>

      {/* What to Build */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            КАКВО ДА <span className="text-acid">СЪЗДАДЕШ</span>
          </h2>
          <p className={pCls}>
            Целта е да създадеш работещо AI приложение или прототип, който решава реален проблем.
            Допустими са различни формати:
          </p>
          <ul className={listCls}>
            <li>Web приложение</li>
            <li>Chatbot / AI агент</li>
            <li>Mobile приложение</li>
            <li>API / Backend услуга</li>
            <li>Workflow / автоматизация</li>
            <li>Друг практически работещ формат</li>
          </ul>
          <p className={pCls}>
            Използването на AI инструменти и vibe coding се насърчава — те са основната тема на
            събитието. Можеш да използваш публични библиотеки, framework-и, API-та и open-source
            инструменти.
          </p>
        </div>
      </section>

      {/* Judging Criteria */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            КРИТЕРИИ ЗА <span className="text-acid">ОЦЕНЯВАНЕ</span>
          </h2>
          <p className={pCls}>
            Проектите се оценяват от жури от индустрията. Фокусът е върху реална стойност,
            качествено използване на AI и потенциал за развитие.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {JUDGING_CRITERIA.map((c, i) => (
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
            <li>AI акаунти и кредити, които планираш да използваш (OpenAI, Anthropic, и др.)</li>
          </ul>
          <p className={pCls}>
            Храна, напитки и кафе ще бъдат осигурени от организаторите. Няма нужда да носите нищо
            допълнително за изхранване.
          </p>
        </div>
      </section>

      {/* Preparation Tips */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            ПОДГОТВИ <span className="text-acid">СЕ</span>
          </h2>
          <p className={pCls}>
            Не е задължително да имаш опит с AI, но няколко неща ще ти помогнат да бъдеш
            по-ефективен:
          </p>
          <ul className={listCls}>
            <li>
              <strong>Настрой си средата:</strong> Имай готов IDE, Node.js/Python или каквото
              ползваш, и тествай, че всичко работи преди събитието
            </li>
            <li>
              <strong>Запознай се с AI инструменти:</strong> Claude, ChatGPT, Cursor, v0, Bolt —
              опитай поне един преди хакатона
            </li>
            <li>
              <strong>Помисли за идея:</strong> Можеш да дойдеш с идея за проект или да се
              присъединиш към отбор с идея на място
            </li>
            <li>
              <strong>Осигури AI кредити:</strong> Някои AI платформи изискват платени акаунти —
              подготви се предварително
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ-like practical info */}
      <section className={sectionCls}>
        <div className={containerCls}>
          <h2 className={h2Cls}>
            ПОЛЕЗНО ЗА <span className="text-acid">ЗНАЕНЕ</span>
          </h2>

          <h3 className={h3Cls}>Нямам отбор — какво да правя?</h3>
          <p className={pCls}>
            Не се притеснявай! В петък вечерта ще има opening mixer, на който можеш да се запознаеш
            с другите участници и да сформираш отбор. Организаторите също ще помогнат с
            разпределението.
          </p>

          <h3 className={h3Cls}>Какво ще бъде предоставено?</h3>
          <ul className={listCls}>
            <li>Работно пространство с Wi-Fi и контакти</li>
            <li>Храна, напитки и кафе през цялото време</li>
            <li>Менторска подкрепа</li>
            <li>Възможни AI кредити от партньори (без гаранция за покриване на всички нужди)</li>
          </ul>

          <h3 className={h3Cls}>Правила и условия</h3>
          <p className={pCls}>
            Подробните правила и условия за участие, включително политика за интелектуална
            собственост, кодекс на поведение и GDPR, можеш да намериш на{" "}
            <Link href="/rules" className="text-acid underline hover:text-white transition-colors">
              страницата за правила и условия
            </Link>
            .
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
