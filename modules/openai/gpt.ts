const API_COMPLETIONS = 'https://api.openai.com/v1/chat/completions';

type ResponseUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};
type ResponseMessage = {
  role: string;
  content: string;
};

type ResponseChoice = {
  message: ResponseMessage;
  index: number;
  logprobs: number | null;
  finish_reason: string;
};

type Completion = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ResponseChoice[];
  usage: ResponseUsage;
};

type CompletionError = {
  code: string;
  message: string;
  param: string;
  type: string;
};

type Message = {
  role: string;
  content: string;
};

type PromptRequest = {
  model: string;
  messages: Message[];
  max_tokens: number;
  stream: boolean;
};

export async function gptPrompt(
  modelType: string,
  prompt: string,
  maxTokens: number
): Promise<Completion | CompletionError> {
  const promptReq: PromptRequest = {
    model: modelType,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: maxTokens,
    stream: false,
  };
  const response: Completion | CompletionError = await fetch(
    new URL(API_COMPLETIONS),
    {
      method: 'POST',
      body: JSON.stringify(promptReq),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      }),
    }
  ).then(data => data.json());

  console.log('response', response);
  return response;
}
