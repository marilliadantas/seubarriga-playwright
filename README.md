# Seu Barriga - Automation with Playwright + TypeScript

Same architecture as `site-ecom-e2e` (locators, page_objects, support, variables, evidence), adapted to Playwright + Allure.

## Structure
| Directory | Purpose |
|---|---|
| `resources/locators` | Element locators per page |
| `resources/page_objects` | Page Objects with the keywords of each page (Given/When/Then) |
| `resources/support/base.ts` | Fixtures: page objects and test data, plus the evidence screenshot (Close Website) |
| `resources/support/env.ts` | `Stg` / `Prd` environments (`ENV` variable) and required variables |
| `resources/support/api.ts` | API client used by the API tests |
| `resources/support/utils.ts` | Helper functions and data loading |
| `resources/variables` | Test data per environment |
| `evidence` | Screenshots and execution artifacts (ignored by git) |
| `tests/e2e` | UI tests in the browser |
| `tests/api` | Seu Barriga API tests (`POST /signin`), no browser |
| `tests/unit` | Unit tests for the helpers, no browser |

All tests run on Playwright, split into three projects in `playwright.config.ts`: `e2e`, `api` and `unit`. Everything goes into the same Allure report.

## Running
```bash
npm ci && npx playwright install chromium
cp .env.example .env      # fill in the existing user credentials
npm run typecheck         # type check
npm test                  # all projects
npm run test:e2e          # UI only
npm run test:api          # API only
npm run test:unit         # unit only
npm run test:allure       # all tests + Allure report
```

## Allure report (requires Java)
```bash
npm run allure:generate   # generates allure-report/
npm run allure:open       # opens the report
npm run allure:serve      # generates and opens straight from allure-results/
```

## Allure on GitHub Pages
On every push to `main`, the CI runs the tests and publishes the report at:
https://marilliadantas.github.io/seubarriga-playwright/

One-time setup (requires repo admin): **Settings > Pages > Build and deployment > Source: GitHub Actions**.
