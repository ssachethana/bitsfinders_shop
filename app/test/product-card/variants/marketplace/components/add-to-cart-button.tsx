import { Check, Loader2, ShoppingCart } from "lucide-react";
import { cx } from "../../../shared/utils/cx";
import type { MarketplaceVariantConfig } from "../marketplace-product-card.config";
import type { CartStatus } from "../hooks/use-add-to-cart";

interface AddToCartButtonProps {
  status: CartStatus;
  /** When set the button is disabled and shows this text (e.g. "Sold out"). */
  disabledLabel?: string;
  theme: Pick<MarketplaceVariantConfig["theme"], "ctaBorder" | "ctaText" | "ctaFill">;
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
