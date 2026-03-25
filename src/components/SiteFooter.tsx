import { profile } from "@/content/profile";

const SiteFooter = () => (
  <footer className="border-t border-border/80 py-8">
    <div className="container flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <p className="font-mono text-[11px] uppercase tracking-[0.24em]">
        Built for systems, not slides
      </p>
    </div>
  </footer>
);

export default SiteFooter;
