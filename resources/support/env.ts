// Environment variables (Stg | Prd). Selected through ENV=Stg|Prd
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export type EnvName = 'Stg' | 'Prd';

const environments: Record<EnvName, { baseUrl: string; apiUrl: string }> = {
  Stg: { baseUrl: 'https://seubarriga.wcaquino.me', apiUrl: 'https://barrigarest.wcaquino.me' },
  Prd: { baseUrl: 'https://seubarriga.wcaquino.me', apiUrl: 'https://barrigarest.wcaquino.me' },
};

export const resolveEnv = (name: string = 'Stg') => {
  if (!(name in environments)) {
    throw new Error(`Invalid ENV: "${name}". Use: ${Object.keys(environments).join(', ')}`);
  }
  return { ENV: name as EnvName, ...environments[name as EnvName] };
};

export const { ENV, baseUrl, apiUrl } = resolveEnv(process.env.ENV);

// Reads a required variable (local .env or CI secrets) and fails with a clear message if it is missing
export const requireEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Variable ${name} is not set. Copy .env.example to .env and fill it in.`);
  }

  return value;
};
