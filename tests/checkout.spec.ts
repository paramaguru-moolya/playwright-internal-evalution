import { test, expect } from "../fixtures/testFixtures";
import process from "process";

test.describe("Checkout Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();

    await loginPage.login(
      process.env.VALID_USERNAME!,
      process.env.VALID_PASSWORD!,
    );
  });

  test("Complete Checkout", async ({ inventoryPage, checkoutPage }) => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");

    await inventoryPage.openCart();

    await checkoutPage.proceedToCheckout();

    await checkoutPage.enterCustomerDetails("Paramaguru", "Test", "600001");

    await checkoutPage.completeCheckout();

    await expect(checkoutPage.confirmationMessage).toBeVisible();
  });

  test("Validate Order Confirmation", async ({
    inventoryPage,
    checkoutPage,
  }) => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");

    await inventoryPage.openCart();

    await checkoutPage.proceedToCheckout();

    await checkoutPage.enterCustomerDetails("Paramaguru", "Test", "600001");

    await checkoutPage.completeCheckout();

    await expect(checkoutPage.confirmationMessage).toHaveText(
      "Thank you for your order!",
    );
  });
});
