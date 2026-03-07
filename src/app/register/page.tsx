"use client";

import { useRouter } from "next/navigation";

import { RegisterPage } from "@/components/register-page";
import { useAnalytics } from "@/components/analytics";
import { encryptTicket, type TicketData } from "@/lib";

export default function Register() {
  const router = useRouter();
  const { trackEvent } = useAnalytics();

  const handleComplete = (data: TicketData) => {
    trackEvent("registration_complete", { handle: data.handle, ticketNum: data.ticketNum });
    sessionStorage.setItem("myTicketNum", String(data.ticketNum));
    const token = encryptTicket(data);
    router.push(`/tickets?t=${token}`);
  };

  return <RegisterPage onRegister={handleComplete} />;
}
