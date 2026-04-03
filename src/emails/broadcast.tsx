import { Html, Head, Body, Container, Section, Text, Link, Hr } from "@react-email/components";

interface BroadcastEmailProps {
  fullName: string;
  subject: string;
  body: string;
  siteUrl: string;
}

export function BroadcastEmail({ fullName, body, siteUrl }: BroadcastEmailProps) {
  const paragraphs = body.split("\n").filter((line) => line.trim() !== "");

  return (
    <Html lang="bg">
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Oswald:wght@700&display=swap');
        `}</style>
      </Head>
      <Body style={bodyStyle}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>
              <span style={{ color: "#feee04" }}>RUSE</span> AI HACK
            </Text>
            <Text style={subtitle}>HACKATHON &apos;26</Text>
          </Section>

          <Hr style={divider} />

          {/* Main content */}
          <Section style={content}>
            <Text style={greeting}>Здравей, {fullName}!</Text>
            {paragraphs.map((p, i) => (
              <Text key={i} style={paragraph}>
                {p}
              </Text>
            ))}
          </Section>

          {/* Social links */}
          <Section style={socialBox}>
            <Text style={socialTitle}>СЛЕДИ НИ</Text>
            <Text style={socialLinks}>
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

          <Hr style={divider} />

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

BroadcastEmail.PreviewProps = {
  fullName: "John Doe",
  subject: "Важно съобщение",
  body: "Това е тестово съобщение.\n\nВторо изречение тук.",
  siteUrl: "https://example.com",
} as BroadcastEmailProps;

export default BroadcastEmail;

// ─── Styles ──────────────────────────────────────────────────

const bodyStyle = {
  backgroundColor: "#050505",
  fontFamily: "'JetBrains Mono', monospace",
  margin: 0,
  padding: 0,
  backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
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

const content = {
  padding: "24px 0",
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

const socialBox = {
  textAlign: "center" as const,
  backgroundColor: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  padding: "20px",
  margin: "8px 0 24px",
};

const socialTitle = {
  fontSize: "9px",
  letterSpacing: "0.18em",
  color: "rgba(255,255,255,0.4)",
  margin: "0 0 12px",
};

const socialLinks = {
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
