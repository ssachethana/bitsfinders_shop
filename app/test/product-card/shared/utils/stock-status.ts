import type { StockStatus } from "../types/product-card.types";

/**
 * The one definition of "low" and "out of stock" used by the inventory and cashier cards.
 * A threshold of 0 (or less) means "no low-stock warning, only out-of-stock".
 */
export function getStockStatus(stock: number, lowStockThreshold = 0): StockStatus {
  if (stock <= 0) return "out";
  if (lowStockThreshold > 0 && stock <= lowStockThreshold) return "low";
  return "in";
}
