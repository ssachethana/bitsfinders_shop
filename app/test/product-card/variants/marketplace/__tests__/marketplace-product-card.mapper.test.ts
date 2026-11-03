import { describe, expect, it } from "vitest";
import { MARKETPLACE_VARIANT_CONFIG } from "../marketplace-product-card.config";
import { getDiscountPercent, toMarketplaceCardViewModel } from "../marketplace-product-card.mapper";
import type { MarketplaceProduct } from "../marketplace-product-card.types";
import { splitRemaining } from "../utils/split-remaining";

const base: MarketplaceProduct = { id: 1, title: "Rice 5kg", price: 80, rating: 4, reviews: 10 };

describe("getDiscountPercent", () => {
  it("derives the percentage from price and oldPrice", () => {
    expect(getDiscountPercent({ price: 80, oldPrice: 100 })).toBe(20);
  });

  it("is 0 when there is no higher old price", () => {
    expect(getDiscountPercent({ price: 100 })).toBe(0);
    expect(getDiscountPercent({ price: 100, oldPrice: 100 })).toBe(0);
  });

  it("trusts the server value when provided", () => {
    expect(getDiscountPercent({ price: 80, oldPrice: 100, discount: 35 })).toBe(35);
    expect(getDiscountPercent({ price: 80, discount: -5 })).toBe(0);
  });
});

describe("toMarketplaceCardViewModel", () => {
  const flashProduct: MarketplaceProduct = {
    ...base,
    endsAt: "2030-01-01T00:00:00Z",
    stockTotal: 50,
    stockSold: 20,
  };

  it("exposes countdown + stock only for variants that show them", () => {
    const flash = toMarketplaceCardViewModel(flashProduct, MARKETPLACE_VARIANT_CONFIG.flash);
    expect(flash.countdownEndsAt).toBe("2030-01-01T00:00:00Z");
    expect(flash.stock).toEqual({ sold: 20, total: 50 });

    const normal = toMarketplaceCardViewModel(flashProduct, MARKETPLACE_VARIANT_CONFIG.normal);
    expect(normal.countdownEndsAt).toBeNull();
    expect(normal.stock).toBeNull();
  });

  it("marks sold out when sold reaches the total", () => {
    const vm = toMarketplaceCardViewModel(
      { ...base, stockTotal: 5, stockSold: 5 },
      MARKETPLACE_VARIANT_CONFIG.normal
    );
    expect(vm.soldOut).toBe(true);
  });

  it("is not sold out without a campaign total", () => {
    expect(toMarketplaceCardViewModel(base, MARKETPLACE_VARIANT_CONFIG.normal).soldOut).toBe(false);
  });
});

describe("splitRemaining", () => {
  it("splits into zero-padded parts", () => {
    expect(splitRemaining(((26 * 60 + 5) * 60 + 9) * 1000)).toEqual({
      days: 1,
      hours: "02",
      minutes: "05",
      seconds: "09",
    });
  });

  it("clamps negatives to zero", () => {
    expect(splitRemaining(-5000)).toEqual({ days: 0, hours: "00", minutes: "00", seconds: "00" });
  });
});
