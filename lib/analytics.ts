export const trackEvent = (
  event: string,
  parameters?: Record<string, unknown>
) => {
  if (typeof window === "undefined") return;

  if (typeof window.gtag !== "function") return;

  window.gtag("event", event, parameters);
};

export const trackCallClick = () => {
  trackEvent("call_click", {
    page: window.location.pathname,
  });
};

export const trackWhatsAppClick = () => {
  trackEvent("whatsapp_click", {
    page: window.location.pathname,
  });
};

export const trackBookRepairClick = () => {
  trackEvent("book_repair_click", {
    page: window.location.pathname,
  });
};

export const trackPurchaseInquiry = (product: string) => {
  trackEvent("purchase_inquiry", {
    product,
    page: window.location.pathname,
  });
};

export const trackFormSubmit = (formName: string) => {
  trackEvent("form_submit", {
    form: formName,
    page: window.location.pathname,
  });
};