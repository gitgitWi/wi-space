import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const libsqlClient = createClient({
  url: 'file:./src/clients/db/_local/local.db',
  syncUrl: process.env.TURSO_DATABASE_URL ?? '',
  authToken: process.env.TURSO_AUTH_TOKEN ?? '',
  syncInterval: 30,
});

export const db = drizzle(libsqlClient);
