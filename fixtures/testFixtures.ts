import {test as base, expect, Page} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  checkoutPage: CheckoutPage;
};

export const test =base.extend<MyFixtures>({
   loginPage: async ({ page },use) =>{
    const loginPage = new LoginPage(page);
    await use(loginPage);
   },

   inventoryPage: async ({ page }, use) => {

        const inventoryPage = new InventoryPage(page);

        await use(inventoryPage);
    },

    checkoutPage: async ({ page }, use) => {

        const checkoutPage = new CheckoutPage(page);

        await use(checkoutPage);
    }
});
export { expect };