"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

import CtaBackground from "@/app/components/marketplace/homePage/businessCtaBanner/ctaBackground";
import CtaContent from "@/app/components/marketplace/homePage/businessCtaBanner/ctacontent";
import CtaActions from "@/app/components/marketplace/homePage/businessCtaBanner/CtaActions";

export default function CtaBanner() {
  // References
  const sectionRef = useRef<HTMLElement>(null);

  // Component state
  const [visible, setVisible] = useState(false);

  const [pos, setPos] = useState({
    x: 50,
    y: 50,
  });

  /**
   * Scroll Reveal
   * Trigger animation when the banner enters the viewport.
   */
  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /**
   * Cursor Spotlight
   * Calculate mouse position relative to the banner.
   */
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  /**
   * Shared reveal animation.
   * Passed to content and action components.
   */
  const reveal = `
    transition-all duration-700 ease-out
    motion-reduce:transition-none
    ${
      visible
        ? "translate-y-0 opacity-100"
        : "translate-y-6 opacity-0"
    }
  `;

  return (
    <section className="w-full px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <article
        ref={sectionRef}
        onMouseMove={handleMove}
        className="
          group relative mx-auto flex max-w-6xl
          flex-col items-center gap-8 overflow-hidden
          rounded-3xl bg-[#0f0f0f] px-6 py-10
          text-center shadow-2xl ring-1 ring-white/10

          sm:px-10 sm:py-12

          md:flex-row md:justify-between md:gap-10
          md:px-14 md:py-14 md:text-left
        "
      >
        {/* Background decorations */}
        <CtaBackground pos={pos} />

        {/* Banner content */}
        <CtaContent reveal={reveal} />

        {/* Call-to-action buttons */}
        <CtaActions reveal={reveal} />
      </article>
    </section>
  );
}