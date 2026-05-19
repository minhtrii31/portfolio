export default function HomeMarquee() {
  const items = [
    "Fullstack Development",
    "Product Thinking",
    "Visual Clarity",
    "Clean Interfaces",
    "Scalable Backend",
    "Modern Web Apps",
    "Interface Systems",
    "AI Workflows",
  ];

  return (
    <section
      aria-hidden="true"
      className="overflow-hidden border-y border-foreground/10 py-8 md:py-10"
    >
      <div className="home-marquee-track flex w-max animate-[marquee_55s_linear_infinite] gap-10 whitespace-nowrap font-serif text-[clamp(2rem,10vw,3rem)] leading-none text-foreground/70 md:gap-16 md:text-5xl">
        {[...items, ...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-14 md:gap-16"
          >
            <span className="italic tracking-[-0.04em]">{item}</span>
            <span className="text-foreground/30">✦</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
}
