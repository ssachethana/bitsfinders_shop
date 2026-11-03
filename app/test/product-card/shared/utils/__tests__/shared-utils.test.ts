import { describe, expect, it } from "vitest";
import { cx } from "../cx";
import { formatPrice } from "../format-price";
import { getStockStatus } from "../stock-status";

describe("getStockStatus", () => {
  it("is out at zero or below", () => {
    expect(getStockStatus(0, 10)).toBe("out");
    expect(getStockStatus(-3, 10)).toBe("out");
  });

  it("is low at or under the threshold, in above it", () => {
    expect(getStockStatus(10, 10)).toBe("low");
    expect(getStockStatus(11, 10)).toBe("in");
  });

  it("never reports low when the threshold is 0 / unset", () => {
    expect(getStockStatus(1, 0)).toBe("in");
    expect(getStockStatus(1)).toBe("in");
  });
});

describe("formatPrice", () => {
  it("always shows two decimals with grouping", () => {
    expect(formatPrice(2450)).toBe("2,450.00");
    expect(formatPrice(99.5)).toBe("99.50");
  });
});

describe("cx", () => {
  it("drops falsy parts", () => {
    expect(cx("a", false, null, undefined, "b")).toBe("a b");
  });
});
