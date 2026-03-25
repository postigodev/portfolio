import { Link, useLocation } from "react-router-dom";
import { profile } from "@/content/profile";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Systems", path: "/projects" },
  { label: "Resume", path: "/resume" },
];

const SiteHeader = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link
          to="/"
          className="inline-flex min-w-0 items-center gap-3 text-sm text-foreground transition-colors hover:text-goat"
        >
          <span className="text-sm leading-none">🐐</span>
          <span className="truncate font-mono font-medium tracking-tight">
            {profile.name.toLowerCase().replace(/\s+/g, ".")}
          </span>
        </Link>

        <nav className="flex items-center gap-2 rounded-full border border-border/80 bg-card/60 p-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] transition-colors ${
                  active
                    ? "bg-goat/14 text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
