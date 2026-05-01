"use client";

import dynamic from "next/dynamic";

import { IS_SHOWCASE_MODE } from "@/lib";

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
      {!IS_SHOWCASE_MODE && <KonamiEasterEgg enabled={true} />}
      <CursorTrail enabled={true} />
    </>
  );
}
