import { profile } from "@/content/profile";

const SiteFooter = () => (
  <footer className="border-t border-border py-8">
    <div className="container flex flex-col items-center gap-2 text-sm text-muted-foreground">
      <p>(c) {new Date().getFullYear()} {profile.name}</p>
    </div>
  </footer>
);

export default SiteFooter;
