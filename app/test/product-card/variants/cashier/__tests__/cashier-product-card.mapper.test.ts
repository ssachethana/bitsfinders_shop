import { describe, expect, it } from "vitest";
import { toCashierCardViewModel } from "../cashier-product-card.mapper";
import type { CashierProduct } from "../cashier-product-card.types";

const base: CashierProduct = {
  id: "c1",
  name: "green tea",
  category: { name: "Beverages" },
  sellPrice: 350,
  currentStock: 40,
  lowStockThreshold: 10,
};

describe("toCashierCardViewModel", () => {
  it("derives the initial and category name", () => {
    const vm = toCashierCardViewModel(base, "Rs.");
    expect(vm.initial).toBe("G");
    expect(vm.categoryName).toBe("Beverages");
  });

  it("formats a percent promotion", () => {
    const vm = toCashierCardViewModel(
      { ...base, activePromotion: { discountType: "PERCENT", value: 10 } },
      "Rs."
    );
    expect(vm.promoLabel).toBe("10% OFF");
  });

  it("formats any other promotion as a fixed amount in the given currency", () => {
    const vm = toCashierCardViewModel(
      { ...base, activePromotion: { discountType: "FIXED", value: 50 } },
      "Rs."
    );
    expect(vm.promoLabel).toBe("-Rs.50");
  });

  it("hides the promotion when the item is out of stock", () => {
    const vm = toCashierCardViewModel(
      { ...base, currentStock: 0, activePromotion: { discountType: "PERCENT", value: 10 } },
      "Rs."
    );
    expect(vm.stockStatus).toBe("out");
    expect(vm.promoLabel).toBeNull();
  });

  it("reports low stock only when a threshold is set", () => {
    expect(toCashierCardViewModel({ ...base, currentStock: 10 }, "Rs.").stockStatus).toBe("low");
    expect(toCashierCardViewModel({ ...base, currentStock: 10, lowStockThreshold: 0 }, "Rs.").stockStatus).toBe("in");
  });

  it("passes a missing price through as null", () => {
    expect(toCashierCardViewModel({ ...base, sellPrice: null }, "Rs.").price).toBeNull();
  });

  it("turns an empty image url into undefined", () => {
    expect(toCashierCardViewModel({ ...base, imageUrl: "" }, "Rs.").imageUrl).toBeUndefined();
  });
});
