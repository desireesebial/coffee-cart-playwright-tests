# Coffee Cart Playwright Automation

End-to-end UI test suite for [https://coffee-cart.app/](https://coffee-cart.app/) built with Playwright and TypeScript.

## Project Structure

- `pages/` - Page Object Model classes (`MenuPage.ts`, `CheckoutModal.ts`, `CartPage.ts`)
- `fixtures/` - Custom Playwright fixtures (`testFixtures.ts`) for page setup and initial state checks
- `data/` - Test data and product constants (`coffeeData.ts`) separated from test scripts
- `tests/` - E2E checkout flows (`checkout.spec.ts`) and bonus interaction tests (`special-features.spec.ts`)
- `.github/workflows/` - GitHub Actions workflow (`playwright.yml`) for running tests in CI

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   npx playwright install
   ```

2. Run all tests:
   ```bash
   npm test
   ```

3. Open HTML test report:
   ```bash
   npm run report
   ```
