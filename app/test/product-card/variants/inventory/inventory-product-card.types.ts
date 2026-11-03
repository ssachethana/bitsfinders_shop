/** What the inventory API returns for a product. */
export interface InventoryProduct {
  id: string;
  name: string;
  /** Open string so it works with any API-driven category name. */
  category: string;
  price: number;
  currency?: string;
  stock: number;
  stockUnit?: string;
  lowStockThreshold?: number;
  isFavorite?: boolean;
  isUniversalProduct?: boolean;
  imageUrl?: string;
  emoji?: string;
  brand?: string;
  sku?: string;
}

/** Visual treatment of the inventory card. */
export type InventoryVariant = "default" | "featured";

export type InventoryMenuAction = "edit" | "duplicate" | "archive" | "delete";

export interface InventoryProductCardProps {
  product: InventoryProduct;
  variant?: InventoryVariant;
  onFavoriteToggle?: (id: string, value: boolean) => void;
  /** Fires every time the "..." button is pressed (kept for backwards compatibility). */
  onMenuClick?: (id: string) => void;
  /** Fires when a menu entry is chosen. */
  onMenuAction?: (id: string, action: InventoryMenuAction) => void;
  onClick?: (id: string) => void;
  className?: string;
}
