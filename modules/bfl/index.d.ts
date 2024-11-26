export interface PostResponse {
  id: string;
}

export interface GetResponse {
  id: string;
  status: string;
  result: object | null;
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
  width: number | null;
  height: number | null;
  prompt_upsampling: boolean | null;
  seed: number | null;
  safety_tolerance: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  output_format: string;
};
