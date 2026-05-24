import Footer from "@/components/layouts/footer";
import HashScroll from "@/components/layouts/hash-scroll";
import Header from "@/components/layouts/header";
import SmoothScroll from "@/components/layouts/smooth-scroll";
import ScrollToTopOnReload from "@/components/layouts/scroll-to-top-on-reload";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollToTopOnReload />
      <SmoothScroll />
      <HashScroll />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
