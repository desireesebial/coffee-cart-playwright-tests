import { Page, Locator, expect } from '@playwright/test';

export class AddToCartModal {
  readonly page: Page;
  readonly dialog: Locator;
  readonly yesBtn: Locator;
  readonly noBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.locator('dialog[data-cy="add-to-cart-modal"]');
    this.yesBtn = this.dialog.getByRole('button', { name: 'Yes' });
    this.noBtn = this.dialog.getByRole('button', { name: 'No' });
  }

  async expectOpen() {
    await expect(this.dialog).toBeVisible();
  }

  async confirm() {
    await this.expectOpen();
    await this.yesBtn.click();
    await expect(this.dialog).toBeHidden();
  }

  async cancel() {
    await this.expectOpen();
    await this.noBtn.click();
    await expect(this.dialog).toBeHidden();
  }
}
