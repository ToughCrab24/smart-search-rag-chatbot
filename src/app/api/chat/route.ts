// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

import {
  convertToCoreMessages,
  experimental_createMCPClient,
  Message,
  streamText,
} from "ai";
import { createOpenAI } from "@ai-sdk/openai";

import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const httpTransport = new StreamableHTTPClientTransport(
  new URL(process.env.AI_TOOLKIT_MCP_URL || "http://localhost:8080/mcp"),
);

const client = await experimental_createMCPClient({
  transport: httpTransport,
});

const openai = createOpenAI();

export async function POST(req: Request) {
  try {
    const aiTkTools = await client.tools();
    const { messages }: { messages: Array<Message> } = await req.json();

    const coreMessages = convertToCoreMessages(messages);

    const systemPromptContent = `
    - You are a helpful assistant that answers questions using ONLY data retrieved from the MCP tools.
    - You have access to WP Engine Smart Search via two tools: 'search' and 'fetch'.
      - Use the 'search' tool to find relevant tv show content across indexed data.
      - Use the 'fetch' tool to retrieve the full content of a specific result returned by 'search'.
      - Use 'search' first to discover relevant results, then 'fetch' to get detailed content when needed.
    - You MUST base your responses solely on the data returned by these tools. Do not use prior knowledge or make up information.
    - If no results are found or an error occurs, inform the user clearly. Do not guess or fabricate an answer.`;

    const response = streamText({
      model: openai("gpt-4.1"),
      system: systemPromptContent,
      messages: coreMessages,
      tools: {
        ...aiTkTools,
      },
      onStepFinish: async (result) => {
        // Log token usage for each step
        if (result.usage) {
          console.log(
            `[Token Usage] Prompt tokens: ${result.usage.promptTokens}, Completion tokens: ${result.usage.completionTokens}, Total tokens: ${result.usage.totalTokens}`,
          );
        }
      },
      onError: (error) => {
        console.error("Error during AI response generation:", error);
      },
      maxSteps: 5,
    });
    // Convert the response into a friendly text-stream
    return response.toDataStreamResponse({});
  } catch (e) {
    throw e;
  }
}
