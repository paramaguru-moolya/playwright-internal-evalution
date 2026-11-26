import { test, expect } from "../fixtures/testFixtures";
import process from "process";

test.describe("Logout Tests", () => {
  test("Verify Logout Functionality", async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    await loginPage.navigate();

    await loginPage.login(
      process.env.VALID_USERNAME!,
      process.env.VALID_PASSWORD!,
    );

    await inventoryPage.logout();

    await expect(page).toHaveURL(/saucedemo\.com\/?$/);

    await expect(page.getByPlaceholder("Username")).toBeVisible();
  });
});
