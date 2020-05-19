import express, { Express } from 'express';
import { PusherFn } from './Push';

export function requestHander(
  pusherFn: PusherFn<any, any>
) {

  const app: Express = express();
  app.use(express.json({ limit: '200mb' }));

  app.get('/', 
    (request, response) =>
      response.send(
        JSON.stringify(
          pusherFn(
            request.query.version
          )
        )
      )
  );

  app.post('/', 
    (request, response) => 
      response.send(
        JSON.stringify(
          pusherFn(
            request.query.version,
            request.body
          )
        )
      )
  );
  
  return app;
}