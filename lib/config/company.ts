// ==========================================
// Company Configuration
// Lappy Care ERP
// ==========================================

export const COMPANY = {
  // ==========================================
  // Basic Information
  // ==========================================

  name: "Lappy Care",

  legalName: "Lappy Care",

  tagline: "Laptop Repair,sales & Service",

  description:
    "Professional Laptop Repair, Desktop Repair, Refurbished Laptop Sales & IT Services.",

  stablishmentYear: 2013,

  // ==========================================
  // Branding
  // ==========================================

  logo: "/logo.png",

  favicon: "/favicon.ico",

  // ==========================================
  // Contact Information
  // ==========================================

  phone: "+91 9595057006",

  whatsapp: "919595057006",

  email: "lappycare50@gmail.com",

  website: "https://lappycarepune.in",

  // ==========================================
  // Business Address
  // ==========================================

  address: {
    shop: "Shop No. U2, 1st Floor",
    building: "Patil Nivas",
    landmark: "Near Croma",
    area: "Janoba Chowk",
    road: "Datta Mandir Road",
    city: "Wakad",
    district: "Pune",
    state: "Maharashtra",
    pincode: "411057",
    country: "India",
  },

  // ==========================================
  // Google Maps
  // ==========================================

  maps:
    "https://www.google.com/maps/place/Lappy+Care+-+Laptop+Repair+Shop+and+Service+Center+in+Wakad/data=!4m2!3m1!1s0x0:0x950e84f984bc8610?sa=X&ved=1t:2428&ictx=111",

  // ==========================================
  // Working Hours
  // ==========================================

  workingHours: {
    monday: "10:00 AM - 10:00 PM",
    tuesday: "10:00 AM - 10:00 PM",
    wednesday: "10:00 AM - 10:00 PM",
    thursday: "10:00 AM - 10:00 PM",
    friday: "10:00 AM - 10:00 PM",
    saturday: "10:00 AM - 10:00 PM",
    sunday: "10:00 AM - 10:00 PM",
  },

  // ==========================================
  // Social Media
  // ==========================================

  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    x: "",
  },

  // ==========================================
  // Business Settings
  // ==========================================

  currency: "INR",

  currencySymbol: "₹",

  timezone: "Asia/Kolkata",

  locale: "en-IN",

  language: "en",

  // ==========================================
  // Legal Information
  // ==========================================

  gst: "",

  pan: "",

  cin: "",

  // ==========================================
  // ERP Settings
  // ==========================================

  supportEmail: "lappycare50@gmail.com",

  salesEmail: "lappycare50@gmail.com",

  // ==========================================
  // Footer
  // ==========================================

  copyright: `© ${new Date().getFullYear()} Lappy Care. All Rights Reserved.`,
} as const;

export type Company = typeof COMPANY;