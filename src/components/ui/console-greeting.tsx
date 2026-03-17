"use client";

import { useEffect } from "react";
import { siteConfig } from "@/constants";

interface ConsoleGreetingProps {
  /** Set to false to disable console messages */
  enabled?: boolean;
}

/**
 * Prints colorful styled messages to the browser console on mount.
 * Toggle: set `enabled={false}` to disable.
 */
export function ConsoleGreeting({ enabled = true }: ConsoleGreetingProps) {
  useEffect(() => {
    if (!enabled) return;

    // Big ASCII-style banner
    console.log(
      "%c" +
        " ____  _   _ ____  _____      _    ___   _   _    _    ____ _  __\n" +
        "|  _ \\| | | / ___|| ____|    / \\  |_ _| | | | |  / \\  / ___| |/ /\n" +
        "| |_) | | | \\___ \\|  _|     / _ \\  | |  | |_| | / _ \\| |   | ' / \n" +
        "|  _ <| |_| |___) | |___   / ___ \\ | |  |  _  |/ ___ \\ |___| . \\ \n" +
        "|_| \\_\\\\___/|____/|_____| /_/   \\_\\___| |_| |_/_/   \\_\\____|_|\\_\\\n",
      "color: #feee04; font-size: 11px; font-family: monospace; font-weight: bold;"
    );

    console.log(
      "%c🚀 APP IN A SNAP",
      "color: #feee04; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px rgba(254,238,4,0.5);"
    );

    console.log(
      `%c${siteConfig.event.duration} AI хакатон · ${siteConfig.event.dateBG} · ${siteConfig.event.locationBG}`,
      "color: #888; font-size: 12px; font-family: monospace;"
    );

    console.log("%c─────────────────────────────────────────────", "color: #333;");

    console.log(
      "%c👀 Любопитен човек, а? Харесва ни!",
      "color: #00ffb2; font-size: 14px; font-family: monospace;"
    );

    console.log(
      "%c💻 Ако обичаш да ровиш в код — може би това е точно твоят хакатон.",
      "color: #7b61ff; font-size: 12px; font-family: monospace;"
    );

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
    console.log(
      `%c🎯 Регистрирай се: %c${siteUrl}/register`,
      "color: #18abc0; font-size: 12px; font-family: monospace;",
      "color: #feee04; font-size: 12px; font-family: monospace; text-decoration: underline;"
    );

    console.log("%c─────────────────────────────────────────────", "color: #333;");

    console.log(
      "%c⚡ Powered by Next.js, Tailwind, Supabase & good vibes",
      "color: #555; font-size: 10px; font-family: monospace;"
    );
  }, [enabled]);

  return null;
}
