// src/types/businessProfile.ts

export interface BusinessContact {
  phone: string;
  whatsapp: string;
  email: string;
  website?: string;
}

export interface BusinessAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  googleBusiness?: string;
  linkedin?: string;
  youtube?: string;
  x?: string;
}

export interface BusinessProfile {
  id: string;

  businessName: string;
  tagline: string;
  description: string;

  logoUrl?: string;

  contact: BusinessContact;
  address: BusinessAddress;
  social: SocialLinks;

  services: string[];
  keywords: string[];
  serviceAreas: string[];

  workingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };

  primaryCTA: string;

  createdAt: Date;
  updatedAt: Date;
}