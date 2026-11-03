/**
 * PUBLIC API of the product-card feature.
 * Import from here only - never deep-import from `variants/*` or `primitives/*`.
 */
export { MarketplaceProductCard, MARKETPLACE_VARIANT_CONFIG } from "./variants/marketplace";
export type {
  MarketplaceProduct,
  MarketplaceProductCardProps,
  MarketplaceVariant,
} from "./variants/marketplace";

export { InventoryProductCard } from "./variants/inventory";
export type {
  InventoryMenuAction,
  InventoryProduct,
  InventoryProductCardProps,
  InventoryVariant,
} from "./variants/inventory";

export { CashierProductCard } from "./variants/cashier";
export type { CashierProduct, CashierProductCardProps } from "./variants/cashier";

export { formatPrice } from "./shared/utils/format-price";
