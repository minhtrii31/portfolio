import Footer from "@/components/layouts/footer";
import HashScroll from "@/components/layouts/hash-scroll";
import Header from "@/components/layouts/header";
import NotFoundView from "@/components/layouts/not-found-view";
import ScrollToTopOnReload from "@/components/layouts/scroll-to-top-on-reload";
import SmoothScroll from "@/components/layouts/smooth-scroll";

export default function NotFound() {
  return (
    <>
      <ScrollToTopOnReload />
      <SmoothScroll />
      <HashScroll />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <NotFoundView />
      </main>
      <Footer />
    </>
  );
}
