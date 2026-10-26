
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Detects when an element enters the viewport.
 *
 * The animation is triggered only once.
 *
 * @returns
 * ref     - Attach to the element being observed.
 * visible - Whether the element has entered the viewport.
 */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    // Respect users who prefer reduced motion.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    // Observe when the element enters the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          // Stop observing after the first appearance.
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(element);

    // Clean up the observer when the component unmounts.
    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, visible };
}
