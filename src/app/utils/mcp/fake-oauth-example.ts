import { createFakeOAuthProvider } from './fake-oauth-provider';
import { auth } from '@modelcontextprotocol/sdk/client/auth.js';

/**
 * Example usage of the FakeOAuthClientProvider
 * 
 * This demonstrates how to use a pre-existing bearer token instead of going through
 * the full OAuth flow. Useful for testing or when you already have an access token.
 */

// Example 1: Using environment variable
// Set OAUTH_BEARER_TOKEN=your_token_here in your environment
export async function exampleWithEnvToken() {
  try {
    const provider = createFakeOAuthProvider();
    
    const result = await auth(provider, {
      serverUrl: 'https://your-mcp-server.com',
      scope: 'read write'
    });
    
    console.log('Auth result:', result);
    return result;
  } catch (error) {
    console.error('Auth failed:', error);
    throw error;
  }
}

// Example 2: Passing token directly
export async function exampleWithDirectToken(bearerToken: string) {
  try {
    const provider = createFakeOAuthProvider({
      bearerToken,
      redirectUrl: 'http://localhost:3000/callback',
      clientMetadata: {
        client_name: 'My Custom Client',
        scope: 'read write admin'
      }
    });
    
    const result = await auth(provider, {
      serverUrl: 'https://your-mcp-server.com',
      scope: 'read write'
    });
    
    console.log('Auth result:', result);
    return result;
  } catch (error) {
    console.error('Auth failed:', error);
    throw error;
  }
}

// Example 3: Just getting the tokens without full auth flow
export function exampleGetTokensOnly() {
  const provider = createFakeOAuthProvider({
    bearerToken: 'your-bearer-token-here'
  });
  
  // Get the tokens directly
  const tokens = provider.tokens();
  console.log('Tokens:', tokens);
  
  return tokens;
}

// Example 4: Using with MCP client
export async function exampleWithMCPClient(bearerToken: string, serverUrl: string) {
  const provider = createFakeOAuthProvider({ bearerToken });
  
  try {
    // Perform auth
    const authResult = await auth(provider, { serverUrl });
    
    if (authResult === 'AUTHORIZED') {
      console.log('Successfully authorized with fake OAuth provider');
      
      // Now you can use the provider with your MCP client
      // The provider will automatically add the bearer token to requests
      return provider;
    } else {
      throw new Error('Authorization failed');
    }
  } catch (error) {
    console.error('Failed to authorize:', error);
    throw error;
  }
}
