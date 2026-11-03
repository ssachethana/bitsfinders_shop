"use client";

import { useMemo } from "react";
import { DollarSign, Globe } from "lucide-react";
import { Price } from "../../primitives";
import { cx } from "../../shared/utils/cx";
import { FavoriteButton } from "./components/favorite-button";
import { ProductAvatar } from "./components/product-avatar";
import { QuickEditMenu } from "./components/quick-edit-menu";
import { StockIndicator } from "./components/stock-indicator";
import { toInventoryCardViewModel } from "./inventory-product-card.mapper";
import type { InventoryProductCardProps } from "./inventory-product-card.types";

export function InventoryProductCard({
  product,
  variant = "default",
  onFavoriteToggle,
  onMenuClick,
  onMenuAction,
  onClick,
  className,
}: InventoryProductCardProps) {
  const vm = useMemo(() => toInventoryCardViewModel(product), [product]);
  const isFeatured = variant === "featured";

  return (
    <div
      onClick={() => onClick?.(vm.id)}
      className={cx(
        "group relative select-none rounded-2xl border transition-all duration-200",
        isFeatured
          ? "border-amber-200 bg-amber-50/40 shadow-sm"
          : vm.isLowStock
            ? "border-red-200 bg-red-50/30"
            : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-md",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between px-4 pb-2 pt-4">
        <div className="flex items-center gap-3">
          <ProductAvatar
            imageUrl={vm.imageUrl}
            name={vm.name}
            fallbackEmoji={vm.fallbackEmoji}
            fallbackBgClass={vm.fallbackBgClass}
          />
          <div>
            <p className="text-sm font-semibold leading-tight text-gray-900">{vm.name}</p>
            <p className="text-xs capitalize text-gray-400">{vm.category}</p>
            {vm.brand && <p className="text-[10px] text-gray-300">{vm.brand}</p>}
          </div>
        </div>

        <QuickEditMenu
          onToggle={() => onMenuClick?.(vm.id)}
          onSelect={(action) => onMenuAction?.(vm.id, action)}
        />
      </div>

      {/* Details */}
      <div className="space-y-1.5 px-4 pb-3">
        {vm.sku && <p className="font-mono text-[10px] text-gray-300">SKU: {vm.sku}</p>}

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <DollarSign size={12} className="text-gray-400" />
          <span>
            Price :{" "}
            <Price amount={vm.price} currency={vm.currency} className="font-semibold text-gray-800" />
          </span>
        </div>

        <StockIndicator
          stock={vm.stock}
          unit={vm.stockUnit}
          status={vm.stockStatus}
          percent={vm.stockPercent}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-50 px-4 py-2.5">
        {vm.isUniversalProduct ? (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Globe size={12} className="text-gray-300" />
            Universal Product
          </div>
        ) : (
          <div />
        )}

        <FavoriteButton
          isFavorite={vm.isFavorite}
          onToggle={(next) => onFavoriteToggle?.(vm.id, next)}
        />
      </div>
    </div>
  );
}
