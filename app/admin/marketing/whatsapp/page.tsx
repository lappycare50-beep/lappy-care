"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Search,
  UserRound,
  Phone,
  Loader2,
  X,
  Wrench,
  Laptop,
  ExternalLink,
  CircleCheck,
} from "lucide-react";

import { getCustomers } from "@/services/customerService";
import { getRepairsByCustomerId } from "@/services/repairService";
import { Customer } from "@/types/customer";
import { Repair } from "@/types/repair";

// =========================================================
// TRACKING URL
// =========================================================

const TRACKING_BASE_URL =
  "https://lappycarepune.in/track";

// =========================================================
// TEMPLATES
// =========================================================

const templates = [
  {
    name: "Repair Received",
    message:
      
  "Hello {{name}}! Your laptop has been received by Lappy Care.\n\nOur technician will diagnose the issue and update you shortly.\n\nRepair ID: {{repairId}}\nDevice: {{device}}\n\n🔗 Track Your Repair:\n{{trackingUrl}}",
  },
  {
    name: "Diagnosis Update",
    message:
      "Hello {{name}}! This is an update from Lappy Care regarding Repair ID: {{repairId}}.\n\nYour laptop diagnosis is complete. We will share the repair estimate with you shortly.",
  },
  {
    name: "Laptop Ready",
    message:
      "Hello {{name}}! Your laptop repair is completed and your laptop is ready for pickup at Lappy Care.\n\nRepair ID: {{repairId}}\nDevice: {{device}}\n\nThank you!",
  },
  {
    name: "Pickup Reminder",
    message:
      "Hello {{name}}! This is a friendly reminder from Lappy Care that your repaired laptop is ready for pickup.\n\nRepair ID: {{repairId}}\n\nThank you!",
  },
  {
    name: "Review Request",
    message:
      "Hello {{name}}! Thank you for choosing Lappy Care.\n\nWe hope you are happy with our service. We would appreciate your valuable Google review.\n\nThank you!",
  },
];

// =========================================================
// HELPERS
// =========================================================

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function getWhatsAppNumber(value: string) {
  const clean = normalizePhone(value);

  if (!clean) {
    return "";
  }

  if (clean.length === 10) {
    return `91${clean}`;
  }

  return clean;
}

function getDeviceName(repair: Repair | null) {
  if (!repair) {
    return "";
  }

  const type =
    repair.device?.type?.trim() || "";

  const brand =
    repair.device?.brand?.trim() || "";

  const model =
    repair.device?.model?.trim() || "";

  return [type, brand, model]
    .filter(Boolean)
    .join(" ");
}

function getTrackingUrl(repair: Repair | null) {
  if (!repair?.repairId) {
    return "";
  }

  return `${TRACKING_BASE_URL}/${repair.repairId}`;
}

// =========================================================
// PAGE
// =========================================================

export default function WhatsAppPage() {
  // =======================================================
  // CUSTOMER
  // =======================================================

  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [
    loadingCustomers,
    setLoadingCustomers,
  ] = useState(true);

  const [
    customerSearch,
    setCustomerSearch,
  ] = useState("");

  const [
    showCustomerList,
    setShowCustomerList,
  ] = useState(false);

  const [
    selectedCustomerId,
    setSelectedCustomerId,
  ] = useState("");

  const [
    customerName,
    setCustomerName,
  ] = useState("");

  const [phone, setPhone] =
    useState("");

  // =======================================================
  // REPAIR
  // =======================================================

  const [repairs, setRepairs] =
    useState<Repair[]>([]);

  const [
    loadingRepairs,
    setLoadingRepairs,
  ] = useState(false);

  const [
    selectedRepair,
    setSelectedRepair,
  ] = useState<Repair | null>(null);

  // =======================================================
  // MESSAGE
  // =======================================================

  const [message, setMessage] =
    useState("");

  // =======================================================
  // SEND STATE
  // =======================================================

  const [sending, setSending] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  // =======================================================
  // LOCAL CUSTOMER REPAIR CACHE
  //
  // The repair service already has a short-lived cache.
  // This second cache prevents repeated lookups while the
  // WhatsApp page remains open, even after UI changes.
  // =======================================================

  const customerRepairsCache =
    useMemo(
      () =>
        new Map<
          string,
          Repair[]
        >(),
      []
    );

  // =======================================================
  // LOAD CUSTOMERS
  // =======================================================

  useEffect(() => {
    let mounted = true;

    async function loadCustomers() {
      try {
        setLoadingCustomers(true);

        const result =
          await getCustomers();

        if (mounted) {
          setCustomers(
            result ?? []
          );
        }
      } catch (err) {
        console.error(
          "WhatsApp customer loading error:",
          err
        );

        if (mounted) {
          setError(
            "Unable to load customers. You can still enter a number manually."
          );
        }
      } finally {
        if (mounted) {
          setLoadingCustomers(false);
        }
      }
    }

    void loadCustomers();

    return () => {
      mounted = false;
    };
  }, []);

  // =======================================================
  // CUSTOMER SEARCH
  // =======================================================

  const filteredCustomers =
    useMemo(() => {
      const search =
        customerSearch
          .trim()
          .toLowerCase();

      if (!search) {
        return customers.slice(
          0,
          20
        );
      }

      const cleanSearch =
        normalizePhone(search);

      return customers
        .filter((customer) => {
          const name =
            customer.name?.toLowerCase() ||
            "";

          const mobile =
            normalizePhone(
              customer.mobile || ""
            );

          const alternateMobile =
            normalizePhone(
              customer.alternateMobile ||
                ""
            );

          const email =
            customer.email?.toLowerCase() ||
            "";

          const customerId =
            customer.customerId?.toLowerCase() ||
            "";

          return (
            name.includes(search) ||
            mobile.includes(
              cleanSearch
            ) ||
            alternateMobile.includes(
              cleanSearch
            ) ||
            email.includes(search) ||
            customerId.includes(search)
          );
        })
        .slice(0, 20);
    }, [
      customers,
      customerSearch,
    ]);

  // =======================================================
  // LOAD CUSTOMER REPAIRS
  // =======================================================

  async function loadCustomerRepairs(
    customerId: string
  ) {
    if (!customerId) {
      setRepairs([]);
      setSelectedRepair(null);
      return;
    }

    const cacheKey = customerId.trim();

    const cached =
      customerRepairsCache.get(
        cacheKey
      );

    if (cached) {
      setRepairs(cached);
      setSelectedRepair(null);
      return;
    }

    try {
      setLoadingRepairs(true);
      setRepairs([]);
      setSelectedRepair(null);

      const result =
        await getRepairsByCustomerId(
          cacheKey
        );

      const safeResult =
        result ?? [];

      customerRepairsCache.set(
        cacheKey,
        safeResult
      );

      setRepairs(
        safeResult
      );
    } catch (err) {
      console.error(
        "WhatsApp repair loading error:",
        err
      );

      setRepairs([]);

      setError(
        "Unable to load repairs for this customer."
      );
    } finally {
      setLoadingRepairs(false);
    }
  }

  // =======================================================
  // SELECT CUSTOMER
  // =======================================================

  async function selectCustomer(
    customer: Customer
  ) {
    const name =
      customer.name || "";

    const mobile =
      customer.mobile ||
      customer.alternateMobile ||
      "";

    const firestoreId =
      customer.id || "";

    const customCustomerId =
      customer.customerId || "";

    setSelectedCustomerId(
      firestoreId ||
        customCustomerId
    );

    setCustomerName(
      name
    );

    setPhone(
      normalizePhone(mobile)
    );

    setCustomerSearch(
      name
    );

    setShowCustomerList(
      false
    );

    setSuccess("");
    setError("");

    if (
      customCustomerId
    ) {
      await loadCustomerRepairs(
        customCustomerId
      );
    } else {
      setRepairs([]);
      setSelectedRepair(
        null
      );
    }
  }

  // =======================================================
  // SELECT REPAIR
  // =======================================================

  function selectRepair(
    repair: Repair
  ) {
    setSelectedRepair(
      repair
    );

    setSuccess("");
    setError("");

    if (message.trim()) {
      setMessage(
        replaceTemplateVariables(
          message,
          repair
        )
      );
    }
  }

  // =======================================================
  // REPLACE TEMPLATE VARIABLES
  // =======================================================

  function replaceTemplateVariables(
    text: string,
    repair: Repair | null =
      selectedRepair
  ) {
    const device =
      getDeviceName(repair);

    return text
      .replace(
        /{{name}}/g,
        customerName ||
          "Customer"
      )
      .replace(
        /{{repairId}}/g,
        repair?.repairId || ""
      )
      .replace(
        /{{device}}/g,
        device || "Laptop"
      )
      .replace(
        /{{status}}/g,
        repair?.status || ""
      );
  }

  // =======================================================
  // APPLY TEMPLATE
  // =======================================================

  function applyTemplate(
    templateMessage: string
  ) {
    if (!selectedRepair) {
      setError(
        "Please select a repair before using a repair message template."
      );
      return;
    }

    const preparedMessage =
      replaceTemplateVariables(
        templateMessage,
        selectedRepair
      );

    setMessage(
      preparedMessage
    );

    setSuccess("");
    setError("");
  }

  // =======================================================
  // CLEAR CUSTOMER
  // =======================================================

  function clearCustomer() {
    setSelectedCustomerId("");
    setCustomerName("");
    setPhone("");
    setCustomerSearch("");
    setRepairs([]);
    setSelectedRepair(null);
    setMessage("");
    setShowCustomerList(false);
    setSuccess("");
    setError("");
  }

  // =======================================================
  // RESET
  // =======================================================

  function resetForm() {
    setSelectedCustomerId("");
    setCustomerName("");
    setPhone("");
    setCustomerSearch("");
    setRepairs([]);
    setSelectedRepair(null);
    setMessage("");
    setShowCustomerList(false);
    setSuccess("");
    setError("");
  }

  // =======================================================
  // SEND WHATSAPP
  // =======================================================

  async function handleSend(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSuccess("");
    setError("");

    const cleanPhone =
      getWhatsAppNumber(phone);

    if (!cleanPhone) {
      setError(
        "Please select a customer or enter a WhatsApp number."
      );
      return;
    }

    if (
      cleanPhone.length < 12
    ) {
      setError(
        "Please enter a valid WhatsApp number with country code."
      );
      return;
    }

    if (!message.trim()) {
      setError(
        "Please enter a message."
      );
      return;
    }

    if (
      !selectedRepair?.repairId
    ) {
      setError(
        "Please select a repair before sending the WhatsApp message."
      );
      return;
    }

    try {
      setSending(true);

      const trackingUrl =
        getTrackingUrl(
          selectedRepair
        );

      const finalMessage =
        `${replaceTemplateVariables(
          message.trim(),
          selectedRepair
        )}\n\n` +
        `🔗 Track Your Repair:\n` +
        trackingUrl;

      const response =
        await fetch(
          "/api/whatsapp/send",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body:
              JSON.stringify({
                to: cleanPhone,
                message:
                  finalMessage,
              }),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data?.error ||
            "Failed to send WhatsApp message."
        );
      }

      setSuccess(
        customerName
          ? `WhatsApp message sent successfully to ${customerName}.`
          : "WhatsApp message sent successfully."
      );

      setMessage("");
    } catch (err) {
      console.error(
        "WhatsApp send error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to send WhatsApp message."
      );
    } finally {
      setSending(false);
    }
  }

  // =======================================================
  // DERIVED DATA
  // =======================================================

  const selectedDevice =
    getDeviceName(
      selectedRepair
    );

  const trackingUrl =
    getTrackingUrl(
      selectedRepair
    );

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="min-h-screen bg-black px-5 py-7 text-white md:px-8">
      {/* Header */}
      <div className="mb-7 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10">
            <MessageCircle
              size={27}
              className="text-green-400"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              WhatsApp
            </h1>

            <p className="mt-1 text-sm text-zinc-400">
              Customer messaging
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={resetForm}
          className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      {/* Status */}
      {success && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
          <CheckCircle2 size={18} />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Left */}
        <div className="xl:col-span-2">
          <form
            onSubmit={handleSend}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Send WhatsApp Message
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Select a customer and send a message with repair tracking.
              </p>
            </div>

            {/* Customer Search */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Select Customer
              </label>

              <div className="relative">
                <div className="flex items-center rounded-xl border border-zinc-700 bg-black focus-within:border-yellow-400">
                  <Search
                    size={18}
                    className="ml-4 text-zinc-500"
                  />

                  <input
                    type="text"
                    value={customerSearch}
                    onFocus={() =>
                      setShowCustomerList(
                        true
                      )
                    }
                    onChange={(event) => {
                      setCustomerSearch(
                        event.target.value
                      );

                      setShowCustomerList(
                        true
                      );

                      if (
                        selectedCustomerId
                      ) {
                        setSelectedCustomerId(
                          ""
                        );
                        setRepairs([]);
                        setSelectedRepair(
                          null
                        );
                      }
                    }}
                    placeholder={
                      loadingCustomers
                        ? "Loading customers..."
                        : "Search customer by name, mobile or ID..."
                    }
                    className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-zinc-600"
                  />

                  {loadingCustomers && (
                    <Loader2
                      size={18}
                      className="mr-4 animate-spin text-zinc-500"
                    />
                  )}

                  {!loadingCustomers &&
                    customerSearch && (
                      <button
                        type="button"
                        onClick={
                          clearCustomer
                        }
                        className="mr-3 rounded-lg p-1 text-zinc-500 hover:bg-zinc-800 hover:text-white"
                      >
                        <X size={17} />
                      </button>
                    )}
                </div>

                {showCustomerList && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-zinc-700 bg-zinc-950 shadow-2xl">
                    {loadingCustomers ? (
                      <div className="flex items-center gap-3 px-4 py-4 text-sm text-zinc-500">
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />
                        Loading customers...
                      </div>
                    ) : filteredCustomers.length ===
                      0 ? (
                      <div className="px-4 py-5 text-center">
                        <UserRound
                          size={25}
                          className="mx-auto mb-2 text-zinc-700"
                        />

                        <p className="text-sm text-zinc-400">
                          No customers found
                        </p>
                      </div>
                    ) : (
                      filteredCustomers.map(
                        (
                          customer,
                          index
                        ) => {
                          const key =
                            customer.id ||
                            customer.customerId ||
                            `${customer.mobile}-${index}`;

                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() =>
                                void selectCustomer(
                                  customer
                                )
                              }
                              className="flex w-full items-center gap-4 border-b border-zinc-800 px-4 py-3 text-left transition last:border-b-0 hover:bg-zinc-900"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-500/10">
                                <UserRound
                                  size={18}
                                  className="text-yellow-400"
                                />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="truncate font-medium text-white">
                                  {customer.name ||
                                    "Unnamed Customer"}
                                </div>

                                <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                                  <Phone size={13} />

                                  <span>
                                    {customer.mobile ||
                                      customer.alternateMobile ||
                                      "No mobile"}
                                  </span>

                                  {customer.customerId && (
                                    <>
                                      <span>•</span>

                                      <span>
                                        {
                                          customer.customerId
                                        }
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        }
                      )
                    )}
                  </div>
                )}
              </div>

              {selectedCustomerId && (
                <div className="mt-2 flex items-center gap-2 text-xs text-green-400">
                  <CircleCheck size={14} />
                  Customer selected:
                  <span className="font-medium">
                    {
                      customers.find(
                        (customer) =>
                          customer.id ===
                            selectedCustomerId ||
                          customer.customerId ===
                            selectedCustomerId
                      )?.customerId
                    }
                  </span>
                </div>
              )}
            </div>

            {/* Customer Repairs */}
            {selectedCustomerId && (
              <div className="mb-5 rounded-xl border border-zinc-800 bg-black p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                      <Wrench
                        size={19}
                        className="text-blue-400"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Customer Repairs
                      </h3>

                      <p className="text-xs text-zinc-500">
                        Select the repair related to this WhatsApp message.
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-zinc-500">
                    {loadingRepairs
                      ? "Loading..."
                      : `${repairs.length} ${
                          repairs.length ===
                          1
                            ? "repair"
                            : "repairs"
                        }`}
                  </span>
                </div>

                {loadingRepairs ? (
                  <div className="flex items-center gap-3 rounded-xl border border-zinc-800 px-4 py-5 text-sm text-zinc-500">
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Loading customer repairs...
                  </div>
                ) : repairs.length === 0 ? (
                  <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 px-4 py-4 text-sm text-yellow-300">
                    No repair found for this customer.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {repairs.map(
                      (repair) => {
                        const isSelected =
                          selectedRepair?.id ===
                          repair.id;

                        return (
                          <button
                            key={
                              repair.id ||
                              repair.repairId
                            }
                            type="button"
                            onClick={() =>
                              selectRepair(
                                repair
                              )
                            }
                            className={`w-full rounded-xl border p-3 text-left transition ${
                              isSelected
                                ? "border-yellow-500 bg-yellow-500/5"
                                : "border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10">
                                <Laptop
                                  size={18}
                                  className="text-yellow-400"
                                />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-white">
                                    {
                                      repair.repairId
                                    }
                                  </span>

                                  <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-300">
                                    {
                                      repair.status
                                    }
                                  </span>
                                </div>

                                <div className="mt-1 text-xs text-zinc-500">
                                  {getDeviceName(
                                    repair
                                  )}
                                </div>

                                <div className="mt-1 text-[11px] text-zinc-600">
                                  Created:{" "}
                                  {
                                    repair.createdAt
                                  }
                                </div>
                              </div>

                              {isSelected && (
                                <CircleCheck
                                  size={18}
                                  className="text-yellow-400"
                                />
                              )}
                            </div>
                          </button>
                        );
                      }
                    )}
                  </div>
                )}

                {selectedRepair && (
                  <div className="mt-3 rounded-xl border border-green-500/30 bg-green-500/5 p-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-green-400">
                      <CircleCheck size={14} />
                      Repair selected:
                      <span>
                        {
                          selectedRepair.repairId
                        }
                      </span>
                    </div>

                    <div className="mt-3 rounded-lg border border-zinc-700 bg-black p-3">
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <ExternalLink
                          size={14}
                        />
                        Track Repair Link
                      </div>

                      <div className="mt-1 break-all text-xs text-blue-400">
                        {trackingUrl}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Customer Details */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Customer Name
                </label>

                <input
                  type="text"
                  value={customerName}
                  onChange={(event) =>
                    setCustomerName(
                      event.target.value
                    )
                  }
                  placeholder="Customer name"
                  className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  WhatsApp Number *
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(
                      normalizePhone(
                        event.target.value
                      )
                    )
                  }
                  placeholder="9595087006"
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-yellow-400"
                />

                <p className="mt-2 text-xs text-zinc-600">
                  10 digit Indian number is automatically converted to +91.
                </p>
              </div>
            </div>

            {/* Tracking Preview */}
            {selectedRepair && (
              <div className="mt-5 rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
                <div className="flex items-start gap-3">
                  <ExternalLink
                    size={18}
                    className="mt-0.5 text-blue-400"
                  />

                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white">
                      Track Repair Link
                    </div>

                    <p className="mt-1 text-xs text-zinc-500">
                      This link will be automatically added to the WhatsApp message when sending.
                    </p>

                    <div className="mt-2 break-all text-xs text-blue-400">
                      {trackingUrl}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Message */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Message *
              </label>

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(
                    event.target.value
                  )
                }
                placeholder={
                  selectedRepair
                    ? "Type your WhatsApp message..."
                    : "Select a repair first..."
                }
                rows={8}
                required
                className="w-full resize-none rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-yellow-400"
              />

              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-zinc-600">
                  Tracking URL will be added automatically when sending.
                </p>

                <span className="text-xs text-zinc-600">
                  {message.length} characters
                </span>
              </div>
            </div>

            {/* Send */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={
                  sending ||
                  !selectedRepair
                }
                className="flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sending ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Send size={18} />
                )}

                {sending
                  ? "Sending..."
                  : "Send WhatsApp"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side */}
        <div className="space-y-5">
          {/* Templates */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="mb-5">
              <h2 className="text-xl font-semibold">
                Message Templates
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Select a template to quickly compose a message.
              </p>
            </div>

            <div className="space-y-3">
              {templates.map(
                (template) => (
                  <button
                    key={
                      template.name
                    }
                    type="button"
                    onClick={() =>
                      applyTemplate(
                        template.message
                      )
                    }
                    className="w-full rounded-xl border border-zinc-800 bg-black p-4 text-left transition hover:border-yellow-500/50 hover:bg-zinc-900"
                  >
                    <div className="font-medium text-white">
                      {template.name}
                    </div>

                    <p className="mt-2 whitespace-pre-line text-xs leading-5 text-zinc-500">
                      {template.message
                        .replace(
                          /{{name}}/g,
                          customerName ||
                            "{{name}}"
                        )
                        .replace(
                          /{{repairId}}/g,
                          selectedRepair?.repairId ||
                            "{{repairId}}"
                        )
                        .replace(
                          /{{device}}/g,
                          selectedDevice ||
                            "{{device}}"
                        )}
                    </p>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Repair Summary */}
          {selectedRepair && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-500/10">
                  <Wrench
                    size={17}
                    className="text-yellow-400"
                  />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Repair Summary
                  </h3>

                  <p className="text-xs text-zinc-500">
                    Selected repair details
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">
                    Repair ID
                  </span>

                  <span className="font-semibold text-white">
                    {
                      selectedRepair.repairId
                    }
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">
                    Status
                  </span>

                  <span className="text-white">
                    {
                      selectedRepair.status
                    }
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">
                    Device
                  </span>

                  <span className="text-right text-white">
                    {
                      selectedDevice ||
                      "-"
                    }
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">
                    Balance
                  </span>

                  <span className="font-semibold text-white">
                    ₹
                    {(
                      selectedRepair
                        .estimate
                        ?.balanceAmount ??
                      0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-blue-500/30 bg-blue-500/5 p-3">
                <div className="flex items-center gap-2 text-xs font-medium text-blue-400">
                  <ExternalLink
                    size={14}
                  />
                  Customer Tracking URL
                </div>

                <div className="mt-2 break-all text-xs text-blue-300">
                  {trackingUrl}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp API Info */}
      <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
        <div className="flex items-start gap-3">
          <MessageCircle
            size={20}
            className="mt-0.5 text-green-400"
          />

          <div>
            <h3 className="font-medium text-white">
              WhatsApp Cloud API
            </h3>

            <p className="mt-1 text-sm leading-6 text-zinc-500">
              Messages are sent through the configured Lappy Care WhatsApp Business API connection.
            </p>

            {selectedRepair && (
              <p className="mt-2 text-xs text-green-400">
                ✓ Tracking URL will be included in the outgoing message.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Click Outside */}
      {showCustomerList && (
        <button
          type="button"
          aria-label="Close customer search"
          onClick={() =>
            setShowCustomerList(
              false
            )
          }
          className="fixed inset-0 z-40 cursor-default"
        />
      )}
    </div>
  );
}
