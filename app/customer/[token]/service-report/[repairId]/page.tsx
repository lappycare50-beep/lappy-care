import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { getCustomerByQrToken } from "@/services/customerQrService";
import { getRepairsByCustomerId } from "@/services/repairService";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    token: string;
    repairId: string;
  }>;
};

export default async function CustomerServiceReportPage({
  params,
}: Props) {
  const { token, repairId } = await params;

  const decodedToken = decodeURIComponent(token);
  const decodedRepairId = decodeURIComponent(repairId);

  const customer = await getCustomerByQrToken(decodedToken);

  if (!customer || customer.isActive === false) {
    notFound();
  }

  const repairs = await getRepairsByCustomerId(customer.customerId);

  const repair = repairs.find(
    (item) =>
      item.id === decodedRepairId ||
      item.repairId === decodedRepairId
  );

  if (!repair) {
    notFound();
  }

  const laptopName =
    [repair.device?.brand, repair.device?.model]
      .filter(Boolean)
      .join(" ") || "Laptop";

  const reportId =
    repair.repairId || repair.id || "Service Report";

  return (
    <main className="min-h-screen bg-slate-100 px-3 py-5 text-slate-900 sm:px-4 sm:py-8">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <section className="rounded-3xl bg-black p-6 text-white shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                LAPPY CARE
              </p>

              <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Service Report
              </h1>

              <p className="mt-1 text-xs text-white/80">
                Laptop service & maintenance record
              </p>
            </div>

            <div className="shrink-0 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-right">
              <p className="text-[9px] uppercase tracking-wide text-white/70">
                Report ID
              </p>

              <p className="mt-1 text-xs font-bold text-white">
                {reportId}
              </p>
            </div>
          </div>
        </section>

        {/* Service Summary */}
        <section className="mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                Service Summary
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-900">
                {laptopName}
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                Service Date:{" "}
                {formatDate(repair.createdAt || repair.updatedAt)}
              </p>
            </div>

            <StatusBadge status={repair.status} />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <ReportMeta label="Repair ID" value={reportId} />

            <ReportMeta
              label="Warranty"
              value={repair.warranty || "—"}
            />

            <ReportMeta
              label="Delivered"
              value={
                repair.deliveredAt
                  ? formatDate(repair.deliveredAt)
                  : "—"
              }
            />

            <ReportMeta
              label="Status"
              value={repair.status || "Service"}
            />
          </div>
        </section>

        {/* Laptop Information */}
        <ReportSection
          title="💻 Laptop Information"
          description="Device information recorded for this service."
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
            <ReportField
              label="Brand"
              value={repair.device?.brand || "—"}
            />

            <ReportField
              label="Model"
              value={repair.device?.model || "—"}
            />

            <ReportField
              label="Serial Number"
              value={repair.device?.serialNo || "—"}
            />

            <ReportField
              label="Processor"
              value={repair.device?.processor || "—"}
            />

            <ReportField
              label="RAM"
              value={repair.device?.ram || "—"}
            />

            <ReportField
              label="Storage"
              value={repair.device?.storage || "—"}
            />
          </div>
        </ReportSection>

        {/* Service Details */}
        <ReportSection
          title="🛠️ Service Details"
          description="Customer complaint and technician service information."
        >
          <ReportRow
            label="Reported Issue"
            value={
              repair.problem?.complaint || "Not available"
            }
          />

          {repair.problem?.diagnosis && (
            <ReportRow
              label="Diagnosis"
              value={repair.problem.diagnosis}
            />
          )}

          {repair.problem?.physicalCondition && (
            <ReportRow
              label="Physical Condition"
              value={repair.problem.physicalCondition}
            />
          )}

          {repair.remarks && (
            <ReportRow
              label="Service Remarks"
              value={repair.remarks}
            />
          )}
        </ReportSection>

        {/* Service Charges */}
        <ReportSection
          title="💰 Service Charges"
          description="Recorded service estimate and payment summary."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <ReportMeta
              label="Labour"
              value={money(repair.estimate?.labourCharge)}
            />

            <ReportMeta
              label="Parts"
              value={money(repair.estimate?.partsCharge)}
            />

            <ReportMeta
              label="Discount"
              value={money(repair.estimate?.discount)}
            />

            <ReportMeta
              label="Total"
              value={money(repair.estimate?.totalAmount)}
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <ReportMeta
              label="Advance Paid"
              value={money(repair.estimate?.advancePaid)}
            />

            <ReportMeta
              label="Balance"
              value={money(repair.estimate?.balanceAmount)}
            />
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-slate-700">
                Total Service Amount
              </span>

              <span className="text-lg font-bold text-slate-900">
                {money(repair.estimate?.totalAmount)}
              </span>
            </div>
          </div>
        </ReportSection>

        {/* Service Timeline */}
        {repair.timeline?.length ? (
          <ReportSection
            title="📋 Service Timeline"
            description="Recorded progress of this service."
          >
            <div className="space-y-4">
              {repair.timeline.map((entry, index) => (
                <div
                  key={`${entry.createdAt || "entry"}-${index}`}
                  className="flex gap-3"
                >
                  <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-black" />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-bold text-slate-900">
                        {entry.status}
                      </p>

                      <p className="shrink-0 text-[10px] text-slate-500">
                        {formatDate(entry.createdAt)}
                      </p>
                    </div>

                    {entry.note && (
                      <p className="mt-1 whitespace-pre-wrap text-xs leading-5 text-slate-700">
                        {entry.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ReportSection>
        ) : null}

        {/* Privacy */}
        <section className="mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
              🔒
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Customer Privacy
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-600">
                Personal mobile number, email address and
                residential address are not displayed in this
                public service report.
              </p>
            </div>
          </div>
        </section>

        {/* Back */}
        <div className="mt-5 flex justify-center">
          <a
            href={`/customer/${encodeURIComponent(decodedToken)}`}
            className="rounded-xl bg-black px-6 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            ← Back to Customer Portal
          </a>
        </div>

        <footer className="px-2 py-7 text-center text-[10px] text-slate-500">
          Lappy Care • Customer Service Report
        </footer>
      </div>
    </main>
  );
}

function ReportSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-bold text-slate-900 sm:text-lg">
        {title}
      </h2>

      <p className="mt-1 text-xs text-slate-600">
        {description}
      </p>

      <div className="mt-4">{children}</div>
    </section>
  );
}

function ReportField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-xs font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function ReportRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-slate-100 py-3 last:border-b-0">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-800">
        {value}
      </p>
    </div>
  );
}

function ReportMeta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-xs font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status?: string;
}) {
  const value = status || "Service";
  const normalized = value.toLowerCase();

  const className =
    normalized === "completed"
      ? "bg-green-50 text-green-700"
      : normalized === "waiting parts"
      ? "bg-orange-50 text-orange-700"
      : normalized === "diagnosing"
      ? "bg-yellow-50 text-yellow-700"
      : normalized === "cancelled"
      ? "bg-red-50 text-red-700"
      : normalized === "received"
      ? "bg-blue-50 text-blue-700"
      : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold ${className}`}
    >
      {value}
    </span>
  );
}

function money(value?: number) {
  if (typeof value !== "number") {
    return "—";
  }

  return `₹${value.toLocaleString("en-IN")}`;
}

function formatDate(value?: string) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}