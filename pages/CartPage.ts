import { Page, Locator, expect } from '@playwright/test';
import { MESSAGES } from '../data/coffeeData';

export class CartPage {
  readonly page: Page;
  readonly cartList: Locator;
  readonly emptyStateMessage: Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartList = page.locator('div.list');
    this.emptyStateMessage = page.locator('div.list p');
    this.checkoutBtn = page.getByTestId('checkout');
  }

  async expectItemVisible(name: string) {
    await expect(this.cartList).toContainText(name);
  }

  async removeItem(name: string) {
    await this.cartList.getByRole('button', { name: `Remove all ${name}` }).first().click();
  }

  async expectEmptyCart() {
    await expect(this.emptyStateMessage).toHaveText(MESSAGES.emptyCart);
  }
}
