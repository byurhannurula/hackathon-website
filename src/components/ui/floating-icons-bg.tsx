/* eslint-disable react-hooks/purity */
"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

// Interface for the props of each individual icon.
export interface FloatingIconProps {
  id: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className: string; // Used for custom positioning of the icon.
}

// A single icon component with its own motion logic
const Icon = ({
  mouseX,
  mouseY,
  iconData,
  index,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  iconData: FloatingIconProps;
  index: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Motion values for the icon's position, with spring physics for smooth movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
            Math.pow(mouseY.current - (rect.top + rect.height / 2), 2)
        );

        // If the cursor is close enough, repel the icon
        if (distance < 150) {
          const angle = Math.atan2(
            mouseY.current - (rect.top + rect.height / 2),
            mouseX.current - (rect.left + rect.width / 2)
          );
          // The closer the cursor, the stronger the repulsion
          const force = (1 - distance / 150) * 50;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          // Return to original position when cursor is away
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      key={iconData.id}
      style={{
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("absolute", iconData.className)}
    >
      {/* Inner wrapper for the continuous floating animation */}
      <motion.div
        className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-4 rounded-4xl shadow-2xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10"
        style={{
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.02)",
        }}
        animate={{
          y: [0, -10, 0, 10, 0],
          rotate: [0, 3, 0, -3, 0],
        }}
        transition={{
          duration: 6 + Math.random() * 4,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <iconData.icon
          className="w-8 h-8 md:w-10 md:h-10 opacity-90"
          style={{ color: "var(--acid)", filter: "drop-shadow(0 0 8px rgba(200,255,0,0.3))" }}
        />
      </motion.div>
    </motion.div>
  );
};

export interface FloatingIconsBgProps {
  icons: FloatingIconProps[];
  className?: string;
}

export const FloatingIconsBg = ({ icons, className }: FloatingIconsBgProps) => {
  // Refs to track the raw mouse position
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(200,255,0,0.05) 1px, transparent 0)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      {icons.map((iconData, index) => (
        <Icon key={iconData.id} mouseX={mouseX} mouseY={mouseY} iconData={iconData} index={index} />
      ))}
    </div>
  );
};
