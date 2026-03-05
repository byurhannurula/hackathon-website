"use client";

import { useEffect, useRef } from "react";

// Canvas-based dotted map — Europe land masses with Ruse, Bulgaria highlighted
export function DottedMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.offsetWidth || 1200;
    const H = canvas.offsetHeight || 600;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Bounds: lon [-13, 43], lat [34, 72]
    const LON_MIN = -13,
      LON_MAX = 43,
      LAT_MIN = 34,
      LAT_MAX = 72;
    const toX = (lon: number) => ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W;
    const toY = (lat: number) => H - ((lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * H;

    // Point-in-polygon (ray casting)
    const pip = (lon: number, lat: number, poly: number[][]) => {
      let inside = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [xi, yi] = poly[i];
        const [xj, yj] = poly[j];
        if (
          yi > lat !== yj > lat &&
          lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi
        )
          inside = !inside;
      }
      return inside;
    };

    // Simplified European land polygons [lon, lat]
    const MAINLAND = [
      [-8.9, 36],
      [-5.5, 36],
      [-1.8, 36.8],
      [2.5, 36.5],
      [5, 43],
      [8, 44],
      [9, 41.5],
      [13, 38],
      [15.5, 37.5],
      [17, 38.5],
      [19, 39.5],
      [21.5, 38],
      [24, 38],
      [26, 41],
      [28, 41.5],
      [29, 38],
      [33, 43],
      [34, 47],
      [32, 50],
      [30, 51],
      [24, 54],
      [22, 55],
      [18, 55.5],
      [14.5, 54],
      [10, 55],
      [8.5, 57],
      [5, 53],
      [4, 52],
      [2, 51],
      [0, 50],
      [-1.5, 47],
      [-5, 48],
      [-5, 44],
      [-9, 44],
      [-8.9, 36],
    ];
    const SCANDINAVIA = [
      [5, 57],
      [5, 59],
      [7, 62],
      [8.5, 63],
      [15, 66],
      [16, 69],
      [20, 70.5],
      [26, 71.5],
      [30, 70.5],
      [29, 68],
      [26.5, 65],
      [27, 63],
      [28, 61],
      [25.5, 59.5],
      [23, 57.5],
      [18, 56.5],
      [14.5, 57],
      [12, 56],
      [10, 55],
      [8.5, 57],
      [5, 57],
    ];
    const UK = [
      [-5.5, 50],
      [0.5, 51],
      [1.5, 52],
      [0, 54],
      [-2, 55],
      [-3.5, 57.5],
      [-5, 58.5],
      [-6.5, 57],
      [-5.5, 53],
      [-4.5, 52],
      [-5.5, 50],
    ];
    const IRELAND = [
      [-6, 52],
      [-10.5, 53],
      [-10, 55],
      [-7, 55.5],
      [-6, 52],
    ];
    const ICELAND = [
      [-24, 63.5],
      [-13.5, 63],
      [-13, 65],
      [-24, 66],
      [-24, 63.5],
    ];
    const REGIONS = [MAINLAND, SCANDINAVIA, UK, IRELAND, ICELAND];

    // Dot grid
    const SP = Math.max(7, Math.round(W / 100));
    const DR = SP * 0.2;

    for (let px = 0; px <= W + SP; px += SP) {
      for (let py = 0; py <= H + SP; py += SP) {
        const lon = LON_MIN + (px / W) * (LON_MAX - LON_MIN);
        const lat = LAT_MIN + ((H - py) / H) * (LAT_MAX - LAT_MIN);
        const land = REGIONS.some((r) => pip(lon, lat, r));
        ctx.beginPath();
        ctx.arc(px, py, DR, 0, Math.PI * 2);
        ctx.fillStyle = land
          ? "rgba(200,255,0,0.18)"
          : "rgba(255,255,255,0.04)";
        ctx.fill();
      }
    }

    // Ruse, Bulgaria — the pin
    const rx = toX(25.97),
      ry = toY(43.85);
    // Static glow rings (animation handled by SVG overlay)
    ctx.beginPath();
    ctx.arc(rx, ry, 18, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,51,85,0.12)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(rx, ry, 10, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,51,85,0.22)";
    ctx.lineWidth = 1;
    ctx.stroke();
    // Dot
    ctx.beginPath();
    ctx.arc(rx, ry, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#FF3355";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    // Label
    ctx.font = `700 10px var(--font-mono-google)`;
    ctx.fillStyle = "rgba(255,51,85,0.85)";
    ctx.fillText("RUSE, BG ●", rx + 9, ry - 6);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.9,
        }}
      />
      {/* CSS-animated pulse ring over Ruse — positioned at ~70.3% x, ~74.1% y of map */}
      <div
        style={{
          position: "absolute",
          left: "70.3%",
          top: "74.1%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      >
        <div style={{ position: "relative", width: "48px", height: "48px" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,51,85,0.6)",
              animation: "ripple 2.4s ease-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,51,85,0.4)",
              animation: "ripple 2.4s 0.8s ease-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,51,85,0.2)",
              animation: "ripple 2.4s 1.6s ease-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}
