"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getScrollOffset() {
  const scrollPaddingTop = window.getComputedStyle(
    document.documentElement,
  ).scrollPaddingTop;
  const offset = Number.parseFloat(scrollPaddingTop);

  return Number.isNaN(offset) ? 0 : offset;
}

function decodeHashPart(hashPart: string) {
  try {
    return decodeURIComponent(hashPart);
  } catch {
    return hashPart;
  }
}

function getHashTargetId() {
  const hash = window.location.hash;

  if (!hash) {
    return undefined;
  }

  const rawHash = hash.slice(1);
  const hashParts = rawHash.split("#").filter(Boolean);

  for (const hashPart of hashParts) {
    const id = decodeHashPart(hashPart);

    if (!document.getElementById(id)) {
      continue;
    }

    if (hashPart !== rawHash) {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}#${hashPart}`,
      );
    }

    return id;
  }

  return decodeHashPart(rawHash);
}

function scrollToHashTarget() {
  const id = getHashTargetId();

  if (!id) {
    return;
  }

  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  const top =
    target.getBoundingClientRect().top + window.scrollY - getScrollOffset();

  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });

  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
  }

  target.focus({ preventScroll: true });
}

function hasActiveIntro() {
  const intro = document.querySelector("[data-portfolio-intro]");

  return Boolean(intro && window.getComputedStyle(intro).display !== "none");
}

export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let fallbackTimer = 0;

    const scheduleScroll = () => {
      const runAfterLayout = () => {
        window.requestAnimationFrame(() => {
          scrollToHashTarget();
        });
        window.setTimeout(scrollToHashTarget, 120);
        window.setTimeout(scrollToHashTarget, 500);
      };

      if (!hasActiveIntro()) {
        runAfterLayout();
        return;
      }

      const handleIntroComplete = () => {
        window.removeEventListener("portfolio:intro-complete", handleIntroComplete);
        window.clearTimeout(fallbackTimer);
        runAfterLayout();
      };

      window.addEventListener("portfolio:intro-complete", handleIntroComplete, {
        once: true,
      });

      fallbackTimer = window.setTimeout(handleIntroComplete, 5200);
    };

    scheduleScroll();

    window.addEventListener("hashchange", scheduleScroll);

    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("hashchange", scheduleScroll);
    };
  }, [pathname]);

  return null;
}
