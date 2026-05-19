"use client";

import { useLayoutEffect } from "react";

function isReloadNavigation() {
  const [navigation] = performance.getEntriesByType(
    "navigation",
  ) as PerformanceNavigationTiming[];

  if (navigation) {
    return navigation.type === "reload";
  }

  return performance.navigation?.type === 1;
}

export default function ScrollToTopOnReload() {
  useLayoutEffect(() => {
    const previousScrollRestoration = history.scrollRestoration;

    history.scrollRestoration = "manual";

    if (isReloadNavigation() && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
    }

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return null;
}
