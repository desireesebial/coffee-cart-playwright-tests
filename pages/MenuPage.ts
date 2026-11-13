import { Page, Locator, expect } from '@playwright/test';
import { PROMO } from '../data/coffeeData';

export class MenuPage {
  readonly page: Page;
  readonly checkoutBtn: Locator;
  readonly cartLink: Locator;
  readonly promoBanner: Locator;
  readonly promoYesBtn: Locator;
  readonly promoNoBtn: Locator;
  readonly contextModal: Locator;
  readonly modalYesBtn: Locator;
  readonly modalNoBtn: Locator;
  readonly cartPreview: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutBtn = page.getByTestId('checkout');
    this.cartLink = page.getByRole('link', { name: 'Cart page' });
    this.promoBanner = page.locator('div.promo');
    this.promoYesBtn = this.promoBanner.locator('button.yes');
    this.promoNoBtn = this.promoBanner.locator('button.no');
    this.contextModal = page.locator('dialog[data-cy="add-to-cart-modal"]');
    this.modalYesBtn = this.contextModal.getByRole('button', { name: 'Yes' });
    this.modalNoBtn = this.contextModal.getByRole('button', { name: 'No' });
    this.cartPreview = page.locator('ul.cart-preview');
  }

  async open(queryParams: string = '') {
    await this.page.goto(`/${queryParams}`);
  }

  async addDrink(testId: string) {
    await this.page.getByTestId(testId).click();
  }

  async handlePromoIfPresent(acceptPromo: boolean = true) {
    if (await this.promoBanner.isVisible()) {
      await expect(this.promoBanner).toContainText(PROMO.message);
      if (acceptPromo) {
        await this.promoYesBtn.click();
      } else {
        await this.promoNoBtn.click();
      }
      await expect(this.promoBanner).toBeHidden();
    }
  }

  async doubleClickDrinkTitle(drinkName: string) {
    const title = this.page.locator('h4').filter({ hasText: drinkName }).first();
    await title.dblclick();
  }

  async rightClickDrink(testId: string) {
    await this.page.getByTestId(testId).click({ button: 'right' });
    await expect(this.contextModal).toBeVisible();
  }

  async respondToAddModal(confirm: boolean) {
    if (confirm) {
      await this.modalYesBtn.click();
    } else {
      await this.modalNoBtn.click();
    }
    await expect(this.contextModal).toBeHidden();
  }

  async hoverPayButton() {
    await this.checkoutBtn.hover();
    await expect(this.cartPreview).toBeVisible();
  }

  async updateQtyFromPreview(drinkName: string, action: '+' | '-') {
    const itemRow = this.cartPreview.locator('li.list-item').filter({ hasText: drinkName });
    await itemRow.getByRole('button', { name: action }).click();
  }

  async expectCartCount(count: number) {
    await expect(this.cartLink).toHaveText(`cart (${count})`);
  }

  async expectTotal(amount: number) {
    await expect(this.checkoutBtn).toHaveText(`Total: $${amount.toFixed(2)}`);
  }

  async clickCheckout() {
    await this.checkoutBtn.click();
  }

  async goToCartPage() {
    await this.cartLink.click();
  }
}
