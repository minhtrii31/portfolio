"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HomeHero() {
  const titleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    let fit: { fit: (options?: { sync?: boolean }) => void; unsubscribe: () => void } | undefined;
    let isMounted = true;

    const prepareTitle = async () => {
      const [{ default: fitty }] = await Promise.all([
        import("fitty"),
        document.fonts.ready,
      ]);

      if (!isMounted || !titleRef.current) return;

      fit = fitty(titleRef.current, {
        maxSize: 380,
        minSize: 32,
        multiLine: false,
      });
      fit.fit({ sync: true });

      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event("portfolio:hero-title-ready"));
      });
    };

    prepareTitle();

    return () => {
      isMounted = false;
      fit?.unsubscribe();
    };
  }, []);

  return (
    <section className="relative min-h-svh overflow-x-clip px-6 pb-10 pt-22 md:px-12 md:pb-12">
      <div className="mx-auto flex min-h-[calc(100svh-8rem)] max-w-screen-2xl flex-col md:min-h-[calc(100svh-9rem)]">
        <div className="grid grid-cols-12 gap-x-6">
          <h1 className="col-span-12 overflow-hidden">
            <span
              id="home-hero-title"
              ref={titleRef}
              className="block whitespace-nowrap font-serif text-[clamp(2.25rem,9.3vw,23.75rem)] font-black leading-[0.78] text-foreground"
            >
              NGUYEN HUYNH MINH TRI
            </span>
          </h1>

          <div className="col-span-12 mt-7 grid grid-cols-12 gap-x-6 gap-y-8 pt-6 md:mt-8">
            <p className="col-span-12 max-w-48 text-xs font-bold uppercase leading-snug text-muted-foreground md:col-span-3">
              Fullstack Website Developer
            </p>

            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <p className="max-w-3xl text-2xl font-medium leading-tight md:text-4xl">
                Building modern web products with clear interfaces and reliable
                systems.
              </p>
            </div>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-12 items-end gap-x-6 gap-y-10 pt-12 md:pt-16">
          <div className="col-span-12 md:col-span-5 md:self-start">
            <div className="relative aspect-video overflow-hidden bg-muted md:mt-2">
              <Image
                src="/hero.webp"
                alt="Desk setup with a laptop and development workspace."
                fill
                sizes="(min-width: 768px) 35vw, 100vw"
                loading="eager"
                fetchPriority="high"
                className="object-cover grayscale"
              />
            </div>
          </div>

          <div className="col-span-12 flex items-end justify-start md:col-span-3 md:col-start-10 md:justify-end">
            <a
              href="#works"
              aria-label="Scroll to selected projects"
              className="group inline-flex items-center gap-4 text-xs font-bold uppercase text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <span className="leading-tight transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                Scroll to explore
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
