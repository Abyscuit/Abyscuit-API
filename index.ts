import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { gptPrompt } from './modules/openai/gpt';
import cors from 'cors';

dotenv.config();

const app: Express = express();
app.use(cors());
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.json({server: 'Express + TypeScript Server'});
});

app.get('/gpt', (req: Request, res: Response) => {
  // Check if model is specified
  if (!req.query.model) { 
    res.json({
      error: {
        message: 'Model not specified!',
        type: "invalid_model_error",
        param: null,
        code: null
    }});
    return;
  }

  // Check if there is a prompt
  if (!req.query.prompt) {
    res.json({
      error: {
        message: 'Prompt cannot be empty!',
        type: "invalid_model_error",
        param: null,
        code: null
    }});
    return;
  }

  // Set max tokens
  const maxTokens = parseInt(req.query.max_tokens?.toString() ?? '3000');
  const model = req.query.model as string;
  const prompt = req.query.prompt as string;
  gptPrompt(`${model}`, `${prompt}`, maxTokens)
    .then(data => res.json(data));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});