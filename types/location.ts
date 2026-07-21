export interface HeroStat {
  label: string;
  value: string;
}

export interface HeroData {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  locationLine: string;
  phone: string;
  whatsapp: string;
  stats: HeroStat[];
  checklist: string[];
}

export interface ServiceSectionData {
  location: string;
  phone: string;
  whatsapp: string;
}

export interface AreasData {
  currentLocation: string;
  nearbyContent: string;
  nearbyAreas: string[];
}

export interface WhyChooseData {
  location: string;
}

export interface ReviewItem {
  name: string;
  location: string;
  review: string;
  verified?: boolean;
}

export interface ReviewsData {
  location: string;
  reviews: ReviewItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQData {
  location: string;
  phone: string;
  whatsapp: string;
  faqs: FAQItem[];
}

export interface FinalCTAData {
  location: string;
  phone: string;
  whatsapp: string;
}

export interface LocationLandingPageData {
  slug: string;

  hero: HeroData;

  services: ServiceSectionData;

  areas: AreasData;

  whyChoose: WhyChooseData;

  reviews: ReviewsData;

  faq: FAQData;

  cta: FinalCTAData;
}