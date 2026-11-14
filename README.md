# coffee-cart-playwright-tests

Playwright + TypeScript tests for https://coffee-cart.app/.

The main flow: add a drink, deal with the promo popup if it shows up, check out, enter payment details, and check the success message. There are also tests for the double-click translation, the right-click dialog and the promo on every 3rd item.

## Run it

```bash
npm ci
npx playwright install chromium
npm run lint
npm test
npm run report     # opens the HTML report
```

`BASE_URL` defaults to https://coffee-cart.app. Copy `.env.example` to `.env` if you want to point at something else.

## How it is organised

- `pages/` - one class per part of the app (menu, cart, checkout form, promo banner, right-click dialog, cart preview). All selectors live here.
- `fixtures/testFixtures.ts` - gives each test a fresh page on an empty cart, and fails the test if the app throws an uncaught error. It also has `populateCart` for tests that need several drinks first.
- `data/coffeeData.ts` - drinks, prices, Chinese names, promo text and test users. Tests import from here instead of typing values.
- `tests/` - the specs. They only call page methods, no selectors.

## Rules when adding tests

- Put selectors in `pages/`, not in specs. Prefer `getByTestId` and `getByRole`.
- No `waitForTimeout`. Playwright waits for elements by itself, and ESLint fails if you add a sleep.
- Keep test data in `data/`.
- Start tests from the `menuPage` fixture so the cart is empty.
- New `expectSomething` helper on a page? Add its name to `assertFunctionNames` in `.eslintrc.json`, otherwise the lint rule says the test has no assertions.
- The 3rd drink added triggers the promo. `populateCart` leaves it open, so accept or decline it in the test.

## CI

`.github/workflows/playwright.yml` runs on push, pull request and manual start: install, lint, run the tests, and upload the HTML report and JUnit file. Set a repository variable called `BASE_URL` to test a different URL.
