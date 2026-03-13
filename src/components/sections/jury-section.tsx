// ──────────────────────────────────────────────────────────────
// Jury Section — swap the active version by changing the import.
//
// Available versions:
//   jury-section-old.tsx     → Tall portrait cards (original design)
//   jury-section-compact.tsx → Compact horizontal cards (minimal)
//   jury-section-medium.tsx  → Square avatar grid (in-between)
//   jury-section-glare.tsx   → Holographic glare cards (dynamic)
// ──────────────────────────────────────────────────────────────

// export { JurySectionCompact as JurySection } from "./jury-section-compact";

// To switch, comment the line above and uncomment one below:
// export { JurySectionOld as JurySection } from "./jury-section-old";
export { JurySectionMedium as JurySection } from "./jury-section-medium";
// export { JurySectionGlare as JurySection } from "./jury-section-glare";
