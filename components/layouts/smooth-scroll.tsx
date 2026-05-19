"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const easing = (time: number) => 1 - Math.pow(1 - time, 3);

export default function SmoothScroll() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let lenis: Lenis | undefined;

    const destroyLenis = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }

      lenis?.destroy();
      lenis = undefined;
    };

    const setupLenis = () => {
      destroyLenis();

      if (mediaQuery.matches) {
        return;
      }

      lenis = new Lenis({
        anchors: {
          duration: 0.7,
          easing,
        },
        duration: 0.85,
        easing,
        gestureOrientation: "vertical",
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        overscroll: true,
        prevent: (node) => Boolean(node.closest("[data-lenis-prevent]")),
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        animationFrame = window.requestAnimationFrame(raf);
      };

      animationFrame = window.requestAnimationFrame(raf);
    };

    setupLenis();

    mediaQuery.addEventListener("change", setupLenis);

    return () => {
      mediaQuery.removeEventListener("change", setupLenis);
      destroyLenis();
    };
  }, []);

  return null;
}
