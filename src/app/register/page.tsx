"use client";

import { useRouter } from "next/navigation";

import { RegisterPage } from "@/components/register-page";
import { useAnalytics } from "@/components/analytics";
import { type TicketData } from "@/lib";

export default function Register() {
  const router = useRouter();
  const { trackEvent } = useAnalytics();

  const handleComplete = (data: TicketData) => {
    trackEvent("registration_complete", { handle: data.handle, ticketNum: data.ticketNum });
    localStorage.setItem("myTicketNum", String(data.ticketNum));
    sessionStorage.setItem("myTicketNum", String(data.ticketNum));
    router.push(`/tickets/${data.ticketId}`);
  };

  return <RegisterPage onRegister={handleComplete} />;
}
