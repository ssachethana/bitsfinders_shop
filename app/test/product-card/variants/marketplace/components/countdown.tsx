"use client";

import { Timer } from "lucide-react";
import { cx } from "../../../shared/utils/cx";
import { useCountdown } from "../hooks/use-countdown";
import { splitRemaining } from "../utils/split-remaining";

interface CountdownProps {
  endsAt: string | number | Date;
  onExpire?: () => void;
  className?: string;
}

export function Countdown({ endsAt, onExpire, className }: CountdownProps) {
  const remaining = useCountdown(endsAt, onExpire);
  const t = remaining === null ? null : splitRemaining(remaining);

  return (
    // role="timer" is not announced on every tick, so screen readers aren't spammed.
    <div
      role="timer"
      className={cx(
        "mt-2 inline-flex w-fit items-center gap-1 rounded px-1.5 py-1 text-[11px] font-semibold tabular-nums",
        className
      )}
    >
      <Timer aria-hidden className="h-3 w-3" />
      {remaining === 0 ? (
        "Deal ended"
      ) : t ? (
        <>
          <span>Ends in</span>
          <span>
            {t.days > 0 && `${t.days}d `}
            {t.hours}:{t.minutes}:{t.seconds}
          </span>
        </>
      ) : (
        // Same footprint as the real thing -> no layout shift after hydration.
        <>
          <span>Ends in</span>
          <span>--:--:--</span>
        </>
      )}
    </div>
  );
}
