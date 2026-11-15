# Seu Barriga - Automation with Playwright + TypeScript + Jest

Same architecture as `site-ecom-e2e` (locators, page_objects, support, variables, evidence), adapted to Playwright + Allure.

## Structure
| Directory | Purpose |
|---|---|
| `resources/locators` | Element locators per page |
| `resources/page_objects` | Page Objects with the keywords of each page (Given/When/Then) |
| `resources/support/base.ts` | Fixtures: page objects and test data, plus the evidence screenshot (Close Website) |
| `resources/support/env.ts` | `Stg` / `Prd` environments (`ENV` variable) and required variables |
| `resources/support/api.ts` | API client used by the Jest API tests |
| `resources/support/utils.ts` | Helper functions and data loading |
| `resources/variables` | Test data per environment |
| `evidence` | Screenshots and execution artifacts (ignored by git) |
| `tests/*.spec.ts` | UI tests (Playwright) |
| `tests/unit` | Unit tests for the helpers (Jest) |
| `tests/api` | Seu Barriga API tests (Jest) |

## Where each tool is used
| Tool | Scope | Files |
|---|---|---|
| Playwright | UI (E2E) tests with the Allure report | `tests/*.spec.ts` |
| Jest + ts-jest | API tests (`POST /signin`) and unit tests (`utils`, `env`, test data). They also appear in Allure | `tests/api`, `tests/unit` |
| TypeScript | Whole project, `strict` mode | `tsconfig.json` |

## Running
```bash
npm ci && npx playwright install chromium
cp .env.example .env      # fill in the existing user credentials
npm run typecheck         # type check
npm run test:jest         # Jest: unit + API
npm run test:unit         # unit only
npm run test:api          # API only
npm run test:stg          # UI on the Stg environment
npm run test:allure       # Jest + Playwright + Allure report
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
