import { useCallback, useEffect, useRef } from "react";
import type { PointerEvent } from "react";

/**
 * Mouse-driven tilt + glow position.
 * Writes CSS variables straight to the DOM inside requestAnimationFrame, so moving the
 * mouse causes ZERO React re-renders. Touch / pen input is ignored.
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
