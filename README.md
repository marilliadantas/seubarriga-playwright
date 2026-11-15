# Seu Barriga - Automação com Playwright + TypeScript + Jest

Mesma arquitetura do `site-ecom-e2e` (locators, page_objects, support, variables, evidence), adaptada para Playwright + Allure.

## Estrutura
| Diretório | Finalidade |
|---|---|
| `resources/locators` | Seletores dos elementos por tela |
| `resources/page_objects` | Page Objects com as keywords de cada página (Given/When/Then) |
| `resources/support/base.js` | Fixtures: Open Website / Close Website (evidência) |
| `resources/support/env.js` | Ambientes `Stg` / `Prd` (variável `ENV`) |
| `resources/support/utils.js` | Funções auxiliares |
| `resources/variables` | Massa de dados por ambiente |
| `evidence` | Screenshots e artefatos de execução (ignorado no git) |
| `tests/*.spec.ts` | Testes de UI (Playwright) |
| `tests/unit` | Testes unitários dos helpers (Jest) |
| `tests/api` | Testes de API do Seu Barriga (Jest) |

## Onde cada ferramenta é usada
| Ferramenta | Escopo | Arquivos |
|---|---|---|
| Playwright | Testes de UI (E2E) com report Allure | `tests/*.spec.ts` |
| Jest + ts-jest | Testes de API (`POST /signin`) e unitários (`utils`, `env`, massa de dados). Também aparecem no Allure | `tests/api`, `tests/unit` |
| TypeScript | Todo o projeto, modo `strict` | `tsconfig.json` |

## Execução
```bash
npm ci && npx playwright install chromium
cp .env.example .env      # preencha as credenciais do usuário existente
npm run typecheck         # checagem de tipos
npm run test:jest         # Jest: unitários + API
npm run test:unit         # só unitários
npm run test:api          # só API
npm run test:stg          # UI no ambiente Stg
```

## Report Allure (requer Java)
```bash
npm run allure:generate   # gera allure-report/
npm run allure:open       # abre o report
npm run allure:serve      # gera e abre direto de allure-results/
```

## Allure no GitHub Pages
A cada push na `main`, o CI roda os testes e publica o report em:
https://marilliadantas.github.io/seubarriga-playwright/

Configuração única (precisa de admin do repo): **Settings > Pages > Build and deployment > Source: GitHub Actions**.
