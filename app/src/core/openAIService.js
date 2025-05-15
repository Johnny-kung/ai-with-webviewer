const WEBVIEWER_SUPPORT_PRE_PROMPT = `Any story you tell must be a scary story.`;

async function queryOpenAI(input) {
  const response = await window.openAIClient.responses.create({
    instructions: WEBVIEWER_SUPPORT_PRE_PROMPT,
    model: 'gpt-4o-mini',
    input: input,
  });

  return response;
}

async function streamOpenAI(input) {
  const { openai, preprompt } = window.openAIClient;
  const stream = await openai.chat.completions.create({
    model: "gpt-4o",
    stream: true,
    messages: [
      { role: "system", content: preprompt },
      { role: "user", content: input },
    ],
  });

  return stream;
}

export { queryOpenAI, streamOpenAI };