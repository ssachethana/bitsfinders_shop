import { describe, expect, it } from "vitest";
import { toInventoryCardViewModel } from "../inventory-product-card.mapper";
import type { InventoryProduct } from "../inventory-product-card.types";
import { getCategoryPresentation } from "../utils/category-presentation";

const base: InventoryProduct = { id: "p1", name: "Basmati Rice", category: "Food", price: 2450, stock: 100 };

describe("toInventoryCardViewModel", () => {
  it("applies the documented defaults", () => {
    const vm = toInventoryCardViewModel(base);
    expect(vm).toMatchObject({
      currency: "LKR",
      stockUnit: "Unit",
      isFavorite: false,
      isUniversalProduct: false,
      stockStatus: "in",
      isLowStock: false,
    });
  });

  it("flags low stock at the default threshold of 15", () => {
    expect(toInventoryCardViewModel({ ...base, stock: 15 }).stockStatus).toBe("low");
    expect(toInventoryCardViewModel({ ...base, stock: 16 }).stockStatus).toBe("in");
  });

  it("treats zero stock as out, and still low-styled", () => {
    const vm = toInventoryCardViewModel({ ...base, stock: 0 });
    expect(vm.stockStatus).toBe("out");
    expect(vm.isLowStock).toBe(true);
  });

  it("hides a zero price", () => {
    expect(toInventoryCardViewModel({ ...base, price: 0 }).price).toBeNull();
  });

  it("keeps the stock bar between 0 and 100", () => {
    expect(toInventoryCardViewModel({ ...base, stock: 5, lowStockThreshold: 10 }).stockPercent).toBeCloseTo(16.67, 1);
    expect(toInventoryCardViewModel({ ...base, stock: -4 }).stockPercent).toBe(0);
  });

  it("prefers an explicit emoji over the category emoji", () => {
    expect(toInventoryCardViewModel({ ...base, emoji: "🍚" }).fallbackEmoji).toBe("🍚");
    expect(toInventoryCardViewModel(base).fallbackEmoji).toBe("🍽️");
  });
});

describe("getCategoryPresentation", () => {
  it("matches case-insensitively and by substring", () => {
    expect(getCategoryPresentation("Gaming Consoles").emoji).toBe("🎮");
  });

  it("falls back for unknown categories", () => {
    expect(getCategoryPresentation("Hardware & misc")).toEqual({ emoji: "📦", bgClass: "bg-gray-100" });
  });
});
