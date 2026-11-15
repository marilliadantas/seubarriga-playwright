// Helper functions and per-environment data loading
import rawData from '../variables/variables-data.json';
import { ENV, requireEnv, type EnvName } from './env';

export type UserData = { Name: string; Email: string; Password: string };

type FileData = {
  ValidUser: UserData;
  InvalidUser: Pick<UserData, 'Email' | 'Password'>;
};

export type TestData = FileData & { ExistingUser: UserData };

// Existing user: credentials come from .env (or CI secrets), never from git
export const getExistingUser = (): UserData => ({
  Name: requireEnv('EXISTING_USER_NAME'),
  Email: requireEnv('EXISTING_USER_EMAIL'),
  Password: requireEnv('EXISTING_USER_PASSWORD'),
});

export const loadData = (env: EnvName = ENV): TestData => ({
  ...(rawData as Record<EnvName, FileData>)[env],
  ExistingUser: getExistingUser(),
});

export const uniqueEmail = (prefix = 'qa'): string => `${prefix}.${Date.now()}@example.com`;

// Creates a new user from a template, with a unique email
export const buildUser = (template: UserData, prefix = 'qa'): UserData => ({
  ...template,
  Email: uniqueEmail(prefix),
});
