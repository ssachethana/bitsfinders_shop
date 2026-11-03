import { ProductImage } from "../../../primitives";
import { cx } from "../../../shared/utils/cx";

interface ProductAvatarProps {
  imageUrl?: string;
  name: string;
  fallbackEmoji: string;
  fallbackBgClass: string;
}

/** Small square thumbnail: the product image, or a category emoji on a tinted tile. */
export function ProductAvatar({ imageUrl, name, fallbackEmoji, fallbackBgClass }: ProductAvatarProps) {
  return (
    <ProductImage
      src={imageUrl}
      alt={name}
      fallback={fallbackEmoji}
      className={cx(
        "flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl text-xl",
        fallbackBgClass
      )}
    />
  );
}
