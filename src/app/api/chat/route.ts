// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

import { convertToCoreMessages, Message, streamText, tool } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

import { getContext } from "@/app/utils/context";

/**
 * Initialize the Google Generative AI API
 */
const google = createGoogleGenerativeAI();

// Define the search tool
const searchApiTool = tool({
  description:
    "Search for information about TV shows using WP Engine Smart Search. Use this to answer questions about TV shows, their content, characters, plots, etc., when the information is not already known.",
  parameters: z.object({
    query: z
      .string()
      .describe(
        "The search query to find relevant TV show information based on the user's question."
      ),
  }),
  execute: async ({ query }: { query: string }) => {
    console.log(`[Tool Execution] Searching with query: "${query}"`);
    try {
      const context = await getContext(query);

      if (context.errors && context.errors.length > 0) {
        console.error(
          "[Tool Execution] Error fetching context:",
          context.errors
        );
        // Return a structured error message that the LLM can understand
        return {
          error: `Error fetching context: ${context.errors[0].message}`,
        };
      }

      if (
        !context.data?.similarity?.docs ||
        context.data.similarity.docs.length === 0
      ) {
        console.log("[Tool Execution] No documents found for query:", query);
        return {
          searchResults: "No relevant information found for your query.",
        };
      }

      const formattedResults = context.data.similarity.docs.map((doc) => {
        if (!doc) {
          return {};
        }

        return {
          id: doc.id,
          title: doc.data.post_title,
          content: doc.data.post_content,
          url: doc.data.post_url,
          thumbnail: doc.data.post_thumbnail,
          categories: doc.data.categories.map((category: any) => category.name),
          searchScore: doc.score,
        };
      });

      return { searchResults: formattedResults }; // Return the formatted string
    } catch (error: any) {
      console.error("[Tool Execution] Exception:", error);
      return { error: `An error occurred while searching: ${error.message}` };
    }
  },
});

const weatherTool = tool({
  description:
    "Get the current weather information for a specific location. Use this to answer questions about the weather in different cities.",
  parameters: z.object({
    location: z
      .string()
      .describe(
        "The location for which to get the current weather information."
      ),
  }),
  execute: async ({ location }: { location: string }) => {
    console.log(`[Tool Execution] Getting weather for location: "${location}"`);
    try {
      // Simulate fetching weather data
      const weatherData = {
        location,
        temperature: "22°C",
        condition: "Sunny",
        humidity: "60%",
        windSpeed: "15 km/h",
      };
      const formattedWeather = `The current weather in ${weatherData.location} is ${weatherData.temperature} with ${weatherData.condition}. Humidity is at ${weatherData.humidity} and wind speed is ${weatherData.windSpeed}.`;
      return { weather: formattedWeather };
    } catch (error: any) {
      console.error("[Tool Execution] Exception:", error);
      return {
        error: `An error occurred while fetching weather data: ${error.message}`,
      };
    }
  },
});

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Array<Message> } = await req.json();

    const coreMessages = convertToCoreMessages(messages);

    const smartSearchPrompt = `
    - You can use the 'searchApiTool' to find information relating to tv shows.
      - WP Engine Smart Search is a powerful tool for finding information about TV shows.
      - After the 'searchApiTool' provides results (even if it's an error or no information found)
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
        searchApiTool,
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
