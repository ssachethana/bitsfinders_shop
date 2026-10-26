import { cn } from "@/app/components/marketplace/mCommon/header/className";

interface LogoProps {
  src: string;
  alt: string;
  /** Shrinks the logo (used once the page is scrolled). */
  compact?: boolean;
}

export default function Logo({ src, alt, compact = false }: LogoProps) {
  return (
    <a href="/" className="group/logo shrink-0" aria-label={`${alt} – home`}>
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-auto object-contain transition-all duration-300 group-hover/logo:-rotate-2 group-hover/logo:scale-105 group-hover/logo:drop-shadow-[0_0_12px_rgba(249,168,37,0.7)]",
          compact ? "h-8 sm:h-9" : "h-9 sm:h-11"
        )}
      />
    </a>
  );
}