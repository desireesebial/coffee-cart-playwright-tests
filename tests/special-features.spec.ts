import { test } from '../fixtures/testFixtures';
import { COFFEES, TEST_USERS } from '../data/coffeeData';

test.describe('Menu features', () => {
  test('double-click on a title translates it to Chinese', async ({
    menuPage,
  }) => {
    await menuPage.doubleClickDrinkTitle(COFFEES.espresso.name);
    await menuPage.expectTranslatedTitle(COFFEES.espresso.chineseTitle);

    await menuPage.doubleClickDrinkTitle(COFFEES.espressoMacchiato.name);
    await menuPage.expectTranslatedTitle(COFFEES.espressoMacchiato.chineseTitle);
  });

  test('right-click opens the add-to-cart dialog (No cancels, Yes adds)', async ({
    menuPage,
    addToCartModal,
  }) => {
    await menuPage.rightClickDrink(COFFEES.espressoMacchiato.testId);
    await addToCartModal.cancel();
    await menuPage.expectCartCount(0);

    await menuPage.rightClickDrink(COFFEES.espressoMacchiato.testId);
    await addToCartModal.confirm();
    await menuPage.expectCartCount(1);
    await menuPage.expectTotal(COFFEES.espressoMacchiato.price);
  });

  test('promo shows on the 3rd and 6th item only', async ({
    menuPage,
    promoBanner,
  }) => {
    await menuPage.addDrink(COFFEES.espresso.testId);
    await menuPage.addDrink(COFFEES.americano.testId);
    await promoBanner.expectHidden();

    // 3rd item: promo
    await menuPage.addDrink(COFFEES.mocha.testId);
    await promoBanner.decline();
    await menuPage.expectCartCount(3);

    // 4th and 5th: no promo
    await menuPage.addDrink(COFFEES.flatWhite.testId);
    await menuPage.addDrink(COFFEES.cafeLatte.testId);
    await promoBanner.expectHidden();

    // 6th item: promo again
    await menuPage.addDrink(COFFEES.cappuccino.testId);
    await promoBanner.accept();
    await menuPage.expectCartCount(7);
  });

  test('cart preview opens on hover and +/- changes the quantity', async ({
    menuPage,
    cartPreview,
  }) => {
    await menuPage.addDrink(COFFEES.espresso.testId);
    await cartPreview.openByHover();

    await cartPreview.updateItemQuantity(COFFEES.espresso.name, '+');
    await menuPage.expectCartCount(2);
    await menuPage.expectTotal(COFFEES.espresso.price * 2);

    await cartPreview.updateItemQuantity(COFFEES.espresso.name, '-');
    await menuPage.expectCartCount(1);
    await menuPage.expectTotal(COFFEES.espresso.price);
  });

  test('checkout still works with more than 7 items', async ({
    menuPage,
    checkoutModal,
  }) => {
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
