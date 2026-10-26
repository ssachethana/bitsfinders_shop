
"use client";

import { ArrowRight, Trophy } from "lucide-react";

import ShopCard from "./ShopCard";
import { SHOPS } from "./shopData";
import { useInView } from "./animations";

/**
 * Top Rated Shops Section
 *
 * Responsibilities:
 * - Display section heading
 * - Render the responsive shop collection
 * - Provide mobile navigation hints
 * - Maintain section-level decorative animations
 */
export default function TopRatedShops() {
  const [headingRef, headingSeen] =
    useInView<HTMLDivElement>();

  return (
    <section
      aria-labelledby="top-rated-shops"
      className="
        relative w-full overflow-hidden
        bg-gradient-to-b from-white to-amber-50/40
        py-8 sm:py-12
      "
    >
      {/* ================= ANIMATION STYLES ================= */}

      <style>{`
        @keyframes shine {
          from {
            transform: translateX(0) skewX(-12deg);
          }
          to {
            transform: translateX(450%) skewX(-12deg);
          }
        }

        @keyframes floaty {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .motion-safe-anim {
            animation: none !important;
          }

          [class*="animate-["] {
            animation: none !important;
          }
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ================= BACKGROUND DECORATIONS ================= */}

      <span
        aria-hidden="true"
        className="
          motion-safe-anim pointer-events-none
          absolute -right-10 top-6 h-40 w-40 rounded-full
          bg-amber-200/40 blur-3xl
          animate-[floaty_6s_ease-in-out_infinite]
        "
      />

      <span
        aria-hidden="true"
        className="
          motion-safe-anim pointer-events-none
          absolute -left-10 bottom-4 h-48 w-48 rounded-full
          bg-orange-200/30 blur-3xl
          animate-[floaty_8s_ease-in-out_infinite]
        "
      />

      {/* ================= MAIN CONTAINER ================= */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= SECTION HEADING ================= */}

        <div
          ref={headingRef}
          className={`
            mb-6 flex items-center justify-between gap-3
            transition-all duration-700 sm:mb-10
            motion-reduce:transform-none
            motion-reduce:transition-none
            ${
              headingSeen
                ? "translate-x-0 opacity-100"
                : "-translate-x-6 opacity-0"
            }
          `}
        >
          <div className="flex items-center gap-3">
            {/* Heading icon */}
            <span
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl bg-gradient-to-br
                from-amber-400 to-orange-500
                text-white shadow-md
              "
            >
              <Trophy className="h-5 w-5" />
            </span>

            {/* Heading text */}
            <div>
              <h2
                id="top-rated-shops"
                className="
                  text-xl font-extrabold tracking-tight
                  text-gray-900 sm:text-2xl lg:text-3xl
                "
              >
                Top Rated Shop
              </h2>

              {/* Decorative underline */}
              <span
                className="
                  mt-1 block h-1 w-12 rounded-full
                  bg-gradient-to-r from-amber-400 to-orange-500
                  transition-all duration-500 hover:w-24
                "
              />
            </div>
          </div>

          {/* Desktop view-all navigation */}
          <a
            href="/shops"
            className="
              group hidden items-center gap-1
              text-sm font-semibold text-amber-600
              hover:text-amber-700 sm:flex
            "
          >
            View all

            <ArrowRight
              className="
                h-4 w-4 transition-transform
                group-hover:translate-x-1
              "
            />
          </a>
        </div>

        {/* ================= SHOPS COLLECTION ================= */}

        {/*
          Responsive behaviour:

          Mobile: Horizontal scroll with snap
          SM:     2-column grid
          MD:     3-column grid
          LG:     5-column grid
        */}

        <div
          className="
            no-scrollbar -mx-4 flex snap-x snap-mandatory
            gap-4 overflow-x-auto px-4 pb-6 pt-2
            sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5
            sm:overflow-visible sm:px-0
            md:grid-cols-3
            lg:grid-cols-5
          "
        >
          {SHOPS.map((shop, index) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              index={index}
            />
          ))}
        </div>

        {/* ================= MOBILE FOOTER ================= */}

        <div className="mt-1 flex items-center justify-between sm:hidden">
          <span className="text-xs text-gray-400">
            Swipe to explore →
          </span>

          <a
            href="/shops"
            className="
              flex items-center gap-1
              text-sm font-semibold text-amber-600
            "
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
