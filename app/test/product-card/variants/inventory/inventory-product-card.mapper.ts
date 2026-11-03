import type { StockStatus } from "../../shared/types/product-card.types";
import { getStockStatus } from "../../shared/utils/stock-status";
import type { InventoryProduct } from "./inventory-product-card.types";
import { getCategoryPresentation } from "./utils/category-presentation";

export interface InventoryCardViewModel {
  id: string;
  name: string;
  category: string;
  brand?: string;
  sku?: string;
  /** `null` when the product has no usable price (renders as "—"). */
  price: number | null;
  currency: string;
  stock: number;
  stockUnit: string;
  stockStatus: StockStatus;
  /** True for both "low" and "out" - drives the red styling. */
  isLowStock: boolean;
  /** 0 - 100, used by the low-stock bar. */
  stockPercent: number;
  isFavorite: boolean;
  isUniversalProduct: boolean;
  imageUrl?: string;
  fallbackEmoji: string;
  fallbackBgClass: string;
}

export function toInventoryCardViewModel(product: InventoryProduct): InventoryCardViewModel {
  const {
    id,
    name,
    category,
    price,
    currency = "LKR",
    stock,
    stockUnit = "Unit",
    lowStockThreshold = 15,
    isFavorite = false,
    isUniversalProduct = false,
    imageUrl,
    emoji,
    brand,
    sku,
  } = product;

  const stockStatus = getStockStatus(stock, lowStockThreshold);
  const presentation = getCategoryPresentation(category);

  return {
    id,
    name,
    category,
    brand,
    sku,
    price: price > 0 ? price : null,
    currency,
    stock,
    stockUnit,
    stockStatus,
    isLowStock: stockStatus !== "in",
    stockPercent: Math.min(100, Math.max(0, (stock / Math.max(lowStockThreshold * 3, 1)) * 100)),
    isFavorite,
    isUniversalProduct,
    imageUrl,
    fallbackEmoji: emoji ?? presentation.emoji,
    fallbackBgClass: presentation.bgClass,
  };
}
