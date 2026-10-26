
"use client";

import { useRef, type PointerEvent } from "react";
import {
  Star,
  MapPin,
  Package,
  ArrowRight,
} from "lucide-react";

import type { Shop } from "./shopData";
import { CountUp, useInView } from "./animations";

type ShopCardProps = {
  shop: Shop;
  index: number;
};

export default function ShopCard({
  shop,
  index,
}: ShopCardProps) {
  const [ref, seen] = useInView<HTMLElement>();
  const cardRef = useRef<HTMLDivElement>(null);

  const Icon = shop.icon;

  /* -------------------------------------------------------
     3D Pointer Tilt
     Only activates for mouse devices.
  ------------------------------------------------------- */

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (event.pointerType !== "mouse") return;

    const element = cardRef.current;
    if (!element) return;

    // Avoid pointer-driven motion when reduced motion is preferred.
    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    const rect = element.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    element.style.transform = `
      perspective(800px)
      rotateX(${(-y * 6).toFixed(2)}deg)
      rotateY(${(x * 8).toFixed(2)}deg)
      translateY(-6px)
    `;
  };

  const handlePointerLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "";
    }
  };

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${index * 90}ms` }}
      className={`
        shrink-0 basis-[78%] snap-center
        transition-all duration-700 ease-out
        motion-reduce:transform-none motion-reduce:transition-none
        sm:basis-auto
        ${
          seen
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }
      `}
    >
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="
          group relative h-full overflow-hidden rounded-2xl
          bg-white shadow-[0_2px_10px_rgba(0,0,0,0.12)]
          ring-1 ring-black/5
          transition-[transform,box-shadow] duration-300 ease-out
          will-change-transform
          hover:shadow-[0_18px_40px_-12px_rgba(245,158,11,0.45)]
        "
      >
        {/* Animated glowing border */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 z-20 rounded-2xl
            opacity-0 ring-2 ring-amber-400/70
            transition-opacity duration-300 group-hover:opacity-100
          "
        />

        {/* ================= COVER ================= */}

        <div className="relative h-28 overflow-hidden sm:h-24 lg:h-28">
          <div
            className={`
              absolute inset-0 bg-gradient-to-br
              ${shop.gradient}
              transition-transform duration-700 ease-out
              group-hover:scale-110
              motion-reduce:transform-none
            `}
          >
            {shop.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={shop.cover}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                {/* Decorative fallback shapes */}
                <span className="absolute -left-4 top-3 h-14 w-14 rounded-full bg-white/25 blur-md" />
                <span className="absolute right-2 top-6 h-10 w-10 rounded-full bg-white/20 blur-md" />
              </>
            )}
          </div>

          {/* Shine sweep animation */}
          <span
            aria-hidden="true"
            className="
              absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12
              bg-gradient-to-r from-transparent via-white/50 to-transparent
              opacity-0
              group-hover:animate-[shine_0.9s_ease-out]
              group-hover:opacity-100
            "
          />

          {/* Decorative torn-paper edge */}
          <svg
            aria-hidden="true"
            viewBox="0 0 400 30"
            preserveAspectRatio="none"
            className="absolute -bottom-px left-0 h-5 w-full text-white"
          >
            <path
              fill="currentColor"
              d="M0 30V14l12-4 10 6 14-9 12 8 16-7 10 7 15-10 12 9 14-6 11 7 16-8 12 8 14-9 12 7 15-6 11 8 14-9 13 8 15-7 12 7 14-9 12 9 16-7 11 6 14-8 13 9 15-6 12 6 14-8 11 8 16-9 12 7 14-5 12 7 15-9 11 8 14-7 13 6 12-6V30Z"
            />
          </svg>
        </div>

        {/* ================= LOGO ================= */}

        <div className="relative z-10 -mt-12 flex justify-center">
          <div className="relative">
            {/* Pulsing logo background */}
            <span
              aria-hidden="true"
              style={{
                animationDelay: `${index * 250}ms`,
              }}
              className="
                absolute inset-0 rounded-full bg-amber-300/40
                animate-[ping_2.6s_cubic-bezier(0,0,0.2,1)_infinite]
              "
            />

            <div
              className={`
                relative flex h-20 w-20 items-center justify-center
                overflow-hidden rounded-full border-4 border-white
                shadow-lg text-white
                ${shop.accent}
                transition-transform duration-500
                group-hover:-translate-y-1
                group-hover:rotate-[360deg]
                motion-reduce:transform-none
                sm:h-[72px] sm:w-[72px]
                lg:h-20 lg:w-20
              `}
            >
              {shop.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={shop.logo}
                  alt={`${shop.name} logo`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Icon
                  className="h-9 w-9"
                  strokeWidth={1.8}
                />
              )}
            </div>
          </div>
        </div>

        {/* ================= CARD CONTENT ================= */}

        <div className="px-4 pb-4 pt-2 text-center">
          {/* Shop name */}
          <h3 className="truncate text-base font-bold text-gray-900">
            {shop.name}
          </h3>

          {/* Rating and review count */}
          <div className="mt-1 flex items-center justify-center gap-1 text-xs text-gray-500">
            <Star
              className="
                h-3.5 w-3.5 fill-amber-400 text-amber-400
                transition-transform duration-300
                group-hover:rotate-[72deg] group-hover:scale-125
              "
            />

            <span className="font-semibold text-amber-600">
              {shop.rating.toFixed(1)}
            </span>

            <span className="text-[11px]">
              ({shop.reviews.toLocaleString()})
            </span>
          </div>

          {/* Product count and location */}
          <div className="mt-2 space-y-0.5 text-xs text-gray-600">
            <p className="flex items-center justify-center gap-1">
              <Package className="h-3.5 w-3.5 text-gray-400" />

              <span>
                <CountUp to={shop.products} run={seen} /> Products
              </span>
            </p>

            <p className="flex items-center justify-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-gray-400" />
              {shop.city}
            </p>
          </div>

          {/* ================= VISIT BUTTON ================= */}

          <a
            href={shop.href}
            className="
              group/btn relative mt-3 flex w-full items-center
              justify-center gap-1.5 overflow-hidden rounded-md
              border border-amber-400 bg-amber-100 px-3 py-2
              text-sm font-medium text-amber-700
              transition-colors duration-300 hover:text-white
              focus:outline-none focus-visible:ring-2
              focus-visible:ring-amber-500 focus-visible:ring-offset-2
              active:scale-[0.97]
            "
          >
            {/* Animated background fill */}
            <span
              aria-hidden="true"
              className="
                absolute inset-0 origin-left scale-x-0
                bg-gradient-to-r from-amber-500 to-orange-500
                transition-transform duration-300 ease-out
                group-hover/btn:scale-x-100
              "
            />

            <span className="relative">Visit Shop</span>

            <ArrowRight
              className="
                relative h-4 w-4 transition-transform duration-300
                group-hover/btn:translate-x-1
              "
            />
          </a>
        </div>
      </div>
    </article>
  );
}
