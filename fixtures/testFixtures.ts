import { test as base, expect } from '@playwright/test';
import { MenuPage } from '../pages/MenuPage';
import { CheckoutModal } from '../pages/CheckoutModal';
import { CartPage } from '../pages/CartPage';

type Pages = {
  menuPage: MenuPage;
  checkoutModal: CheckoutModal;
  cartPage: CartPage;
};

export const test = base.extend<Pages>({
  menuPage: async ({ page }, use) => {
    const menuPage = new MenuPage(page);
    await menuPage.open();
    await menuPage.expectCartCount(0);
    await use(menuPage);
  },

  checkoutModal: async ({ page }, use) => {
    await use(new CheckoutModal(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect };
