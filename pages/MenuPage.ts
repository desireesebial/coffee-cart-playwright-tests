import { Page, Locator, expect } from '@playwright/test';
import { escapeRegExp } from './utils';

export class MenuPage {
  readonly page: Page;
  readonly checkoutBtn: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutBtn = page.getByTestId('checkout');
    this.cartLink = page.getByRole('link', { name: 'Cart page' });
  }

  async open(queryParams: string = '') {
    await this.page.goto(`/${queryParams}`);
  }

  async addDrink(testId: string) {
    await this.page.getByTestId(testId).click();
  }

  // Match the whole title so 'Espresso' does not also match 'Espresso Macchiato'
  private titleHeading(title: string): Locator {
    return this.page.locator('h4').filter({ hasText: new RegExp(`^${escapeRegExp(title)}\\s*\\$`) });
  }

  async doubleClickDrinkTitle(drinkName: string) {
    const heading = this.titleHeading(drinkName);
    await expect(heading).toHaveCount(1);
    await heading.dblclick();
  }

  async expectTranslatedTitle(chineseTitle: string) {
    await expect(this.titleHeading(chineseTitle)).toBeVisible();
  }

  async rightClickDrink(testId: string) {
    await this.page.getByTestId(testId).click({ button: 'right' });
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
