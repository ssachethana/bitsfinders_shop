
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Detects when an element enters the viewport.
 * Animation triggers only once.
 */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    // Fallback for browsers without IntersectionObserver.
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, seen] as const;
}

/* -------------------------------------------------------
   Animated Number Counter
------------------------------------------------------- */

type CountUpProps = {
  to: number;
  run: boolean;
};

export function CountUp({ to, run }: CountUpProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;

    // Respect the user's reduced-motion preference.
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      return;
    }

    let animationFrame: number;

    const start = performance.now();
    const duration = 1200;

    const animate = (time: number) => {
      const progress = Math.min(
        (time - start) / duration,
        1
      );

      // Cubic ease-out animation.
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(to * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    // Prevent animation from continuing after unmount.
    return () => cancelAnimationFrame(animationFrame);
  }, [to, run]);

  // Display the final value immediately for reduced-motion users.
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const displayValue = run && reducedMotion ? to : value;

  return <>{displayValue.toLocaleString()}</>;
}
