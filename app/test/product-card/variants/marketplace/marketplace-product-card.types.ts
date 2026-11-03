import type { ProductId } from "../../shared/types/product-card.types";

/** Visual treatment of the card. Ideally decided by your backend (e.g. `product.campaign`). */
export type MarketplaceVariant = "normal" | "hot" | "flash";

/** What the marketplace API returns for a product. */
export interface MarketplaceProduct {
  id: ProductId;
  title: string;
  /** Current selling price. */
  price: number;
  /** Original price. When higher than `price`, the strike-through + discount badge are shown. */
  oldPrice?: number;
  /** Optional server-provided discount %. If omitted it is derived from `price` / `oldPrice`. */
  discount?: number;
  seller?: string;
  /** 0 - 5 */
  rating: number;
  reviews: number;
  /** Image URL. Falls back to an icon tile. */
  image?: string;
  /** When set, the whole card is clickable (accessible "stretched link" on the title). */
  href?: string;
  /** Variant coming from the API. The `variant` prop on the card overrides it. */
  variant?: MarketplaceVariant;

  /* ---- flash-deal data (only used when the variant enables it) ---- */
  /** Deal end time - ISO string, epoch ms or Date. */
  endsAt?: string | number | Date;
  /** Units available in the campaign. */
  stockTotal?: number;
  /** Units already claimed. */
  stockSold?: number;
}

export interface MarketplaceProductCardProps {
  product: MarketplaceProduct;
  /** Overrides `product.variant`. Defaults to "normal". */
  variant?: MarketplaceVariant;
  /** Position in the grid - drives the staggered reveal delay. */
  index?: number;
  /** Set true for above-the-fold cards (LCP) so the image loads eagerly. */
  priority?: boolean;
  currency?: string;
  imageSizes?: string;
  /** Pass to control the heart from outside (e.g. server state). Omit for uncontrolled. */
  wishlisted?: boolean;
  /** Wrap in useCallback in the parent - the card is memoised. May be async. */
  onAddToCart?: (product: MarketplaceProduct) => void | Promise<void>;
  onToggleWishlist?: (product: MarketplaceProduct, liked: boolean) => void;
  /** Fires once when a flash deal's countdown reaches zero. */
  onDealExpire?: (product: MarketplaceProduct) => void;
  className?: string;
}
