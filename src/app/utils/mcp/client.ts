import { experimental_createMCPClient as createMCPClient } from "ai";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { createFakeOAuthProvider } from "./fake-oauth-provider";

const MCP_SERVER_URL = process.env.MCP_SERVER_URL || "http://localhost:3080/mcp";
const MCP_SERVER_AUTH_TOKEN = process.env.MCP_SERVER_AUTH_TOKEN || "thisisafaketoken";

// Function to create a new MCP client for each request with error handling
export const createMCPClientInstance = async () => {
  try {
    const client = createMCPClient({
      transport: new StreamableHTTPClientTransport(
        new URL(MCP_SERVER_URL),
        {
          authProvider: createFakeOAuthProvider({
            bearerToken: MCP_SERVER_AUTH_TOKEN,
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

