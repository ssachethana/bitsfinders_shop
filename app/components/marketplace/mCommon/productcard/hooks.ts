"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { PointerEvent } from "react";

/* ---- reveal on scroll ------------------------------------------------ */
/** Returns [ref, seen]; `seen` flips to true (once) when the element scrolls into view. */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // IntersectionObserver is supported by every browser we target, so no synchronous
    // setState fallback is needed (setState inside an effect body causes cascading renders).
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, seen] as const;
}

/* ---- 3D tilt --------------------------------------------------------- */
/**
 * Mouse-driven tilt + glow position.
 * Writes CSS variables straight to the DOM inside requestAnimationFrame, so moving the
 * mouse causes ZERO React re-renders (the old version re-rendered the card on every move).
 * Touch / pen input is ignored.
 */
export function useTilt<T extends HTMLElement>(maxDeg = 8) {
  const ref = useRef<T>(null);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onPointerMove = useCallback(
    (e: PointerEvent<T>) => {
      if (e.pointerType !== "mouse") return;
      const { clientX, clientY } = e;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (clientX - r.left) / r.width;
        const py = (clientY - r.top) / r.height;
        el.style.setProperty("--pc-rx", `${(py - 0.5) * -maxDeg}deg`);
        el.style.setProperty("--pc-ry", `${(px - 0.5) * maxDeg}deg`);
        el.style.setProperty("--pc-gx", `${px * 100}%`);
        el.style.setProperty("--pc-gy", `${py * 100}%`);
      });
    },
    [maxDeg]
  );

  const onPointerLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--pc-rx", "0deg");
    el.style.setProperty("--pc-ry", "0deg");
    el.style.setProperty("--pc-gx", "50%");
    el.style.setProperty("--pc-gy", "50%");
  }, []);

  return { ref, handlers: { onPointerMove, onPointerLeave } };
}

/* ---- countdown ------------------------------------------------------- */
/**
 * Milliseconds left until `endsAt`, ticking every second.
 * Returns `null` on the server / first render (avoids hydration mismatches) and `0` once finished.
 * Calls `onExpire` exactly once when the time runs out.
 */
const subscribeToSecond = (notify: () => void) => {
  const id = setInterval(notify, 1000);
  return () => clearInterval(id);
};
const getNowSecond = () => Math.floor(Date.now() / 1000) * 1000;
const getServerNow = () => null; // server + hydration render -> "not ready yet"

export function useCountdown(endsAt?: string | number | Date, onExpire?: () => void) {
  const end = endsAt == null ? null : new Date(endsAt).getTime();

  // External clock subscription: no setState inside an effect, and hydration-safe
  // because the server snapshot is `null`.
  const now = useSyncExternalStore<number | null>(subscribeToSecond, getNowSecond, getServerNow);

  const remaining = now === null || end === null || Number.isNaN(end) ? null : Math.max(0, end - now);
  const expired = remaining === 0;

  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    if (expired) onExpireRef.current?.();
  }, [expired]);

  return remaining;
}

/* ---- add to cart ----------------------------------------------------- */
export type CartStatus = "idle" | "loading" | "added";

/**
 * Handles the "Add to Cart" button lifecycle. `onAdd` may be sync or async.
 * Shows a loading state, blocks double-clicks, and cleans up its timer on unmount
 * (the old version could call setState after unmount).
 * Errors are swallowed here on purpose – handle/toast them inside your `onAdd`.
 */
export function useAddToCart<T>(
  item: T,
  onAdd?: (item: T) => void | Promise<void>,
  resetMs = 1600
) {
  const [status, setStatus] = useState<CartStatus>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const add = useCallback(async () => {
    if (status !== "idle") return;
    setStatus("loading");
    try {
      await onAdd?.(item);
      setStatus("added");
      timer.current = setTimeout(() => setStatus("idle"), resetMs);
    } catch {
      setStatus("idle");
    }
  }, [status, onAdd, item, resetMs]);

  return { status, add };
}