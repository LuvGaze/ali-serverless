export const API_CONFIG = {
  // Replace with your OpenRouter API Key
  // Get one at: https://openrouter.ai/keys
  apiKey: '', 
  baseURL: 'https://openrouter.ai/api/v1',
  
  // Common OpenRouter models:
  // - 'google/gemini-2.0-flash-lite-preview-02-05:free' (Free, Fast)
  // - 'deepseek/deepseek-r1:free' (Free, High Logic)
  // - 'openai/gpt-4o' (Paid, Powerful)
  // - 'anthropic/claude-3.5-sonnet' (Paid, Balanced)
  model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
  
  // OpenRouter specific headers (optional but recommended)
  siteUrl: 'http://localhost:5173', 
  siteName: 'React Chatbot Template' 
};

// Mock response generator for when no API key is present
async function generateMockResponse(userMessage: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const responses = [
    "这是一个有趣的问题！让我思考一下。",
    "我明白了你的意思。这是我对这个话题的看法。",
    "好问题！这是一个复杂的如题，有几个方面需要考虑。",
    "我很乐意帮助你。让我为你详细解释一下。",
    "这是一个很有深度的询问。基于我的理解，我可以告诉你这些。",
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  if (userMessage.toLowerCase().includes('code') || userMessage.toLowerCase().includes('代码') || userMessage.toLowerCase().includes('编程')) {
    return `这是一个关于编程的示例回答：${randomResponse}\n\n对于代码问题，我可以帮助你处理各种编程语言、调试、最佳实践等。目前处于演示模式（无 API Key），请配置 API Key 以获取真实的 AI 编程辅助。`;
  }
  
  if (userMessage.toLowerCase().includes('explain') || userMessage.toLowerCase().includes('解释') || userMessage.toLowerCase().includes('是什么')) {
    return `让我解释一下这个概念：${randomResponse}\n\n我会用简单的术语将其分解，并提供有帮助的示例。目前处于演示模式（无 API Key），真实 AI 会给出更精准的解释。`;
  }
  
  return `${randomResponse}\n\n(注意：目前未配置 API Key，正在使用演示模式回复。请在 src/services/ai.ts 中配置您的 OpenRouter API Key 以体验完整功能。)`;
}

export async function sendMessageToAI(messages: { role: string; content: string }[]) {
  // Check if API Key is missing
  if (!API_CONFIG.apiKey) {
    console.warn('No API Key found. Using Demo/Mock mode.');
    // Get the last user message to generate context-aware mock response
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    return generateMockResponse(lastUserMessage);
  }

  try {
    const response = await fetch(`${API_CONFIG.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.apiKey}`,
        'HTTP-Referer': API_CONFIG.siteUrl, // OpenRouter specific
        'X-Title': API_CONFIG.siteName,     // OpenRouter specific
      },
      body: JSON.stringify({
        model: API_CONFIG.model,
        messages: [
          // OpenRouter supports 'system' messages for most models
          { role: 'system', content: 'You are a helpful assistant who communicates in Chinese.' },
          ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        ],
        // stream: false // Keeping it false for simplicity for now
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response from AI.';
  } catch (error) {
    console.error('AI Service Error:', error);
    throw error;
  }
}
