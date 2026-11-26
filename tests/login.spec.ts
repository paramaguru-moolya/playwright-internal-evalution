import { test, expect } from "../fixtures/testFixtures";
import process from "process";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login Tests", () => {
  test("Valid Login Test", async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(
      process.env.VALID_USERNAME,
      process.env.VALID_PASSWORD,
    );
    await expect(page).toHaveURL(/inventory.html/);
  });

  test("Invalid Login Test", async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(
      process.env.INVALID_USERNAME,
      process.env.INVALID_PASSWORD,
    );
    await expect(loginPage.errorMessage).toContainText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });
});
