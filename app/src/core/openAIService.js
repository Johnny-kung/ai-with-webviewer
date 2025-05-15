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

export { streamOpenAI };