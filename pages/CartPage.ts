import { Page, Locator, expect } from '@playwright/test';
import { MESSAGES } from '../data/coffeeData';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly emptyStateMessage: Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('li.list-item');
    this.emptyStateMessage = page.locator('div.list p');
    this.checkoutBtn = page.getByTestId('checkout');
  }

  async expectItemVisible(name: string) {
    const row = this.cartItems.filter({ hasText: name });
    await expect(row).toBeVisible();
  }

  async removeItem(name: string) {
    const row = this.cartItems.filter({ hasText: name });
    await row.getByRole('button', { name: `Remove all ${name}` }).click();
  }

  async expectEmptyCart() {
    await expect(this.emptyStateMessage).toHaveText(MESSAGES.emptyCart);
  }
}
