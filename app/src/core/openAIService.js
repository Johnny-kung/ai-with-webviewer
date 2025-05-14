import openaiClient from './openAIClient';

const WEBVIEWER_SUPPORT_PRE_PROMPT = `Any story you tell must be a scary story.`;

async function queryOpenAI(input) {
  const response = await openaiClient.responses.create({
    instructions: WEBVIEWER_SUPPORT_PRE_PROMPT,
    model: 'gpt-4o-mini',
    input: input,
  });

  return response;
}

export { queryOpenAI };