"use client";

import { useInView } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import {
  FadeIn,
  RevealText,
  SectionReveal,
  SectionRevealItem,
} from "@/components/motion/reveal";

const links = [
  { label: "GitHub", href: "https://github.com/minhtrii31" },
  { label: "Email", href: "mailto:minhtri3101200@gmail.com" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const footerRevealRef = useRef<HTMLDivElement>(null);
  const shouldRevealFooter = useInView(footerRevealRef, {
    amount: 0.7,
    once: true,
  });

  return (
    <div
      ref={footerRevealRef}
      className="relative h-svh min-h-152"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      }}
    >
      <footer
        data-lenis-prevent
        className="fixed bottom-0 h-svh w-full overflow-y-auto bg-[#171717] px-6 py-8 text-white md:px-12"
      >
        <div className="relative z-10 mx-auto flex min-h-full max-w-screen-2xl flex-col justify-between gap-14">
          <FadeIn
            reveal={shouldRevealFooter}
            className="flex flex-col gap-2 pt-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60 md:flex-row md:items-center md:justify-between md:pt-12"
          >
            <span>Nguyen Huynh Minh Tri — Portfolio</span>
            <span>HCMC, Vietnam</span>
          </FadeIn>

          <SectionReveal
            reveal={shouldRevealFooter}
            className="flex flex-col items-start"
          >
            <SectionRevealItem className="mb-6 text-sm leading-relaxed text-white/65 md:text-base">
              Focused on products that feel clear, useful, and built to last.
            </SectionRevealItem>

            <SectionRevealItem>
              <RevealText
                as="h2"
                reveal={shouldRevealFooter}
                className="font-serif text-[clamp(4rem,18vw,13rem)] leading-[0.82] tracking-tighter"
                lines={[
                  [{ text: "Thoughtful" }],
                  [
                    {
                      text: "systems.",
                      className: "font-normal italic text-white/65",
                    },
                  ],
                ]}
              />
            </SectionRevealItem>

            <SectionRevealItem className="mt-8 flex items-center gap-4 md:mt-10">
              <span className="relative block size-7 shrink-0 opacity-45 grayscale invert motion-reduce:hidden md:size-8">
                <Image
                  src="/logo.gif"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 2rem, 1.75rem"
                  unoptimized
                  loading="lazy"
                  decoding="async"
                  className="object-contain"
                />
              </span>
              <span className="relative hidden size-7 shrink-0 opacity-45 grayscale motion-reduce:block md:size-8">
                <Image
                  src="/logo.png"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 2rem, 1.75rem"
                  loading="lazy"
                  className="object-contain invert"
                />
              </span>
              <p className="text-[11px] font-bold uppercase leading-relaxed tracking-[0.22em] text-white/60">
                Designed & developed in Ho Chi Minh City
              </p>
            </SectionRevealItem>
          </SectionReveal>

          <FadeIn className="grid gap-8 border-t border-white/10 pt-6 md:grid-cols-2">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">
              © 2026
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-bold uppercase tracking-[0.22em] md:justify-end">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="text-white/55 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}
