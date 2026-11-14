import { Page, Locator, expect } from '@playwright/test';
import { PROMO } from '../data/coffeeData';

export class PromoBanner {
  readonly page: Page;
  readonly banner: Locator;
  readonly acceptBtn: Locator;
  readonly declineBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.banner = page.locator('div.promo');
    this.acceptBtn = this.banner.getByRole('button', { name: PROMO.acceptButtonText });
    this.declineBtn = this.banner.getByRole('button', { name: PROMO.declineButtonText });
  }

  async expectVisible() {
    await expect(this.banner).toBeVisible();
    await expect(this.banner).toContainText(PROMO.message);
  }

  async expectHidden() {
    await expect(this.banner).toBeHidden();
  }

  async accept() {
    await this.expectVisible();
    await this.acceptBtn.click();
    await this.expectHidden();
  }

  async decline() {
    await this.expectVisible();
    await this.declineBtn.click();
    await this.expectHidden();
  }
}
