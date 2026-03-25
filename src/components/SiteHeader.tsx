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
    <header className="border-b border-border/70 bg-background/95">
      <div className="container flex h-14 items-center justify-between gap-6">
        <Link
          to="/"
          className="inline-flex min-w-0 items-center gap-2 text-sm text-foreground transition-colors hover:text-goat"
        >
          <span className="text-xs leading-none">🐐</span>
          <span className="truncate font-mono font-medium tracking-tight">
            {profile.name.toLowerCase().replace(/\s+/g, ".")}
          </span>
        </Link>

        <nav className="flex items-center gap-5">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[11px] uppercase tracking-[0.24em] transition-colors ${
                  active
                    ? "text-foreground"
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
