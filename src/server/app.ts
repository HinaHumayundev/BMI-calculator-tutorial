import { json } from 'body-parser';
import config from 'config';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import * as http from 'http';
import { initialize } from '../dbhelper/mongoose';
import logger from '../shared/logger';
import { Router } from './routes';

const app: Application = express();
const server: http.Server = http.createServer(app);
const port = config.get('expressPort');

app.use(json());
app.use(cors());

Router.init(app);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send(`Server running at http://localhost:${port}`);
});

server.listen(port, async () => {
  logger.info(`Server running at http://localhost:${port}`);
  await initialize();
});
