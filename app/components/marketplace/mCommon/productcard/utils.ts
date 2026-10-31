import type { Product } from "./types";

/** Tiny class joiner. Swap for `clsx` / `tailwind-merge` if you already use them. */
export const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

// One shared formatter – `toLocaleString` builds a new Intl object on every call.
const priceFormatter = new Intl.NumberFormat("en-LK", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatPrice = (n: number) => priceFormatter.format(n);

/** Discount % – trusts the server value if present, otherwise derives it (never goes out of sync). */
export function getDiscountPercent({
  price,
  oldPrice,
  discount,
}: Pick<Product, "price" | "oldPrice" | "discount">): number {
  if (typeof discount === "number") return Math.max(0, Math.round(discount));
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round((1 - price / oldPrice) * 100);
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Splits a millisecond duration into display parts. */
export function splitRemaining(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86_400),
    hours: pad(Math.floor((total % 86_400) / 3_600)),
    minutes: pad(Math.floor((total % 3_600) / 60)),
    seconds: pad(total % 60),
  };
}