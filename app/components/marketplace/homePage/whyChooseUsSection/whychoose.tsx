
"use client";

import FeatureCard from "@/app/components/marketplace/homePage/whyChooseUsSection/featureCard";
import { features } from "@/app/components/marketplace/homePage/whyChooseUsSection/features";
import { useInView } from "@/app/components/marketplace/homePage/whyChooseUsSection/useInView";

/**
 * Why Choose Us section.
 *
 * Composes the section heading and feature cards.
 * Animation logic and card presentation are handled
 * by their respective modules.
 */
export default function WhyChooseUs() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      aria-labelledby="why-choose-us-heading"
      className="
        relative overflow-hidden bg-white
        px-4 py-12
        sm:px-6 sm:py-16
        lg:py-20
      "
    >
      {/* Decorative background elements */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-16 top-4
          h-48 w-48 rounded-full
          bg-amber-200/40 blur-3xl
          animate-pulse motion-reduce:animate-none
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-16 bottom-4
          h-56 w-56 rounded-full
          bg-amber-300/30 blur-3xl
          animate-pulse motion-reduce:animate-none
        "
        style={{
          animationDelay: "1s",
        }}
      />

      {/* Main content container */}
      <div className="relative mx-auto max-w-6xl">

        {/* Animated section heading */}
        <h2
          id="why-choose-us-heading"
          className={`
            text-center text-3xl font-extrabold
            tracking-tight text-neutral-950
            transition-all duration-700
            sm:text-4xl lg:text-5xl
            motion-reduce:transform-none
            motion-reduce:transition-none

            ${
              visible
                ? "translate-y-0 opacity-100"
                : "-translate-y-6 opacity-0"
            }
          `}
        >
          Why Choose{" "}
          <span
            className="
              bg-gradient-to-r
              from-amber-400 via-orange-400 to-amber-500
              bg-clip-text text-transparent
            "
          >
            BitsShop?
          </span>
        </h2>

        {/* Animated heading underline */}
        <div
          aria-hidden="true"
          className={`
            mx-auto mt-4 h-1 rounded-full
            bg-gradient-to-r from-amber-300 to-amber-500
            transition-all delay-300 duration-1000
            motion-reduce:transition-none

            ${
              visible
                ? "w-24 opacity-100"
                : "w-0 opacity-0"
            }
          `}
        />

        {/* Responsive feature grid */}
        <div
          className="
            mt-10 grid grid-cols-1 gap-5
            sm:mt-14 sm:grid-cols-2
            lg:grid-cols-3 lg:gap-8
          "
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
