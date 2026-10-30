import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

/**
 * Tracks whether the page has scrolled past `threshold` (state, flips rarely)
 * and writes scroll progress straight to `barRef` as a transform (no re-renders).
 */

/**
 * Mobile menu state. While open it locks body scroll, closes on Escape
 * and closes when the viewport grows past the `md` breakpoint.
 */
export function useMobileMenu(breakpoint = 768) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onResize = () => window.innerWidth >= breakpoint && close();
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, breakpoint, close]);

  return { open, close, toggle };
}

/** Writes cursor position into CSS variables (--mx / --my) for the glow effect. */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback((e: MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return { ref, onMouseMove };
}
