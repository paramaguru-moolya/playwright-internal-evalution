import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly productItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartButton: Locator;
  readonly cartCount: Locator;
  readonly menuButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productItems = page.locator('[data-test="inventory-item"]');

    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');

    this.cartCount = page.locator('[data-test="shopping-cart-badge"]');

    this.menuButton = page.locator("#react-burger-menu-btn");

    this.logoutButton = page.locator('[data-test="logout-sidebar-link"]');
  }

  async validateProductListing() {
    await this.productItems.first().waitFor();

    const productCount = await this.productItems.count();

    return productCount;
  }

  async sortProductsLowToHigh() {
    await this.sortDropdown.selectOption("lohi");
  }

  async getProductPrices() {
    const prices = await this.page
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();

    return prices.map((price) => Number(price.replace("$", "")));
  }

  async addProductToCart(productName: string) {
    const product = this.productItems.filter({
      hasText: productName,
    });

    // Fetch locator: Add to cart button inside a product card
    await product.locator('button[data-test^="add-to-cart"]').click();
  }

  async getCartCount() {
    if ((await this.cartCount.count()) === 0) {
      return 0;
    }

    return Number(await this.cartCount.textContent());
  }

  async openCart() {
    await this.cartButton.click();
  }

  async logout() {
    await this.menuButton.click();

    await this.logoutButton.click();
  }
}
