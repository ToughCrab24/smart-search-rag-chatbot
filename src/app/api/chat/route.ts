// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

import { convertToCoreMessages, Message, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { smartSearchTool, weatherTool } from "@/app/utils/tools";

/**
 * Initialize the Google Generative AI API
 */
const google = createGoogleGenerativeAI();

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Array<Message> } = await req.json();

    const coreMessages = convertToCoreMessages(messages);

    const smartSearchPrompt = `
    - You can use the 'smartSearchTool' to find information relating to tv shows.
      - WP Engine Smart Search is a powerful tool for finding information about TV shows.
      - After the 'smartSearchTool' provides results (even if it's an error or no information found)
      - You MUST then formulate a conversational response to the user based on those results but also use the tool if the users query is deemed plausible.
        - If search results are found, summarize them for the user. 
        - If no information is found or an error occurs, inform the user clearly.`;

    const systemPromptContent = `
    - You are a friendly and helpful AI assistant 
    - You can use the 'weatherTool' to provide current weather information for a specific location.
    - Do not invent information. Stick to the data provided by the tool.`;

    const response = streamText({
      model: google("models/gemini-2.0-flash"),
      system: [smartSearchPrompt, systemPromptContent].join("\n"),
      messages: coreMessages,
      tools: {
        smartSearchTool,
        weatherTool,
      },
      onStepFinish: async (result) => {
        // Log token usage for each step
        if (result.usage) {
          console.log(
            `[Token Usage] Prompt tokens: ${result.usage.promptTokens}, Completion tokens: ${result.usage.completionTokens}, Total tokens: ${result.usage.totalTokens}`
          );
        }
      },
      maxSteps: 5,
    });
    // Convert the response into a friendly text-stream
    return response.toDataStreamResponse({});
  } catch (e) {
    throw e;
  }
}
