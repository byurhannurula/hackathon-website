import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

// OpenAI logo
export const IconBrain = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
  </svg>
);

// Claude/Anthropic spark
export const IconCpu = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L9.19 8.63 2 12l7.19 3.37L12 22l2.81-6.63L22 12l-7.19-3.37L12 2zm0 4.27L13.52 10 17 12l-3.48 2L12 17.73 10.48 14 7 12l3.48-2L12 6.27z" />
  </svg>
);

// Google Gemini
export const IconBot = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 24C12 24 12 12 24 12C12 12 12 0 12 0C12 0 12 12 0 12C12 12 12 24 12 24Z" />
  </svg>
);

// Sparkle / magic wand
export const IconSparkles = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z" />
    <path d="M20 3v4M22 5h-4" opacity="0.5" />
  </svg>
);

// Lightning / Bolt
export const IconZap = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

// Neural network / nodes
export const IconNetwork = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    {...props}
  >
    <circle cx="5" cy="6" r="2" fill="currentColor" />
    <circle cx="19" cy="6" r="2" fill="currentColor" />
    <circle cx="5" cy="18" r="2" fill="currentColor" />
    <circle cx="19" cy="18" r="2" fill="currentColor" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    <line x1="7" y1="7" x2="10" y2="10.5" />
    <line x1="17" y1="7" x2="14" y2="10.5" />
    <line x1="7" y1="17" x2="10" y2="13.5" />
    <line x1="17" y1="17" x2="14" y2="13.5" />
  </svg>
);

// Cursor / v0 style
export const IconOrbit = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35z" />
  </svg>
);

// Code brackets
export const IconLayers = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" opacity="0.4" />
  </svg>
);

// Terminal prompt
export const IconCode = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

// Chip / processor
export const IconBlocks = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    {...props}
  >
    <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" opacity="0.15" />
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <line x1="9" y1="6" x2="9" y2="2" />
    <line x1="15" y1="6" x2="15" y2="2" />
    <line x1="9" y1="22" x2="9" y2="18" />
    <line x1="15" y1="22" x2="15" y2="18" />
    <line x1="6" y1="9" x2="2" y2="9" />
    <line x1="6" y1="15" x2="2" y2="15" />
    <line x1="22" y1="9" x2="18" y2="9" />
    <line x1="22" y1="15" x2="18" y2="15" />
  </svg>
);

// Hugging Face style
export const IconMicrochip = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-2.5 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM8 15.5c0-.28.22-.5.5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z" />
  </svg>
);

// Graph / data flow
export const IconCircuit = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    {...props}
  >
    <path d="M3 12h4l3-9 4 18 3-9h4" />
  </svg>
);

// Cursor IDE — stylized cursor arrow in a rounded square
export const IconCursorIDE = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" opacity="0.12" />
    <path d="M7 5.5v13.3c0 .4.48.6.76.32l3.9-3.9a.45.45 0 0 1 .32-.13h5.07c.4 0 .6-.48.32-.76L7.76 4.72A.45.45 0 0 0 7 5.04z" />
  </svg>
);

// Windsurf IDE — wave/sail shape
export const IconWindsurf = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      d="M3 20c3-3 6-8 9-8s6 5 9 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M12 3v9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M12 3c2 1.5 5 4.5 5 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="12" cy="3" r="1.5" />
  </svg>
);

// Claude / Anthropic — simplified starburst
export const IconClaude = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2c.4 0 .7.3.7.7v4.6a.7.7 0 0 1-1.4 0V2.7c0-.4.3-.7.7-.7zm0 16c.4 0 .7.3.7.7v2.6a.7.7 0 0 1-1.4 0v-2.6c0-.4.3-.7.7-.7zm10-6a.7.7 0 0 1-.7.7h-4.6a.7.7 0 0 1 0-1.4h4.6c.4 0 .7.3.7.7zM7.3 12a.7.7 0 0 1-.7.7H2.7a.7.7 0 0 1 0-1.4h3.9c.4 0 .7.3.7.7zm12.4-5.7a.7.7 0 0 1 0 1l-3.3 3.3a.7.7 0 0 1-1-1l3.3-3.3a.7.7 0 0 1 1 0zM8.6 15.4a.7.7 0 0 1 0 1l-2.3 2.3a.7.7 0 1 1-1-1l2.3-2.3a.7.7 0 0 1 1 0zm11 5.3a.7.7 0 0 1-1 0l-3.3-3.3a.7.7 0 0 1 1-1l3.3 3.3a.7.7 0 0 1 0 1zM8.6 8.6a.7.7 0 0 1-1 0L5.3 6.3a.7.7 0 0 1 1-1l2.3 2.3a.7.7 0 0 1 0 1z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Gemini — four-pointed star (Google style)
export const IconGemini = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C12 0 14.5 9.5 24 12C14.5 14.5 12 24 12 24C12 24 9.5 14.5 0 12C9.5 9.5 12 0 12 0Z" />
  </svg>
);
