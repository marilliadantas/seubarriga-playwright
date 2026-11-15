// Seu Barriga API client (reusable in any API test)
import type { APIRequestContext } from '@playwright/test';

export type Credentials = { email: string; senha: string };

// Optional fields: omitting one lets us validate the alternative paths.
// "senha" is the field name the API expects (it means password).
// The base URL comes from the "api" project in playwright.config.ts.
export const signin = (request: APIRequestContext, credentials: Partial<Credentials> = {}) =>
  request.post('/signin', { data: credentials });
