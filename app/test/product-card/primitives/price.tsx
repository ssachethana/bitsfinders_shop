import { formatPrice } from "../shared/utils/format-price";

interface PriceProps {
  /** `null` / `undefined` renders the fallback (e.g. an item with no price set). */
  amount: number | null | undefined;
  currency: string;
  fallback?: string;
  className?: string;
}

/** "LKR 2,450.00" - or "—" when there is no price. Pure text, no layout opinions. */
export function Price({ amount, currency, fallback = "—", className }: PriceProps) {
  return (
    <span className={className}>
      {amount == null ? fallback : `${currency} ${formatPrice(amount)}`}
    </span>
  );
}
