import express, { Express } from 'express';
import { PusherFn, pusherFn, Pusher } from './Push';
import { Json } from '../../util/json';

export const VERSION: string = 'version';

/**
 * Expose a Pusher through a RESTful Express Js endpoint.
 * Closes a PusherM after if the Express app exits.
 */
export function pusherEndpoint<V extends Json>(
  basePusher: Pusher<string, V | null>
): Express {

  const pusher: PusherFn<string, V> = pusherFn(basePusher);

  const app: Express = express();
  app.use(express.json({ limit: '200mb' }));

  // Handle HTTP methods GET and PUT
  app.all('/', (request, response) =>
    response.send(
      JSON.stringify(
        pusher(
          <string> request.query[VERSION],
          request.method === 'GET' ?
            undefined :
            <V> request.body
        )
      )
    )
  );

  // Make sure PusherM `close` function gets called.
  if (typeof basePusher === 'object')
    app.on('exit', () => basePusher.close());

  return app;
}