import { ReactNode } from "react";
import { FadeIn, RevealText } from "@/components/motion/reveal";

export default function HomeSectionHeading({
  index,
  title,
  italicText,
  description,
  align = "left",
}: {
  index: number;
  title: string;
  italicText?: string;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  const isCentered = align === "center";

  return (
    <div
      className={`grid grid-cols-12 gap-6 pb-16 md:pb-24 ${
        isCentered ? "text-center" : ""
      }`}
    >
      <FadeIn
        className={`col-span-12 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground ${
          isCentered ? "" : "md:col-span-3"
        }`}
      >
        Chapter {String(index).padStart(2, "0")}
      </FadeIn>

      <div
        className={`col-span-12 ${
          isCentered ? "mx-auto max-w-5xl" : "md:col-span-9 md:col-start-5"
        }`}
      >
        <RevealText
          as="h2"
          delay={0.08}
          className="max-w-[11ch] font-serif text-[clamp(3.25rem,14vw,4.5rem)] leading-[0.95] tracking-[-0.045em] md:max-w-none md:text-7xl"
          parts={[
            { text: `${title} ` },
            ...(italicText
              ? [
                  {
                    text: italicText,
                    className: "font-normal italic text-foreground/70",
                  },
                ]
              : []),
          ]}
        />

        <FadeIn delay={0.18}>{description}</FadeIn>
      </div>
    </div>
  );
}
