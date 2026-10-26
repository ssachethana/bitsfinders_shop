
"use client";

import { useRef, type MouseEvent } from "react";
import type { Feature } from "./features";

/**
 * Props accepted by the FeatureCard component.
 */
type FeatureCardProps = {
  feature: Feature;
  index: number;
  visible: boolean;
};

/**
 * Renders a single feature card.
 *
 * Responsibilities:
 * - Display feature content.
 * - Handle cursor-follow spotlight.
 * - Apply hover animations.
 * - Animate the card when it enters the viewport.
 */
export default function FeatureCard({
  feature,
  index,
  visible,
}: FeatureCardProps) {
  const {
    icon: Icon,
    title,
    description,
    hover,
  } = feature;

  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * Updates the spotlight position based on cursor movement.
   *
   * CSS variables are updated directly to avoid unnecessary
   * React re-renders during mouse movement.
   */
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = cardRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    element.style.setProperty(
      "--x",
      `${event.clientX - rect.left}px`
    );

    element.style.setProperty(
      "--y",
      `${event.clientY - rect.top}px`
    );
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
      className={`
        group relative overflow-hidden rounded-2xl
        border border-amber-200/70 bg-amber-50
        p-5 shadow-sm
        transition-all duration-700 ease-out

        sm:p-6
        sm:last:col-span-2
        sm:last:mx-auto
        sm:last:w-full
        sm:last:max-w-md

        lg:last:col-span-1
        lg:last:max-w-none

        hover:-translate-y-2
        hover:border-amber-400
        hover:shadow-xl
        hover:shadow-amber-300/40

        active:scale-[0.98]

        motion-reduce:transform-none
        motion-reduce:transition-none

        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }
      `}
    >
      {/* Cursor-follow spotlight effect */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
        style={{
          background:
            "radial-gradient(220px circle at var(--x,50%) var(--y,50%), rgba(251,191,36,0.28), transparent 70%)",
        }}
      />

      {/* Animated shine sweep */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-y-0
          -left-1/2 w-1/3 -skew-x-12
          bg-gradient-to-r from-transparent via-white/70 to-transparent
          opacity-0 transition-all duration-700
          group-hover:left-[130%]
          group-hover:opacity-100
          motion-reduce:hidden
        "
      />

      {/* Card content */}
      <div className="relative flex items-start gap-4">

        {/* Feature icon */}
        <div
          className="
            relative grid h-12 w-12 shrink-0
            place-items-center rounded-xl
            bg-white text-amber-500 shadow-inner
            ring-1 ring-amber-200
            transition-colors duration-300
            group-hover:bg-amber-400
            group-hover:text-white
          "
        >
          {/* Icon pulse effect */}
          <span
            aria-hidden="true"
            className="
              absolute inset-0 rounded-xl
              bg-amber-300/40 opacity-0
              group-hover:animate-ping
              motion-reduce:group-hover:animate-none
            "
          />

          <Icon
            className={`
              relative h-6 w-6
              transition-transform duration-500
              motion-reduce:transform-none
              ${hover}
            `}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>

        {/* Feature text */}
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-neutral-900 sm:text-lg">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-relaxed text-neutral-600">
            {description}
          </p>
        </div>
      </div>

      {/* Bottom accent bar */}
      <span
        aria-hidden="true"
        className="
          absolute bottom-0 left-0
          h-1 w-0
          bg-gradient-to-r from-amber-300 to-amber-500
          transition-all duration-500
          group-hover:w-full
        "
      />
    </div>
  );
}
