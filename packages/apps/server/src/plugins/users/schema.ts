import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { ulid } from 'ulid';
import { Type } from '@sinclair/typebox';

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

const InsertUserSchema = createInsertSchema(userTable);

export const InsertUserRequestSchema = Type.Pick(InsertUserSchema, [
  'name',
  'email',
]);

const SelectUserSchema = createSelectSchema(userTable);

export const SelectUserRequestSchema = Type.Partial(
  Type.Pick(SelectUserSchema, ['id', 'name', 'email']),
);

export const SelectUserByIdRequestSchema = Type.Pick(SelectUserSchema, ['id']);

export const SelectUserByEmailRequestSchema = Type.Pick(SelectUserSchema, [
  'email',
]);
