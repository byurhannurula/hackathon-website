export const PARTNERS = [
  "Vercel",
  "GitHub",
  "Supabase",
  "Resend",
  "Tailwind CSS",
  "Prisma",
  "Neon",
  "Clerk",
  "Stripe",
  "PlanetScale",
  "Cloudflare",
  "Railway",
];

interface TickerProps {
  dir?: number;
}

export const Ticker = ({ dir = 1 }: TickerProps) => (
  <div
    style={{
      overflow: "hidden",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      padding: "13px 0",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "60px",
        background: "linear-gradient(to right, var(--bg), transparent)",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "60px",
        background: "linear-gradient(to left, var(--bg), transparent)",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        display: "flex",
        gap: "60px",
        width: "max-content",
        animation: `ticker ${dir > 0 ? 28 : 22}s linear infinite ${dir < 0 ? "reverse" : ""
          }`,
      }}
    >
      {[...PARTNERS, ...PARTNERS].map((p, i) => (
        <span
          key={i}
          style={{
            fontFamily: "var(--font-mono-google)",
            fontSize: "11px",
            letterSpacing: "0.14em",
            color:
              i % 4 === 0 ? "rgba(200,255,0,0.75)" : "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {i % 4 === 0 ? "◆" : "·"} {p}
        </span>
      ))}
    </div>
  </div>
);
