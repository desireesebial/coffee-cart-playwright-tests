import { Page, Locator, expect } from '@playwright/test';
import { CheckoutUser, MESSAGES } from '../data/coffeeData';

export class CheckoutModal {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly promoCheckbox: Locator;
  readonly submitBtn: Locator;
  readonly successSnackbar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('input#name');
    this.emailInput = page.locator('input#email');
    this.promoCheckbox = page.locator('input#promotion');
    this.submitBtn = page.locator('button#submit-payment');
    this.successSnackbar = page.locator('div.snackbar.success');
  }

  async submitPayment(user: CheckoutUser) {
    await expect(this.nameInput).toBeVisible();
    await this.nameInput.fill(user.name);
    await this.emailInput.fill(user.email);

    if (user.promotions) {
      await this.promoCheckbox.check();
    }

    await this.submitBtn.click();
  }

  async expectSuccessMessage() {
    await expect(this.successSnackbar).toBeVisible();
    await expect(this.successSnackbar).toContainText(MESSAGES.paymentSuccess);
  }
}
