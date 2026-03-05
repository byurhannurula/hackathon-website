import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=Instrument+Serif:ital@1&family=Syne:wght@400;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #050505; color: #fff; font-family: 'Syne', sans-serif; overflow-x: hidden; }
    :root {
      --acid:   #C8FF00;
      --pink:   #FF3355;
      --bg:     #050505;
      --card:   #0d0d0d;
      --border: rgba(255,255,255,0.07);
      --mono:   'Space Mono', monospace;
    }
    ::selection { background: var(--acid); color: #000; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #000; }
    ::-webkit-scrollbar-thumb { background: var(--acid); }

    @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn    { from { opacity:0; } to { opacity:1; } }
    @keyframes ticker    { from { transform:translateX(0); } to { transform:translateX(-50%); } }
    @keyframes revealUp  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes pulse     { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(1.4); } }
    @keyframes ripple    { 0% { transform:scale(0.8); opacity:0.8; } 100% { transform:scale(2.8); opacity:0; } }
    @keyframes slideIn   { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }

    @keyframes glitch {
      0%,89%,100% { text-shadow:none; transform:none; clip-path:none; }
      90%  { text-shadow:-4px 0 var(--pink), 4px 0 rgba(0,255,136,0.6);
             transform:skewX(-1deg) translateX(2px); }
      91%  { text-shadow: 4px 0 var(--pink), -4px 0 rgba(0,255,136,0.6);
             transform:skewX(1deg) translateX(-2px); }
      92%  { text-shadow:-2px 0 var(--acid); transform:none; }
      92.5%{ text-shadow:none; transform:none; }
    }
    @keyframes glitch2 {
      0%,94%,100% { text-shadow:none; transform:none; }
      95% { text-shadow:-3px 0 var(--pink); transform:translateX(2px); }
      97% { text-shadow: 3px 0 var(--acid); transform:translateX(-2px); }
      98% { text-shadow:none; }
    }
    @keyframes ctaReveal {
      from { opacity:0; transform:translateY(40px) skewY(3deg); }
      to   { opacity:1; transform:translateY(0) skewY(0); }
    }

    .no-select, .no-select * {
      user-select:none !important; -webkit-user-select:none !important;
    }
    .glitch-1 { animation: glitch  8s 1.5s ease infinite; }
    .glitch-2 { animation: glitch2 11s 4s ease infinite; }
  `}</style>
);

// ─── DECRYPT TEXT ─────────────────────────────────────────────────────────────
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/";
function DecryptText({ text, speed = 38, delay = 0 }) {
  const [out, setOut] = useState(() =>
    text.split("").map(c => c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]).join("")
  );
  useEffect(() => {
    let idx = 0, timer;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        idx++;
        setOut(text.split("").map((c, i) => {
          if (c === " " || i < idx) return c;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join(""));
        if (idx >= text.length) clearInterval(timer);
      }, speed);
    }, delay);
    return () => { clearTimeout(start); clearInterval(timer); };
  }, [text, speed, delay]);
  return <span style={{ fontFamily: "var(--mono)", fontSize: "13px", letterSpacing: "0.18em", color: "rgba(200,255,0,0.85)" }}>{out}</span>;
}

// ─── DOTTED MAP (inline Europe, no external package) ─────────────────────────
// Canvas-based dotted map — Europe land masses with Ruse, Bulgaria highlighted
function DottedMap() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.offsetWidth || 1200;
    const H = canvas.offsetHeight || 600;
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    // Bounds: lon [-13, 43], lat [34, 72]
    const LON_MIN = -13, LON_MAX = 43, LAT_MIN = 34, LAT_MAX = 72;
    const toX = lon => ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W;
    const toY = lat => H - ((lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * H;

    // Point-in-polygon (ray casting)
    const pip = (lon, lat, poly) => {
      let inside = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [xi, yi] = poly[i], [xj, yj] = poly[j];
        if ((yi > lat) !== (yj > lat) && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)
          inside = !inside;
      }
      return inside;
    };

    // Simplified European land polygons [lon, lat]
    const MAINLAND = [
      [-8.9,36],[-5.5,36],[-1.8,36.8],[2.5,36.5],
      [5,43],[8,44],[9,41.5],[13,38],[15.5,37.5],[17,38.5],
      [19,39.5],[21.5,38],[24,38],[26,41],[28,41.5],[29,38],[33,43],
      [34,47],[32,50],[30,51],[24,54],[22,55],[18,55.5],[14.5,54],
      [10,55],[8.5,57],[5,53],[4,52],[2,51],[0,50],
      [-1.5,47],[-5,48],[-5,44],[-9,44],[-8.9,36]
    ];
    const SCANDINAVIA = [
      [5,57],[5,59],[7,62],[8.5,63],[15,66],[16,69],[20,70.5],
      [26,71.5],[30,70.5],[29,68],[26.5,65],[27,63],[28,61],
      [25.5,59.5],[23,57.5],[18,56.5],[14.5,57],[12,56],[10,55],[8.5,57],[5,57]
    ];
    const UK = [
      [-5.5,50],[0.5,51],[1.5,52],[0,54],[-2,55],[-3.5,57.5],
      [-5,58.5],[-6.5,57],[-5.5,53],[-4.5,52],[-5.5,50]
    ];
    const IRELAND = [[-6,52],[-10.5,53],[-10,55],[-7,55.5],[-6,52]];
    const ICELAND = [[-24,63.5],[-13.5,63],[-13,65],[-24,66],[-24,63.5]];
    const REGIONS = [MAINLAND, SCANDINAVIA, UK, IRELAND, ICELAND];

    // Dot grid
    const SP = Math.max(7, Math.round(W / 100));
    const DR = SP * 0.2;

    for (let px = 0; px <= W + SP; px += SP) {
      for (let py = 0; py <= H + SP; py += SP) {
        const lon = LON_MIN + (px / W) * (LON_MAX - LON_MIN);
        const lat = LAT_MIN + ((H - py) / H) * (LAT_MAX - LAT_MIN);
        const land = REGIONS.some(r => pip(lon, lat, r));
        ctx.beginPath();
        ctx.arc(px, py, DR, 0, Math.PI * 2);
        ctx.fillStyle = land ? "rgba(200,255,0,0.18)" : "rgba(255,255,255,0.04)";
        ctx.fill();
      }
    }

    // Ruse, Bulgaria — the pin
    const rx = toX(25.97), ry = toY(43.85);
    // Static glow rings (animation handled by SVG overlay)
    ctx.beginPath(); ctx.arc(rx, ry, 18, 0, Math.PI*2);
    ctx.strokeStyle = "rgba(255,51,85,0.12)"; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); ctx.arc(rx, ry, 10, 0, Math.PI*2);
    ctx.strokeStyle = "rgba(255,51,85,0.22)"; ctx.lineWidth = 1; ctx.stroke();
    // Dot
    ctx.beginPath(); ctx.arc(rx, ry, 5, 0, Math.PI*2);
    ctx.fillStyle = "#FF3355"; ctx.fill();
    ctx.beginPath(); ctx.arc(rx, ry, 2.5, 0, Math.PI*2);
    ctx.fillStyle = "#fff"; ctx.fill();
    // Label
    ctx.font = `700 10px 'Space Mono', monospace`;
    ctx.fillStyle = "rgba(255,51,85,0.85)";
    ctx.fillText("RUSE, BG ●", rx + 9, ry - 6);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <canvas ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.9 }} />
      {/* CSS-animated pulse ring over Ruse — positioned at ~70.3% x, ~74.1% y of map */}
      <div style={{ position: "absolute", left: "70.3%", top: "74.1%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
        <div style={{ position: "relative", width: "48px", height: "48px" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid rgba(255,51,85,0.6)", animation: "ripple 2.4s ease-out infinite" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid rgba(255,51,85,0.4)", animation: "ripple 2.4s 0.8s ease-out infinite" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid rgba(255,51,85,0.2)", animation: "ripple 2.4s 1.6s ease-out infinite" }} />
        </div>
      </div>
    </div>
  );
}

// ─── GITHUB ICON ─────────────────────────────────────────────────────────────
const GHIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" style={{ flexShrink: 0 }}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

// ─── TICKET SVG BORDER ────────────────────────────────────────────────────────
// fillRule="evenodd" bakes notch circles into the path.
// Separator at x=548 out of 720 viewBox (76.1%).
// Gradient border like Next.js conf: acid → cyan → pink → acid.
function TicketSVG({ hasColor, shineX = 50, shineY = 50, hovering = false }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 720 320" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, display: "block" }}>
      <defs>
        {/* Vivid rainbow border gradient — always visible */}
        <linearGradient id="border-grad" x1="0" y1="0" x2="720" y2="320" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#C8FF00" />
          <stop offset="30%"  stopColor="#00FFB2" />
          <stop offset="60%"  stopColor="#7B61FF" />
          <stop offset="85%"  stopColor="#FF3355" />
          <stop offset="100%" stopColor="#C8FF00" />
        </linearGradient>
        {/* Pearl shimmer follows cursor */}
        <radialGradient id="sh-t" cx="50%" cy="50%" r="60%">
          <stop offset="0%"   stopColor="white" stopOpacity={hovering ? "0.07" : "0"} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── OUTER SHAPE (border fill, 7px thick) ── */}
      {/* Notches at x=0 center (y=160) and x=720 center */}
      <path fillRule="evenodd" clipRule="evenodd"
        d="M22 0C9.85 0 0 9.85 0 22V144C16.57 144 30 157.43 30 174C30 190.57 16.57 204 0 204V298C0 310.15 9.85 320 22 320H698C710.15 320 720 310.15 720 298V204C703.43 204 690 190.57 690 174C690 157.43 703.43 144 720 144V22C720 9.85 710.15 0 698 0H22Z"
        fill="url(#border-grad)" />

      {/* ── INNER DARK FILL (7px inset) ── */}
      <path fillRule="evenodd" clipRule="evenodd"
        d="M23 7C13.61 7 6 14.61 6 24V139.8C22.76 142.35 35.5 157.6 35.5 174C35.5 190.4 22.76 205.65 6 208.2V296C6 305.39 13.61 313 23 313H697C706.39 313 714 305.39 714 296V208.2C697.24 205.65 684.5 190.4 684.5 174C684.5 157.6 697.24 142.35 714 139.8V24C714 14.61 706.39 7 697 7H23Z"
        fill="#080808" />

      {/* Shimmer layer */}
      <path fillRule="evenodd" clipRule="evenodd"
        d="M23 7C13.61 7 6 14.61 6 24V139.8C22.76 142.35 35.5 157.6 35.5 174C35.5 190.4 22.76 205.65 6 208.2V296C6 305.39 13.61 313 23 313H697C706.39 313 714 305.39 714 296V208.2C697.24 205.65 684.5 190.4 684.5 174C684.5 157.6 697.24 142.35 714 139.8V24C714 14.61 706.39 7 697 7H23Z"
        fill="url(#sh-t)" />

      {/* ── DASHED SEPARATOR at x=548 ── */}
      <line x1="548" y1="10" x2="548" y2="310" stroke="#333" strokeWidth="1.5" strokeDasharray="7 5" />
    </svg>
  );
}

// ─── AVATAR PLACEHOLDER (CSS initials, no external API needed) ───────────────
function AvatarCircle({ name, avatarUrl, size = 68 }) {
  const [failed, setFailed] = useState(false);
  const initials = name.trim().split(/\s+/).map(w => w[0]).join("").slice(0,2).toUpperCase() || "?";

  if (!avatarUrl || failed) {
    return (
      <div style={{
        width: size, height: size, borderRadius: "50%", flexShrink: 0,
        background: "linear-gradient(135deg, rgba(200,255,0,0.18), rgba(200,255,0,0.05))",
        border: "2px solid rgba(200,255,0,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: size * 0.38, color: "var(--acid)", letterSpacing: "-0.02em" }}>{initials}</span>
      </div>
    );
  }
  return (
    <img src={avatarUrl} alt="" draggable="false"
      style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", display: "block", border: "2px solid rgba(255,255,255,0.2)", flexShrink: 0 }}
      onError={() => setFailed(true)}
    />
  );
}

// ─── TICKET VISUAL ────────────────────────────────────────────────────────────
// Layout based on Next.js Conf ticket:
//   Main body (left ~76%):
//     TOP-LEFT:    avatar + name + @handle
//     BOTTOM-LEFT: VIBE RUSE brand | date + location
//   Right stub (~24%):
//     TOP:    "Nº" small horizontal label
//     CENTER: big number, writing-mode vertical, chars upright (like Next.js)
function TicketVisual({ data, interactive = false }) {
  const cardRef = useRef(null);
  const [rot, setRot]     = useState({ x: 0, y: 0 });
  const [hov, setHov]     = useState(false);

  const name      = data?.name      || "Your Name";
  const handle    = data?.handle    || "handle";
  const avatarUrl = data?.avatarUrl || "";
  const ticketNum = data?.ticketNum || null;

  const cleanHandle = handle.replace(/^@/, "");
  const numStr      = ticketNum ? String(ticketNum).padStart(6, "0") : "000000";

  const onEnter = useCallback(() => setHov(true), []);
  const onLeave = useCallback(() => { setHov(false); setRot({ x: 0, y: 0 }); }, []);
  const onMove  = useCallback(e => {
    if (!interactive || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setRot({
      x: -((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * 10,
      y:  ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) * 10,
    });
  }, [interactive]);

  // aspectRatio MUST match the SVG viewBox (720×320) exactly to avoid letterboxing
  // which shifts the SVG border away from the HTML overlay content.
  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      style={{
        position: "relative",
        width: "640px", maxWidth: "96vw",
        aspectRatio: "720 / 320",   // ← must match SVG viewBox exactly
        transformStyle: "preserve-3d",
        transform: `perspective(1100px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        transition: hov ? "transform 0.08s ease-out" : "transform 0.5s ease-out",
        cursor: interactive ? "default" : "default",
        flexShrink: 0,
        filter: hov
          ? "drop-shadow(0 36px 70px rgba(0,0,0,0.95)) drop-shadow(0 0 40px rgba(200,255,0,0.07))"
          : "drop-shadow(0 20px 44px rgba(0,0,0,0.8))",
      }}
    >
      <TicketSVG hovering={hov} />

      {/* ══════════════════════════════════════════════
          MAIN BODY  (left 3% → right 25%)
          SVG inner border: x=6 → x=548/720
          At 640px display: 6/720*640=5.3px left edge
          ══════════════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        top: "8%", bottom: "8%",
        left: "4%",        // 4% of 640px = 25.6px (well inside 5.3px border)
        right: "25%",      // leaves 25% for stub (separator at 76.1%)
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>

        {/* ── TOP: avatar + name + handle ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <AvatarCircle name={name} avatarUrl={avatarUrl} size={64} />
          <div style={{ overflow: "hidden", minWidth: 0 }}>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(15px, 2.6vw, 21px)",
              lineHeight: 1.1,
              color: "#fff",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              letterSpacing: "-0.02em",
            }}>{name}</div>
            <div style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(10px, 1.5vw, 12px)",
              color: "rgba(255,255,255,0.5)",
              marginTop: "6px",
              letterSpacing: "0.01em",
            }}>
              <GHIcon />
              {cleanHandle}
            </div>
          </div>
        </div>

        {/* ── BOTTOM: brand | divider | event info ── */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "20px" }}>
          {/* Brand */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(22px, 3.8vw, 34px)", lineHeight: 0.88, letterSpacing: "0.02em" }}>
              <span style={{ color: "var(--acid)" }}>VIBE</span>
              <span style={{ color: "#fff" }}> RUSE</span>
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(7px,1vw,9px)", color: "rgba(255,255,255,0.4)", marginTop: "5px", letterSpacing: "0.12em" }}>
              HACKATHON &apos;26
            </div>
          </div>

          {/* Vertical divider */}
          <div style={{ width: "1px", height: "38px", background: "rgba(255,255,255,0.12)", flexShrink: 0 }} />

          {/* Date + location */}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(12px,1.9vw,15px)", color: "#fff", lineHeight: 1.2 }}>
              26 APRIL 2026
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(9px,1.3vw,11px)", color: "rgba(255,255,255,0.45)", marginTop: "3px" }}>
              RUSE, BULGARIA
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(7px,1vw,9px)", color: "rgba(255,255,255,0.22)", marginTop: "6px", letterSpacing: "0.06em" }}>
              by <span style={{ color: "rgba(200,255,0,0.6)" }}>StartupFactory</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          RIGHT STUB  (76.1% → 98%)
          Render Nº + number normally, rotate whole thing -90deg
          This avoids all writing-mode rendering bugs.
          ══════════════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        top: "7%", bottom: "7%",
        left: "77%", right: "0%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        <div style={{
          transform: "rotate(-90deg)",
          display: "flex",
          alignItems: "baseline",
          gap: "10px",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            fontWeight: 700,
            color: "rgba(200,255,0,0.75)",
            letterSpacing: "0.06em",
          }}>Nº</span>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
            fontSize: "clamp(20px, 3.2vw, 28px)",
            color: "#ffffff",
            letterSpacing: "0.12em",
          }}>{numStr}</span>
        </div>
      </div>
    </div>
  );
}

// ─── WEBGL DITHERING SHADER ───────────────────────────────────────────────────
// Ordered 4×4 Bayer dithering with acid-green palette, animated warp noise.
// Replaces the hero background — no external dependency needed.
function DitheringBg({ speed = 0.15, hovered = false }) {
  const canvasRef = useRef(null);
  const glRef     = useRef(null);
  const progRef   = useRef(null);
  const rafRef    = useRef(null);
  const t0Ref     = useRef(performance.now());

  const VS = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  const FS = `
    precision mediump float;
    uniform float u_time;
    uniform vec2  u_res;
    uniform float u_speed;

    // 4×4 Bayer matrix (normalized 0–1)
    float bayer4[16];
    void initBayer() {
      bayer4[0]  =  0.0/16.0; bayer4[1]  =  8.0/16.0; bayer4[2]  =  2.0/16.0; bayer4[3]  = 10.0/16.0;
      bayer4[4]  = 12.0/16.0; bayer4[5]  =  4.0/16.0; bayer4[6]  = 14.0/16.0; bayer4[7]  =  6.0/16.0;
      bayer4[8]  =  3.0/16.0; bayer4[9]  = 11.0/16.0; bayer4[10] =  1.0/16.0; bayer4[11] =  9.0/16.0;
      bayer4[12] = 15.0/16.0; bayer4[13] =  7.0/16.0; bayer4[14] = 13.0/16.0; bayer4[15] =  5.0/16.0;
    }
    float bayerVal(vec2 coord) {
      initBayer();
      int x = int(mod(coord.x, 4.0));
      int y = int(mod(coord.y, 4.0));
      return bayer4[y * 4 + x];
    }

    // Smooth noise
    float hash(vec2 p) {
      p = fract(p * vec2(127.1, 311.7));
      p += dot(p, p + 19.19);
      return fract(p.x * p.y);
    }
    float noise(vec2 p) {
      vec2 i = floor(p); vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1,0)), u.x),
        mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
        u.y
      );
    }
    float fbm(vec2 p) {
      float v = 0.0; float a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * noise(p); p *= 2.1; a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_res;
      float t = u_time * u_speed;

      // Warp — shift UV with fbm to get organic movement
      vec2 warp = vec2(
        fbm(uv * 2.2 + vec2(t * 0.4, t * 0.15)),
        fbm(uv * 2.2 + vec2(t * 0.3 + 5.2, t * 0.2 + 1.8))
      );
      float n = fbm(uv * 1.8 + warp * 0.9 + t * 0.08);

      // Radial vignette — stronger edges, open center
      vec2 centered = uv - 0.5;
      float vignette = 1.0 - dot(centered, centered) * 2.8;
      n *= clamp(vignette, 0.0, 1.0);

      // Dither: compare noise against bayer threshold
      float threshold = bayerVal(gl_FragCoord.xy);
      float dithered = step(threshold, n);

      // Acid green #C8FF00 tinted output at low opacity
      // bg is transparent (black), dots are acid green
      vec3 acid = vec3(0.784, 1.0, 0.0);  // #C8FF00
      vec3 col  = acid * dithered;

      // Output: visible only where dithered=1, rest transparent
      gl_FragColor = vec4(col, dithered * 0.55);
    }
  `;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;
    glRef.current = gl;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    progRef.current = prog;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(prog);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);
    t0Ref.current = performance.now();

    const loop = () => {
      const t = (performance.now() - t0Ref.current) / 1000;
      gl.uniform1f(gl.getUniformLocation(prog, "u_time"), t);
      gl.uniform2f(gl.getUniformLocation(prog, "u_res"), canvas.width, canvas.height);
      gl.uniform1f(gl.getUniformLocation(prog, "u_speed"), 0.15);
      gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", pointerEvents: "none" }} />
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
const Nav = ({ onRegister }) => {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 48px",
      background: sc ? "rgba(5,5,5,0.94)" : "transparent",
      backdropFilter: sc ? "blur(20px)" : "none",
      borderBottom: sc ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
        <span style={{ fontFamily: "'Bebas Neue'", fontSize: "22px", color: "var(--acid)" }}>VIBE</span>
        <span style={{ fontFamily: "'Bebas Neue'", fontSize: "22px", color: "#fff" }}>RUSE</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,0.45)", marginLeft: "4px" }}>&apos;26</span>
      </div>
      <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
        {["Agenda","Prizes","Sponsors","FAQ"].map(l => (
          <span key={l} style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.35)", cursor: "pointer", textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "var(--acid)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}>{l}</span>
        ))}
        <button onClick={onRegister}
          style={{ fontFamily: "var(--mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", background: "var(--acid)", color: "#000", border: "none", padding: "9px 22px", cursor: "pointer", transition: "background 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#fff"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--acid)"}
        >Register →</button>
      </div>
    </nav>
  );
};

// ─── TICKER ───────────────────────────────────────────────────────────────────
const PARTNERS = ["Vercel","GitHub","Supabase","Resend","Tailwind CSS","Prisma","Neon","Clerk","Stripe","PlanetScale","Cloudflare","Railway"];
const Ticker = ({ dir = 1 }) => (
  <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "13px 0", position: "relative" }}>
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to right, var(--bg), transparent)", zIndex: 1, pointerEvents: "none" }} />
    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to left, var(--bg), transparent)", zIndex: 1, pointerEvents: "none" }} />
    <div style={{ display: "flex", gap: "60px", width: "max-content", animation: `ticker ${dir > 0 ? 28 : 22}s linear infinite ${dir < 0 ? "reverse" : ""}` }}>
      {[...PARTNERS, ...PARTNERS].map((p, i) => (
        <span key={i} style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.14em", color: i % 4 === 0 ? "rgba(200,255,0,0.75)" : "rgba(255,255,255,0.45)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          {i % 4 === 0 ? "◆" : "·"} {p}
        </span>
      ))}
    </div>
  </div>
);

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
const SH = ({ title, label }) => (
  <div>
    {label && <div style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.18em", color: "rgba(200,255,0,0.85)", marginBottom: "12px", textTransform: "uppercase" }}>{label}</div>}
    <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(52px, 7vw, 88px)", lineHeight: 0.92 }}>{title}</h2>
  </div>
);

// ─── AGENDA ITEM ──────────────────────────────────────────────────────────────
const AgendaItem = ({ time, label, desc }) => {
  const [h, sH] = useState(false);
  return (
    <div onMouseEnter={() => sH(true)} onMouseLeave={() => sH(false)}
      style={{ background: h ? "rgba(200,255,0,0.03)" : "transparent", borderLeft: `2px solid ${h ? "var(--acid)" : "rgba(255,255,255,0.1)"}`, padding: "26px 28px", transition: "all 0.2s", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.14em", color: "var(--acid)" }}>{time}</div>
      <div style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: "16px", color: "#fff", marginTop: "7px" }}>{label}</div>
      <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,0.55)", marginTop: "7px", lineHeight: 1.8 }}>{desc}</div>
    </div>
  );
};

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
const FaqItem = ({ q, a }) => {
  const [o, sO] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--border)", padding: "18px 0" }}>
      <div onClick={() => sO(!o)} style={{ display: "flex", justifyContent: "space-between", cursor: "pointer", alignItems: "center" }}>
        <span style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: "15px", color: o ? "var(--acid)" : "#fff", transition: "color 0.2s" }}>{q}</span>
        <span style={{ fontFamily: "'Bebas Neue'", fontSize: "22px", color: "var(--acid)", transform: o ? "rotate(45deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: "16px" }}>+</span>
      </div>
      {o && <p style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "12px", lineHeight: 1.9 }}>{a}</p>}
    </div>
  );
};

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
const LandingPage = ({ onRegister }) => {
  const [heroHover, setHeroHover] = useState(false);

  const agenda = [
    { time: "10:00", label: "Opening Ceremony",        desc: "Kick-off with StartupFactory + sponsor intros." },
    { time: "10:30", label: "Hack Begins",              desc: "48h clock starts. Ship anything — rules: it must work." },
    { time: "11:00", label: "Workshop: AI Stack 2026", desc: "v0 + Cursor + Bolt + Vercel live demo." },
    { time: "14:00", label: "Midpoint Check-in",       desc: "Progress demos, feedback rounds, vibes check." },
    { time: "DAY 2", label: "Showcase Sprint",         desc: "90-second demos — running code only, no slides." },
    { time: "16:00", label: "Jury & Awards",           desc: "Community vote + expert panel. Cash + credits prizes." },
  ];
  const prizes = [
    { place: "1ST",       amount: "€3,000", desc: "Cash + €2K cloud credits + StartupFactory feature" },
    { place: "2ND",       amount: "€1,500", desc: "Cash + €1K cloud credits" },
    { place: "3RD",       amount: "€750",   desc: "Cash + swag bundle" },
    { place: "BEST SOLO", amount: "€500",   desc: "For solo builders shipping end-to-end" },
  ];
  const faqs = [
    { q: "Who can join?",          a: "Anyone who can write code. Solo or teams up to 4. Students especially welcome." },
    { q: "Remote or in-person?",   a: "In-person in Ruse, Bulgaria. Remote hacking track for international builders." },
    { q: "What stack can I use?",  a: "Anything goes. We love v0, Cursor, Supabase, Vercel — but not required." },
    { q: "Do I need a team?",      a: "No. Team matching 30 mins before kickoff. Solo builders always welcome." },
    { q: "Is it really free?",     a: "Yes. Free ticket. Food and caffeine covered by StartupFactory." },
    { q: "What is vibe coding?",   a: "Describe → AI generates → you ship. Speed over perfection. If it vibes, it lives." },
  ];
  const sponsors = ["Vercel","Supabase","GitHub","Resend","Clerk","Stripe","Neon","Tailwind CSS","Prisma","PlanetScale","Cloudflare","Railway"];

  return (
    <div style={{ background: "var(--bg)" }}>
      <Nav onRegister={onRegister} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        onMouseEnter={() => setHeroHover(true)}
        onMouseLeave={() => setHeroHover(false)}
        style={{
          position: "relative", minHeight: "100vh",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", overflow: "hidden", padding: "120px 48px 80px",
        }}>
        {/* WebGL dithering shader background */}
        <DitheringBg hovered={heroHover} />

        {/* Subtle dot grid overlay underneath shader */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(200,255,0,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px", zIndex: 0 }} />

        {/* Vignette — pulls focus to center */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          background: "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 10%, rgba(5,5,5,0.7) 65%, rgba(5,5,5,0.97) 100%)" }} />

        {/* CONTENT */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1000px" }}>
          <div style={{ animation: "fadeIn 0.5s 0.2s both" }}>
            <DecryptText text="26 APRIL 2026  ·  RUSE, BULGARIA  ·  48H HACKATHON" speed={30} delay={300} />
          </div>

          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(80px, 14vw, 195px)", lineHeight: 0.88, letterSpacing: "-0.01em", marginTop: "18px" }}>
            <span className="glitch-1" style={{ display: "block", color: "#fff", animation: "fadeUp 0.7s 0.5s both ease, glitch 8s 1.5s ease infinite" }}>VIBE TO</span>
            <span className="glitch-2" style={{ display: "block", color: "var(--acid)", animation: "fadeUp 0.7s 0.65s both ease, glitch2 11s 4s ease infinite" }}>PRODUCTION</span>
          </h1>

          <div style={{ fontFamily: "'Instrument Serif'", fontStyle: "italic", fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.45)", marginTop: "14px", animation: "fadeUp 0.6s 0.95s both ease" }}>
            — a hackathon by StartupFactory
          </div>

          <p style={{ fontFamily: "var(--mono)", fontSize: "clamp(11px, 1.1vw, 13px)", lineHeight: 1.95, color: "rgba(255,255,255,0.42)", maxWidth: "560px", margin: "24px auto 0", animation: "fadeUp 0.6s 1.1s both ease" }}>
            48 hours. Real products. AI-assisted everything. The world&apos;s first hackathon where your AI stack is the feature, not a cheat code.
          </p>

          <div style={{ display: "flex", gap: "14px", marginTop: "44px", justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.6s 1.25s both ease" }}>
            <button onClick={onRegister}
              style={{ fontFamily: "'Bebas Neue'", fontSize: "18px", letterSpacing: "0.07em", background: "var(--acid)", color: "#000", border: "none", padding: "16px 44px", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="var(--acid)"; e.currentTarget.style.transform=""; }}
            >GET YOUR TICKET</button>
            <button
              style={{ fontFamily: "'Bebas Neue'", fontSize: "18px", letterSpacing: "0.07em", background: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.14)", padding: "16px 44px", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="var(--acid)"; e.currentTarget.style.color="var(--acid)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"; e.currentTarget.style.color="rgba(255,255,255,0.5)"; }}
            >SEE AGENDA</button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "60px", marginTop: "72px", justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.6s 1.45s both ease" }}>
            {[["600+","BUILDERS"],["48H","NON-STOP"],["€6K+","IN PRIZES"],["FREE","ENTRY"]].map(([v,l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: "48px", color: "var(--acid)", lineHeight: 1 }}>{v}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.55)", marginTop: "6px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "1px", height: "44px", background: "linear-gradient(to bottom, transparent, rgba(200,255,0,0.4), transparent)", animation: "fadeUp 0.5s 2s both" }} />
        </div>
      </section>

      {/* ── ORGANIZER + PARTNERS ─────────────────────────────────────────── */}
      <section style={{ padding: "56px 48px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", gap: "52px", flexWrap: "wrap" }}>
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", marginBottom: "8px", textTransform: "uppercase" }}>Organized by</div>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: "34px", letterSpacing: "0.04em", color: "var(--acid)" }}>STARTUPFACTORY</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,0.45)", marginTop: "4px" }}>Ruse Innovation Hub · Building founders since 2018</div>
          </div>
          <div style={{ width: "1px", alignSelf: "stretch", background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: "200px", overflow: "hidden" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", marginBottom: "12px", textTransform: "uppercase" }}>Technology partners</div>
            <Ticker />
          </div>
        </div>
      </section>

      {/* ── AGENDA ───────────────────────────────────────────────────────── */}
      <section id="agenda" style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SH label="26 APRIL 2026 · RUSE, BG" title="AGENDA" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", marginTop: "48px" }}>
            {agenda.map((a, i) => <AgendaItem key={i} {...a} />)}
          </div>
        </div>
      </section>

      <Ticker dir={-1} />

      {/* ── PRIZES ───────────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 48px", background: "var(--card)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SH label="TOTAL POOL €5,750" title={<>PRIZES <span style={{ color: "var(--acid)" }}>&amp;</span> REWARDS</>} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "var(--border)", marginTop: "48px" }}>
            {prizes.map((p, i) => (
              <div key={i} style={{ background: "var(--bg)", padding: "32px 24px", borderTop: `3px solid ${["var(--acid)","rgba(255,255,255,0.45)","rgba(255,255,255,0.25)","rgba(255,255,255,0.12)"][i]}` }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.18em", color: i===0 ? "var(--acid)" : "rgba(255,255,255,0.55)" }}>{p.place}</div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: "48px", color: i===0 ? "var(--acid)" : "#fff", lineHeight: 1, marginTop: "8px" }}>{p.amount}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,0.55)", marginTop: "10px", lineHeight: 1.8 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPONSORS — flat grid, no tier labels ─────────────────────────── */}
      <section id="sponsors" style={{ padding: "100px 48px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SH label="MAKING THIS POSSIBLE" title="SPONSORS" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "52px" }}>
            {sponsors.map(name => (
              <div key={name}
                style={{ fontFamily: "'Bebas Neue'", fontSize: "18px", letterSpacing: "0.06em", padding: "14px 28px", border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.7)", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(200,255,0,0.5)"; e.currentTarget.style.color="var(--acid)"; e.currentTarget.style.background="rgba(200,255,0,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"; e.currentTarget.style.color="rgba(255,255,255,0.7)"; e.currentTarget.style.background="rgba(255,255,255,0.03)"; }}
              >{name}</div>
            ))}
          </div>
          {/* Sponsor CTA */}
          <div style={{ marginTop: "48px", padding: "26px 32px", border: "1px solid rgba(200,255,0,0.1)", background: "rgba(200,255,0,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <div style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: "15px" }}>Interested in sponsoring?</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>Get in front of 600+ builders. Limited spots available.</div>
            </div>
            <button style={{ fontFamily: "'Bebas Neue'", fontSize: "15px", letterSpacing: "0.08em", background: "transparent", color: "var(--acid)", border: "1px solid rgba(200,255,0,0.3)", padding: "12px 28px", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(200,255,0,0.07)"}
              onMouseLeave={e => e.currentTarget.style.background="transparent"}
            >BECOME A SPONSOR →</button>
          </div>
        </div>
      </section>

      {/* ── FAQ — now after sponsors ─────────────────────────────────────── */}
      <section id="faq" style={{ padding: "100px 48px", background: "var(--card)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <SH title="FAQ" />
          <div style={{ marginTop: "48px" }}>{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
        </div>
      </section>

      {/* ── CTA — animated ───────────────────────────────────────────────── */}
      <CTASection onRegister={onRegister} />

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <Footer onRegister={onRegister} />
    </div>
  );
};

// ─── CTA SECTION ─────────────────────────────────────────────────────────────
function CTASection({ onRegister }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ padding: "140px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      {/* Grid bg subtle */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(200,255,0,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.22em", color: "var(--acid)", marginBottom: "28px",
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.6s 0.1s ease",
        }}>◆ LIMITED SPOTS REMAINING ◆</div>

        <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(56px, 10vw, 130px)", lineHeight: 0.88 }}>
          <div style={{
            color: "rgba(255,255,255,0.12)",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(40px) skewY(3deg)",
            transition: "all 0.7s 0.25s cubic-bezier(0.16,1,0.3,1)",
          }}>STOP OVERTHINKING.</div>
          <div style={{
            color: "var(--acid)",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(40px) skewY(3deg)",
            transition: "all 0.7s 0.45s cubic-bezier(0.16,1,0.3,1)",
          }}>START SHIPPING.</div>
        </div>

        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px)",
          transition: "all 0.6s 0.8s ease",
        }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "24px", letterSpacing: "0.12em" }}>
            26 April 2026 · Ruse, Bulgaria · 48 hours · Free entry
          </p>
          <button onClick={onRegister}
            style={{ fontFamily: "'Bebas Neue'", fontSize: "20px", letterSpacing: "0.08em", background: "var(--acid)", color: "#000", border: "none", padding: "20px 72px", cursor: "pointer", marginTop: "40px", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.transform="scale(1.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="var(--acid)"; e.currentTarget.style.transform=""; }}
          >REGISTER NOW — IT&apos;S FREE</button>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ onRegister }) {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--card)" }}>
      {/* Main footer body */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "56px 48px 40px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px" }}>

        {/* Brand column */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "14px" }}>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: "28px", color: "var(--acid)" }}>VIBE</span>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: "28px", color: "#fff" }}>RUSE</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,0.45)", marginLeft: "4px" }}>&apos;26</span>
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)", lineHeight: 2 }}>
            <div>26 April 2026 — Ruse, Bulgaria</div>
            <div>A 48-hour hackathon for builders</div>
            <div style={{ marginTop: "8px", color: "rgba(255,255,255,0.35)" }}>Organized by StartupFactory</div>
          </div>
          <button onClick={onRegister}
            style={{ fontFamily: "'Bebas Neue'", fontSize: "14px", letterSpacing: "0.07em", background: "var(--acid)", color: "#000", border: "none", padding: "10px 24px", cursor: "pointer", marginTop: "20px", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background="#fff"}
            onMouseLeave={e => e.currentTarget.style.background="var(--acid)"}
          >REGISTER FREE →</button>
        </div>

        {/* Event */}
        <div>
          <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(200,255,0,0.8)", textTransform: "uppercase", marginBottom: "16px" }}>Event</div>
          {[
            ["Date", "26 April 2026"],
            ["Duration", "48 hours"],
            ["Location", "Ruse, BG"],
            ["Format", "In-person"],
            ["Entry", "Free"],
          ].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>{l}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,0.75)", letterSpacing: "0.06em" }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Links */}
        <div>
          <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(200,255,0,0.8)", textTransform: "uppercase", marginBottom: "16px" }}>Navigate</div>
          {["Agenda","Prizes","Sponsors","FAQ","Register"].map(l => (
            <div key={l} style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", marginBottom: "12px", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--acid)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
            >{l}</div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(200,255,0,0.8)", textTransform: "uppercase", marginBottom: "16px" }}>Contact</div>
          {[
            ["Web", "startupfactory.bg"],
            ["Email", "hi@startup.bg"],
            ["X / Twitter", "@StartupFactoryBG"],
            ["GitHub", "@startupfactory"],
          ].map(([l, v]) => (
            <div key={l} style={{ marginBottom: "14px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.14em", textTransform: "uppercase" }}>{l}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(200,255,0,0.7)", marginTop: "3px", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--acid)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(200,255,0,0.7)"}
              >{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "18px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", maxWidth: "1100px", margin: "0 auto" }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>© 2026 StartupFactory · Vibe Ruse Hackathon</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>Built with vibes.</span>
      </div>
    </footer>
  );
}

// ─── REGISTRATION ─────────────────────────────────────────────────────────────
const inp = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", padding: "13px 16px", color: "#fff", fontFamily: "var(--mono)", fontSize: "13px", outline: "none", transition: "border-color 0.2s", letterSpacing: "0.02em" };
const lbl = { display: "block", fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "8px" };
const focA = e => e.target.style.borderColor = "var(--acid)";
const focB = e => e.target.style.borderColor = "rgba(255,255,255,0.12)";

function getGithubAvatarUrl(handle) {
  if (!handle) return "";
  return `https://github.com/${handle.replace(/^@/, "")}.png`;
}

const RegisterPage = ({ onSubmit }) => {
  const [loading, setLd] = useState(false);
  const [form, setForm]  = useState({ name: "", handle: "", avatarUrl: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const canSubmit = form.name.trim() && form.handle.trim();

  const fetchAvatar = () => {
    const h = form.handle.replace(/^@/, "").trim();
    if (h) set("avatarUrl", getGithubAvatarUrl(h));
  };

  const doSubmit = () => {
    if (!canSubmit) return;
    setLd(true);
    setTimeout(() => onSubmit({ ...form, ticketNum: Math.floor(10000 + Math.random() * 89999) }), 1300);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", position: "relative" }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(200,255,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,1) 1px, transparent 1px)", backgroundSize: "48px 48px", opacity: 0.022, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", color: "var(--acid)", marginBottom: "10px" }}>VIBE RUSE HACKATHON &apos;26</div>
          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: "54px", lineHeight: 0.92 }}>
            CLAIM YOUR <span style={{ color: "var(--acid)" }}>TICKET</span>
          </h1>
          <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "10px", letterSpacing: "0.08em" }}>26 APRIL 2026 · RUSE, BULGARIA · FREE</p>
        </div>

        <div style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.1)", padding: "32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--acid), transparent)" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Name */}
            <div>
              <label style={lbl}>Full Name</label>
              <input style={inp} value={form.name} placeholder="Ada Lovelace"
                onChange={e => set("name", e.target.value)}
                onFocus={focA} onBlur={focB}
                onKeyDown={e => e.key === "Enter" && doSubmit()}
              />
            </div>

            {/* GitHub handle + fetch button */}
            <div>
              <label style={lbl}>GitHub Handle</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <input style={{ ...inp, flex: 1 }} value={form.handle} placeholder="@username"
                  onChange={e => set("handle", e.target.value)}
                  onFocus={focA} onBlur={focB}
                  onKeyDown={e => e.key === "Enter" && fetchAvatar()}
                />
                <button onClick={fetchAvatar} disabled={!form.handle.trim()}
                  style={{
                    fontFamily: "var(--mono)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                    background: form.handle.trim() ? "var(--acid)" : "rgba(200,255,0,0.15)", color: "#000", border: "none",
                    padding: "0 20px", cursor: form.handle.trim() ? "pointer" : "not-allowed", flexShrink: 0, transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { if (form.handle.trim()) e.currentTarget.style.background = "#fff"; }}
                  onMouseLeave={e => e.currentTarget.style.background = form.handle.trim() ? "var(--acid)" : "rgba(200,255,0,0.15)"}
                >FETCH</button>
              </div>

              {/* Preview card — uses AvatarCircle so fallback is built-in CSS initials */}
              {form.handle.trim() && (
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "12px", padding: "12px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <AvatarCircle name={form.name || form.handle} avatarUrl={form.avatarUrl} size={42} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: "14px", color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{form.name || "—"}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,0.45)", marginTop: "3px" }}>
                      <GHIcon />{form.handle.replace(/^@/, "")}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <button onClick={doSubmit} disabled={!canSubmit || loading}
              style={{
                fontFamily: "'Bebas Neue'", fontSize: "19px", letterSpacing: "0.08em",
                background: canSubmit && !loading ? "var(--acid)" : "rgba(200,255,0,0.15)",
                color: "#000", border: "none", padding: "16px", marginTop: "4px",
                cursor: canSubmit && !loading ? "pointer" : "not-allowed", width: "100%", transition: "all 0.2s",
              }}
              onMouseEnter={e => { if (canSubmit && !loading) e.currentTarget.style.background = "#fff"; }}
              onMouseLeave={e => { if (canSubmit && !loading) e.currentTarget.style.background = "var(--acid)"; }}
            >{loading ? "GENERATING YOUR TICKET..." : "GET MY TICKET ✦"}</button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "14px", fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.1em" }}>
          FREE · 26 APRIL 2026 · RUSE, BULGARIA · BY STARTUPFACTORY
        </div>
      </div>
    </div>
  );
};

// ─── ENCRYPT ──────────────────────────────────────────────────────────────────
function encryptTicket(d) {
  try {
    const payload = `vr2026:${d.handle.replace("@","")}:${d.ticketNum}`;
    const bytes = new TextEncoder().encode(payload);
    let bin = ""; bytes.forEach(b => bin += String.fromCharCode(b));
    return btoa(bin).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"");
  } catch { return String(d.ticketNum); }
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
const XIcon  = () => <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const LIIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const FBIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const DLIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;

// ─── TICKET PAGE ─────────────────────────────────────────────────────────────
const TicketPage = ({ data, onBack }) => {
  const [copied, setCopied] = useState(false);

  const encId = useMemo(() => encryptTicket(data), [data]);
  const url   = `https://viberusehack.bg/tickets?u=${encId}`;
  const msg   = `Just claimed my ticket for Vibe Ruse Hackathon '26 — 26 April, Ruse, Bulgaria! 🚀`;

  const share = p => {
    const u = {
      x:  `https://twitter.com/intent/tweet?text=${encodeURIComponent(msg)}&url=${encodeURIComponent(url)}`,
      li: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };
    window.open(u[p], "_blank");
  };
  const copyLink = () => {
    navigator.clipboard?.writeText(`${msg}\n${url}`).catch(()=>{});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="no-select"
      style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", overflow: "hidden", position: "relative" }}
    >
      {/* Grid bg */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(circle, rgba(200,255,0,0.13) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse 55% 55% at 50% 45%, rgba(200,255,0,0.025) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", marginBottom: "32px", animation: "fadeUp 0.5s ease both" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.22em", color: "var(--acid)", marginBottom: "12px" }}>✦ TICKET CONFIRMED ✦</div>
        <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(38px, 6vw, 64px)", lineHeight: 0.93 }}>
          YOU&apos;RE IN,&nbsp;<span style={{ color: "var(--acid)" }}>{data.name.split(" ")[0].toUpperCase()}</span>
        </h1>
        <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "10px", letterSpacing: "0.12em" }}>
          HOVER OVER YOUR TICKET TO INTERACT
        </p>
      </div>

      {/* Ticket — tilt on hover only */}
      <div style={{ position: "relative", zIndex: 1, animation: "fadeUp 0.6s 0.15s ease both" }}>
        <TicketVisual data={data} interactive={true} />
      </div>

      {/* Share */}
      <div style={{ position: "relative", zIndex: 1, marginTop: "40px", textAlign: "center", animation: "fadeUp 0.6s 0.35s ease both" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>SHARE YOUR TICKET</div>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { icon: <XIcon/>,  label: "X",        fn: ()=>share("x"),  tint: "rgba(255,255,255,0.05)" },
            { icon: <LIIcon/>, label: "LinkedIn",  fn: ()=>share("li"), tint: "rgba(10,102,194,0.12)" },
            { icon: <FBIcon/>, label: "Facebook",  fn: ()=>share("fb"), tint: "rgba(24,119,242,0.12)" },
            { icon: <DLIcon/>, label: "Download",  fn: () => alert("html2canvas → PNG in production"), tint: "rgba(255,255,255,0.04)" },
            { icon: null, label: copied ? "✓ Copied!" : "Copy Link", fn: copyLink, tint: copied ? "rgba(200,255,0,0.1)" : "rgba(255,255,255,0.04)" },
          ].map(({ icon, label, fn, tint }) => {
            const isCopy = label.includes("Cop") || label.includes("✓");
            return (
              <button key={label} onClick={fn}
                style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: "7px", background: tint, border: `1px solid ${isCopy && copied ? "rgba(200,255,0,0.35)" : "rgba(255,255,255,0.1)"}`, color: isCopy && copied ? "var(--acid)" : "rgba(255,255,255,0.55)", padding: "10px 18px", cursor: "pointer", transition: "all 0.2s", textTransform: "uppercase", whiteSpace: "nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(200,255,0,0.35)"; e.currentTarget.style.color="var(--acid)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = isCopy && copied ? "rgba(200,255,0,0.35)" : "rgba(255,255,255,0.1)"; e.currentTarget.style.color = isCopy && copied ? "var(--acid)" : "rgba(255,255,255,0.55)"; }}
              >{icon}{label}</button>
            );
          })}
        </div>
        <div style={{ marginTop: "18px", fontFamily: "var(--mono)", fontSize: "9px" }}>
          <span style={{ color: "rgba(255,255,255,0.25)" }}>viberusehack.bg/tickets?u=</span>
          <span style={{ color: "rgba(200,255,0,0.5)" }}>{encId.slice(0,16)}…</span>
        </div>
        <button onClick={onBack} style={{ marginTop: "26px", fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.14em", background: "transparent", border: "none", color: "rgba(255,255,255,0.35)", cursor: "pointer", textTransform: "uppercase", textDecoration: "underline" }}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]         = useState("landing");
  const [ticketData, setTicket] = useState(null);
  return (
    <>
      <GlobalStyles />
      {page === "landing"  && <LandingPage onRegister={() => setPage("register")} />}
      {page === "register" && <RegisterPage onSubmit={d => { setTicket(d); setPage("ticket"); }} />}
      {page === "ticket"   && <TicketPage data={ticketData} onBack={() => setPage("landing")} />}
    </>
  );
}
