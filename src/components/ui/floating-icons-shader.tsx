"use client";
import * as React from "react";
import { FloatingIconsBg, type FloatingIconProps } from "./floating-icons-bg";
import {
  IconBrain,
  IconCpu,
  IconBot,
  IconSparkles,
  IconZap,
  IconNetwork,
  IconOrbit,
  IconLayers,
  IconCode,
  IconBlocks,
  IconMicrochip,
  IconCircuit,
  IconCursorIDE,
  IconWindsurf,
  IconClaude,
  IconGemini,
} from "./ai-icons";

const aiIcons: FloatingIconProps[] = [
  { id: 1, icon: IconBrain, className: "top-[10%] left-[10%]" },
  { id: 2, icon: IconClaude, className: "top-[22%] right-[10%]" },
  { id: 3, icon: IconGemini, className: "bottom-[15%] left-[12%]" },
  { id: 4, icon: IconSparkles, className: "bottom-[12%] right-[15%]" },
  { id: 5, icon: IconZap, className: "top-[15%] left-[35%]" },
  { id: 6, icon: IconNetwork, className: "top-[18%] right-[32%]" },
  { id: 7, icon: IconCursorIDE, className: "bottom-[25%] left-[30%]" },
  { id: 8, icon: IconWindsurf, className: "bottom-[20%] right-[38%]" },
  { id: 9, icon: IconCode, className: "top-[45%] left-[8%]" },
  { id: 10, icon: IconBlocks, className: "top-[50%] right-[12%]" },
  { id: 11, icon: IconMicrochip, className: "top-[5%] left-[55%]" },
  { id: 12, icon: IconCircuit, className: "bottom-[5%] right-[55%]" },
  { id: 13, icon: IconBrain, className: "top-[40%] right-[25%]" },
  { id: 14, icon: IconCpu, className: "bottom-[40%] left-[25%]" },
  { id: 15, icon: IconBot, className: "top-[70%] left-[45%]" },
  { id: 16, icon: IconGemini, className: "top-[75%] right-[45%]" },
  { id: 17, icon: IconClaude, className: "top-[60%] left-[15%]" },
  { id: 18, icon: IconCursorIDE, className: "top-[65%] right-[5%]" },
  { id: 19, icon: IconWindsurf, className: "top-[8%] right-[45%]" },
  { id: 20, icon: IconOrbit, className: "bottom-[35%] right-[8%]" },
  { id: 21, icon: IconLayers, className: "top-[35%] left-[5%]" },
];

export const FloatingIconsShader = () => {
  return <FloatingIconsBg icons={aiIcons} className="absolute inset-0 z-0" />;
};
