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
    <header className="border-b border-border">
      <div className="container flex h-14 items-center justify-between">
        <Link
          to="/"
          className="font-mono text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
        >
          {profile.name.toLowerCase().replace(/\s+/g, ".")}
        </Link>
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm transition-colors ${
                location.pathname === item.path
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
