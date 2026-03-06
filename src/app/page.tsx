"use client";

import { LandingPage } from "@/components/LandingPage";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/register");
  };

  return <LandingPage onRegister={handleRegister} />;
}
