import { test } from '../fixtures/testFixtures';
import { COFFEES, TEST_USERS, PROMO } from '../data/coffeeData';

test.describe('Checkout Flow', () => {
  test('should add a drink, submit payment details, and verify purchase success', async ({
    menuPage,
    checkoutModal,
  }) => {
    await menuPage.addDrink(COFFEES.cappuccino.testId);
    await menuPage.expectCartCount(1);
    await menuPage.expectTotal(COFFEES.cappuccino.price);

    await menuPage.handlePromoIfPresent();
    await menuPage.clickCheckout();

    await checkoutModal.submitPayment(TEST_USERS.defaultUser);
    await checkoutModal.expectSuccessMessage();

    await menuPage.expectCartCount(0);
    await menuPage.expectTotal(0);
  });

  test('should handle the 3rd item promo popup and include discounted Mocha in checkout', async ({
    menuPage,
    checkoutModal,
    cartPage,
  }) => {
    const selectedDrinks = [COFFEES.espresso, COFFEES.americano, COFFEES.cafeLatte];
    const subtotal = selectedDrinks.reduce((sum, item) => sum + item.price, 0);

    for (const drink of selectedDrinks) {
      await menuPage.addDrink(drink.testId);
    }

    await menuPage.expectCartCount(3);
    await menuPage.handlePromoIfPresent(true);

    await menuPage.expectCartCount(4);
    await menuPage.expectTotal(subtotal + PROMO.mochaDiscountPrice);

    await menuPage.goToCartPage();
    await cartPage.expectItemVisible(PROMO.cartItemName);

    await menuPage.clickCheckout();
    await checkoutModal.submitPayment(TEST_USERS.promoOptInUser);
    await checkoutModal.expectSuccessMessage();
  });

  test('should keep original total when declining the 3rd item promo popup', async ({
    menuPage,
    checkoutModal,
  }) => {
    const selectedDrinks = [COFFEES.espresso, COFFEES.mocha, COFFEES.flatWhite];
    const expectedTotal = selectedDrinks.reduce((sum, item) => sum + item.price, 0);

    for (const drink of selectedDrinks) {
      await menuPage.addDrink(drink.testId);
    }

    await menuPage.handlePromoIfPresent(false);
    await menuPage.expectCartCount(3);
    await menuPage.expectTotal(expectedTotal);

    await menuPage.clickCheckout();
    await checkoutModal.submitPayment(TEST_USERS.defaultUser);
    await checkoutModal.expectSuccessMessage();
  });
});
