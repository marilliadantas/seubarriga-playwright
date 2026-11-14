// Variáveis de ambiente (Stg | Prd). Selecionado via ENV=Stg|Prd
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export type EnvName = 'Stg' | 'Prd';

const environments: Record<EnvName, { baseUrl: string; apiUrl: string }> = {
  Stg: { baseUrl: 'https://seubarriga.wcaquino.me', apiUrl: 'https://barrigarest.wcaquino.me' },
  Prd: { baseUrl: 'https://seubarriga.wcaquino.me', apiUrl: 'https://barrigarest.wcaquino.me' },
};

export const resolveEnv = (name: string = 'Stg') => {
  if (!(name in environments)) {
    throw new Error(`ENV inválido: "${name}". Use: ${Object.keys(environments).join(', ')}`);
  }
  return { ENV: name as EnvName, ...environments[name as EnvName] };
};

export const { ENV, baseUrl, apiUrl } = resolveEnv(process.env.ENV);
