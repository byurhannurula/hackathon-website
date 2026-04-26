import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function CodeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card min-h-screen">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
