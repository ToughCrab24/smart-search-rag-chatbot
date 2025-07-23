// IMPORTANT! Set the runtime to edge
// export const runtime = "edge";

import { convertToCoreMessages, Message, streamText } from "ai";
import { createVertex } from "@ai-sdk/google-vertex";
import { smartSearchTool, weatherTool } from "@/app/utils/tools";
import { createMCPClientInstance } from "@/app/utils/mcp/client";


const vertex = createVertex({ 
  project: process.env.GOOGLE_CLOUD_PROJECT_ID || "your-project-id",
  location: process.env.GOOGLE_CLOUD_LOCATION || "us-central1",
});

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
        - If no information is found or an error occurs, inform the user clearly.        
    - You have access to WP Engine management tools through the MCP server. Use these tools intuitively based on user requests:
      
      ## Multi-step Workflows (IMPORTANT - Follow these patterns):
      
      ### Creating Backups:
      - If user asks to "backup site X" or "create backup for install X":
        1. First use 'list_installs' to find all installations
        2. Look for the install that matches the user's description (by name, site, or domain)
        3. Extract the install ID from the results'
        4. as the user for a notification email and name of the backup
        4. Then use 'create_backup' with that specific install ID
        5. Confirm the backup was created successfully
      
      ### Getting Site/Install Details:
      - If user asks about "site X" or "install X":
        1. Use 'list_sites' or 'list_installs' to find the matching item
        2. Extract the ID from the list
        3. Use 'get_site' or 'get_install' with that ID for detailed information
      
      ### Cache Management:
      - If user says "clear cache for site X":
        1. Use 'list_installs' to find the install
        2. Extract the install ID
        3. Use 'purge_cache' with that install ID
      
      ## ID Discovery Guidelines:
      - Always list items first to discover IDs before performing operations
      - Match user descriptions to install/site names, domains, or other identifiers
      - If multiple matches found, ask user to clarify which one they mean
      - If no matches found, inform user and show available options
      - Always explain what you're doing: "Let me find that install first..."
      
      ## Response Format:
      - Explain each step: "First, I'll find your install..." then "Now I'll create the backup..."
      - Show the discovered ID for transparency: "Found install ID: abc123"
      - Provide clear success/failure messages
      - Offer follow-up actions when relevant
      
      
      ## Output Format:
      - please try to include permalinks in the formating of the response, try to use native html links where possible make sure the links open in a new tab:
        - [Install Name](https://my.wpengine.com/installs/{InstallName})
        - [Site Name](https://my.wpengine.com/sites/{SiteName})
        - [Backup Name](https://my.wpengine.com/installs/{InstallName}backup_points)
      `;

    const systemPromptContent = `
    - You are a friendly and helpful AI assistant 
    - You can use the 'weatherTool' to provide current weather information for a specific location.
    - you can use your own knowledge to answer users questions that relate to the tools provided`;

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
      // model: google("models/gemini-2.0-flash"),
      model: vertex("models/gemini-2.5-flash"),
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
  

