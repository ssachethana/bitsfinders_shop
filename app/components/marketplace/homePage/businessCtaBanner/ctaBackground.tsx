import { Rocket, Sparkles, TrendingUp } from "lucide-react";

// Type definition for spotlight coordinates
type CtaBackgroundProps = {
  pos: {
    x: number;
    y: number;
  };
};

export default function CtaBackground({
  pos,
}: CtaBackgroundProps) {
  return (
    <>
      {/* Local CSS animations */}
      <style>{`
        @keyframes cta-float {
          0%, 100% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-14px) rotate(8deg);
          }
        }

        @keyframes cta-blob {
          0%, 100% {
            transform: translate(0,0) scale(1);
          }
          50% {
            transform: translate(30px,-20px) scale(1.15);
          }
        }

        @keyframes cta-shine {
          0% {
            transform: translateX(-120%) skewX(-20deg);
          }
          60%, 100% {
            transform: translateX(220%) skewX(-20deg);
          }
        }

        @keyframes cta-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(251,176,36,.55);
          }
          100% {
            box-shadow: 0 0 0 16px rgba(251,176,36,0);
          }
        }

        @keyframes cta-line {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .cta-float {
          animation: cta-float 6s ease-in-out infinite;
        }

        .cta-blob {
          animation: cta-blob 9s ease-in-out infinite;
        }

        .cta-shine {
          animation: cta-shine 3.2s ease-in-out infinite;
        }

        .cta-pulse {
          animation: cta-pulse 2s ease-out infinite;
        }

        .cta-line {
          transform-origin: left;
          animation: cta-line .9s .6s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .cta-float,
          .cta-blob,
          .cta-shine,
          .cta-pulse,
          .cta-line {
            animation: none;
          }
        }
      `}</style>

      {/* Cursor spotlight */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
        style={{
          background: `
            radial-gradient(
              420px circle at ${pos.x}% ${pos.y}%,
              rgba(251,176,36,0.16),
              transparent 60%
            )
          `,
        }}
      />

      {/* Animated glow blobs */}
      <div
        aria-hidden="true"
        className="
          cta-blob pointer-events-none absolute
          -left-16 -top-20 h-56 w-56
          rounded-full bg-amber-500/20 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          cta-blob pointer-events-none absolute
          -bottom-24 right-0 h-64 w-64
          rounded-full bg-orange-500/15 blur-3xl
          [animation-delay:-4s]
        "
      />

      {/* Decorative background grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 opacity-[0.07]
          [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]
          [background-size:32px_32px]
          [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]
        "
      />

      {/* Floating icons */}
      <Rocket
        aria-hidden="true"
        className="
          cta-float absolute left-4 top-4
          hidden h-6 w-6 text-amber-400/40 sm:block
        "
      />

      <TrendingUp
        aria-hidden="true"
        className="
          cta-float absolute right-6 top-6
          hidden h-7 w-7 text-amber-400/30
          [animation-delay:-2s] sm:block
        "
      />

      <Sparkles
        aria-hidden="true"
        className="
          cta-float absolute bottom-5 left-1/2
          hidden h-5 w-5 text-amber-300/30
          [animation-delay:-4s] lg:block
        "
      />
    </>
  );
}