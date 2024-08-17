import { Elysia } from 'elysia';

import { userPlugin } from '~/plugins/users';

const PORT = import.meta.env.PORT ? Number(import.meta.env.PORT) : 8080;

new Elysia()
  .use(userPlugin)
  .get('/', () => 'Hello from MySpace API')
  .listen(PORT, (server) => {
    console.log('Server listening on', server.url.href);
  });
