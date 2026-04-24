"use client";

import { useEffect, useState, useCallback } from "react";
import { Link } from "@/components/ui";

// English chars for the matrix-style background
const MATRIX_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>{}[]=/\\|~^";

// Glitch chars for the text scramble effect (mix of symbols + Cyrillic)
const GLITCH_CHARS =
  "!@#$%^&*_+-=<>?/\\АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЮЯabcdefghijklmnopqrstuvwxyz0123456789";

// Pre-computed floating chars (English/symbols for matrix look)
const FLOATING_CHARS = Array.from(
  { length: 20 },
  (_, i) => MATRIX_CHARS[(i * 7 + 3) % MATRIX_CHARS.length]
);

// Deterministic font sizes per index (no Math.random during render)
const CHAR_FONT_SIZES = FLOATING_CHARS.map((_, i) => 14 + ((i * 13 + 7) % 22));

const MESSAGES = [
  "Тук няма нищо... или пък има?",
  "Грешен завой, хакер.",
  "404: Файлът избяга.",
  "Опа... тази страница не съществува.",
  "Изгуби се? Случва се и на най-добрите.",
  "Този URL е по-празен от хладилника ми.",
  "Дори AI не може да намери тази страница.",
  "Тази страница е на почивка. Завинаги.",
  'Вселената каза: "Не."',
  "Ctrl+Z няма да помогне тук.",
  "Поздрави от /dev/null.",
  "Тук е по-пусто от хакатон без WiFi.",
  "Ако търсиш бъг — намери го!",
  "sudo find / -name 'тази-страница' → нищо.",
  "Тази страница беше изтрита от бъдещето.",
  "Ти: *кликва линк* // Сървърът: *seen*",
  "Error 404: Мотивацията не е намерена.",
  "git checkout тази-страница → fatal: не съществува",
  "npm install hope → package not found",
  "Тази страница заряза frontend-а за backend.",
];

function useGlitchText(text: string, active: boolean) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }

    let frame: number;
    let iteration = 0;
    const maxIterations = text.length * 3;

    const animate = () => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration / 3) return char;
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );

      iteration++;
      if (iteration < maxIterations) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [text, active]);

  return display;
}

function GlitchLine({ delay }: { delay: number }) {
  const [style, setStyle] = useState({ top: "0%", opacity: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStyle({
        top: `${Math.random() * 100}%`,
        opacity: Math.random() > 0.5 ? 0.15 : 0,
      });
    }, 100 + delay);
    return () => clearInterval(interval);
  }, [delay]);

  return (
    <div
      className="absolute left-0 w-full h-px bg-acid pointer-events-none z-10"
      style={{
        top: style.top,
        opacity: style.opacity,
        transition: "top 0.05s, opacity 0.05s",
      }}
    />
  );
}

function MatrixChar({ char, index, fontSize }: { char: string; index: number; fontSize: number }) {
  const [pos, setPos] = useState({ x: 0, y: 0, opacity: 0 });
  const [currentChar, setCurrentChar] = useState(char);

  useEffect(() => {
    const spawn = () => {
      setPos({
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.1 + 0.02,
      });
    };
    spawn();
    const moveInterval = setInterval(spawn, 3000 + index * 400);

    const charInterval = setInterval(
      () => {
        setCurrentChar(MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]);
      },
      500 + index * 100
    );

    return () => {
      clearInterval(moveInterval);
      clearInterval(charInterval);
    };
  }, [index]);

  return (
    <span
      className="absolute font-mono text-acid/80 pointer-events-none select-none transition-all duration-[3s]"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        opacity: pos.opacity,
        fontSize: `${fontSize}px`,
      }}
    >
      {currentChar}
    </span>
  );
}

export default function NotFound() {
  // Use first message as deterministic SSR default, randomize on mount
  const [message, setMessage] = useState(MESSAGES[0]);
  const [glitchActive, setGlitchActive] = useState(false);
  const [flicker, setFlicker] = useState(false);
  const glitchedMessage = useGlitchText(message, glitchActive);

  // Pick random message on mount + periodic re-glitch
  useEffect(() => {
    const pickAndGlitch = () => {
      setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 1500);
    };
    // Initial pick with tiny delay to avoid sync setState in effect body
    const init = setTimeout(pickAndGlitch, 0);
    const interval = setInterval(pickAndGlitch, 4000);
    return () => {
      clearTimeout(init);
      clearInterval(interval);
    };
  }, []);

  // Random flicker on the 404
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 50 + Math.random() * 100);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = e.currentTarget.querySelector("[data-shadow]") as HTMLElement;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    el.style.textShadow = `${x}px ${y}px 0 rgba(254,238,4,0.3), ${-x}px ${-y}px 0 rgba(255,0,100,0.25)`;
  }, []);

  return (
    <div
      className="min-h-screen bg-bg flex flex-col items-center justify-center relative overflow-hidden px-6 select-none"
      onMouseMove={handleMouseMove}
    >
      {/* Scan lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
        }}
      />

      {/* Glitch scan lines */}
      {Array.from({ length: 3 }).map((_, i) => (
        <GlitchLine key={i} delay={i * 50} />
      ))}

      {/* Matrix-style floating chars */}
      {FLOATING_CHARS.map((char, i) => (
        <MatrixChar key={i} char={char} index={i} fontSize={CHAR_FONT_SIZES[i]} />
      ))}

      {/* Decorative grid */}
      <div className="absolute inset-0 z-0 bg-grid-white opacity-30" />

      {/* Main content */}
      <div className="relative z-20 text-center">
        {/* Error code label */}
        <div className="font-mono text-[10px] tracking-[0.3em] text-red-400/60 uppercase mb-6 animate-pulse">
          [ ERROR // СТРАНИЦАТА НЕ Е НАМЕРЕНА ]
        </div>

        {/* Big 404 */}
        <h1
          data-shadow
          className="font-display leading-none mb-8 relative"
          style={{
            fontSize: "clamp(120px, 22vw, 260px)",
            opacity: flicker ? 0.2 : 1,
            transition: "opacity 0.05s",
          }}
        >
          <span className="relative inline-block">
            <span className="text-acid">4</span>
            <span className="text-white/90">0</span>
            <span className="text-acid">4</span>

            {/* Chromatic aberration layers */}
            <span
              className="absolute inset-0 text-red-500/20 pointer-events-none"
              style={{ transform: "translate(3px, -2px)" }}
              aria-hidden
            >
              404
            </span>
            <span
              className="absolute inset-0 text-cyan-500/15 pointer-events-none"
              style={{ transform: "translate(-3px, 2px)" }}
              aria-hidden
            >
              404
            </span>
          </span>
        </h1>

        {/* Glitched message — cycles through random messages */}
        <p className="font-mono text-sm sm:text-base text-white/60 mb-3 h-7 overflow-hidden">
          {glitchedMessage}
        </p>

        {/* Sub line */}
        <p className="font-mono text-[11px] text-white/25 mb-10 tracking-wider">
          &gt; опитай пак или се върни в началото_
          <span className="animate-pulse">▌</span>
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/"
            variant="primary"
            className="group relative text-[15px] py-4 px-10 hover:scale-[1.03]"
          >
            КЪМ НАЧАЛОТО
            <span className="absolute inset-0 border border-acid/0 group-hover:border-acid/40 transition-colors duration-300 pointer-events-none -m-1" />
          </Link>
        </div>

        {/* Fun ASCII art */}
        <pre className="font-mono text-[9px] sm:text-[11px] text-white/10 mt-12 leading-tight">
          {`    ╔══════════════════════════╗
    ║  ¯\\_(ツ)_/¯             ║
    ║  PAGE NOT FOUND          ║
    ║  RUSE AI HACK '26        ║
    ╚══════════════════════════╝`}
        </pre>
      </div>
    </div>
  );
}
