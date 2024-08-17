import { Value } from '@sinclair/typebox/value';
import { Elysia } from 'elysia';
import { ulid } from 'ulid';
import { eq } from 'drizzle-orm';

import { db } from '~/clients/db';
import {
  InsertUserRequestSchema,
  SelectUserByIdRequestSchema,
  userTable,
} from './schema';

/**
 * @todo auth
 */
export const userPlugin = new Elysia({
  prefix: '/users',
})
  .get(
    '/:id',
    async ({ params, set }) => {
      const result = await db
        .select()
        .from(userTable)
        .where(eq(userTable.id, params.id));

      if (result.length === 0) {
        set.status = 'Not Found';

        return {
          message: 'Not Found',
          data: null,
        };
      }

      return {
        message: 'ok',
        data: result[0],
      };
    },
    {
      params: SelectUserByIdRequestSchema,
    },
  )
  .post(
    '/',
    async ({ body, set }) => {
      const user = Value.Parse(InsertUserRequestSchema, body);

      const result = await db
        .insert(userTable)
        .values(user)
        .onConflictDoUpdate({ target: userTable.id, set: { id: ulid() } })
        .onConflictDoNothing({ target: userTable.email })
        .returning();

      console.debug('[UserPlugin.POST.CreateUser.result]', result);
      set.headers['content-type'] = 'application/json';

      if (result.length === 0) {
        set.status = 'Conflict';
        return {
          message: 'User already exists',
        };
      }

      const createdUser = result[0];
      return {
        message: 'User created',
        user: {
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
          createdAt: createdUser.createdAt,
        },
      };
    },
    {
      body: InsertUserRequestSchema,
    },
  );
