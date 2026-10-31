"use client";

import { Check, Heart, Loader2, ShoppingCart, Star, Timer } from "lucide-react";
import { useCountdown, type CartStatus } from "@/app/components/marketplace/mCommon/productcard/hooks";
import { cx, formatPrice, splitRemaining } from "@/app/components/marketplace/mCommon/productcard/utils";
import type { VariantConfig } from "@/app/components/marketplace/mCommon/productcard/variants";



/* Small presentational pieces. No data fetching, no business rules – props in, JSX out. */

/* ---- rating ---------------------------------------------------------- */
export function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  const value = Math.min(5, Math.max(0, rating));
  return (
    <div className="flex items-center gap-1">
      <div role="img" aria-label={`Rated ${value} out of 5`} className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            aria-hidden
            style={{ transitionDelay: `${i * 40}ms` }}
            className={cx(
              "h-3 w-3 transition-transform duration-300 group-hover:scale-110",
              i < Math.round(value) ? "fill-amber-400 text-amber-400" : "text-gray-300"
            )}
          />
        ))}
      </div>
      {reviews > 0 && <span className="text-[10px] text-gray-500">({reviews})</span>}
    </div>
  );
}

/* ---- badges ---------------------------------------------------------- */
interface BadgeStackProps {
  tag?: VariantConfig["tag"];
  discount: number;
  discountClass: string;
}

export function BadgeStack({ tag, discount, discountClass }: BadgeStackProps) {
  if (!tag && discount <= 0) return null;
  const TagIcon = tag?.icon;

  return (
    <div className="pointer-events-none absolute left-2 top-2 z-10 flex flex-col items-start gap-1">
      {tag && TagIcon && (
        <span
          className={cx(
            "inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white sm:text-xs",
            tag.className
          )}
        >
          <TagIcon aria-hidden className="h-3 w-3" />
          {tag.label}
        </span>
      )}
      {discount > 0 && (
        <span
          className={cx(
            "rounded px-1.5 py-0.5 text-[10px] font-bold text-white sm:text-xs",
            discountClass
          )}
        >
          -{discount}%
        </span>
      )}
    </div>
  );
}

/* ---- wishlist -------------------------------------------------------- */
export function WishlistButton({ liked, onToggle }: { liked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={liked}
      aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
      className="absolute right-2 top-2 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/80 backdrop-blur transition hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 active:scale-90"
    >
      <Heart
        key={String(liked)} // re-mount so the pop animation replays on every toggle
        aria-hidden
        className={cx(
          "h-5 w-5 transition-colors",
          liked ? "pc-pop fill-red-500 text-red-500" : "text-gray-500 hover:text-red-400"
        )}
      />
    </button>
  );
}

/* ---- price ----------------------------------------------------------- */
interface PriceBlockProps {
  price: number;
  oldPrice?: number;
  currency: string;
}

export function PriceBlock({ price, oldPrice, currency }: PriceBlockProps) {
  return (
    <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
      <span className="text-sm font-bold text-gray-900 sm:text-base">
        {currency} {formatPrice(price)}
      </span>
      {oldPrice != null && oldPrice > price && (
        <span className="text-[11px] text-gray-500 line-through">
          {currency} {formatPrice(oldPrice)}
        </span>
      )}
    </div>
  );
}

/* ---- flash: countdown ------------------------------------------------ */
interface CountdownProps {
  endsAt: string | number | Date;
  onExpire?: () => void;
  className?: string;
}

export function Countdown({ endsAt, onExpire, className }: CountdownProps) {
  const remaining = useCountdown(endsAt, onExpire);
  const t = remaining === null ? null : splitRemaining(remaining);

  return (
    // role="timer" is not announced on every tick, so screen readers aren't spammed.
    <div
      role="timer"
      className={cx(
        "mt-2 inline-flex w-fit items-center gap-1 rounded px-1.5 py-1 text-[11px] font-semibold tabular-nums",
        className
      )}
    >
      <Timer aria-hidden className="h-3 w-3" />
      {remaining === 0 ? (
        "Deal ended"
      ) : t ? (
        <>
          <span>Ends in</span>
          <span>
            {t.days > 0 && `${t.days}d `}
            {t.hours}:{t.minutes}:{t.seconds}
          </span>
        </>
      ) : (
        // Same footprint as the real thing -> no layout shift after hydration.
        <>
          <span>Ends in</span>
          <span>--:--:--</span>
        </>
      )}
    </div>
  );
}

/* ---- flash: stock meter ---------------------------------------------- */
interface StockMeterProps {
  sold: number;
  total: number;
  barClass: string;
}

export function StockMeter({ sold, total, barClass }: StockMeterProps) {
  const pct = total > 0 ? Math.min(100, Math.round((sold / total) * 100)) : 0;
  return (
    <div className="mt-2">
      <div
        role="progressbar"
        aria-label="Stock claimed"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        className="h-1.5 overflow-hidden rounded-full bg-gray-200"
      >
        <div
          className={cx("h-full rounded-full bg-gradient-to-r transition-[width] duration-700", barClass)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-0.5 text-[10px] text-gray-500">{pct >= 90 ? "Almost gone!" : `${sold} sold`}</p>
    </div>
  );
}

/* ---- add to cart ----------------------------------------------------- */
interface AddToCartButtonProps {
  status: CartStatus;
  /** When set the button is disabled and shows this text (e.g. "Sold out"). */
  disabledLabel?: string;
  theme: Pick<VariantConfig["theme"], "ctaBorder" | "ctaText" | "ctaFill">;
  onClick: () => void;
}

export function AddToCartButton({ status, disabledLabel, theme, onClick }: AddToCartButtonProps) {
  const disabled = Boolean(disabledLabel);
  const added = status === "added";
  const loading = status === "loading";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={cx(
        "relative z-20 flex min-h-[44px] w-full items-center justify-center overflow-hidden rounded-lg border px-3 py-2 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 active:scale-95 disabled:cursor-not-allowed",
        disabled
          ? "border-gray-200 bg-gray-100 text-gray-500"
          : added
            ? "border-emerald-500 bg-emerald-500 text-white"
            : cx(
                theme.ctaBorder,
                // Touch devices (no hover) get the filled button by default; mouse devices get the hover sweep.
                "text-white hover:shadow-lg [@media(hover:hover)]:group-hover:text-white",
                theme.ctaText
              )
      )}
    >
      {!disabled && !added && (
        <span
          aria-hidden
          className={cx(
            "absolute inset-0 origin-left scale-x-100 bg-gradient-to-r transition-transform duration-500 ease-out [@media(hover:hover)]:scale-x-0 [@media(hover:hover)]:group-hover:scale-x-100",
            theme.ctaFill
          )}
        />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2" aria-live="polite">
        {disabledLabel ? (
          disabledLabel
        ) : added ? (
          <>
            <Check aria-hidden className="pc-pop h-4 w-4" /> Added!
          </>
        ) : loading ? (
          <>
            <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> Adding…
          </>
        ) : (
          <>
            <ShoppingCart
              aria-hidden
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-12"
            />
            Add to Cart
          </>
        )}
      </span>
    </button>
  );
}