"use client"; // needed because we pass callback functions (onClick etc.) to the cards

import {
  MarketplaceProductCard,
  InventoryProductCard,
  CashierProductCard,
  type MarketplaceProduct,
  type InventoryProduct,
  type CashierProduct,
} from "@/app/test/product-card";

/* ---------- sample data ---------- */
const inThreeHours = new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString();

const marketplaceProducts: MarketplaceProduct[] = [
  { id: 1, title: "Basmati Rice 5kg", price: 2450, rating: 4.5, reviews: 128, seller: "Fresh Mart" },
  { id: 2, title: "Wireless Earbuds Pro", price: 7900, oldPrice: 12500, rating: 4, reviews: 52, variant: "hot" },
  {
    id: 3,
    title: "Smart Watch Series 5",
    price: 15900,
    oldPrice: 24900,
    rating: 4.8,
    reviews: 310,
    variant: "flash",
    endsAt: inThreeHours,
    stockTotal: 50,
    stockSold: 38,
  },
];

const inventoryProducts: InventoryProduct[] = [
  { id: "i1", name: "Basmati Rice 5kg", category: "Food", price: 2450, stock: 120, sku: "RICE-005", brand: "Araliya" },
  { id: "i2", name: "Gaming Mouse", category: "Gaming", price: 6500, stock: 8, isFavorite: true },
  { id: "i3", name: "USB-C Cable", category: "Electronics", price: 950, stock: 0, isUniversalProduct: true },
];

const cashierProducts: CashierProduct[] = [
  { id: "c1", name: "Green Tea", category: { name: "Beverages" }, sellPrice: 350, currentStock: 40, lowStockThreshold: 10 },
  {
    id: "c2",
    name: "Chocolate Bar",
    category: { name: "Snacks" },
    sellPrice: 180,
    currentStock: 6,
    lowStockThreshold: 10,
    activePromotion: { discountType: "PERCENT", value: 10 },
  },
  { id: "c3", name: "Notebook A5", category: { name: "Stationery" }, sellPrice: 250, currentStock: 0, lowStockThreshold: 5 },
];

/* ---------- page ---------- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-lg font-bold text-gray-800">{title}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl bg-gray-50 p-6">
      <Section title="Marketplace (normal / hot / flash)">
        {marketplaceProducts.map((p, i) => (
          <MarketplaceProductCard
            key={p.id}
            product={p}
            index={i}
            onAddToCart={async (product) => {
              await new Promise((r) => setTimeout(r, 600)); // fake API call
              console.log("add to cart", product.id);
            }}
            onToggleWishlist={(product, liked) => console.log("wishlist", product.id, liked)}
          />
        ))}
      </Section>

      <Section title="Inventory">
        {inventoryProducts.map((p) => (
          <InventoryProductCard
            key={p.id}
            product={p}
            onClick={(id) => console.log("open", id)}
            onFavoriteToggle={(id, value) => console.log("favorite", id, value)}
            onMenuAction={(id, action) => console.log(action, id)}
          />
        ))}
      </Section>

      <Section title="Cashier">
        {cashierProducts.map((p) => (
          <CashierProductCard
            key={p.id}
            product={p}
            currency="Rs."
            onAddToCart={(product) => console.log("add to bill", product.id)}
          />
        ))}
      </Section>
    </div>
  );
}