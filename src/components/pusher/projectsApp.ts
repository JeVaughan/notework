

export function projectsApp(): Express {

  const app: Express = express();
  app.use(express.json({ limit: '200mb' }));
  
  app.get('/project',
    (request, response) =>

  );

  return app;
}