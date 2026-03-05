"use client";

interface FooterProps {
  onRegister: () => void;
}

export function Footer({ onRegister }: FooterProps) {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--card)",
      }}
    >
      {/* Main footer body */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "56px 48px 40px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "48px",
        }}
      >
        {/* Brand column */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "6px",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "28px",
                color: "var(--acid)",
              }}
            >
              VIBE
            </span>
            <span
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "28px",
                color: "#fff",
              }}
            >
              RUSE
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono-google)",
                fontSize: "11px",
                color: "rgba(255,255,255,0.45)",
                marginLeft: "4px",
              }}
            >
              &apos;26
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono-google)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 2,
            }}
          >
            <div>26 April 2026 — Ruse, Bulgaria</div>
            <div>A 48-hour hackathon for builders</div>
            <div style={{ marginTop: "8px", color: "rgba(255,255,255,0.35)" }}>
              Organized by StartupFactory
            </div>
          </div>
          <button
            onClick={onRegister}
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "14px",
              letterSpacing: "0.07em",
              background: "var(--acid)",
              color: "#000",
              border: "none",
              padding: "10px 24px",
              cursor: "pointer",
              marginTop: "20px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#fff")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--acid)")
            }
          >
            REGISTER FREE →
          </button>
        </div>

        {/* Event */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono-google)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "rgba(200,255,0,0.8)",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Event
          </div>
          {[
            ["Date", "26 April 2026"],
            ["Duration", "48 hours"],
            ["Location", "Ruse, BG"],
            ["Format", "In-person"],
            ["Entry", "Free"],
          ].map(([l, v]) => (
            <div
              key={l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono-google)",
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.08em",
                }}
              >
                {l}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono-google)",
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.75)",
                  letterSpacing: "0.06em",
                }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>

        {/* Links */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono-google)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "rgba(200,255,0,0.8)",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Navigate
          </div>
          {["Agenda", "Prizes", "Sponsors", "FAQ", "Register"].map((l) => (
            <div
              key={l}
              style={{
                fontFamily: "var(--font-mono-google)",
                fontSize: "11px",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.08em",
                marginBottom: "12px",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--acid)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
            >
              {l}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono-google)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "rgba(200,255,0,0.8)",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Contact
          </div>
          {[
            ["Web", "startupfactory.bg"],
            ["Email", "hi@startup.bg"],
            ["X / Twitter", "@StartupFactoryBG"],
            ["GitHub", "@startupfactory"],
          ].map(([l, v]) => (
            <div key={l} style={{ marginBottom: "14px" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono-google)",
                  fontSize: "9px",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {l}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono-google)",
                  fontSize: "11px",
                  color: "rgba(200,255,0,0.7)",
                  marginTop: "3px",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--acid)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(200,255,0,0.7)")
                }
              >
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "18px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono-google)",
            fontSize: "10px",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
          }}
        >
          © 2026 StartupFactory · Vibe Ruse Hackathon
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono-google)",
            fontSize: "10px",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.1em",
          }}
        >
          Built with vibes.
        </span>
      </div>
    </footer>
  );
}
