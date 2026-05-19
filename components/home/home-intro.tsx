"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { type CSSProperties, useEffect, useLayoutEffect, useState } from "react";

const ease = [0.76, 0, 0.24, 1] as const;

type NameTarget = {
  left: number;
  top: number;
  width: number;
  height: number;
  startX: number;
  startY: number;
  startScale: number;
  style: CSSProperties;
};

type IntroPhase = "loader" | "loaderExit" | "name" | "move" | "settle";

export default function HomeIntro() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<IntroPhase>("loader");
  const [progress, setProgress] = useState(0);
  const [nameTarget, setNameTarget] = useState<NameTarget | null>(null);

  useLayoutEffect(() => {
    if (shouldReduceMotion || !window.location.hash) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [shouldReduceMotion]);

  useLayoutEffect(() => {
    if (shouldReduceMotion || !isVisible) {
      return;
    }

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;
    const previousBodyTouchAction = body.style.touchAction;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.touchAction = "none";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      body.style.touchAction = previousBodyTouchAction;
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    };
  }, [isVisible, shouldReduceMotion]);

  useEffect(() => {
    if (isVisible) {
      return;
    }

    window.dispatchEvent(new Event("portfolio:intro-complete"));
  }, [isVisible]);

  useEffect(() => {
    if (shouldReduceMotion) {
      const reduceMotionFrame = window.requestAnimationFrame(() => {
        setIsVisible(false);
      });

      return () => window.cancelAnimationFrame(reduceMotionFrame);
    }

    let progressFrame = 0;
    let enterFrame = 0;
    let exitTimer = 0;
    let fallbackReadyTimer = 0;
    let loaderExitTimer = 0;
    let nameReadyTimer = 0;
    let settleTimer = 0;
    let heroTitleReady = false;
    let nameReady = false;
    let hasMeasured = false;

    const prepareNameClone = () => {
      if (hasMeasured) return;

      const heroTitle = document.getElementById("home-hero-title");

      if (!heroTitle) {
        exitTimer = window.setTimeout(() => setIsVisible(false), 260);
        return;
      }

      hasMeasured = true;

      const heroRect = heroTitle.getBoundingClientRect();
      const heroStyle = window.getComputedStyle(heroTitle);
      const heroCenterX = heroRect.left + heroRect.width / 2;
      const heroCenterY = heroRect.top + heroRect.height / 2;
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      const introWidth = Math.min(heroRect.width, window.innerWidth - 48);
      const startScale = Math.min(
        1,
        Math.max(0.72, introWidth / heroRect.width),
      );

      setNameTarget({
        left: heroRect.left,
        top: heroRect.top,
        width: heroRect.width,
        height: heroRect.height,
        startX: viewportCenterX - heroCenterX,
        startY: viewportCenterY - heroCenterY,
        startScale,
        style: {
          fontFamily: heroStyle.fontFamily,
          fontSize: heroStyle.fontSize,
          fontWeight: heroStyle.fontWeight,
          letterSpacing: heroStyle.letterSpacing,
          lineHeight: heroStyle.lineHeight,
        },
      });

      setPhase("name");

      nameReadyTimer = window.setTimeout(() => {
        setPhase("move");
      }, 540);

      settleTimer = window.setTimeout(() => {
        setPhase("settle");
      }, 1280);

      exitTimer = window.setTimeout(() => {
        setIsVisible(false);
      }, 1660);
    };

    const maybeMeasure = () => {
      if (!heroTitleReady || !nameReady) return;

      document.fonts.ready.then(() => {
        window.setTimeout(() => {
          window.requestAnimationFrame(prepareNameClone);
        }, 80);
      });
    };

    const handleHeroTitleReady = () => {
      heroTitleReady = true;
      maybeMeasure();
    };

    enterFrame = window.requestAnimationFrame(() => {
      setPhase("loader");
      setProgress(0);

      const progressStartedAt = performance.now();
      const progressDuration = 1650;

      const tickProgress = (now: number) => {
        const elapsed = now - progressStartedAt;
        const nextProgress = Math.min(
          100,
          Math.round((elapsed / progressDuration) * 100),
        );

        setProgress(nextProgress);

        if (nextProgress < 100) {
          progressFrame = window.requestAnimationFrame(tickProgress);
          return;
        }

        setPhase("loaderExit");

        loaderExitTimer = window.setTimeout(() => {
          nameReadyTimer = window.setTimeout(() => {
            nameReady = true;
            maybeMeasure();
          }, 80);
        }, 360);
      };

      progressFrame = window.requestAnimationFrame(tickProgress);
    });

    window.addEventListener("portfolio:hero-title-ready", handleHeroTitleReady);

    fallbackReadyTimer = window.setTimeout(() => {
      heroTitleReady = true;
      maybeMeasure();
    }, 1500);

    return () => {
      window.cancelAnimationFrame(enterFrame);
      window.cancelAnimationFrame(progressFrame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(fallbackReadyTimer);
      window.clearTimeout(loaderExitTimer);
      window.clearTimeout(nameReadyTimer);
      window.clearTimeout(settleTimer);
      window.removeEventListener(
        "portfolio:hero-title-ready",
        handleHeroTitleReady,
      );
    };
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          data-portfolio-intro
          aria-hidden="true"
          className="fixed inset-0 z-100 min-h-svh overflow-hidden text-foreground motion-reduce:hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.01 }}
        >
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "settle" ? 0 : 1 }}
            transition={{ duration: 0.38, ease }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-5"
            initial={{ opacity: 0, y: 8 }}
            animate={
              phase === "loader" ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }
            }
            transition={{ duration: 0.42, ease }}
          >
            <motion.div
              className="relative size-14 opacity-60 grayscale sm:size-16"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{
                opacity: { duration: 0.42, ease },
                scale: { duration: 0.42, ease },
              }}
            >
              <Image
                src="/logo.gif"
                alt=""
                fill
                sizes="(min-width: 640px) 4rem, 3.5rem"
                priority
                unoptimized
                className="object-contain"
              />
            </motion.div>

            <div className="flex min-w-24 items-center justify-between text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/45">
              <span>Loading</span>
              <span>{progress}</span>
            </div>
          </motion.div>

          {nameTarget ? (
            <motion.div
              className="fixed overflow-hidden whitespace-nowrap text-left will-change-transform"
              style={{
                left: nameTarget.left,
                top: nameTarget.top,
                width: nameTarget.width,
                height: nameTarget.height,
                transformOrigin: "center center",
              }}
              initial={{
                opacity: 0,
                x: nameTarget.startX,
                y: nameTarget.startY + 24,
                scale: nameTarget.startScale,
              }}
              animate={
                phase === "move" || phase === "settle"
                  ? {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                    }
                  : phase === "name"
                    ? {
                        opacity: 1,
                        x: nameTarget.startX,
                        y: nameTarget.startY,
                        scale: nameTarget.startScale,
                      }
                    : {
                        opacity: 0,
                        x: nameTarget.startX,
                        y: nameTarget.startY + 24,
                        scale: nameTarget.startScale,
                      }
              }
              transition={
                phase === "move" || phase === "settle"
                  ? { duration: 0.74, ease }
                  : { duration: 0.56, ease }
              }
            >
              <p
                className="font-serif text-foreground"
                style={nameTarget.style}
              >
                NGUYEN HUYNH MINH TRI
              </p>
            </motion.div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
