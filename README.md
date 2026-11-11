# Seu Barriga - Automação com Playwright

Mesma arquitetura do `site-ecom-e2e` (locators, page_objects, support, variables, evidence), adaptada para Playwright + Allure.

## Estrutura
| Diretório | Finalidade |
|---|---|
| `resources/locators` | Seletores dos elementos por tela |
| `resources/page_objects` | Page Objects com as keywords de cada página (Given/When/Then) |
| `resources/support/actions.js` | Keywords de interação (preencher, clicar, validar) com steps do Allure |
| `resources/support/base.js` | Fixtures: Open Website / Close Website (evidência) |
| `resources/support/env.js` | Ambientes `Stg` / `Prd` (variável `ENV`) |
| `resources/support/utils.js` | Funções auxiliares |
| `resources/variables` | Massa de dados por ambiente |
| `evidence` | Screenshots e artefatos de execução (ignorado no git) |
| `tests` | Cenários de teste |

## Execução
```bash
npm ci && npx playwright install chromium
npm run test:stg          # ambiente Stg
npm run test:smoke        # apenas @Smoke
npm run test:regression   # apenas @Regression
```

## Report Allure (requer Java)
```bash
npm run allure:generate   # gera allure-report/
npm run allure:open       # abre o report
npm run allure:serve      # gera e abre direto de allure-results/
```
