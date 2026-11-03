import { cx } from "../shared/utils/cx";

interface ProgressBarProps {
  /** 0 - 100. Out-of-range values are clamped. */
  value: number;
  /** Accessible name, e.g. "Stock claimed". */
  label: string;
  /** Extra classes for the track (margins, height, track colour). */
  className?: string;
  /** Classes for the filled bar (colour / gradient). Tailwind classes must be full literals. */
  barClassName?: string;
}

export function ProgressBar({ value, label, className, barClassName }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={cx("h-1.5 w-full overflow-hidden rounded-full bg-gray-200", className)}
    >
      <div
        className={cx("h-full rounded-full transition-[width] duration-700", barClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
