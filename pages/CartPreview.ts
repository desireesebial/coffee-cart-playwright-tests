import { Page, Locator, expect } from '@playwright/test';
import { escapeRegExp } from './utils';

export class CartPreview {
  readonly page: Page;
  readonly checkoutBtn: Locator;
  readonly previewContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutBtn = page.getByTestId('checkout');
    this.previewContainer = page.locator('ul.cart-preview');
  }

  async openByHover() {
    await this.checkoutBtn.hover();
    await expect(this.previewContainer).toBeVisible();
  }

  async expectItemInPreview(drinkName: string) {
    await expect(this.previewContainer).toContainText(drinkName);
  }

  async updateItemQuantity(drinkName: string, action: '+' | '-') {
    const itemRow = this.previewContainer
      .locator('li.list-item')
      .filter({ hasText: new RegExp(`^${escapeRegExp(drinkName)}(\\s|$)`) });
    await itemRow.getByRole('button', { name: action, exact: true }).click();
  }
}
