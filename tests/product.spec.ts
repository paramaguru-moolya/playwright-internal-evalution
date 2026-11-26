import { test, expect } from "../fixtures/testFixtures";
import process from "process";

test.describe("Product Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();

    await loginPage.login(
      process.env.VALID_USERNAME!,
      process.env.VALID_PASSWORD!,
    );
  });
  test("Validate Product Listing", async ({ inventoryPage }) => {
    const productCount = await inventoryPage.validateProductListing();

    expect(productCount).toBeGreaterThan(0);
  });

  test("Sort Products by Price Low to High", async ({ inventoryPage }) => {
    await inventoryPage.sortProductsLowToHigh();

    const prices = await inventoryPage.getProductPrices();

    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });
});
