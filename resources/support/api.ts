// Seu Barriga API client (reusable in any Jest test)
import { apiUrl } from './env';

export type Credentials = { email: string; senha: string };

// Optional fields: omitting one lets us validate the alternative paths.
// "senha" is the field name the API expects (it means password).
export const signin = (credentials: Partial<Credentials> = {}) =>
  fetch(`${apiUrl}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
