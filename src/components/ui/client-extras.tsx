"use client";

import dynamic from "next/dynamic";

const CursorTrail = dynamic(
  () => import("@/components/ui/cursor-trail").then((m) => m.CursorTrail),
  { ssr: false }
);
const KonamiEasterEgg = dynamic(
  () => import("@/components/ui/konami-easter-egg").then((m) => m.KonamiEasterEgg),
  { ssr: false }
);

export function ClientExtras() {
  return (
    <>
      <KonamiEasterEgg enabled={true} />
      <CursorTrail enabled={true} />
    </>
  );
}
