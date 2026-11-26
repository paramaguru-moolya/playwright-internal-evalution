import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationMessage: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartItems = page.locator('[data-test="inventory-item"]');

    this.checkoutButton = page.locator('[data-test="checkout"]');

    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]',
    );

    this.firstName = page.locator('[data-test="firstName"]');

    this.lastName = page.locator('[data-test="lastName"]');

    this.postalCode = page.locator('[data-test="postalCode"]');

    this.continueButton = page.locator('[data-test="continue"]');

    this.finishButton = page.locator('[data-test="finish"]');

    this.confirmationMessage = page.locator('[data-test="complete-header"]');

    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }

  async validateCartItems(expectedCount: number) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async removeProduct(productName: string) {
    const product = this.cartItems.filter({
      hasText: productName,
    });

    await product.locator('button[data-test^="remove"]').click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async enterCustomerDetails(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);

    await this.continueButton.click();
  }

  async completeCheckout() {
    await this.finishButton.click();
  }

  async getConfirmationMessage() {
    return await this.confirmationMessage.textContent();
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }
}
