"use client";

import { motion, useReducedMotion } from "motion/react";
import { createElement, ElementType, ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  reveal?: boolean;
};

type TextPart = {
  text: string;
  className?: string;
};

type RevealTextProps = Omit<RevealProps, "children"> & {
  as?: ElementType;
  text?: string;
  parts?: TextPart[];
  lines?: TextPart[][];
};

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.9,
  reveal,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const hiddenState = { opacity: 0, y: 14, filter: "blur(4px)" };
  const visibleState = { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : hiddenState}
      animate={
        shouldReduceMotion || reveal === undefined
          ? undefined
          : reveal
            ? visibleState
            : hiddenState
      }
      whileInView={
        shouldReduceMotion || reveal !== undefined ? undefined : visibleState
      }
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function renderTextParts({
  parts,
  delay,
  duration,
  shouldReduceMotion,
  startIndex = 0,
}: {
  parts: TextPart[];
  delay: number;
  duration: number;
  shouldReduceMotion: boolean;
  startIndex?: number;
}) {
  let wordIndexOffset = startIndex;

  return parts.map((part, partIndex) => (
    <span key={`part-${partIndex}`} className={part.className}>
      {part.text.split(/(\s+)/).map((word, wordIndex) => {
        if (/^\s+$/.test(word)) {
          return word;
        }

        return (
          <span
            key={`part-${partIndex}-word-${wordIndex}`}
            className="inline-block overflow-hidden whitespace-nowrap align-bottom px-[0.16em] pt-[0.32em] pb-[0.58em] mx-[-0.16em] mt-[-0.32em] mb-[-0.58em]"
          >
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: {
                  opacity: shouldReduceMotion ? 1 : 0,
                  y: shouldReduceMotion ? "0%" : "118%",
                },
                visible: {
                  opacity: 1,
                  y: "0%",
                  transition: {
                    duration,
                    delay: delay + wordIndexOffset++ * 0.045,
                    ease,
                  },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  ));
}

export function RevealText({
  as = "span",
  text,
  parts,
  lines,
  className,
  delay = 0,
  duration = 0.95,
  reveal,
}: RevealTextProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const textParts = parts ?? [{ text: text ?? "" }];
  let letterOffset = 0;
  const renderParts = (currentParts: TextPart[]) => {
    const renderedParts = renderTextParts({
      parts: currentParts,
      delay,
      duration,
      shouldReduceMotion,
      startIndex: letterOffset,
    });

    letterOffset += currentParts.reduce(
      (total, part) => total + part.text.split(/\s+/).filter(Boolean).length,
      0,
    );

    return renderedParts;
  };

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      animate={
        shouldReduceMotion || reveal === undefined
          ? undefined
          : reveal
            ? "visible"
            : "hidden"
      }
      whileInView={
        shouldReduceMotion || reveal !== undefined ? undefined : "visible"
      }
      viewport={{ once: true, amount: 0.35 }}
    >
      {createElement(
        as,
        null,
        lines
          ? lines.map((line, lineIndex) => (
              <span key={`line-${lineIndex}`} className="block">
                {renderParts(line)}
              </span>
            ))
          : renderParts(textParts),
      )}
    </motion.div>
  );
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  reveal,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      animate={
        shouldReduceMotion || reveal === undefined
          ? undefined
          : reveal
            ? "visible"
            : "hidden"
      }
      whileInView={
        shouldReduceMotion || reveal !== undefined ? undefined : "visible"
      }
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delay,
            staggerChildren: 0.12,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function SectionRevealItem({
  children,
  className,
}: Omit<RevealProps, "delay" | "duration">) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.9, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealImage({
  children,
  className,
}: Omit<RevealProps, "delay" | "duration">) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { clipPath: "inset(0 0 16% 0)" }}
      whileInView={
        shouldReduceMotion ? undefined : { clipPath: "inset(0 0 0% 0)" }
      }
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.95, ease }}
    >
      <motion.div
        className="absolute inset-0"
        initial={shouldReduceMotion ? false : { scale: 1.06 }}
        whileInView={shouldReduceMotion ? undefined : { scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.95, ease }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
