export interface PostResponse {
  id: string;
}

export interface GetResponse {
  id: string;
  status: string;
  result?: object;
}

export interface Error {
  detail: [
    {
      loc: [number | string];
      msg: string;
      type: string;
    },
  ];
  id: string;
}

export type Response = PostResponse | GetResponse | Error;

export type ProPrompt = {
  prompt: string;
  width?: number;
  height?: number;
  prompt_upsampling?: boolean;
  seed?: number;
  safety_tolerance?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  output_format?: string;
};
