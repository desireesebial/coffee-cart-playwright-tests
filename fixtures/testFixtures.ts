import { test as base, expect } from '@playwright/test';
import { MenuPage } from '../pages/MenuPage';
import { PromoBanner } from '../pages/PromoBanner';
import { AddToCartModal } from '../pages/AddToCartModal';
import { CartPreview } from '../pages/CartPreview';
import { CheckoutModal } from '../pages/CheckoutModal';
import { CartPage } from '../pages/CartPage';
import { CoffeeItem } from '../data/coffeeData';

type AppFixtures = {
  menuPage: MenuPage;
  promoBanner: PromoBanner;
  addToCartModal: AddToCartModal;
  cartPreview: CartPreview;
  checkoutModal: CheckoutModal;
  cartPage: CartPage;
  populateCart: (items: CoffeeItem[]) => Promise<number>;
};

export const test = base.extend<AppFixtures>({
  menuPage: async ({ page, context }, use) => {
    const pageErrors: Error[] = [];
    page.on('pageerror', (err) => pageErrors.push(err));

    await context.clearCookies();
    const menuPage = new MenuPage(page);
    await menuPage.open();
    await page.evaluate(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });

    await menuPage.expectCartCount(0);
    await menuPage.expectTotal(0);

    await use(menuPage);

    // fail the test if the app threw an uncaught error
    // eslint-disable-next-line playwright/no-standalone-expect
    expect(pageErrors, 'Expected zero uncaught page errors during test execution').toHaveLength(0);
  },

  promoBanner: async ({ page }, use) => {
    await use(new PromoBanner(page));
  },

  addToCartModal: async ({ page }, use) => {
    await use(new AddToCartModal(page));
  },

  cartPreview: async ({ page }, use) => {
    await use(new CartPreview(page));
  },

  checkoutModal: async ({ page }, use) => {
    await use(new CheckoutModal(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  // Adds the drinks and returns their subtotal.
  // The promo pops up on the 3rd item and this helper leaves it open, so the test has to accept or decline it.
  populateCart: async ({ menuPage }, use) => {
    const helper = async (items: CoffeeItem[]): Promise<number> => {
      let runningTotal = 0;
      for (const item of items) {
        await menuPage.addDrink(item.testId);
        runningTotal += item.price;
      }
      await menuPage.expectCartCount(items.length);
      return runningTotal;
    };
    await use(helper);
  },
});

export { expect };
