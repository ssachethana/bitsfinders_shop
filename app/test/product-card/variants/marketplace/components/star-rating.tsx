import { Star } from "lucide-react";
import { cx } from "../../../shared/utils/cx";

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
