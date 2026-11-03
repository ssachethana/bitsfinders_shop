import type { ProductId } from "../../shared/types/product-card.types";

/**
 * The fields the cashier card actually reads. It is deliberately structural: your full
 * `Product` from `types/sales` has more fields and is still accepted (the card is generic).
 * If you prefer, replace this with `Pick<Product, "id" | "name" | ...>` from `types/sales`.
 */
export interface CashierProduct {
  id: ProductId;
  name: string;
  imageUrl?: string | null;
  category: { name: string };
  /** `null` = no selling price set. */
  sellPrice: number | null;
  currentStock: number;
  lowStockThreshold: number;
  activePromotion?: {
    /** "PERCENT" renders as "10% OFF"; anything else is treated as a fixed amount. */
    discountType: string;
    value: number;
  } | null;
}

export interface CashierProductCardProps<P extends CashierProduct = CashierProduct> {
  product: P;
  currency: string;
  /** Receives the SAME object you passed in, so you keep your full Product type. */
  onAddToCart: (product: P) => void;
  className?: string;
}
