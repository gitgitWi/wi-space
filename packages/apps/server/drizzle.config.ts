import type { Config } from 'drizzle-kit';

/**
 * @see {@link https://orm.drizzle.team/kit-docs/config-reference#configuration}
 */
export default {
  schema: './src/handlers/**/schema.ts',
  out: './clients/db/migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL ?? '',
    authToken: process.env.TURSO_AUTH_TOKEN ?? '',
  },
} satisfies Config;
