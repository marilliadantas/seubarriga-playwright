// Cliente HTTP da API do Seu Barriga (reutilizável em qualquer teste Jest)
import { apiUrl } from './env';

export type Credentials = { email: string; senha: string };

// Campos opcionais: omitir um campo permite validar os caminhos alternativos.
export const signin = (credentials: Partial<Credentials> = {}) =>
  fetch(`${apiUrl}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
