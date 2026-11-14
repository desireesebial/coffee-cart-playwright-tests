import { Page, Locator, expect } from '@playwright/test';

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
    const buttonName = action === '+' ? `Add one ${drinkName}` : `Remove one ${drinkName}`;
    await this.previewContainer.getByRole('button', { name: buttonName, exact: true }).click();
  }
}
