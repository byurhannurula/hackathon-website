"use client";

import { useState, useEffect } from "react";
import { LandingPage } from "@/components/LandingPage";
import { RegisterPage } from "@/components/RegisterPage";
import { TicketPage } from "@/components/TicketPage";
import { TicketData } from "@/lib/utils";

export default function Page() {
  const [view, setView] = useState<"landing" | "register" | "ticket">("landing");
  const [ticketData, setTicketData] = useState<TicketData | null>(null);

  // Handle URL share tokens on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("t");
    if (token) {
      try {
        // Simple decode for display if token exists
        const bin = atob(token.replace(/-/g, "+").replace(/_/g, "/"));
        const parts = bin.split(":");
        if (parts[0] === "vr2026") {
          setTicketData({
            handle: "@" + parts[1],
            ticketNum: parseInt(parts[2]),
            name: parts[1].charAt(0).toUpperCase() + parts[1].slice(1),
            avatarUrl: `https://github.com/${parts[1]}.png`,
          });
          setView("ticket");
        }
      } catch (e) {
        console.error("Invalid token");
      }
    }
  }, []);

  const handleRegister = () => setView("register");
  const handleBack = () => setView("landing");
  const handleComplete = (data: TicketData) => {
    setTicketData(data);
    setView("ticket");
  };

  if (view === "register") {
    return (
      <RegisterPage
        onBack={handleBack}
        onComplete={handleComplete}
        currentTicket={ticketData}
      />
    );
  }

  if (view === "ticket") {
    return <TicketPage data={ticketData} onBack={handleBack} />;
  }

  return <LandingPage onRegister={handleRegister} />;
}
