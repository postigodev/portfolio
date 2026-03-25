import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <SiteHeader />
    <main className="container flex-1 py-10 md:py-14">{children}</main>
    <SiteFooter />
  </div>
);

export default Layout;
