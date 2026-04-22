import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | RUSE AI HACK '26",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-bg text-white">{children}</div>;
}
