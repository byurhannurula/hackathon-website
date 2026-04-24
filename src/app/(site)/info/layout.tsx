import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bg min-h-screen">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
