import Image from "next/image";
import { Package } from "lucide-react";

interface ProductMediaProps {
  image?: string;
  title: string;
  sizes: string;
  priority: boolean;
}

export function ProductMedia({ image, title, sizes, priority }: ProductMediaProps) {
  return (
    <div className="relative mx-auto mt-3 grid aspect-square w-[78%] place-items-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
      <span
        aria-hidden
        className="absolute bottom-2 h-1.5 w-1/3 rounded-full bg-black/10 blur-sm transition-all duration-500 group-hover:w-1/4 group-hover:opacity-60"
      />
      <div className="absolute inset-0 grid place-items-center">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes={sizes}
            priority={priority}
            className="object-contain p-1 transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <Package
            aria-hidden
            strokeWidth={1.25}
            className="h-1/2 w-1/2 text-gray-700 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
          />
        )}
      </div>
    </div>
  );
}
