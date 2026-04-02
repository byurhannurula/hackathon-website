import QRCode from "qrcode";

interface StyledQROptions {
  data: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  dotStyle?: "square" | "rounded" | "circle";
  /** SVG string for center logo overlay */
  logo?: string;
  /** Logo size as fraction of QR size (0-1) */
  logoScale?: number;
}

/**
 * Generates a styled QR code as an SVG string.
 * Uses custom dot shapes and supports a center logo overlay.
 * Error correction is set to H (30%) to survive logo overlay.
 */
export async function generateStyledQR({
  data,
  size = 200,
  fgColor = "#feee04",
  bgColor = "#0a0a0a",
  dotStyle = "rounded",
  logo,
  logoScale = 0.22,
}: StyledQROptions): Promise<string> {
  // Generate QR matrix
  const qr = QRCode.create(data, { errorCorrectionLevel: "H" });
  const modules = qr.modules;
  const moduleCount = modules.size;
  const cellSize = size / moduleCount;
  const radius = dotStyle === "circle" ? cellSize / 2 : dotStyle === "rounded" ? cellSize * 0.3 : 0;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
  svg += `<rect width="${size}" height="${size}" fill="${bgColor}"/>`;

  // Logo exclusion zone (center area where logo goes)
  const logoSize = size * logoScale;
  const logoStart = (size - logoSize) / 2;
  const logoEnd = logoStart + logoSize;

  // Draw QR modules
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (!modules.get(row, col)) continue;

      const x = col * cellSize;
      const y = row * cellSize;

      // Skip modules in logo zone
      if (
        logo &&
        x + cellSize > logoStart &&
        x < logoEnd &&
        y + cellSize > logoStart &&
        y < logoEnd
      ) {
        continue;
      }

      // Check if this is part of a finder pattern (top-left, top-right, bottom-left 7x7 squares)
      const isFinder =
        (row < 7 && col < 7) ||
        (row < 7 && col >= moduleCount - 7) ||
        (row >= moduleCount - 7 && col < 7);

      if (isFinder) {
        // Finder patterns: use square dots for better scanning
        svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${fgColor}" rx="${cellSize * 0.15}"/>`;
      } else if (dotStyle === "circle") {
        const cx = x + cellSize / 2;
        const cy = y + cellSize / 2;
        const r = cellSize * 0.38;
        svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fgColor}"/>`;
      } else {
        svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${fgColor}" rx="${radius}"/>`;
      }
    }
  }

  // Add logo in center
  if (logo) {
    const pad = logoSize * 0.15;
    // Background circle behind logo
    svg += `<circle cx="${size / 2}" cy="${size / 2}" r="${logoSize / 2 + pad}" fill="${bgColor}"/>`;
    svg += `<circle cx="${size / 2}" cy="${size / 2}" r="${logoSize / 2 + pad * 0.5}" fill="${fgColor}" opacity="0.15"/>`;
    // Logo group, centered
    svg += `<g transform="translate(${logoStart}, ${logoStart})">`;
    svg += logo.replace(
      /<svg[^>]*>/,
      `<svg width="${logoSize}" height="${logoSize}" viewBox="0 0 32 32">`
    );
    svg += `</g>`;
  }

  svg += `</svg>`;
  return svg;
}

/**
 * Converts an SVG string to a data URL suitable for <img src> or email embedding.
 */
export function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// Logo SVG for QR center (the "R" brand mark)
export const QR_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#050505"/>
  <text x="16" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="800" font-size="22" fill="#FEEE04">R</text>
</svg>`;
