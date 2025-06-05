import { tool } from "ai";
import { z } from "zod";
import { getContext } from "@/app/utils/context";

// Define the search tool
export const smartSearchTool = tool({
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
          categories: doc.data.categories.map((category: any) => category.name),
          searchScore: doc.score,
        };
      });

      // console.log("[Tool Execution] Search results:", formattedResults);

      return { searchResults: formattedResults }; // Return the formatted string
    } catch (error: any) {
      console.error("[Tool Execution] Exception:", error);
      return { error: `An error occurred while searching: ${error.message}` };
    }
  },
});

export const weatherTool = tool({
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
