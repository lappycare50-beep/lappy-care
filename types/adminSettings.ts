// ==========================================
// Admin Settings
// ==========================================

export interface RepairSettings {
  defaultWarranty: string;
  defaultPriority: "Low" | "Medium" | "High" | "Urgent";
  autoWhatsAppEnabled: boolean;
  sendReceivedWhatsApp: boolean;
  sendStatusWhatsApp: boolean;
}

export interface InvoiceSettings {
  invoicePrefix: string;
  defaultGst: number;
  defaultPaymentMethod:
    | "Cash"
    | "UPI"
    | "Card"
    | "Bank Transfer";
  showBusinessPhone: boolean;
  showBusinessEmail: boolean;
  showBusinessWebsite: boolean;
}

export interface WhatsAppSettings {
  enabled: boolean;
  displayNumber: string;
  previewUrls: boolean;
  manualMessagingEnabled: boolean;
  receivedTrackingLink: boolean;
}

export interface AdminSettings {
  id: string;

  repair: RepairSettings;

  invoice: InvoiceSettings;

  whatsapp: WhatsAppSettings;

  updatedAt: Date;
}

// ==========================================
// DEFAULT SETTINGS
// ==========================================

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  id: "default",

  repair: {
    defaultWarranty:
      "No Warranty",

    defaultPriority:
      "Medium",

    autoWhatsAppEnabled:
      true,

    sendReceivedWhatsApp:
      true,

    sendStatusWhatsApp:
      true,
  },

  invoice: {
    invoicePrefix:
      "LC-INV-",

    defaultGst:
      18,

    defaultPaymentMethod:
      "Cash",

    showBusinessPhone:
      true,

    showBusinessEmail:
      true,

    showBusinessWebsite:
      true,
  },

  whatsapp: {
    enabled:
      true,

    displayNumber:
      "9595057006",

    previewUrls:
      true,

    manualMessagingEnabled:
      true,

    receivedTrackingLink:
      true,
  },

  updatedAt:
    new Date(),
};
