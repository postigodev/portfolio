import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <SiteHeader />
    <main className="flex-1 container py-12 md:py-16">{children}</main>
    <SiteFooter />
  </div>
);

export default Layout;
