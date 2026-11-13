import { test, expect } from '../fixtures/testFixtures';
import { COFFEES, PROMO, TEST_USERS } from '../data/coffeeData';

test.describe('Special Menu Interactions & Edge Cases', () => {
  test('should translate coffee title to Chinese on double-click', async ({ menuPage, page }) => {
    await menuPage.doubleClickDrinkTitle(COFFEES.espresso.name);
    await expect(page.locator('h4').filter({ hasText: COFFEES.espresso.chineseTitle })).toBeVisible();

    await menuPage.doubleClickDrinkTitle(COFFEES.cappuccino.name);
    await expect(page.locator('h4').filter({ hasText: COFFEES.cappuccino.chineseTitle })).toBeVisible();
  });

  test('should open add-to-cart dialog on right-click and handle Yes/No actions', async ({ menuPage }) => {
    await menuPage.rightClickDrink(COFFEES.espressoMacchiato.testId);
    await menuPage.respondToAddModal(false);
    await menuPage.expectCartCount(0);

    await menuPage.rightClickDrink(COFFEES.espressoMacchiato.testId);
    await menuPage.respondToAddModal(true);
    await menuPage.expectCartCount(1);
    await menuPage.expectTotal(COFFEES.espressoMacchiato.price);
  });

  test('should trigger promo popup on every 3rd item added (3rd and 6th items)', async ({ menuPage }) => {
    await menuPage.addDrink(COFFEES.espresso.testId);
    await menuPage.addDrink(COFFEES.americano.testId);
    await expect(menuPage.promoBanner).toBeHidden();

    // 3rd item triggers promo
    await menuPage.addDrink(COFFEES.mocha.testId);
    await menuPage.handlePromoBanner(false);
    await menuPage.expectCartCount(3);

    // 4th and 5th items do not trigger promo
    await menuPage.addDrink(COFFEES.flatWhite.testId);
    await menuPage.addDrink(COFFEES.cafeLatte.testId);
    await expect(menuPage.promoBanner).toBeHidden();

    // 6th item triggers promo again
    await menuPage.addDrink(COFFEES.cappuccino.testId);
    await menuPage.handlePromoBanner(true);
    await menuPage.expectCartCount(7);
  });

  test('should show quick cart preview on Pay button hover and update item quantities', async ({ menuPage }) => {
    await menuPage.addDrink(COFFEES.espresso.testId);
    await menuPage.hoverPayButton();

    await menuPage.updateQtyFromPreview(COFFEES.espresso.name, '+');
    await menuPage.expectCartCount(2);
    await menuPage.expectTotal(COFFEES.espresso.price * 2);

    await menuPage.updateQtyFromPreview(COFFEES.espresso.name, '-');
    await menuPage.expectCartCount(1);
    await menuPage.expectTotal(COFFEES.espresso.price);
  });

  test('should handle cart slowdown (>7 items) without hardcoded waits', async ({ menuPage, checkoutModal }) => {
    for (let i = 0; i < 8; i++) {
      await menuPage.addDrink(COFFEES.americano.testId);
    }

    await menuPage.expectCartCount(8);
    await menuPage.expectTotal(COFFEES.americano.price * 8);

    await menuPage.clickCheckout();
    await checkoutModal.submitPayment(TEST_USERS.defaultUser);
    await checkoutModal.expectSuccessMessage();
  });
});
