import { cx } from "../../../shared/utils/cx";
import type { MarketplaceVariantConfig } from "../marketplace-product-card.config";

interface BadgeStackProps {
  tag?: MarketplaceVariantConfig["tag"];
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
