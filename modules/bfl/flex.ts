import * as Flex from '.';
const BFL_API = 'https://api.bfl.ml';
const FLEX_PRO = `${BFL_API}/v1/flux-pro-1.1`;
const FLEX_PRO_ULTRA = `${BFL_API}/v1/flux-pro-1.1-ultra`;
const GET_RESULT = `${BFL_API}/v1/get_result?id=`;

export async function generateImage(prompt: string): Promise<Flex.Response> {
  const promptReq: Flex.ProPrompt = {
    prompt: prompt,
    width: 1024,
    height: 768,
    prompt_upsampling: false,
    seed: null,
    safety_tolerance: 6,
    output_format: 'jpeg',
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(promptReq),
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-Key': `${process.env.BFL_KEY}`,
    }),
  };
  const response: Flex.Response = await fetch(new URL(FLEX_PRO), options).then(
    data => data.json()
  );

  console.log('response:\n', response);

  let imgResponse = null;
  while (imgResponse === null) {
    await sleep(500);
    imgResponse = await getImageFromAPI(response.id);
    console.log('imgResponse:\n', imgResponse);
  }

  return imgResponse;
}

async function getImageFromAPI(
  id: string
): Promise<Flex.GetResponse | Flex.Error | null> {
  const res: Flex.GetResponse = await fetch(`${GET_RESULT}${id}`).then(data =>
    data.json()
  );
  console.log('res:', res);
  if (res.status === 'Ready') return res;

  return null;
}

async function sleep(msec: number) {
  return new Promise(resolve => setTimeout(resolve, msec));
}
