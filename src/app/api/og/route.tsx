import { ImageResponse } from "next/og";
import { decryptTicket } from "@/lib/utils";

export const runtime = "edge";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);

    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("t");
    const data = token ? decryptTicket(token) : null;

    const name = data?.name || "Attendee";
    const handle = data?.handle || "@handle";
    const ticketNum = data?.ticketNum || 0;
    const numStr = String(ticketNum).padStart(6, "0");

    // Load fonts
    const syneData = await loadGoogleFont("Syne", name + "0123456789");
    const bebasData = await loadGoogleFont("Bebas+Neue", "VIBE RUSE");
    const monoData = await loadGoogleFont("Space+Mono", handle + numStr + "NºHACKATHON '2626 APRIL 2026RUSE, BULGARIAby StartupFactory");

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
            position: "relative",
          }}
        >
          {/* Ticket Shape replicated with SVG */}
          <svg
            width="720"
            height="320"
            viewBox="0 0 720 320"
            style={{
              position: "absolute",
              top: "155px",
              left: "240px",
            }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22 0C9.85 0 0 9.85 0 22V144C16.57 144 30 157.43 30 174C30 190.57 16.57 204 0 204V298C0 310.15 9.85 320 22 320H698C710.15 320 720 310.15 720 298V204C703.43 204 690 190.57 690 174C690 157.43 703.43 144 720 144V22C720 9.85 710.15 0 698 0H22Z"
              fill="#C8FF00"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23 7C13.61 7 6 14.61 6 24V139.8C22.76 142.35 35.5 157.6 35.5 174C35.5 190.4 22.76 205.65 6 208.2V296C6 305.39 13.61 313 23 313H697C706.39 313 714 305.39 714 296V208.2C697.24 205.65 684.5 190.4 684.5 174C684.5 157.6 697.24 142.35 714 139.8V24C714 14.61 706.39 7 697 7H23Z"
              fill="#080808"
            />
            <line
              x1="548"
              y1="10"
              x2="548"
              y2="310"
              stroke="#333"
              strokeWidth="2"
              strokeDasharray="10 5"
            />
          </svg>

          {/* Ticket Content Container */}
          <div style={{
            width: "720px",
            height: "320px",
            display: "flex",
            position: "relative",
          }}>
            {/* Left Content */}
            <div style={{
              position: "absolute",
              top: "25px",
              left: "35px",
              display: "flex",
              flexDirection: "column",
              height: "270px",
              justifyContent: "space-between",
              width: "500px",
            }}>
              {/* Top: Name + Handle */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "32px",
                  backgroundColor: "#333",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #C8FF00",
                  overflow: "hidden"
                }}>
                  {data?.avatarUrl ? (
                    <img src={data.avatarUrl} style={{ width: "64px", height: "64px" }} />
                  ) : (
                    <span style={{ color: "#fff", fontSize: "24px", fontFamily: "Syne" }}>{name[0]}</span>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{
                    color: "#fff",
                    fontSize: "24px",
                    fontFamily: "Syne",
                    fontWeight: 800,
                  }}>
                    {name.toUpperCase()}
                  </span>
                  <span style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "14px",
                    fontFamily: "Space Mono",
                  }}>
                    {handle}
                  </span>
                </div>
              </div>

              {/* Bottom: Brand + Info */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: "25px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", fontFamily: "Bebas Neue", fontSize: "40px" }}>
                    <span style={{ color: "#C8FF00" }}>VIBE</span>
                    <span style={{ color: "#fff", marginLeft: "10px" }}>RUSE</span>
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Space Mono", fontSize: "10px", marginTop: "5px", letterSpacing: "2px" }}>
                    HACKATHON '26
                  </span>
                </div>
                <div style={{ width: "1px", height: "40px", backgroundColor: "rgba(255,255,255,0.2)" }} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ color: "#fff", fontFamily: "Syne", fontSize: "16px", fontWeight: 700 }}>
                    26 APRIL 2026
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Space Mono", fontSize: "12px" }}>
                    RUSE, BULGARIA
                  </span>
                </div>
              </div>
            </div>

            {/* Right Stub (Ticket Number) */}
            <div style={{
              position: "absolute",
              right: "45px",
              top: "0",
              height: "320px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div style={{
                transform: "rotate(-90deg)",
                display: "flex",
                alignItems: "baseline",
                gap: "10px",
              }}>
                <span style={{ color: "#C8FF00", fontFamily: "Space Mono", fontSize: "12px", fontWeight: 700 }}>Nº</span>
                <span style={{ color: "#fff", fontFamily: "Space Mono", fontSize: "28px", fontWeight: 700 }}>{numStr}</span>
              </div>
            </div>
          </div>
        </div>
      ),
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
    console.log(`OG Image Generation Error: ${e}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
