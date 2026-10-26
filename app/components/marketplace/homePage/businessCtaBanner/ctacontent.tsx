import { Zap } from "lucide-react";

type CtaContentProps = {
  reveal: string;
};

// Helper for staggered reveal animation
const delay = (ms: number) => ({
  transitionDelay: `${ms}ms`,
});

export default function CtaContent({
  reveal,
}: CtaContentProps) {
  return (
    <div className="relative z-10 max-w-xl">

      {/* Trust badge */}
      <span
        className={`
          mb-4 inline-flex items-center gap-1.5
          rounded-full border border-amber-400/30
          bg-amber-400/10 px-3 py-1
          text-xs font-medium text-amber-300
          ${reveal}
        `}
        style={delay(0)}
      >
        <Zap className="h-3.5 w-3.5" />

        Trusted by thousands
      </span>

      {/* Main heading */}
      <h2
        className={`
          text-2xl font-bold leading-tight
          tracking-tight text-white
          sm:text-3xl lg:text-4xl
          ${reveal}
        `}
        style={delay(100)}
      >
        Ready to grow your business

        <br className="hidden sm:block" />

        {" "}with{" "}

        {/* Highlighted brand name */}
        <span
          className="
            relative inline-block bg-gradient-to-r
            from-amber-300 via-amber-400 to-orange-400
            bg-clip-text text-transparent
          "
        >
          Bits Shop

          {/* Animated underline */}
          <span
            aria-hidden="true"
            className="
              cta-line absolute -bottom-1 left-0
              h-[3px] w-full rounded-full
              bg-gradient-to-r from-amber-400 to-orange-400
            "
          />
        </span>

        ?
      </h2>

      {/* Description */}
      <p
        className={`
          mt-4 text-sm leading-relaxed
          text-white/70 sm:text-base
          ${reveal}
        `}
        style={delay(200)}
      >
        Join thousands of businesses already using Bits Shop
        to simplify their operations.
      </p>
    </div>
  );
}