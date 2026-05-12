import { describe, expect, it } from "vitest";
import { buildMealPlan, getExpiryStatus, getTotals, starterInventory } from "../lib/nutrition";

describe("nutrition helpers", () => {
  it("builds a seven day meal plan", () => {
    const plan = buildMealPlan(starterInventory);

    expect(plan).toHaveLength(7);
    expect(plan[0].ingredients.length).toBeGreaterThanOrEqual(2);
  });

  it("summarizes available fridge macros", () => {
    const totals = getTotals(starterInventory);

    expect(totals.protein).toBeGreaterThan(300);
    expect(totals.calories).toBeGreaterThan(2000);
    expect(totals.servings).toBe(27);
  });

  it("labels urgent expiry windows", () => {
    expect(getExpiryStatus(1)).toBe("Akut");
    expect(getExpiryStatus(3)).toBe("Snart");
    expect(getExpiryStatus(6)).toBe("Stabil");
  });
});
