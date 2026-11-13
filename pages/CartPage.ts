import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('li.list-item');
  }

  async expectItemVisible(name: string) {
    const row = this.cartItems.filter({ hasText: name });
    await expect(row).toBeVisible();
  }
}
