"use client";

import { useCallback } from "react";
// Adjust this path to wherever you put the product-card folder.
import { ProductCard, type Product } from "@/app/components/marketplace/mCommon/productcard";

/* ---- static demo data ------------------------------------------------ */
const hours = (h: number) => Date.now() + h * 60 * 60 * 1000;

const PRODUCTS: Product[] = [
  // flash deals: countdown + stock bar
  {
    id: 1,
    variant: "flash",
    title: "boAt Rockerz 450 Wireless Headphones",
    price: 1637.85,
    oldPrice: 5999,
    seller: "Tech World",
    rating: 5,
    reviews: 125,
    endsAt: hours(5),
    stockTotal: 100,
    stockSold: 72,
  },
  {
    id: 2,
    variant: "flash",
    title: "Smart Watch Series 7 with AMOLED Display",
    price: 8990,
    oldPrice: 15990,
    seller: "Gadget Hub",
    rating: 4,
    reviews: 88,
    endsAt: hours(26),
    stockTotal: 50,
    stockSold: 47, // "Almost gone!"
  },
  {
    id: 3,
    variant: "flash",
    title: "Sold-out example: Bluetooth Speaker",
    price: 2490,
    oldPrice: 4990,
    seller: "Sound Mart",
    rating: 4,
    reviews: 40,
    endsAt: hours(2),
    stockTotal: 30,
    stockSold: 30, // button becomes "Sold out"
  },

  // hot deals: tag + shine, no countdown
  {
    id: 4,
    variant: "hot",
    title: "Wireless Gaming Mouse 16000 DPI RGB",
    price: 3290,
    oldPrice: 4990,
    seller: "Gamer Zone",
    rating: 5,
    reviews: 312,
  },
  {
    id: 5,
    variant: "hot",
    title: "Mechanical Keyboard Blue Switch 87 Keys",
    price: 6450,
    oldPrice: 8900,
    seller: "Tech World",
    rating: 4,
    reviews: 204,
  },

  // normal products: no tag, discount optional
  {
    id: 6,
    variant: "normal",
    title: "USB-C Fast Charging Cable 1.5m Braided",
    price: 890,
    seller: "Cable King",
    rating: 4,
    reviews: 57,
  },
  {
    id: 7,
    variant: "normal",
    title: "Laptop Backpack Water Resistant 15.6 inch",
    price: 4200,
    oldPrice: 4900,
    seller: "Bag Palace",
    rating: 3,
    reviews: 19,
  },
  {
    id: 8,
    // no variant -> falls back to "normal"
    title: "Portable Power Bank 20000mAh",
    price: 5490,
    seller: "Power Plus",
    rating: 0,
    reviews: 0, // no rating count shown
  },
];

/* ---- page ------------------------------------------------------------ */
export default function ProductCardDemoPage() {
  // Stable callbacks: ProductCard is memoised, so these avoid needless re-renders.
  const handleAddToCart = useCallback(async (product: Product) => {
    await new Promise((r) => setTimeout(r, 600)); // fake network call
    console.log("Added to cart:", product.title);
  }, []);

  const handleWishlist = useCallback((product: Product, liked: boolean) => {
    console.log(liked ? "Wishlisted:" : "Removed:", product.title);
  }, []);

  const handleExpire = useCallback((product: Product) => {
    console.log("Deal ended:", product.title);
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-10">
      <h1 className="mb-1 text-xl font-bold text-gray-900 sm:text-2xl">ProductCard demo</h1>
      <p className="mb-6 text-sm text-gray-500">
        Flash (countdown + stock), Hot (tag + shine) and Normal variants in one responsive grid.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {PRODUCTS.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            index={i}
            priority={i < 4}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleWishlist}
            onDealExpire={handleExpire}
          />
        ))}
      </div>
    </main>
  );
}