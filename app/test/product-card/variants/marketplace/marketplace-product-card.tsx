"use client";

import "./marketplace-product-card.css";
import { memo, useCallback, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { cx } from "../../shared/utils/cx";
import { AddToCartButton } from "./components/add-to-cart-button";
import { BadgeStack } from "./components/badge-stack";
import { Countdown } from "./components/countdown";
import { PriceBlock } from "./components/price-block";
import { ProductMedia } from "./components/product-media";
import { ProductTitle } from "./components/product-title";
import { StarRating } from "./components/star-rating";
import { StockMeter } from "./components/stock-meter";
import { WishlistButton } from "./components/wishlist-button";
import { getMarketplaceVariantConfig } from "./marketplace-product-card.config";
import { toMarketplaceCardViewModel } from "./marketplace-product-card.mapper";
import type { MarketplaceProductCardProps } from "./marketplace-product-card.types";
import { useAddToCart } from "./hooks/use-add-to-cart";
import { useInView } from "./hooks/use-in-view";
import { useTilt } from "./hooks/use-tilt";

/** Matches a typical 2 / 3 / 4+ column grid. Override via `imageSizes` if your grid differs. */
const DEFAULT_IMAGE_SIZES = "(min-width:1280px) 16vw, (min-width:768px) 25vw, 45vw";

function MarketplaceProductCardBase({
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
}: MarketplaceProductCardProps) {
  const variant = variantProp ?? product.variant ?? "normal";
  const config = getMarketplaceVariantConfig(variant);
  const { theme } = config;
  const vm = useMemo(() => toMarketplaceCardViewModel(product, config), [product, config]);

  const [revealRef, seen] = useInView<HTMLDivElement>();
  const { ref: tiltRef, handlers } = useTilt<HTMLElement>();
  const { status, add } = useAddToCart(product, onAddToCart);

  /* wishlist: controlled if `wishlisted` is passed, otherwise local state */
  const [localLiked, setLocalLiked] = useState(false);
  const liked = wishlisted ?? localLiked;
  const toggleLike = (next: boolean) => {
    setLocalLiked(next);
    onToggleWishlist?.(product, next);
  };

  const [expired, setExpired] = useState(false);
  const handleExpire = useCallback(() => {
    setExpired(true);
    onDealExpire?.(product);
  }, [onDealExpire, product]);

  const disabledLabel = vm.soldOut ? "Sold out" : expired ? "Deal ended" : undefined;

  return (
    <div
      ref={revealRef}
      // `% 6` caps the stagger so card #40 doesn't wait 3 seconds to appear.
      style={{ transitionDelay: `${(index % 6) * 80}ms` }}
      className={cx(
        "transition-all duration-700 ease-out [perspective:900px] motion-reduce:transition-none",
        seen
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
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

        <BadgeStack tag={config.tag} discount={vm.discountPercent} discountClass={theme.discount} />
        <WishlistButton liked={liked} onToggle={toggleLike} />

        <ProductMedia image={vm.image} title={vm.title} sizes={imageSizes} priority={priority} />

        <div className="mt-3 flex flex-1 flex-col">
          <ProductTitle title={vm.title} href={vm.href} />
          <PriceBlock price={vm.price} oldPrice={vm.oldPrice} currency={currency} />

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            {vm.seller && <span className="text-[11px] text-gray-500">{vm.seller}</span>}
            <StarRating rating={vm.rating} reviews={vm.reviews} />
          </div>

          {/* variant-specific extras - driven by config + data, not by if/else on the variant name */}
          {vm.countdownEndsAt !== null && (
            <Countdown endsAt={vm.countdownEndsAt} onExpire={handleExpire} className={theme.countdown} />
          )}
          {vm.stock && <StockMeter sold={vm.stock.sold} total={vm.stock.total} barClass={theme.meter} />}

          <div className="mt-auto pt-3">
            <AddToCartButton status={status} disabledLabel={disabledLabel} theme={theme} onClick={add} />
          </div>
        </div>
      </article>
    </div>
  );
}

/** Memoised: in a long grid, only the card whose props changed re-renders. */
export const MarketplaceProductCard = memo(MarketplaceProductCardBase);
