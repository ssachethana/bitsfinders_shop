import { Package } from "lucide-react";
import { ProgressBar } from "../../../primitives";
import type { StockStatus } from "../../../shared/types/product-card.types";
import { cx } from "../../../shared/utils/cx";

interface StockIndicatorProps {
  stock: number;
  unit: string;
  status: StockStatus;
  /** 0 - 100 */
  percent: number;
}

export function StockIndicator({ stock, unit, status, percent }: StockIndicatorProps) {
  const isLow = status !== "in";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <Package size={12} className="text-gray-400" />
          <span>
            Stock :{" "}
            <span className={cx("font-semibold", isLow ? "text-red-500" : "text-gray-800")}>{stock}</span>{" "}
            <span className="text-gray-400">{unit}</span>
          </span>
        </div>
        {isLow && (
          <span className="text-[10px] font-medium text-red-400">
            {status === "out" ? "Out of stock" : "Low stock"}
          </span>
        )}
      </div>
      {isLow && <ProgressBar value={percent} label="Stock level" className="mt-0.5" barClassName="bg-red-500" />}
    </div>
  );
}
