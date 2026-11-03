const pad = (n: number) => String(n).padStart(2, "0");

/** Splits a millisecond duration into display parts. */
export function splitRemaining(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86_400),
    hours: pad(Math.floor((total % 86_400) / 3_600)),
    minutes: pad(Math.floor((total % 3_600) / 60)),
    seconds: pad(total % 60),
  };
}
