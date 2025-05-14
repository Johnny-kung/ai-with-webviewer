async function getOpenAIResponse() {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true }); // Not ideal but we're innovating here!

  console.log(client);
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: "Write a one-sentence bedtime story about a unicorn."
  });

  console.log(response);
}

export {
  getOpenAIResponse
};