import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";
import { siteConfig } from "@/constants";

export const runtime = "edge";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);

    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

async function fetchImageAsDataUri(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
    const ct = res.headers.get("content-type") || "image/png";
    return `data:${ct};base64,${base64}`;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Look up ticket from Supabase by UUID
    let data: { name: string; handle: string; avatarUrl: string; ticketNum: number } | null = null;
    if (id) {
      const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const sbKey = process.env.SUPABASE_PRIVATE_KEY;
      if (sbUrl && sbKey) {
        try {
          const supabase = createClient(sbUrl, sbKey);
          const { data: row } = await supabase
            .from("registrations")
            .select("full_name, github_handle, avatar_url, ticket_number")
            .eq("ticket_id", id)
            .single();
          if (row) {
            const handle = (row.github_handle || "").replace(/^@/, "");
            data = {
              name: row.full_name,
              handle: handle ? `@${handle}` : "",
              avatarUrl: handle ? `https://github.com/${handle}.png` : row.avatar_url || "",
              ticketNum: row.ticket_number,
            };
          }
        } catch {
          /* ticket not found — fall through to generic OG */
        }
      }
    }

    const ev = siteConfig.event;

    // ── GENERIC OG (no ticket token) ──
    if (!data) {
      const genericText = `${ev.name}HACKATHON${ev.year}${ev.date}${ev.location}${ev.duration}by ${ev.organizer}${ev.prizesPool}${ev.buildersCount}BUILDERS IN PRIZESGET YOUR TICKET`;
      const bebasData = await loadGoogleFont("Bebas+Neue", genericText);
      const monoData = await loadGoogleFont("Space+Mono", genericText);
      const syneData = await loadGoogleFont("Syne", genericText);

      return new ImageResponse(
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#050505",
            position: "relative",
          }}
        >
          {/* Radial glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "900px",
              height: "600px",
              background:
                "radial-gradient(ellipse at center, rgba(200,255,0,0.08) 0%, transparent 70%)",
            }}
          />
          {/* Dot grid — SVG pattern (Satori can't render CSS repeating radial-gradient) */}
          <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 }}>
            <defs>
              <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="12" r="1.2" fill="rgba(200,255,0,0.14)" />
              </pattern>
            </defs>
            <rect width="1200" height="630" fill="url(#dots)" />
          </svg>
          {/* Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 80% 75% at 50% 50%, transparent 10%, rgba(5,5,5,0.65) 60%, rgba(5,5,5,0.95) 100%)",
            }}
          />
          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              zIndex: 1,
            }}
          >
            <span
              style={{
                fontFamily: "Space Mono",
                fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              {ev.date} · {ev.location} · {ev.duration}
            </span>
            <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
              <span
                style={{
                  fontFamily: "Bebas Neue",
                  fontSize: "140px",
                  color: "#C8FF00",
                  lineHeight: "0.95",
                }}
              >
                RUSE
              </span>
              <span
                style={{
                  fontFamily: "Bebas Neue",
                  fontSize: "140px",
                  color: "#fff",
                  lineHeight: "0.95",
                }}
              >
                AI HACK
              </span>
            </div>
            <span
              style={{
                fontFamily: "Space Mono",
                fontSize: "14px",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "6px",
                textTransform: "uppercase",
              }}
            >
              HACKATHON {ev.year}
            </span>
            <span
              style={{
                fontFamily: "Syne",
                fontSize: "16px",
                color: "rgba(255,255,255,0.55)",
                marginTop: "16px",
                fontStyle: "italic",
              }}
            >
              by {ev.organizer}
            </span>
            {/* Stats row */}
            <div
              style={{
                display: "flex",
                gap: "48px",
                marginTop: "32px",
              }}
            >
              {[
                [ev.buildersCount, "BUILDERS"],
                [ev.duration, "NON-STOP"],
                [ev.prizesPool, "IN PRIZES"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Bebas Neue",
                      fontSize: "36px",
                      color: "#C8FF00",
                    }}
                  >
                    {value}
                  </span>
                  <span
                    style={{
                      fontFamily: "Space Mono",
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "2px",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>,
        {
          width: 1200,
          height: 630,
          fonts: [
            { name: "Syne", data: syneData, style: "normal" as const, weight: 700 as const },
            { name: "Bebas Neue", data: bebasData, style: "normal" as const },
            { name: "Space Mono", data: monoData, style: "normal" as const },
          ],
        }
      );
    }

    // ── TICKET OG (with token) ──
    const name = data.name;
    const handle = data.handle;
    const ticketNum = data.ticketNum;
    const numStr = String(ticketNum).padStart(6, "0");

    // Pre-fetch avatar as data URI to avoid CORS issues in Edge runtime
    const avatarDataUri = data.avatarUrl ? await fetchImageAsDataUri(data.avatarUrl) : null;

    const allText =
      name +
      handle +
      numStr +
      `#HACKATHON${ev.year}${ev.date}${ev.location}by ${ev.organizer}0123456789`;
    const syneData = await loadGoogleFont("Syne", allText);
    const bebasData = await loadGoogleFont(
      "Bebas+Neue",
      `${ev.name.slice(0, 4)} ${ev.name.slice(4)}` + allText
    );
    const monoData = await loadGoogleFont("Space+Mono", allText);

    // Scale ticket to fill more of the 1200x630 canvas
    const tW = 900;
    const tH = 400;
    const tX = (1200 - tW) / 2;
    const tY = (630 - tH) / 2;
    const scale = tW / 720;

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
          position: "relative",
        }}
      >
        {/* Subtle radial glow behind ticket */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "500px",
            background:
              "radial-gradient(ellipse at center, rgba(200,255,0,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Ticket container — SVG + content aligned together */}
        <div
          style={{
            position: "absolute",
            top: `${tY}px`,
            left: `${tX}px`,
            width: `${tW}px`,
            height: `${tH}px`,
            display: "flex",
          }}
        >
          {/* Ticket SVG shape */}
          <svg
            width={tW}
            height={tH}
            viewBox="0 0 720 320"
            style={{ position: "absolute", inset: 0 }}
          >
            <defs>
              <linearGradient
                id="bg"
                x1="0"
                y1="0"
                x2="720"
                y2="320"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#C8FF00" />
                <stop offset="30%" stopColor="#00FFB2" />
                <stop offset="60%" stopColor="#7B61FF" />
                <stop offset="85%" stopColor="#FF3355" />
                <stop offset="100%" stopColor="#C8FF00" />
              </linearGradient>
            </defs>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22 0C9.85 0 0 9.85 0 22V130C16.57 130 30 143.43 30 160C30 176.57 16.57 190 0 190V298C0 310.15 9.85 320 22 320H698C710.15 320 720 310.15 720 298V190C703.43 190 690 176.57 690 160C690 143.43 703.43 130 720 130V22C720 9.85 710.15 0 698 0H22Z"
              fill="url(#bg)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23 7C13.61 7 6 14.61 6 24V125.8C22.76 128.35 35.5 143.6 35.5 160C35.5 176.4 22.76 191.65 6 194.2V296C6 305.39 13.61 313 23 313H697C706.39 313 714 305.39 714 296V194.2C697.24 191.65 684.5 176.4 684.5 160C684.5 143.6 697.24 128.35 714 125.8V24C714 14.61 706.39 7 697 7H23Z"
              fill="#080808"
            />
            <line
              x1="580"
              y1="10"
              x2="580"
              y2="310"
              stroke="#333"
              strokeWidth="1.5"
              strokeDasharray="7 5"
            />
          </svg>

          {/* Left content area */}
          <div
            style={{
              position: "absolute",
              top: `${48 * scale}px`,
              left: `${56 * scale}px`,
              bottom: `${48 * scale}px`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: `${520 * scale}px`,
            }}
          >
            {/* Top: Avatar + Name + Handle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: `${20 * scale}px`,
              }}
            >
              <div
                style={{
                  width: `${72 * scale}px`,
                  height: `${72 * scale}px`,
                  borderRadius: `${36 * scale}px`,
                  backgroundColor: "#222",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `${2 * scale}px solid #C8FF00`,
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                {avatarDataUri ? (
                  /* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */
                  <img
                    src={avatarDataUri}
                    width={72 * scale}
                    height={72 * scale}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span
                    style={{
                      color: "#C8FF00",
                      fontSize: `${30 * scale}px`,
                      fontFamily: "Syne",
                      fontWeight: 700,
                    }}
                  >
                    {name[0]?.toUpperCase()}
                  </span>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    color: "#fff",
                    fontSize: `${name.length > 20 ? 18 : 26}px`,
                    fontFamily: "Syne",
                    fontWeight: 800,
                  }}
                >
                  {name}
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: `${14 * scale}px`,
                    fontFamily: "Space Mono",
                    marginTop: `${4 * scale}px`,
                  }}
                >
                  {handle}
                </span>
              </div>
            </div>

            {/* Bottom: Brand + Date */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: `${25 * scale}px`,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    fontFamily: "Bebas Neue",
                    fontSize: `${44 * scale}px`,
                  }}
                >
                  <span style={{ color: "#C8FF00" }}>RUSE</span>
                  <span style={{ color: "#fff", marginLeft: `${10 * scale}px` }}>AI HACK</span>
                </div>
                <span
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: "Space Mono",
                    fontSize: `${10 * scale}px`,
                    letterSpacing: "2px",
                  }}
                >
                  HACKATHON &apos;26
                </span>
              </div>
              <div
                style={{
                  width: "1px",
                  height: `${42 * scale}px`,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    color: "#fff",
                    fontFamily: "Syne",
                    fontSize: `${17 * scale}px`,
                    fontWeight: 700,
                  }}
                >
                  {ev.date}
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "Space Mono",
                    fontSize: `${12 * scale}px`,
                    marginTop: `${2 * scale}px`,
                  }}
                >
                  {ev.location.toUpperCase()}
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "Space Mono",
                    fontSize: `${9 * scale}px`,
                    marginTop: `${6 * scale}px`,
                    letterSpacing: "1px",
                  }}
                >
                  by <span style={{ color: "rgba(200,255,0,0.7)" }}>{ev.organizer}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right stub — ticket number */}
          <div
            style={{
              position: "absolute",
              right: `${10 * scale}px`,
              top: "0",

              height: `${tH}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                transform: "rotate(-90deg)",
                display: "flex",
                alignItems: "baseline",
                gap: `${10 * scale}px`,
              }}
            >
              <span
                style={{
                  color: "#C8FF00",
                  fontFamily: "Space Mono",
                  fontSize: `${28 * scale}px`,
                  fontWeight: 700,
                }}
              >
                #
              </span>
              <span
                style={{
                  color: "#fff",
                  fontFamily: "Space Mono",
                  fontSize: `${30 * scale}px`,
                  fontWeight: 700,
                  letterSpacing: "3px",
                }}
              >
                {numStr}
              </span>
            </div>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Syne",
            data: syneData,
            style: "normal",
            weight: 700,
          },
          {
            name: "Bebas Neue",
            data: bebasData,
            style: "normal",
          },
          {
            name: "Space Mono",
            data: monoData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e) {
    console.error(`OG Image Generation Error: ${e}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
