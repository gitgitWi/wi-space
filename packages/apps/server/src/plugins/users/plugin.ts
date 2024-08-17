import { Value } from '@sinclair/typebox/value';
import { Elysia } from 'elysia';
import { ulid } from 'ulid';

import { db } from '~/clients/db';
import { InsertUserSchema, userTable } from './schema';

export const userPlugin = new Elysia({
  prefix: '/users',
})
  .get('/:userId', ({ params, set }) => {
    set.status = 'Not Implemented';
    return { userId: params.userId };
  })
  .post(
    '/',
    async ({ body, set }) => {
      console.debug('[UserPlugin.POST.CreateUser]', body);
      const user = Value.Parse(InsertUserSchema, body);

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
      body: InsertUserSchema,
    },
  );
