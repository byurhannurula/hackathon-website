"use client";

interface TicketSVGProps {
  hasColor?: boolean;
  shineX?: number;
  shineY?: number;
  hovering?: boolean;
}

// fillRule="evenodd" bakes notch circles into the path.
// Separator at x=548 out of 720 viewBox (76.1%).
// Gradient border like Next.js conf: acid → cyan → pink → acid.
export function TicketSVG({
  hasColor,
  shineX = 50,
  shineY = 50,
  hovering = false,
}: TicketSVGProps) {
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
        <radialGradient id="sh-t" cx="50%" cy="50%" r="60%">
          <stop
            offset="0%"
            stopColor="white"
            stopOpacity={hovering ? "0.07" : "0"}
          />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── OUTER SHAPE (border fill, 7px thick) ── */}
      {/* Notches at x=0 center (y=160) and x=720 center */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 0C9.85 0 0 9.85 0 22V144C16.57 144 30 157.43 30 174C30 190.57 16.57 204 0 204V298C0 310.15 9.85 320 22 320H698C710.15 320 720 310.15 720 298V204C703.43 204 690 190.57 690 174C690 157.43 703.43 144 720 144V22C720 9.85 710.15 0 698 0H22Z"
        fill="url(#border-grad)"
      />

      {/* ── INNER DARK FILL (7px inset) ── */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 7C13.61 7 6 14.61 6 24V139.8C22.76 142.35 35.5 157.6 35.5 174C35.5 190.4 22.76 205.65 6 208.2V296C6 305.39 13.61 313 23 313H697C706.39 313 714 305.39 714 296V208.2C697.24 205.65 684.5 190.4 684.5 174C684.5 157.6 697.24 142.35 714 139.8V24C714 14.61 706.39 7 697 7H23Z"
        fill="#080808"
      />

      {/* Shimmer layer */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 7C13.61 7 6 14.61 6 24V139.8C22.76 142.35 35.5 157.6 35.5 174C35.5 190.4 22.76 205.65 6 208.2V296C6 305.39 13.61 313 23 313H697C706.39 313 714 305.39 714 296V208.2C697.24 205.65 684.5 190.4 684.5 174C684.5 157.6 697.24 142.35 714 139.8V24C714 14.61 706.39 7 697 7H23Z"
        fill="url(#sh-t)"
      />

      {/* ── DASHED SEPARATOR at x=548 ── */}
      <line
        x1="548"
        y1="10"
        x2="548"
        y2="310"
        stroke="#333"
        strokeWidth="1.5"
        strokeDasharray="7 5"
      />
    </svg>
  );
}
