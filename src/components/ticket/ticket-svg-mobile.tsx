"use client";

// Vertical mobile ticket SVG (330×480 viewBox).
// Notch semicircles on left/right at y=380. Separator at y=380.
// Same gradient + flowing animation as desktop.

export function TicketSVGMobile({ flowingBorder = true }: { flowingBorder?: boolean }) {
  // Notch radius = 20, center at y=380 → curves y=360 to y=400
  const outerPath =
    "M22 0C9.85 0 0 9.85 0 22V360C11.05 360 20 368.95 20 380C20 391.05 11.05 400 0 400V458C0 470.15 9.85 480 22 480H308C320.15 480 330 470.15 330 458V400C318.95 400 310 391.05 310 380C310 368.95 318.95 360 330 360V22C330 9.85 320.15 0 308 0H22Z";

  const innerPath =
    "M23 7C13.61 7 6 14.61 6 24V356.5C17.82 358.5 26.5 368.2 26.5 380C26.5 391.8 17.82 401.5 6 403.5V456C6 465.39 13.61 473 23 473H307C316.39 473 324 465.39 324 456V403.5C312.18 401.5 303.5 391.8 303.5 380C303.5 368.2 312.18 358.5 324 356.5V24C324 14.61 316.39 7 307 7H23Z";

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 330 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, display: "block" }}
    >
      <defs>
        <linearGradient
          id="border-grad-m"
          x1="0"
          y1="0"
          x2="330"
          y2="480"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#C8FF00" />
          <stop offset="30%" stopColor="#00FFB2" />
          <stop offset="60%" stopColor="#7B61FF" />
          <stop offset="85%" stopColor="#FF3355" />
          <stop offset="100%" stopColor="#C8FF00" />
          {flowingBorder && (
            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              from="0 165 240"
              to="360 165 240"
              dur="6s"
              repeatCount="indefinite"
            />
          )}
        </linearGradient>

        {flowingBorder && (
          <filter id="flow-glow-m" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      {/* Outer border fill */}
      <path fillRule="evenodd" clipRule="evenodd" d={outerPath} fill="url(#border-grad-m)" />

      {/* Inner dark fill */}
      <path fillRule="evenodd" clipRule="evenodd" d={innerPath} fill="#080808" />

      {/* Border glow */}
      {flowingBorder && (
        <path
          d={outerPath}
          fill="none"
          stroke="url(#border-grad-m)"
          strokeWidth="6"
          filter="url(#flow-glow-m)"
          opacity="0.5"
        />
      )}

      {/* Horizontal dashed separator between notches */}
      <line
        x1="28"
        y1="380"
        x2="302"
        y2="380"
        stroke="#333"
        strokeWidth="1.5"
        strokeDasharray="7 5"
      />
    </svg>
  );
}
