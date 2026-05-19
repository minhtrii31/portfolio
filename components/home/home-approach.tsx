import {
  RevealText,
  SectionReveal,
  SectionRevealItem,
} from "@/components/motion/reveal";

const principles = [
  {
    label: "Interface",
    title: "Make every flow feel clear.",
  },
  {
    label: "System",
    title: "Build structure that scales quietly.",
  },
  {
    label: "Finish",
    title: "Let details support the product.",
  },
];

export default function HomeApproach() {
  return (
    <section
      id="approach"
      className="min-h-svh bg-[#171717] px-6 py-24 text-white md:px-12 md:py-32"
    >
      <div className="mx-auto flex min-h-[calc(100svh-12rem)] max-w-screen-2xl items-center">
        <SectionReveal className="w-full text-center">
          <SectionRevealItem className="block text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">
            Chapter 02 / Approach
          </SectionRevealItem>

          <SectionRevealItem className="mx-auto mt-14 max-w-5xl">
            <RevealText
              as="h2"
              className="font-serif text-[clamp(3rem,13vw,4.5rem)] leading-[0.92] tracking-[-0.04em] md:text-7xl"
              lines={[
                [{ text: "Designed to feel simple." }],
                [
                  {
                    text: "Engineered to stay useful.",
                    className: "font-normal italic text-white/70",
                  },
                ],
              ]}
            />

            <div className="mx-auto mt-14 grid max-w-5xl border-t border-white/10 md:mt-16 md:grid-cols-3">
              {principles.map((item, index) => (
                <SectionRevealItem
                  key={item.label}
                  className="border-b border-white/10 py-7 text-left md:border-r md:px-8 md:last:border-r-0"
                >
                  <div className="mb-10 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{item.label}</span>
                  </div>

                  <h3 className="font-serif text-3xl leading-[0.95] tracking-[-0.03em] text-white/90 sm:text-4xl">
                    {item.title}
                  </h3>
                </SectionRevealItem>
              ))}
            </div>
          </SectionRevealItem>
        </SectionReveal>
      </div>
    </section>
  );
}
