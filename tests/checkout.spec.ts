import { test } from '../fixtures/testFixtures';
import { COFFEES, TEST_USERS, PROMO } from '../data/coffeeData';

test.describe('Checkout', () => {
  test('add a drink, check the cart page, pay and see the success message', async ({
    menuPage,
    cartPage,
    checkoutModal,
  }) => {
    await menuPage.addDrink(COFFEES.cappuccino.testId);
    await menuPage.expectCartCount(1);
    await menuPage.expectTotal(COFFEES.cappuccino.price);

    await menuPage.goToCartPage();
    await cartPage.expectItemVisible(COFFEES.cappuccino.name);

    await cartPage.checkoutBtn.click();
    await checkoutModal.submitPayment(TEST_USERS.defaultUser);
    await checkoutModal.expectSuccessMessage();

    await menuPage.expectCartCount(0);
  });

  test('accept the 3rd item promo and pay with the discounted Mocha', async ({
    menuPage,
    promoBanner,
    cartPreview,
    checkoutModal,
    populateCart,
  }) => {
    const selectedDrinks = [COFFEES.espresso, COFFEES.americano, COFFEES.cafeLatte];
    const subtotal = await populateCart(selectedDrinks);

    await promoBanner.accept();

    await menuPage.expectCartCount(4);
    await menuPage.expectTotal(subtotal + PROMO.mochaDiscountPrice);

    await cartPreview.openByHover();
    await cartPreview.expectItemInPreview(PROMO.cartItemName);

    await menuPage.clickCheckout();
    await checkoutModal.submitPayment(TEST_USERS.promoOptInUser);
    await checkoutModal.expectSuccessMessage();
  });

  test('decline the 3rd item promo and keep the original total', async ({
    menuPage,
    promoBanner,
    checkoutModal,
    populateCart,
  }) => {
    const selectedDrinks = [COFFEES.espresso, COFFEES.mocha, COFFEES.flatWhite];
    const expectedTotal = await populateCart(selectedDrinks);

    await promoBanner.decline();
    await menuPage.expectCartCount(3);
    await menuPage.expectTotal(expectedTotal);

    await menuPage.clickCheckout();
    await checkoutModal.submitPayment(TEST_USERS.defaultUser);
    await checkoutModal.expectSuccessMessage();
  });
});
