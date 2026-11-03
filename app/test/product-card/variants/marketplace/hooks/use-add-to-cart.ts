import { useCallback, useEffect, useRef, useState } from "react";

export type CartStatus = "idle" | "loading" | "added";

/**
 * Handles the "Add to Cart" button lifecycle. `onAdd` may be sync or async.
 * Shows a loading state, blocks double-clicks, and cleans up its timer on unmount.
 * Errors are swallowed here on purpose - handle/toast them inside your `onAdd`.
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
