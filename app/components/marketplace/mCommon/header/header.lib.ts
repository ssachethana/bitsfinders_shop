import { useEffect, useState, type RefObject } from "react";

/* ── Config ─────────────────────────────────────────────── */

export const DEFAULT_CATEGORIES = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
  "Toys",
];

export const PLACEHOLDERS = [
  "Search Products brands or shops...",
  "Try “wireless earbuds”...",
  "Try “running shoes”...",
  "Try “smart watch”...",
];

/* ── Utils ──────────────────────────────────────────────── */

/** Tiny className joiner: cn("a", cond && "b", undefined) -> "a b" */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/* ── Hooks ──────────────────────────────────────────────── */

/**
 * Calls `onClose` when the user clicks outside `ref` or presses Escape.
 * Listeners are only attached while `enabled` is true.
 * `onClose` should be stable (wrap it in useCallback) to avoid re-subscribing.
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  onClose: () => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [ref, onClose, enabled]);
}

/**
 * Cycles through `placeholders` every `intervalMs`.
 * Pauses while `paused` is true (e.g. when the user has typed something).
 */
export function useRotatingPlaceholder(
  placeholders: string[],
  paused: boolean,
  intervalMs = 3000
): string {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused || placeholders.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % placeholders.length),
      intervalMs
    );
    return () => clearInterval(id);
  }, [paused, placeholders.length, intervalMs]);

  return placeholders[index] ?? "";
}