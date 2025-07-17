import type { OAuthClientProvider } from "@modelcontextprotocol/sdk/client/auth.js";
import type { 
  OAuthClientMetadata, 
  OAuthClientInformation, 
  OAuthTokens, 
} from "@modelcontextprotocol/sdk/shared/auth.js";

/**
 * A fake OAuth client provider that bypasses the OAuth flow and uses a bearer token from environment variables.
 * This is useful for testing or when you have a pre-existing access token.
 */
export class FakeOAuthClientProvider implements OAuthClientProvider {
  private bearerToken: string;
  private _redirectUrl: string;
  private _clientMetadata: OAuthClientMetadata;

  constructor(options: {
    bearerToken?: string;
    redirectUrl?: string;
    clientMetadata?: Partial<OAuthClientMetadata>;
  } = {}) {
    // Get bearer token from environment or options
    this.bearerToken = options.bearerToken || process.env.OAUTH_BEARER_TOKEN || '';
    
    if (!this.bearerToken) {
      throw new Error('Bearer token must be provided either via options.bearerToken or OAUTH_BEARER_TOKEN environment variable');
    }

    this._redirectUrl = options.redirectUrl || 'http://localhost:3000/oauth/callback';
    
    this._clientMetadata = {
      client_name: 'Fake OAuth Client',
      redirect_uris: [this._redirectUrl],
      token_endpoint_auth_method: 'none',
      grant_types: ['authorization_code'],
      response_types: ['code'],
      ...options.clientMetadata
    };
  }

  get redirectUrl(): string {
    return this._redirectUrl;
  }

  get clientMetadata(): OAuthClientMetadata {
    return this._clientMetadata;
  }

  state?(): string {
    return 'fake-state-' + Math.random().toString(36).substring(7);
  }

  clientInformation(): OAuthClientInformation | undefined {
    return {
      client_id: 'fake-client-id',
      client_secret: 'fake-client-secret'
    };
  }

  saveClientInformation?(): void {
    // No-op for fake provider
  }

  tokens(): OAuthTokens {
    // Return the bearer token as an access token
    return {
      access_token: this.bearerToken,
      token_type: 'Bearer',
      expires_in: 3600, // 1 hour (fake expiry)
      scope: 'read write'
    };
  }

  saveTokens(): void {
    // No-op for fake provider since we're using a static token
  }

  redirectToAuthorization(): void {
    // No-op for fake provider - we don't need to redirect
    console.log('FakeOAuthClientProvider: Skipping authorization redirect (using bearer token)');
  }

  saveCodeVerifier(): void {
    // No-op for fake provider
  }

  codeVerifier(): string {
    return 'fake-code-verifier';
  }

  addClientAuthentication?(headers: Headers): void {
    // Add the bearer token to the Authorization header
    headers.set('Authorization', `Bearer ${this.bearerToken}`);
  }

  validateResourceURL?(serverUrl: string | URL): Promise<URL | undefined> {
    // Simple validation - just return the server URL as the resource
    return Promise.resolve(new URL(serverUrl));
  }
}

/**
 * Factory function to create a FakeOAuthClientProvider with environment-based configuration
 */
export function createFakeOAuthProvider(options: {
  bearerToken?: string;
  redirectUrl?: string;
  clientMetadata?: Partial<OAuthClientMetadata>;
} = {}): FakeOAuthClientProvider {
  return new FakeOAuthClientProvider(options);
}
