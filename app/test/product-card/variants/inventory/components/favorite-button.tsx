import { Star } from "lucide-react";
import { IconToggleButton } from "../../../primitives";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (next: boolean) => void;
}

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <IconToggleButton
      pressed={isFavorite}
      onPressedChange={onToggle}
      label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      stopPropagation
      className="transition-transform hover:scale-110 active:scale-95"
    >
      <Star
        aria-hidden
        size={18}
        fill={isFavorite ? "#F59E0B" : "none"}
        stroke={isFavorite ? "#F59E0B" : "#D1D5DB"}
        strokeWidth={2}
      />
    </IconToggleButton>
  );
}
