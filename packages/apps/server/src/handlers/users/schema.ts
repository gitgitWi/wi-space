import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { ulid } from 'ulid';

const currentTimestampQuery = sql`CURRENT_TIMESTAMP`;

/** @todo OAuth properties - [provider, token, ...?] */
export const userTable = sqliteTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => ulid()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  isActivated: integer('is_activated', { mode: 'boolean' }).default(true),
  lastLogin: integer('last_login', { mode: 'timestamp_ms' }).default(
    currentTimestampQuery,
  ),
  createdAt: integer('create_at', { mode: 'timestamp_ms' }).default(
    currentTimestampQuery,
  ),
  updatedAt: integer('update_at', { mode: 'timestamp_ms' }).default(
    currentTimestampQuery,
  ),
});

/** @todo Pick name, email only - client request schema */
export const InsertUserSchema = createInsertSchema(userTable);

export type InsertUser = typeof InsertUserSchema.$inferInsert;

export const SelectUserSchema = createSelectSchema(userTable);

export type SelectUser = typeof SelectUserSchema.$inferSelect;
