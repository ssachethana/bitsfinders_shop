import { useEffect, useState } from "react";

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