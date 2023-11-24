import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(routes);
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.json({ server: 'Express + TypeScript Server' });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
