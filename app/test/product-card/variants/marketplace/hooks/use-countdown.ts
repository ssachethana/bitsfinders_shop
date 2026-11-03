import { useEffect, useRef, useSyncExternalStore } from "react";

const subscribeToSecond = (notify: () => void) => {
  const id = setInterval(notify, 1000);
  return () => clearInterval(id);
};
const getNowSecond = () => Math.floor(Date.now() / 1000) * 1000;
const getServerNow = () => null; // server + hydration render -> "not ready yet"

/**
 * Milliseconds left until `endsAt`, ticking every second.
 * Returns `null` on the server / first render (avoids hydration mismatches) and `0` once finished.
 * Calls `onExpire` exactly once when the time runs out.
 */
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
