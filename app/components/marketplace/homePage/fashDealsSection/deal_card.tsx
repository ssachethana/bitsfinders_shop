"use client"

import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { Check, Headphones, Heart, ShoppingCart, Star } from "lucide-react";
import { formatPrice, type Deal } from "@/app/components/marketplace/homePage/fashDealsSection/shared";

/* ---- hooks ----------------------------------------------------------- */
/** Returns [ref, seen]; `seen` flips to true (once) when the element scrolls into view. */
function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, seen] as const;
}

const REST = { x: 0, y: 0, gx: 50, gy: 50 };

/** Mouse-driven 3D tilt + glow position. Ignored for touch/pen input. */
function useTilt(maxDeg = 8) {
  const [tilt, setTilt] = useState(REST);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ x: (py - 0.5) * -maxDeg, y: (px - 0.5) * maxDeg, gx: px * 100, gy: py * 100 });
  };

  return { tilt, handlers: { onPointerMove, onPointerLeave: () => setTilt(REST) } };
}

/* ---- card ------------------------------------------------------------ */
/* ---- private helper -------------------------------------------------- */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          style={{ transitionDelay: `${i * 40}ms` }}
          className={`h-3 w-3 transition-transform duration-300 group-hover:scale-110 ${
            i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

/* ---- component ------------------------------------------------------- */
interface Props {
  deal: Deal;
  /** Position in the grid – drives the staggered reveal delay. */
  index?: number;
  onAddToCart?: (deal: Deal) => void;
  onToggleWishlist?: (deal: Deal, liked: boolean) => void;
}

export default function DealCard({ deal, index = 0, onAddToCart, onToggleWishlist }: Props) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const { tilt, handlers } = useTilt();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const toggleLike = () => {
    setLiked((v) => !v);
    onToggleWishlist?.(deal, !liked);
  };

  const addToCart = () => {
    onAddToCart?.(deal);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`transition-all duration-700 ease-out [perspective:900px] ${
        seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <article
        {...handlers}
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-[transform,box-shadow,border-color] duration-200 will-change-transform hover:border-amber-300 hover:shadow-[0_14px_30px_-8px_rgba(217,119,6,0.35)] sm:p-3"
      >
        {/* cursor-following glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(180px circle at ${tilt.gx}% ${tilt.gy}%, rgba(251,191,36,0.22), transparent 70%)`,
          }}
        />

        {/* discount badge */}
        <span className="fd-shine absolute left-2 top-2 z-10 overflow-hidden rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white sm:text-xs">
          -{deal.discount}%
        </span>

        {/* wishlist */}
        <button
          type="button"
          onClick={toggleLike}
          aria-pressed={liked}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/80 backdrop-blur transition hover:scale-110 active:scale-90"
        >
          <Heart
            key={String(liked)}
            className={`h-5 w-5 transition-colors ${
              liked ? "fd-pop fill-red-500 text-red-500" : "text-gray-400 hover:text-red-400"
            }`}
          />
        </button>

        {/* image */}
        <div className="relative z-[1] mx-auto mt-3 grid aspect-square w-[78%] place-items-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
          {deal.image ? (
            <img
              src={deal.image}
              alt={deal.title}
              loading="lazy"
              className="fd-float h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <Headphones
              strokeWidth={1.25}
              className="fd-float h-1/2 w-1/2 text-gray-800 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
            />
          )}
          <span className="absolute bottom-2 h-1.5 w-1/3 rounded-full bg-black/10 blur-sm transition-all duration-500 group-hover:w-1/4 group-hover:opacity-60" />
        </div>

        {/* info */}
        <div className="relative z-[1] mt-3 flex flex-1 flex-col">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-[13px] font-medium leading-5 text-gray-800 sm:text-sm">
            {deal.title}
          </h3>

          <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
            <span className="text-sm font-bold text-gray-900 sm:text-base">
              Rs. {formatPrice(deal.price)}
            </span>
            <span className="text-[11px] text-gray-400 line-through">
              Rs. {formatPrice(deal.oldPrice)}
            </span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-[11px] text-gray-500">{deal.seller}</span>
            <div className="flex items-center gap-1">
              <StarRating rating={deal.rating} />
              <span className="text-[10px] text-gray-400">({deal.reviews})</span>
            </div>
          </div>

          {/* add to cart */}
          <button
            type="button"
            onClick={addToCart}
            className={`relative mt-auto w-full overflow-hidden rounded-lg border px-3 py-2 text-sm font-semibold transition-all duration-300 active:scale-95 ${
              added
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-amber-400 text-amber-600 hover:shadow-lg group-hover:text-white"
            } mt-3`}
          >
            {!added && (
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-amber-400 to-orange-500 transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {added ? (
                <>
                  <Check className="fd-pop h-4 w-4" /> Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-12" />
                  Add to Cart
                </>
              )}
            </span>
          </button>
        </div>
      </article>
    </div>
  );
}
