import { Price } from "../../../primitives";

interface PriceBlockProps {
  price: number;
  oldPrice?: number;
  currency: string;
}

export function PriceBlock({ price, oldPrice, currency }: PriceBlockProps) {
  return (
    <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
      <Price amount={price} currency={currency} className="text-sm font-bold text-gray-900 sm:text-base" />
      {oldPrice != null && oldPrice > price && (
        <Price amount={oldPrice} currency={currency} className="text-[11px] text-gray-500 line-through" />
      )}
    </div>
  );
}
