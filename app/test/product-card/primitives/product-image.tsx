"use client";

import { useState } from "react";
import type { ReactNode } from "react";

interface ProductImageProps {
  src?: string | null;
  alt: string;
  /** Shown when there is no `src` or the image fails to load (emoji, initial, icon...). */
  fallback: ReactNode;
  /** Classes for the wrapper - size, shape, background. */
  className?: string;
  /** Classes for the <img>. */
  imgClassName?: string;
}

/**
 * Plain <img> with a load-error fallback.
 * (The marketplace card uses `next/image` for its larger, optimised image instead.)
 */
export function ProductImage({
  src,
  alt,
  fallback,
  className,
  imgClassName = "h-full w-full object-cover",
}: ProductImageProps) {
  // Remember WHICH url failed (not just "something failed"), so a new `src` gets a fresh try.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const current = src || null;

  return (
    <div className={className}>
      {current !== null && failedSrc !== current ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={current} alt={alt} className={imgClassName} onError={() => setFailedSrc(current)} />
      ) : (
        fallback
      )}
    </div>
  );
}
