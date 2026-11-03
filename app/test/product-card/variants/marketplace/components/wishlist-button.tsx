import { Heart } from "lucide-react";
import { IconToggleButton } from "../../../primitives";
import { cx } from "../../../shared/utils/cx";

interface WishlistButtonProps {
  liked: boolean;
  /** Called with the new value. */
  onToggle: (next: boolean) => void;
}

export function WishlistButton({ liked, onToggle }: WishlistButtonProps) {
  return (
    <IconToggleButton
      pressed={liked}
      onPressedChange={onToggle}
      label={liked ? "Remove from wishlist" : "Add to wishlist"}
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
    </IconToggleButton>
  );
}
