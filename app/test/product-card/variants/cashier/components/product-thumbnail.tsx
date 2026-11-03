import { ProductImage } from "../../../primitives";

interface ProductThumbnailProps {
  imageUrl?: string;
  name: string;
  initial: string;
}

/** Wide image area; falls back to a gradient tile with the product's first letter. */
export function ProductThumbnail({ imageUrl, name, initial }: ProductThumbnailProps) {
  return (
    <ProductImage
      src={imageUrl}
      alt={name}
      className="relative w-full overflow-hidden bg-slate-50 pt-[65%]"
      imgClassName="absolute inset-0 h-full w-full object-cover"
      fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-indigo-100 to-violet-100 text-[1.8rem] font-extrabold text-indigo-500">
          {initial}
        </div>
      }
    />
  );
}
