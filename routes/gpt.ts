import express, { Request, Response } from 'express';
import { gptPrompt } from '../modules/openai/gpt';
const router = express.Router();
router.get('/', (req: Request, res: Response) => {
  // Check if model is specified
  if (!req.query.model) {
    res.json({
      error: {
        message: 'Model not specified!',
        type: 'invalid_model_error',
        param: null,
        code: null,
      },
    });
    return;
  }

  // Check if there is a prompt
  if (!req.query.prompt) {
    res.json({
      error: {
        message: 'Prompt cannot be empty!',
        type: 'invalid_model_error',
        param: null,
        code: null,
      },
    });
    return;
  }

  // Set max tokens
  const maxTokens = parseInt(req.query.max_tokens?.toString() ?? '3000');
  const model = req.query.model as string;
  const prompt = req.query.prompt as string;
  gptPrompt(`${model}`, `${prompt}`, maxTokens).then(data => res.json(data));
});

export default router;
