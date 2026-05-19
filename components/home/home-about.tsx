import Image from "next/image";
import {
  FadeIn,
  RevealImage,
  RevealText,
  SectionReveal,
  SectionRevealItem,
} from "@/components/motion/reveal";

const details = [
  ["Education", "B.Sc. Computer Science"],
  ["Based", "Ho Chi Minh City"],
  ["Focus", "Fullstack · Product"],
  ["Status", "Open to opportunities"],
];

export default function HomeAbout() {
  return (
    <section
      id="about"
      className="overflow-x-clip border-t border-foreground/10 px-6 py-20 text-foreground md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 md:gap-x-10">
          <div className="col-span-12 md:col-span-5 md:col-start-1">
            <RevealImage className="relative aspect-4/5 overflow-hidden bg-muted">
              <Image
                src="/about.webp"
                alt="Minimal workspace desk with a computer and office details."
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover grayscale"
              />
            </RevealImage>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7 md:self-center">
            <FadeIn className="mb-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Chapter 03 — About
            </FadeIn>

            <RevealText
              as="h2"
              text="Thoughtful interfaces. Reliable systems."
              delay={0.08}
              className="mb-8 max-w-[11ch] font-serif text-[clamp(3rem,13vw,4.5rem)] leading-[0.95] tracking-[-0.045em] md:max-w-none md:text-7xl"
            />

            <FadeIn delay={0.14}>
              <p className="text-base leading-relaxed text-foreground/75 md:text-lg">
                I&apos;m Tri, a Computer Science graduate and fullstack
                developer focused on building modern web applications with clear
                interfaces, dependable systems, and product-minded thinking.
              </p>
            </FadeIn>

            <SectionReveal
              delay={0.16}
              className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 border-t border-foreground/10 pt-8 sm:grid-cols-2"
            >
              {details.map(([key, value]) => (
                <SectionRevealItem key={key}>
                  <div className="mb-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                    {key}
                  </div>
                  <div className="font-serif text-lg leading-tight tracking-[-0.03em] md:text-xl">
                    {value}
                  </div>
                </SectionRevealItem>
              ))}
            </SectionReveal>

            <FadeIn delay={0.2}>
              <a
                href="#contact"
                aria-label="Go to contact section"
                className="group mt-10 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em]"
              >
                <span className="border-b border-foreground pb-1">
                  Get in touch
                </span>
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
