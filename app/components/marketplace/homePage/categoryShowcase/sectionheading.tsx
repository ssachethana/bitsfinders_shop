import { ArrowRight } from "lucide-react";

type SectionHeadingProps = {
  /** Triggers the "Category" slide-in animation */
  visible: boolean;
};

const REVEAL_STYLES = `
  @keyframes category-reveal {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .category-reveal {
    display: inline-block;
    animation: category-reveal 1.2s cubic-bezier(.22,1,.36,1) both;
  }

  @media (prefers-reduced-motion: reduce) {
    .category-reveal {
      animation: none !important;
    }
  }
`;

export default function SectionHeading({ visible }: SectionHeadingProps) {
  return (
    <div className="relative mb-6 flex items-end justify-between gap-4 sm:mb-8">
      <style>{REVEAL_STYLES}</style>

      <h2
        id="shop-by-category"
        className="relative flex items-center whitespace-nowrap text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl"
      >
        {/* Stationary text */}
        <span className="relative z-10 bg-gray-100 pr-2">Shop By</span>

        {/* Reveal container hides "Category" until it emerges */}
        <span className="relative inline-block overflow-hidden">
          <span
            className={
              visible
                ? "category-reveal text-amber-500"
                : "inline-block -translate-x-full opacity-0"
            }
          >
            Category
          </span>
        </span>
      </h2>

      <a
        href="/categories"
        className="group inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-amber-600 transition-colors hover:bg-amber-50 hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500 sm:text-sm"
      >
        View All Categories
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </div>
  );
}