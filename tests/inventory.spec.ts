import { test, expect } from "../fixtures/testFixtures";
import process from "process";

test.describe("Cart Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();

    await loginPage.login(
      process.env.VALID_USERNAME!,
      process.env.VALID_PASSWORD!,
    );
  });

  test("Add Two Products to Cart", async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");

    await inventoryPage.addProductToCart("Sauce Labs Bike Light");

    await expect(await inventoryPage.getCartCount()).toBe(2);
  });

  test("Validate Cart Item Count", async ({ inventoryPage, checkoutPage }) => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.addProductToCart("Sauce Labs Bike Light");
    await inventoryPage.openCart();

    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(2);

    await expect(checkoutPage.cartItems).toHaveCount(2);
  });

  test("Remove a Cart Item", async ({ inventoryPage, checkoutPage }) => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.addProductToCart("Sauce Labs Bike Light");
    await inventoryPage.openCart();

    await checkoutPage.removeProduct("Sauce Labs Backpack");

    await checkoutPage.validateCartItems(1);
  });
});
