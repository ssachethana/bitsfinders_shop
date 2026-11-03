import type { ProductId, StockStatus } from "../../shared/types/product-card.types";
import { getStockStatus } from "../../shared/utils/stock-status";
import type { CashierProduct } from "./cashier-product-card.types";

export interface CashierCardViewModel {
  id: ProductId;
  name: string;
  categoryName: string;
  imageUrl?: string;
  /** First letter of the name, shown when there is no image. */
  initial: string;
  price: number | null;
  stock: number;
  stockStatus: StockStatus;
  /** e.g. "10% OFF" / "-Rs.50". `null` when there is no promotion or the item is out of stock. */
  promoLabel: string | null;
}

export function toCashierCardViewModel(product: CashierProduct, currency: string): CashierCardViewModel {
  const stockStatus = getStockStatus(product.currentStock, product.lowStockThreshold);
  const promo = product.activePromotion;

  return {
    id: product.id,
    name: product.name,
    categoryName: product.category.name,
    imageUrl: product.imageUrl || undefined,
    initial: product.name.charAt(0).toUpperCase(),
    price: product.sellPrice,
    stock: product.currentStock,
    stockStatus,
    promoLabel:
      promo && stockStatus !== "out"
        ? promo.discountType === "PERCENT"
          ? `${promo.value}% OFF`
          : `-${currency}${promo.value}`
        : null,
  };
}
