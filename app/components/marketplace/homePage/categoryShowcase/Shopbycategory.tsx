"use client";

import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "@/app/components/marketplace/homePage/categoryShowcase/Categories";
import CategoryTile from "@/app/components/marketplace/homePage/categoryShowcase/Categorytile";
import SectionHeading from "@/app/components/marketplace/homePage/categoryShowcase/sectionheading";

/** Flips to true (once) the first time the element scrolls into view. */
function useRevealOnScroll<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function ShopByCategory() {
  const { ref, visible } = useRevealOnScroll<HTMLElement>();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-gray-100"
      aria-labelledby="shop-by-category"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <SectionHeading visible={visible} />

        {/* Tiles: swipeable row on phones, wrapping grid from sm up */}
        <ul className="sbc-scroll relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-x-4 sm:gap-y-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-10">
          {CATEGORIES.map((category, i) => (
            <CategoryTile
              key={category.name}
              category={category}
              index={i}
              visible={visible}
              isActive={active === category.name}
              onSelect={setActive}
            />
          ))}
        </ul>

        <div className="relative mt-6 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>
    </section>
  );
}