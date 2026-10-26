import { ArrowRight, CalendarClock } from "lucide-react";

type CtaActionsProps = {
  reveal: string;
};

export default function CtaActions({
  reveal,
}: CtaActionsProps) {
  return (
    <div
      className={`
        relative z-10 flex w-full flex-col gap-3
        sm:w-auto sm:flex-row md:shrink-0
        ${reveal}
      `}
      style={{ transitionDelay: "300ms" }}
    >

      {/* Primary CTA */}
      <button
        type="button"
        className="
          cta-pulse group/btn relative flex
          items-center justify-center gap-2
          overflow-hidden rounded-lg bg-white
          px-6 py-3 text-sm font-semibold
          text-amber-500

          transition-all duration-300

          hover:-translate-y-0.5
          hover:bg-amber-400 hover:text-black

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-amber-300
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[#0f0f0f]

          active:scale-95
        "
      >
        {/* Button shimmer effect */}
        <span
          aria-hidden="true"
          className="
            cta-shine absolute inset-y-0 left-0
            w-1/3 bg-gradient-to-r
            from-transparent via-white/70 to-transparent
          "
        />

        <span className="relative">
          Start Free Trial
        </span>

        <ArrowRight
          className="
            relative h-4 w-4
            transition-transform duration-300
            group-hover/btn:translate-x-1
          "
        />
      </button>

      {/* Secondary CTA */}
      <button
        type="button"
        className="
          group/btn flex items-center justify-center
          gap-2 rounded-lg border border-white/20
          bg-white/5 px-6 py-3 text-sm
          font-semibold text-amber-400 backdrop-blur

          transition-all duration-300

          hover:-translate-y-0.5
          hover:border-amber-400
          hover:bg-white hover:text-amber-500

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-amber-300
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[#0f0f0f]

          active:scale-95
        "
      >
        Schedule Demo

        <CalendarClock
          className="
            h-4 w-4 transition-transform duration-300
            group-hover/btn:rotate-12
            group-hover/btn:scale-110
          "
        />
      </button>
    </div>
  );
}