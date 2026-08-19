export interface GoogleBusinessAccount {
  id: string;

  accountId: string;

  accountName: string;

  connected: boolean;

  accessToken?: string;

  refreshToken?: string;

  expiresAt?: number;

  createdAt?: any;

  updatedAt?: any;
}

export interface GoogleBusinessLocation {
  id: string;

  locationId: string;

  accountId: string;

  title: string;

  storeCode?: string;

  address: string;

  phone?: string;

  website?: string;

  connected: boolean;
}

export interface GoogleBusinessPost {
  id: string;

  locationId: string;

  title: string;

  summary: string;

  callToAction?: string;

  imageUrl?: string;

  status:
    | "Draft"
    | "Publishing"
    | "Published"
    | "Failed";

  publishedAt?: any;

  error?: string;

  createdAt?: any;

  updatedAt?: any;
}

export interface GoogleBusinessConnection {
  account: GoogleBusinessAccount | null;

  locations: GoogleBusinessLocation[];

  connected: boolean;
}