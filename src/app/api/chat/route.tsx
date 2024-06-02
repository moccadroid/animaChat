
import { openai } from '@ai-sdk/openai';
import { streamText, generateText, convertToCoreMessages } from 'ai';
import { tools } from './tools';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo-0125'),
    messages: convertToCoreMessages(messages),
    //tools,
    //toolChoice: 'auto',
  });

  return result.toAIStreamResponse();
}
