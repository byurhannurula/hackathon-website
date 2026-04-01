import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function RulesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bg min-h-screen">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
