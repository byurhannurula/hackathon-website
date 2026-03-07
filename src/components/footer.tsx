import { HACKATHON_INFO, siteConfig } from "@/lib";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="border-t border-border px-6 py-4.5 md:px-12 flex justify-between items-center flex-wrap gap-3 max-w-[1100px] mx-auto">
        <span className="font-mono text-[10px] text-white/40 tracking-widest">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href={siteConfig.contact.organizerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-acid/70 hover:text-acid"
          >
            {HACKATHON_INFO.organizer}
          </a>{" "}
          &middot; {HACKATHON_INFO.name}
        </span>
        <span className="font-mono text-[10px] text-white/30 tracking-widest">
          Направено с вайб.
        </span>
      </div>
    </footer>
  );
}
