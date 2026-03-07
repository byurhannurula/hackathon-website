"use client";

// fillRule="evenodd" bakes notch circles into the path.
// Separator at x=548 out of 720 viewBox (76.1%).
// Gradient border like Next.js conf: acid → cyan → pink → acid.

interface TicketSVGProps {
  shineX?: number;
  shineY?: number;
  hovering?: boolean;
}

export function TicketSVG({ shineX = 50, shineY = 50, hovering = false }: TicketSVGProps) {
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
        {/* Vivid rainbow border gradient — always visible */}
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
        {/* Pearl shimmer follows cursor */}
        <radialGradient id="sh-t" cx={`${shineX}%`} cy={`${shineY}%`} r="50%">
          <stop offset="0%" stopColor="white" stopOpacity={hovering ? "0.09" : "0"} />
          <stop offset="50%" stopColor="white" stopOpacity={hovering ? "0.03" : "0"} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        {/* Outer glow behind the ticket border */}
        <filter id="border-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feComponentTransfer in="blur" result="glow">
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── OUTER GLOW (blurred copy of border shape) ── */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 0C9.85 0 0 9.85 0 22V130C16.57 130 30 143.43 30 160C30 176.57 16.57 190 0 190V298C0 310.15 9.85 320 22 320H698C710.15 320 720 310.15 720 298V190C703.43 190 690 176.57 690 160C690 143.43 703.43 130 720 130V22C720 9.85 710.15 0 698 0H22Z"
        fill="url(#border-grad)"
        filter="url(#border-glow)"
        opacity={hovering ? 0.7 : 0.3}
        style={{ transition: "opacity 0.3s ease" }}
      />

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

      {/* Shimmer layer — follows cursor */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 7C13.61 7 6 14.61 6 24V125.8C22.76 128.35 35.5 143.6 35.5 160C35.5 176.4 22.76 191.65 6 194.2V296C6 305.39 13.61 313 23 313H697C706.39 313 714 305.39 714 296V194.2C697.24 191.65 684.5 176.4 684.5 160C684.5 143.6 697.24 128.35 714 125.8V24C714 14.61 706.39 7 697 7H23Z"
        fill="url(#sh-t)"
        style={{ transition: "opacity 0.15s ease" }}
      />

      {/* ── DASHED SEPARATOR at x=548 ── */}
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
