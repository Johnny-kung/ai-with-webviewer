import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openAiClient = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export default openAiClient;