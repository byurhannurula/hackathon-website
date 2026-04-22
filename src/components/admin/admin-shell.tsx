"use client";

import { usePathname } from "next/navigation";

import { useAdminAuth } from "@/hooks";
import { AdminHeader } from "./admin-header";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { logout } = useAdminAuth();
  const pathname = usePathname();
  const isLogin = pathname === "/kcah-ia-esur/login";

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-bg text-white">
      <AdminHeader onLogout={logout} />
      {children}
    </div>
  );
}
