"use client";

import { RegisterPage } from "@/components/RegisterPage";
import { useRouter } from "next/navigation";
import { encryptTicket, type TicketData } from "@/lib/utils";

export default function Register() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  const handleComplete = (data: TicketData) => {
    const token = encryptTicket(data);
    router.push(`/tickets?t=${token}`);
  };

  return (
    <RegisterPage
      onBack={handleBack}
      onComplete={handleComplete}
      currentTicket={null}
    />
  );
}
