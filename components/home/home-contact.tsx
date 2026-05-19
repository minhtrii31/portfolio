import {
  FadeIn,
  RevealText,
  SectionReveal,
  SectionRevealItem,
} from "@/components/motion/reveal";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/minhtrii31",
  },
  {
    label: "Email",
    href: "mailto:minhtri3101200@gmail.com",
  },
];

export default function HomeContact() {
  return (
    <section
      id="contact"
      className="overflow-x-clip border-t border-foreground/10 px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-3">
            <FadeIn className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Chapter 04 — Contact
            </FadeIn>
          </div>

          <div className="col-span-12 md:col-span-9">
            <RevealText
              as="h2"
              delay={0.08}
              className="font-serif text-[clamp(3.25rem,13vw,8rem)] leading-[0.9] tracking-[-0.06em]"
              lines={[
                [{ text: "Let's build" }],
                [
                  { text: "something " },
                  { text: "thoughtful.", className: "italic" },
                ],
              ]}
            />

            <SectionReveal
              delay={0.14}
              className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10"
            >
              <SectionRevealItem className="col-span-12 md:col-span-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  Email
                </p>
                <a
                  href="mailto:minhtri3101200@gmail.com"
                  aria-label="Email Nguyen Huynh Minh Tri at minhtri3101200@gmail.com"
                  className="mt-3 inline-block max-w-full border-b border-foreground pb-1 font-serif text-[clamp(1.5rem,7vw,2.25rem)] leading-tight wrap-anywhere"
                >
                  minhtri3101200@gmail.com
                </a>
              </SectionRevealItem>

              <SectionRevealItem className="col-span-12 sm:col-span-6 md:col-span-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  Elsewhere
                </p>
                <ul className="mt-3 space-y-2 font-serif text-lg">
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="border-b border-foreground/30 transition-colors duration-300 hover:border-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </SectionRevealItem>

              <SectionRevealItem className="col-span-12 sm:col-span-6 md:col-span-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  Availability
                </p>
                <p className="mt-3 font-serif text-lg leading-tight">
                  Open to fullstack roles, freelance projects, and
                  product-minded teams.
                </p>
              </SectionRevealItem>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
