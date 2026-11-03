"use client";

import { useMemo } from "react";
import { Price } from "../../primitives";
import { cx } from "../../shared/utils/cx";
import { PromoBadge } from "./components/promo-badge";
import { ProductThumbnail } from "./components/product-thumbnail";
import { StockPill } from "./components/stock-pill";
import { toCashierCardViewModel } from "./cashier-product-card.mapper";
import type { CashierProduct, CashierProductCardProps } from "./cashier-product-card.types";

/** Generic so `onAddToCart` receives your own full Product type, not a trimmed-down one. */
export function CashierProductCard<P extends CashierProduct>({
  product,
  currency,
  onAddToCart,
  className,
}: CashierProductCardProps<P>) {
  const vm = useMemo(() => toCashierCardViewModel(product, currency), [product, currency]);
  const outOfStock = vm.stockStatus === "out";

  return (
    <button
      type="button"
      onClick={() => !outOfStock && onAddToCart(product)}
      disabled={outOfStock}
      className={cx(
        "relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-[1.5px] border-slate-100 bg-white p-0 text-left transition-all duration-150",
        outOfStock
          ? "cursor-not-allowed opacity-50"
          : "hover:-translate-y-px hover:border-indigo-500 hover:shadow-[0_4px_12px_rgba(99,102,241,0.12)] active:scale-[0.97]",
        className
      )}
    >
      {vm.promoLabel && <PromoBadge label={vm.promoLabel} />}

      <ProductThumbnail imageUrl={vm.imageUrl} name={vm.name} initial={vm.initial} />

      <div className="flex flex-1 flex-col gap-0.5 p-2">
        <span className="line-clamp-2 text-[0.78rem] font-bold leading-snug text-slate-900">{vm.name}</span>
        <span className="text-[0.65rem] text-gray-400">{vm.categoryName}</span>

        <div className="mt-auto flex items-center justify-between pt-1">
          <Price amount={vm.price} currency={currency} className="text-[0.8rem] font-bold text-slate-900" />
          <StockPill status={vm.stockStatus} stock={vm.stock} />
        </div>
      </div>
    </button>
  );
}
