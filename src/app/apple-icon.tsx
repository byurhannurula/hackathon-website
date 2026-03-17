import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#050505",
        borderRadius: "36px",
      }}
    >
      <span
        style={{
          fontSize: "120px",
          fontWeight: 800,
          color: "#FEEE04",
          fontFamily: "system-ui, sans-serif",
          lineHeight: 1,
        }}
      >
        R
      </span>
    </div>,
    { ...size }
  );
}
