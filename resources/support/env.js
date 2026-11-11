// Variáveis de ambiente (Stg | Prd). Selecionado via ENV=Stg|Prd
require('dotenv').config({ quiet: true });

const environments = {
  Stg: { baseUrl: 'https://seubarriga.wcaquino.me' },
  Prd: { baseUrl: 'https://seubarriga.wcaquino.me' },
};

const ENV = process.env.ENV || 'Stg';

if (!environments[ENV]) {
  throw new Error(`ENV inválido: "${ENV}". Use: ${Object.keys(environments).join(', ')}`);
}

module.exports = { ENV, ...environments[ENV] };
