import { AlertTriangle } from "lucide-react";
import type { StockStatus } from "../../../shared/types/product-card.types";
import { cx } from "../../../shared/utils/cx";

const TONE: Record<StockStatus, string> = {
  out: "bg-red-50 text-red-800",
  low: "bg-orange-50 text-orange-700",
  in: "bg-green-50 text-green-700",
};

export function StockPill({ status, stock }: { status: StockStatus; stock: number }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-0.5 rounded px-1.25 py-px text-[0.62rem] font-bold",
        TONE[status]
      )}
    >
      {status === "out" ? (
        "Out"
      ) : status === "low" ? (
        <>
          <AlertTriangle size={9} />
          {stock}
        </>
      ) : (
        stock
      )}
    </span>
  );
}
