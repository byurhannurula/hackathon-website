import { Html, Head, Body, Container, Section, Text, Link, Hr } from "@react-email/components";

interface ApprovedEmailProps {
  fullName: string;
  ticketNumber: number;
  ticketId: string;
  siteUrl: string;
}

export function ApprovedEmail({ fullName, ticketNumber, ticketId, siteUrl }: ApprovedEmailProps) {
  const ticketUrl = `${siteUrl}/tickets/${ticketId}`;
  const numStr = String(ticketNumber).padStart(6, "0");

  return (
    <Html lang="bg">
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Oswald:wght@700&display=swap');
        `}</style>
      </Head>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>
              <span style={{ color: "#feee04" }}>RUSE</span> AI HACK
            </Text>
            <Text style={subtitle}>HACKATHON &apos;26</Text>
          </Section>

          <Hr style={divider} />

          {/* Badge */}
          <Section style={{ textAlign: "center" as const, padding: "24px 0 8px" }}>
            <Text style={badge}>ОДОБРЕНА РЕГИСТРАЦИЯ</Text>
          </Section>

          {/* Main content */}
          <Section style={content}>
            <Text style={greeting}>Здравей, {fullName}!</Text>
            <Text style={paragraph}>
              Поздравления! Твоята регистрация за <strong>RUSE AI HACK &apos;26</strong> беше
              одобрена. Ти си част от първия AI хакатон в Русе!
            </Text>
            <Text style={paragraph}>
              Подготви се за 48 часа интензивно кодене, AI предизвикателства и невероятна
              атмосфера. Ще работиш в екип, ще използваш най-новите AI инструменти и ще създадеш
              нещо от нулата за рекордно време.
            </Text>
            <Text style={paragraph}>
              Очакваме те на място — храна, напитки, кафе и добра енергия са осигурени. Ти
              просто донеси лаптопа си и ентусиазъм!
            </Text>
          </Section>

          {/* Ticket number */}
          <Section style={ticketBox}>
            <Text style={ticketLabel}>ТВОЯТ БИЛЕТ</Text>
            <Text style={ticketNum}>#{numStr}</Text>
          </Section>

          {/* Event details */}
          <Section style={content}>
            <Text style={detailsTitle}>ДЕТАЙЛИ ЗА СЪБИТИЕТО</Text>
            <Text style={detail}>24 - 26 април 2026</Text>
            <Text style={detail}>Русенски Университет, Русе</Text>
            <Text style={detail}>48-часов AI Хакатон</Text>
          </Section>

          {/* What to bring */}
          <Section style={content}>
            <Text style={detailsTitle}>КАКВО ДА НОСИШ</Text>
            <Text style={detail}>Лаптоп + зарядно</Text>
            <Text style={detail}>Слушалки</Text>
            <Text style={detail}>Настроена среда за разработка</Text>
          </Section>

          {/* CTA */}
          <Section style={{ textAlign: "center" as const, padding: "28px 0" }}>
            <Link href={ticketUrl} style={ctaButton}>
              ВИЖ БИЛЕТА СИ
            </Link>
          </Section>

          <Hr style={divider} />

          {/* Social links */}
          <Section style={socialBox}>
            <Text style={socialTitle}>СЛЕДИ НИ</Text>
            <Text style={socialLinksText}>
              <Link href="https://www.instagram.com/startup._.factory/" style={socialLink}>
                Instagram
              </Link>
              {" · "}
              <Link href="https://www.facebook.com/factorystartup" style={socialLink}>
                Facebook
              </Link>
              {" · "}
              <Link href={siteUrl} style={socialLink}>
                Website
              </Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>Организирано от Startup Factory</Text>
            <Text style={footerText}>
              Въпроси? Пиши ни на{" "}
              <Link href="mailto:info@startupfactory.bg" style={footerLink}>
                info@startupfactory.bg
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

ApprovedEmail.PreviewProps = {
  fullName: "John Doe",
  ticketNumber: 123456,
  ticketId: "abc123",
  siteUrl: "https://example.com",
} as ApprovedEmailProps;

export default ApprovedEmail;

// ─── Styles ──────────────────────────────────────────────────

const body = {
  backgroundColor: "#050505",
  fontFamily: "'JetBrains Mono', monospace",
  margin: 0,
  padding: 0,
  backgroundImage:
    "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

const container = {
  maxWidth: "520px",
  margin: "0 auto",
  padding: "40px 24px",
};

const header = {
  textAlign: "center" as const,
  padding: "0 0 16px",
};

const logo = {
  fontFamily: "'Oswald', sans-serif",
  fontSize: "32px",
  fontWeight: 700,
  color: "#ffffff",
  margin: 0,
  lineHeight: 1,
};

const subtitle = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "10px",
  letterSpacing: "0.2em",
  color: "rgba(255,255,255,0.4)",
  margin: "8px 0 0",
};

const divider = {
  borderColor: "rgba(255,255,255,0.07)",
  margin: "0",
};

const badge = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "11px",
  letterSpacing: "0.2em",
  color: "#feee04",
  margin: 0,
};

const content = {
  padding: "16px 0",
};

const greeting = {
  fontSize: "18px",
  fontWeight: 700,
  color: "#ffffff",
  margin: "0 0 16px",
};

const paragraph = {
  fontSize: "13px",
  lineHeight: "1.8",
  color: "rgba(255,255,255,0.7)",
  margin: "0 0 16px",
};

const ticketBox = {
  textAlign: "center" as const,
  backgroundColor: "rgba(254,238,4,0.06)",
  border: "1px solid rgba(254,238,4,0.15)",
  padding: "24px",
  margin: "8px 0",
};

const ticketLabel = {
  fontSize: "9px",
  letterSpacing: "0.18em",
  color: "rgba(255,255,255,0.4)",
  margin: "0 0 8px",
};

const ticketNum = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "28px",
  fontWeight: 700,
  color: "#feee04",
  margin: 0,
  letterSpacing: "0.12em",
};

const detailsTitle = {
  fontSize: "9px",
  letterSpacing: "0.18em",
  color: "rgba(254,238,4,0.7)",
  margin: "0 0 12px",
};

const detail = {
  fontSize: "13px",
  color: "rgba(255,255,255,0.6)",
  margin: "0 0 4px",
};

const ctaButton = {
  display: "inline-block",
  fontFamily: "'Oswald', sans-serif",
  fontSize: "16px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  backgroundColor: "#feee04",
  color: "#000000",
  padding: "14px 40px",
  textDecoration: "none",
};

const socialBox = {
  textAlign: "center" as const,
  backgroundColor: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  padding: "20px",
  margin: "16px 0 0",
};

const socialTitle = {
  fontSize: "9px",
  letterSpacing: "0.18em",
  color: "rgba(255,255,255,0.4)",
  margin: "0 0 12px",
};

const socialLinksText = {
  fontSize: "13px",
  margin: 0,
};

const socialLink = {
  color: "#feee04",
  textDecoration: "underline",
};

const footer = {
  textAlign: "center" as const,
  padding: "24px 0 0",
};

const footerText = {
  fontSize: "11px",
  color: "rgba(255,255,255,0.3)",
  margin: "0 0 6px",
};

const footerLink = {
  color: "#feee04",
  textDecoration: "underline",
};
