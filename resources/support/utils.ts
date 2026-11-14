// Funções auxiliares e carga de dados por ambiente
import rawData from '../variables/variables-data.json';
import { ENV, type EnvName } from './env';

export type UserData = { Name: string; Email: string; Password: string };
export type TestData = {
  ValidUser: UserData;
  ExistingUser: UserData;
  InvalidUser: Pick<UserData, 'Email' | 'Password'>;
};

export const loadData = (env: EnvName = ENV): TestData => (rawData as Record<EnvName, TestData>)[env];

export const uniqueEmail = (prefix = 'qa'): string => `${prefix}.${Date.now()}@example.com`;

// Cria um usuário novo a partir de um modelo, com e-mail único
export const buildUser = (template: UserData, prefix = 'qa'): UserData => ({
  ...template,
  Email: uniqueEmail(prefix),
});
