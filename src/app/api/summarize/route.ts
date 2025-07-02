import { convertToCoreMessages, Message, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { smartSearchTool } from "@/app/utils/tools";

export const runtime = "edge";

const google = createGoogleGenerativeAI();

export async function POST(req: Request) {
  const { messages }: { messages: Array<Message> } = await req.json();

  console.log("Received messages:", messages);
  const result = streamText({
    model: google("models/gemini-2.0-flash-latest"),
    system: `
      You are a search summarization engine.
      Use the 'smartSearchTool' to find information about TV shows.
      After the tool returns results, create a well-formatted summary for the user using Markdown.
      For each show mentioned, include a reference link to the source using the 'url' provided in the tool's output.
      Use headings, lists, and bold text to make the summary easy to read.
      If no information is found, simply state that.
      Do not include any conversational elements in your response.
      Do not output JSON.
    `,
    messages: messages,
    tools: {
      smartSearchTool,
    },
    maxSteps: 2,
  });

  return result.toDataStreamResponse();
}
