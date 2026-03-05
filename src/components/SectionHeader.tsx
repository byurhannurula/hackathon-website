import { ReactNode } from "react";

interface SectionHeaderProps {
  title: ReactNode;
  label?: string;
}

export const SectionHeader = ({ title, label }: SectionHeaderProps) => (
  <div>
    {label && (
      <div
        style={{
          fontFamily: "var(--font-mono-google)",
          fontSize: "11px",
          letterSpacing: "0.18em",
          color: "rgba(200,255,0,0.85)",
          marginBottom: "12px",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    )}
    <h2
      style={{
        fontFamily: "var(--font-bebas)",
        fontSize: "clamp(52px, 7vw, 88px)",
        lineHeight: 0.92,
      }}
    >
      {title}
    </h2>
  </div>
);
