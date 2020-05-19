import express, { Express } from 'express';

// UI (string) <-> Client Cache (string) <-> Session Server Cache <-> File Cache <-> Hard Disk

// Step 1, UI pushes new change to client cache. (checked, string -> string, hash-version)
// always "accepts" change, calculates diff, proceeds to step 2

// Step 2a, Client Cache pushes over network to File Cache, (checked, diff -> string, timestamp + hash)

// Step 2b, Client cache pushes over network to Session Cache, (checked, diff -> string, ord-version + hash)

// Step 3b, Session Cache pushes to File Cache, (checked, string -> string, ord-version + hash)

// Step 4, File Cache writes to disk

export function noteworkApp(
  files: SyncedFn<number, string | null>
): Express {

  const app: Express = express();
  app.use(express.json({ limit: '200mb' }));
  
  app.get('/pinned', 
    (request, response) =>
      
  );

  app.get('/note',
    (request, response) => 
  );

  app.post('/note', 
    (request, response) => 
      performPost(
        getFileName(request),
        getTimeMs(request),
        request.body,
        getSend(response)
      )
  );

  app.delete('/', 
    (request, response) => 
      performDelete(
        getFileName(request),
        getTimeMs(request),
        getSend(response)
      )
  );

  return app;
}