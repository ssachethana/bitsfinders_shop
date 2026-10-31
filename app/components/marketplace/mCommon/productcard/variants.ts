import { Flame, Zap, type LucideIcon } from "lucide-react";
import type { ProductVariant } from "./types";

/**
 * Everything that differs between variants lives HERE.
 * To add a variant (e.g. "new-arrival"): add it to `ProductVariant` and add one entry below.
 * The card component itself never needs to change.
 *
 * NOTE: Tailwind class names must be complete string literals (no template strings),
 * otherwise they get purged. Make sure this file is covered by your Tailwind `content` globs.
 */
export interface VariantConfig {
  /** Small label chip shown above the discount badge. */
  tag?: { label: string; icon: LucideIcon; className: string };
  showCountdown: boolean;
  showStock: boolean;
  /** Colour of the cursor-following glow (any CSS colour). */
  glow: string;
  theme: {
    /** Hover border + shadow of the card. */
    card: string;
    discount: string;
    ctaBorder: string;
    /** Must use the hover-capable media variant so touch devices keep readable text. */
    ctaText: string;
    ctaFill: string;
    meter: string;
    countdown: string;
  };
}

export const VARIANT_CONFIG = {
  normal: {
    showCountdown: false,
    showStock: false,
    glow: "rgba(99,102,241,0.12)",
    theme: {
      card: "hover:border-indigo-300 hover:shadow-[0_14px_30px_-8px_rgba(79,70,229,0.28)]",
      discount: "bg-red-500",
      ctaBorder: "border-indigo-400",
      ctaText: "[@media(hover:hover)]:text-indigo-600",
      ctaFill: "from-indigo-500 to-violet-600",
      meter: "from-indigo-400 to-violet-500",
      countdown: "bg-indigo-50 text-indigo-700",
    },
  },
  hot: {
    tag: { label: "Hot", icon: Flame, className: "bg-rose-600" },
    showCountdown: false,
    showStock: false,
    glow: "rgba(248,113,113,0.2)",
    theme: {
      card: "hover:border-red-300 hover:shadow-[0_14px_30px_-8px_rgba(220,38,38,0.35)]",
      discount: "bg-red-500",
      ctaBorder: "border-red-400",
      ctaText: "[@media(hover:hover)]:text-red-600",
      ctaFill: "from-red-500 to-rose-600",
      meter: "from-red-400 to-rose-500",
      countdown: "bg-red-50 text-red-700",
    },
  },
  flash: {
    tag: { label: "Flash", icon: Zap, className: "bg-amber-500" },
    showCountdown: true,
    showStock: true,
    glow: "rgba(251,191,36,0.22)",
    theme: {
      card: "hover:border-amber-300 hover:shadow-[0_14px_30px_-8px_rgba(217,119,6,0.35)]",
      discount: "bg-red-500",
      ctaBorder: "border-amber-400",
      ctaText: "[@media(hover:hover)]:text-amber-600",
      ctaFill: "from-amber-400 to-orange-500",
      meter: "from-amber-400 to-orange-500",
      countdown: "bg-amber-50 text-amber-700",
    },
  },
} satisfies Record<ProductVariant, VariantConfig>;

/** Safe lookup – an unknown variant string from the API falls back to "normal" instead of crashing. */
export const getVariantConfig = (variant: string): VariantConfig =>
  (VARIANT_CONFIG as Record<string, VariantConfig>)[variant] ?? VARIANT_CONFIG.normal;