import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export async function createConnection() {
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const preprompt = window.WebViewer.getInstance().Core.getPreprompt();

  // Store assistant-less setup with instructions
  window.openAIClient = {
    openai,
    preprompt,
  };
}