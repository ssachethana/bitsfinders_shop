"use client"

import { FLASH_DEALS_CSS, MOCK_DEALS, type Deal } from "@/app/components/marketplace/homePage/hotDealSection/shared";
import FlashDealsHeader from "@/app/components/marketplace/homePage/hotDealSection/hot_deals_header";

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
  }
];



export default function FlashDeals() {

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
    <section className="relative w-full overflow-hidden bg-white px-4 py-8 sm:px-6 lg:px-8 ">
      <style>{FLASH_DEALS_CSS}</style>

    

      <div className="relative mx-auto max-w-full ml-30 mr-30 bg-white">
        <FlashDealsHeader />

        {/* 2 cols on phones → 6 on wide desktops */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
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
      </div>
    </section>
  );
}
