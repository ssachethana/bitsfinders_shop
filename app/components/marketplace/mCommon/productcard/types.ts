/** Which visual treatment the card gets. Ideally decided by your backend (e.g. `product.campaign`). */
export type ProductVariant = "normal" | "hot" | "flash";

export interface Product {
  id: number | string;
  title: string;
  /** Current selling price. */
  price: number;
  /** Original price. When higher than `price`, the strike-through + discount badge are shown. */
  oldPrice?: number;
  /** Optional server-provided discount %. If omitted it is derived from `price` / `oldPrice`. */
  discount?: number;
  seller?: string;
  /** 0 – 5 */
  rating: number;
  reviews: number;
  /** Image URL. Falls back to an icon tile. */
  image?: string;
  /** When set, the whole card is clickable (accessible "stretched link" on the title). */
  href?: string;
  /** Variant coming from the API. The `variant` prop on <ProductCard> overrides it. */
  variant?: ProductVariant;

  /* ---- flash-deal data (only used when the variant enables it) ---- */
  /** Deal end time – ISO string, epoch ms or Date. */
  endsAt?: string | number | Date;
  /** Units available in the campaign. */
  stockTotal?: number;
  /** Units already claimed. */
  stockSold?: number;
}