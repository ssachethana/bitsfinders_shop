import type { ProductId } from "../../shared/types/product-card.types";
import type { MarketplaceVariantConfig } from "./marketplace-product-card.config";
import type { MarketplaceProduct } from "./marketplace-product-card.types";

/** Everything the card renders, already decided. The component never re-derives any of this. */
export interface MarketplaceCardViewModel {
  id: ProductId;
  title: string;
  href?: string;
  image?: string;
  seller?: string;
  price: number;
  oldPrice?: number;
  discountPercent: number;
  rating: number;
  reviews: number;
  /** Set only when this variant shows a countdown AND the product has an end time. */
  countdownEndsAt: string | number | Date | null;
  /** Set only when this variant shows the stock meter AND the product has a campaign total. */
  stock: { sold: number; total: number } | null;
  soldOut: boolean;
}

/** Discount % - trusts the server value if present, otherwise derives it (never goes out of sync). */
export function getDiscountPercent({
  price,
  oldPrice,
  discount,
}: Pick<MarketplaceProduct, "price" | "oldPrice" | "discount">): number {
  if (typeof discount === "number") return Math.max(0, Math.round(discount));
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round((1 - price / oldPrice) * 100);
}

export function toMarketplaceCardViewModel(
  product: MarketplaceProduct,
  config: Pick<MarketplaceVariantConfig, "showCountdown" | "showStock">
): MarketplaceCardViewModel {
  const total = product.stockTotal;
  const sold = product.stockSold ?? 0;

  return {
    id: product.id,
    title: product.title,
    href: product.href,
    image: product.image,
    seller: product.seller,
    price: product.price,
    oldPrice: product.oldPrice,
    discountPercent: getDiscountPercent(product),
    rating: product.rating,
    reviews: product.reviews,
    countdownEndsAt: config.showCountdown && product.endsAt != null ? product.endsAt : null,
    stock: config.showStock && total != null ? { sold, total } : null,
    soldOut: total != null && sold >= total,
  };
}
