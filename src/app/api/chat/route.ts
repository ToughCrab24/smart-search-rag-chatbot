// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

import { convertToCoreMessages, Message, streamText, experimental_createMCPClient as createMCPClient } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { StreamableHTTPClientTransport, StreamableHTTPClientTransportOptions } from "@modelcontextprotocol/sdk/client/streamableHttp.js";


import { smartSearchTool, weatherTool } from "@/app/utils/tools";
import { createFakeOAuthProvider } from "@/app/utils/fake-oauth-provider";

// Function to create a new MCP client for each request with error handling
const createMCPClientInstance = async () => {
  try {
    const client = await createMCPClient({
      transport: new StreamableHTTPClientTransport(
        new URL("http://localhost:3080/mcp"),
        {
          authProvider: createFakeOAuthProvider({
            bearerToken: process.env.OAUTH_BEARER_TOKEN || "thisisafaketoken",
          })
        }
      ),
      onUncaughtError: (error) => {
        console.error("Uncaught error in MCP client:", error);
      }
    });
    return client;
  } catch (error) {
    console.error("Failed to create MCP client:", error);
    return null;
  }
};


/**
 * Initialize the Google Generative AI API
 */
const google = createGoogleGenerativeAI();

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Array<Message> } = await req.json();

    const coreMessages = convertToCoreMessages(messages);
 
    const smartSearchPrompt = `
    - IMPORTANT: when using the WP Engine MCP server, you don't need to pass credentials and you can pass empty strings
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

    console.log("Fetching tools..");
    // Create a new MCP client for this request
    const mcpClient = await createMCPClientInstance();
    
    let tools = {};
    
    if (mcpClient) {
      try {
        tools = await mcpClient.tools();
        console.log("MCP tools fetched successfully:", Object.keys(tools));
      } catch (error) {
        console.error("Failed to fetch MCP tools:", error);
        console.log("Falling back to local tools");
        tools = {};
      }
    } else {
      console.log("MCP client not available, using local tools only");
    }

    const response = streamText({
      model: google("models/gemini-2.0-flash"),
      system: [smartSearchPrompt, systemPromptContent].join("\n"),
      messages: coreMessages,
      tools: {
        smartSearchTool,
        weatherTool,
        ...tools,
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
  

