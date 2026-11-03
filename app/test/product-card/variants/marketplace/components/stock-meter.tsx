import { ProgressBar } from "../../../primitives";
import { cx } from "../../../shared/utils/cx";

interface StockMeterProps {
  sold: number;
  total: number;
  barClass: string;
}

export function StockMeter({ sold, total, barClass }: StockMeterProps) {
  const pct = total > 0 ? Math.min(100, Math.round((sold / total) * 100)) : 0;
  return (
    <div className="mt-2">
      <ProgressBar value={pct} label="Stock claimed" barClassName={cx("bg-gradient-to-r", barClass)} />
      <p className="mt-0.5 text-[10px] text-gray-500">{pct >= 90 ? "Almost gone!" : `${sold} sold`}</p>
    </div>
  );
}
