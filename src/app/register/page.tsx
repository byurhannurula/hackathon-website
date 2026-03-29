"use client";

import { useRouter } from "next/navigation";

import { RegisterPage } from "@/components/register-page";
import { useAnalytics } from "@/components/analytics";
import { type TicketData } from "@/lib";

export default function Register() {
  const router = useRouter();
  const { trackEvent } = useAnalytics();

  const handleComplete = (data: TicketData) => {
    trackEvent("registration_complete", {
      handle: data.handle,
      ticketNum: data.ticketNum,
      ticketId: data.ticketId,
    });
    localStorage.setItem("myTicketNum", String(data.ticketNum));
    sessionStorage.setItem("myTicketNum", String(data.ticketNum));
    if (data.ticketId) localStorage.setItem("myTicketId", data.ticketId);
    router.push(`/tickets/${data.ticketId}`);
  };

  return <RegisterPage onRegister={handleComplete} />;
}
