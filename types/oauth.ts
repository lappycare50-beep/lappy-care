export interface OAuthToken {
  id: string;

  provider: "google";

  accountEmail: string;

  accessToken: string;

  refreshToken?: string;

  tokenType: string;

  scope: string;

  expiresIn: number;

  expiresAt: number;

  connected: boolean;

  createdAt?: any;

  updatedAt?: any;
}

export interface OAuthTokenResponse {
  access_token: string;

  refresh_token?: string;

  expires_in: number;

  token_type: string;

  scope: string;
}

export interface OAuthSession {
  connected: boolean;

  provider: "google";

  email: string;

  expiresAt: number;
}