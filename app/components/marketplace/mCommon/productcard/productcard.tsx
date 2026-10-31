"use client";

import "@/app/components/marketplace/mCommon/productcard/productcard.css";
import { memo, useCallback, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";
import { useAddToCart, useInView, useTilt } from "@/app/components/marketplace/mCommon/productcard/hooks";
import {
  AddToCartButton,
  BadgeStack,
  Countdown,
  PriceBlock,
  StarRating,
  StockMeter,
  WishlistButton,
} from "@/app/components/marketplace/mCommon/productcard/parts";
import type { Product, ProductVariant } from "./types";
import { cx, getDiscountPercent } from "@/app/components/marketplace/mCommon/productcard/utils";
import { getVariantConfig } from "@/app/components/marketplace/mCommon/productcard/variants";


/** Matches a typical 2 / 3 / 4+ column grid. Override via `imageSizes` if your grid differs. */
const DEFAULT_IMAGE_SIZES = "(min-width:1280px) 16vw, (min-width:768px) 25vw, 45vw";

export interface ProductCardProps {
  product: Product;
  /** Overrides `product.variant`. Defaults to "normal". */
  variant?: ProductVariant;
  /** Position in the grid – drives the staggered reveal delay. */
  index?: number;
  /** Set true for above-the-fold cards (LCP) so the image loads eagerly. */
  priority?: boolean;
  currency?: string;
  imageSizes?: string;
  /** Pass to control the heart from outside (e.g. server state). Omit for uncontrolled. */
  wishlisted?: boolean;
  /** Wrap in useCallback in the parent – the card is memoised. May be async. */
  onAddToCart?: (product: Product) => void | Promise<void>;
  onToggleWishlist?: (product: Product, liked: boolean) => void;
  /** Fires once when a flash deal's countdown reaches zero. */
  onDealExpire?: (product: Product) => void;
  className?: string;
}

function ProductCardBase({
  product,
  variant: variantProp,
  index = 0,
  priority = false,
  currency = "Rs.",
  imageSizes = DEFAULT_IMAGE_SIZES,
  wishlisted,
  onAddToCart,
  onToggleWishlist,
  onDealExpire,
  className,
}: ProductCardProps) {
  const variant = variantProp ?? product.variant ?? "normal";
  const config = getVariantConfig(variant);
  const { theme } = config;

  const [revealRef, seen] = useInView<HTMLDivElement>();
  const { ref: tiltRef, handlers } = useTilt<HTMLElement>();
  const { status, add } = useAddToCart(product, onAddToCart);

  /* wishlist: controlled if `wishlisted` is passed, otherwise local state */
  const [localLiked, setLocalLiked] = useState(false);
  const liked = wishlisted ?? localLiked;
  const toggleLike = () => {
    const next = !liked;
    setLocalLiked(next);
    onToggleWishlist?.(product, next);
  };

  /* derived display state */
  const [expired, setExpired] = useState(false);
  const handleExpire = useCallback(() => {
    setExpired(true);
    onDealExpire?.(product);
  }, [onDealExpire, product]);

  const discount = getDiscountPercent(product);
  const total = product.stockTotal;
  const sold = product.stockSold ?? 0;
  const showCountdown = config.showCountdown && product.endsAt != null;
  const showStock = config.showStock && total != null;
  const soldOut = total != null && sold >= total;
  const disabledLabel = soldOut ? "Sold out" : expired ? "Deal ended" : undefined;

  return (
    <div
      ref={revealRef}
      // `% 6` caps the stagger so card #40 doesn't wait 3 seconds to appear.
      style={{ transitionDelay: `${(index % 6) * 80}ms` }}
      className={cx(
        "transition-all duration-700 ease-out [perspective:900px] motion-reduce:transition-none",
        seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
        className
      )}
    >
      <article
        ref={tiltRef}
        {...handlers}
        data-variant={variant}
        style={{ "--pc-glow": config.glow } as CSSProperties}
        className={cx(
          "pc-tilt group relative isolate flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-[transform,box-shadow,border-color] duration-200 hover:will-change-transform sm:p-3",
          theme.card
        )}
      >
        {/* cursor-following glow (-z-10 + `isolate` keeps it behind content without per-element z-indexes) */}
        <span
          aria-hidden
          className="pc-glow pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100"
        />

        <BadgeStack
          tag={config.tag}
          discount={discount}
          discountClass={theme.discount}
        />
        <WishlistButton liked={liked} onToggle={toggleLike} />

        {/* image */}
        <div className="relative mx-auto mt-3 grid aspect-square w-[78%] place-items-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
          <span
            aria-hidden
            className="absolute bottom-2 h-1.5 w-1/3 rounded-full bg-black/10 blur-sm transition-all duration-500 group-hover:w-1/4 group-hover:opacity-60"
          />
          <div className="absolute inset-0 grid place-items-center">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes={imageSizes}
                priority={priority}
                className="object-contain p-1 transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <Package
                aria-hidden
                strokeWidth={1.25}
                className="h-1/2 w-1/2 text-gray-700 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
              />
            )}
          </div>
        </div>

        {/* info */}
        <div className="mt-3 flex flex-1 flex-col">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-[13px] font-medium leading-5 text-gray-800 sm:text-sm">
            {product.href ? (
              // "Stretched link": the ::after covers the whole card, so the card is one big
              // click target with a single, accessible link. Buttons sit above it (z-20).
              <Link
                href={product.href}
                className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-gray-900"
              >
                {product.title}
              </Link>
            ) : (
              product.title
            )}
          </h3>

          <PriceBlock price={product.price} oldPrice={product.oldPrice} currency={currency} />

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            {product.seller && <span className="text-[11px] text-gray-500">{product.seller}</span>}
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>

          {/* variant-specific extras – driven by config + data, not by if/else on the variant name */}
          {showCountdown && (
            <Countdown endsAt={product.endsAt!} onExpire={handleExpire} className={theme.countdown} />
          )}
          {showStock && <StockMeter sold={sold} total={total!} barClass={theme.meter} />}

          <div className="mt-auto pt-3">
            <AddToCartButton status={status} disabledLabel={disabledLabel} theme={theme} onClick={add} />
          </div>
        </div>
      </article>
    </div>
  );
}

/** Memoised: in a long grid, only the card whose props changed re-renders. */
export const ProductCard = memo(ProductCardBase);
export default ProductCard;