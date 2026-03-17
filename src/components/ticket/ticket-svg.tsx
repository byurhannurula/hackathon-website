"use client";

// fillRule="evenodd" bakes notch circles into the path.
// Separator at x=580 out of 720 viewBox (80.5%).
// Gradient border: acid → cyan → purple → red → acid.

export function TicketSVG() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 720 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, display: "block" }}
    >
      <defs>
        {/* Rainbow border gradient */}
        <linearGradient
          id="border-grad"
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

        {/* Clip path matching inner dark fill */}
        <clipPath id="inner-clip">
          <path d="M23 7C13.61 7 6 14.61 6 24V125.8C22.76 128.35 35.5 143.6 35.5 160C35.5 176.4 22.76 191.65 6 194.2V296C6 305.39 13.61 313 23 313H697C706.39 313 714 305.39 714 296V194.2C697.24 191.65 684.5 176.4 684.5 160C684.5 143.6 697.24 128.35 714 125.8V24C714 14.61 706.39 7 697 7H23Z" />
        </clipPath>
      </defs>

      {/* ── OUTER SHAPE (border fill, 7px thick) ── */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 0C9.85 0 0 9.85 0 22V130C16.57 130 30 143.43 30 160C30 176.57 16.57 190 0 190V298C0 310.15 9.85 320 22 320H698C710.15 320 720 310.15 720 298V190C703.43 190 690 176.57 690 160C690 143.43 703.43 130 720 130V22C720 9.85 710.15 0 698 0H22Z"
        fill="url(#border-grad)"
      />

      {/* ── INNER DARK FILL (7px inset) ── */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 7C13.61 7 6 14.61 6 24V125.8C22.76 128.35 35.5 143.6 35.5 160C35.5 176.4 22.76 191.65 6 194.2V296C6 305.39 13.61 313 23 313H697C706.39 313 714 305.39 714 296V194.2C697.24 191.65 684.5 176.4 684.5 160C684.5 143.6 697.24 128.35 714 125.8V24C714 14.61 706.39 7 697 7H23Z"
        fill="#080808"
      />

      {/* ── DASHED SEPARATOR at x=580 ── */}
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
  );
}
