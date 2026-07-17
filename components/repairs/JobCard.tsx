"use client";

import { Repair } from "@/types/repair";

type Props = {
  repair: Repair;
};

export default function JobCard({
  repair,
}: Props) {

  return (

    <div
      id="job-card"
      className="mx-auto max-w-5xl bg-white p-10 text-black"
    >

      {/* ==========================================
          Header
      ========================================== */}

      <div className="mb-8 border-b-2 border-black pb-6">

        <div className="flex items-start justify-between">

          {/* Company */}

          <div>

            <h1 className="text-4xl font-bold">
              LAPPY CARE
            </h1>

            <p className="text-lg">
              Laptop Repair & Services
            </p>

            <div className="mt-3 space-y-1 text-sm text-gray-700">

              <p>
                Datta Mandir Road,
                Janoba Chowk,
                Wakad, Pune
              </p>

              <p>
                📞 +91 9595057006
              </p>

              <p>
                ✉ support@lappycare.in
              </p>

            </div>

          </div>

          {/* Job Card */}

          <div className="text-right">

            <h2 className="text-3xl font-bold">
              JOB CARD
            </h2>

            <div className="mt-4 space-y-2 text-sm">

              <p>

                <strong>
                  Repair ID :
                </strong>{" "}

                {repair.repairId}

              </p>

              <p>

                <strong>
                  Received :
                </strong>{" "}

                {repair.createdAt}

              </p>

              <p>

                <strong>
                  Status :
                </strong>{" "}

                {repair.status}

              </p>

              <p>

                <strong>
                  Warranty :
                </strong>{" "}

                {repair.warranty}

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ==========================================
          Customer Details
      ========================================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Customer Details
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <strong>
              Customer Name
            </strong>

            <br />

            {repair.customer.name}

          </div>

          <div>

            <strong>
              Mobile Number
            </strong>

            <br />

            {repair.customer.mobile}

          </div>

          <div>

            <strong>
              Alternate Mobile
            </strong>

            <br />

            {repair.customer.alternateMobile || "-"}

          </div>

          <div>

            <strong>
              Email
            </strong>

            <br />

            {repair.customer.email || "-"}

          </div>

          <div className="col-span-2">

            <strong>
              Address
            </strong>

            <br />

            {repair.customer.address || "-"}

          </div>

          <div>

            <strong>
              City
            </strong>

            <br />

            {repair.customer.city || "-"}

          </div>

          <div>

            <strong>
              State
            </strong>

            <br />

            {repair.customer.state || "-"}

          </div>

        </div>

      </div>
            {/* ==========================================
          Device Details
      ========================================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Device Details
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <strong>Device Type</strong>
            <br />
            {repair.device.type}
          </div>

          <div>
            <strong>Brand</strong>
            <br />
            {repair.device.brand}
          </div>

          <div>
            <strong>Model</strong>
            <br />
            {repair.device.model}
          </div>

          <div>
            <strong>Serial Number</strong>
            <br />
            {repair.device.serialNo || "-"}
          </div>

          <div>
            <strong>Processor</strong>
            <br />
            {repair.device.processor || "-"}
          </div>

          <div>
            <strong>RAM</strong>
            <br />
            {repair.device.ram || "-"}
          </div>

          <div>
            <strong>Storage</strong>
            <br />
            {repair.device.storage || "-"}
          </div>

          <div>
            <strong>Color</strong>
            <br />
            {repair.device.color || "-"}
          </div>

        </div>

      </div>

      {/* ==========================================
          Accessories
      ========================================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Accessories Received
        </h3>

        <div className="rounded-lg border border-gray-300 p-4">

          {repair.accessories.items.length > 0 ? (

            <div className="flex flex-wrap gap-2">

              {repair.accessories.items.map((item) => (

                <span
                  key={item}
                  className="rounded-full bg-gray-200 px-3 py-1 text-sm"
                >
                  {item}
                </span>

              ))}

            </div>

          ) : (

            <span>-</span>

          )}

          {repair.accessories.other && (

            <div className="mt-4">

              <strong>Other :</strong>{" "}

              {repair.accessories.other}

            </div>

          )}

        </div>

      </div>

      {/* ==========================================
          Customer Complaint
      ========================================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Customer Complaint
        </h3>

        <div className="min-h-[100px] rounded-lg border border-gray-300 p-4 whitespace-pre-wrap">

          {repair.problem.complaint}

        </div>

      </div>

      {/* ==========================================
          Physical Condition
      ========================================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Physical Condition
        </h3>

        <div className="min-h-[100px] rounded-lg border border-gray-300 p-4 whitespace-pre-wrap">

          {repair.problem.physicalCondition || "-"}

        </div>

      </div>

      {/* ==========================================
          Password Information
      ========================================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Password Information
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <strong>Windows Password</strong>

            <br />

            {repair.problem.password || "-"}

          </div>

          <div>

            <strong>BIOS Password</strong>

            <br />

            {repair.problem.biosPassword || "-"}

          </div>

        </div>

      </div>
            {/* ==========================================
          Estimate Details
      ========================================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Estimate Details
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <strong>Labour Charge</strong>
            <br />
            ₹ {repair.estimate.labourCharge.toLocaleString("en-IN")}
          </div>

          <div>
            <strong>Parts Charge</strong>
            <br />
            ₹ {repair.estimate.partsCharge.toLocaleString("en-IN")}
          </div>

          <div>
            <strong>Discount</strong>
            <br />
            ₹ {repair.estimate.discount.toLocaleString("en-IN")}
          </div>

          <div>
            <strong>Total Amount</strong>
            <br />
            <span className="font-bold text-lg">
              ₹ {repair.estimate.totalAmount.toLocaleString("en-IN")}
            </span>
          </div>

          <div>
            <strong>Advance Paid</strong>
            <br />
            ₹ {repair.estimate.advancePaid.toLocaleString("en-IN")}
          </div>

          <div>
            <strong>Balance Amount</strong>
            <br />
            ₹ {repair.estimate.balanceAmount.toLocaleString("en-IN")}
          </div>

        </div>

      </div>

      {/* ==========================================
          Assignment
      ========================================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Technician Assignment
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <strong>Technician</strong>

            <br />

            {repair.estimate.technician || "-"}

          </div>

          <div>

            <strong>Priority</strong>

            <br />

            {repair.estimate.priority}

          </div>

          <div>

            <strong>Expected Delivery</strong>

            <br />

            {repair.estimate.expectedDelivery || "-"}

          </div>

          <div>

            <strong>Payment Status</strong>

            <br />

            {repair.paymentStatus}

          </div>

        </div>

      </div>

      {/* ==========================================
          Repair Status
      ========================================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Repair Status
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <strong>Current Status</strong>

            <br />

            {repair.status}

          </div>

          <div>

            <strong>Warranty</strong>

            <br />

            {repair.warranty}

          </div>

          <div>

            <strong>Received Date</strong>

            <br />

            {repair.createdAt}

          </div>

          <div>

            <strong>Delivery Date</strong>

            <br />

            {repair.deliveredAt || "-"}

          </div>

        </div>

      </div>

      {/* ==========================================
          Technician Notes
      ========================================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Technician Notes
        </h3>

        <div className="min-h-[120px] rounded-lg border border-gray-300 p-4 whitespace-pre-wrap">

          {repair.remarks || "No remarks available."}

        </div>

      </div>

      {/* ==========================================
          Repair Timeline
      ========================================== */}

      {repair.timeline.length > 0 && (

        <div className="mb-8">

          <h3 className="mb-4 border-b pb-2 text-xl font-bold">
            Repair Timeline
          </h3>

          <div className="space-y-3">

            {repair.timeline.map((item, index) => (

              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-300 p-3"
              >

                <div>

                  <div className="font-semibold">
                    {item.status}
                  </div>

                  {item.note && (

                    <div className="text-sm text-gray-600">
                      {item.note}
                    </div>

                  )}

                </div>

                <div className="text-sm text-gray-500">

                  {item.createdAt}

                </div>

              </div>

            ))}

          </div>

        </div>

      )}
            {/* ==========================================
          Terms & Conditions
      ========================================== */}

      <div className="mb-10">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Terms & Conditions
        </h3>

        <ol className="list-decimal space-y-2 pl-6 text-sm leading-6">

          <li>
            Customer is requested to collect the repaired device within
            30 days after completion.
          </li>

          <li>
            Lappy Care is not responsible for any data loss during
            repair. Please keep a backup of important data.
          </li>

          <li>
            Warranty is applicable only on repaired or replaced parts
            mentioned in the invoice.
          </li>

          <li>
            Physical damage, liquid damage, electrical surge, mishandling
            or software issues are not covered under warranty unless
            specifically mentioned.
          </li>

          <li>
            Additional faults found during diagnosis will be informed
            before repair.
          </li>

          <li>
            Storage charges may apply for devices not collected after
            30 days.
          </li>

        </ol>

      </div>

      {/* ==========================================
          Signatures
      ========================================== */}

      <div className="mt-16 grid grid-cols-2 gap-16">

        <div className="text-center">

          <div className="mb-20 border-b border-black"></div>

          <p className="font-semibold">
            Customer Signature
          </p>

        </div>

        <div className="text-center">

          <div className="mb-20 border-b border-black"></div>

          <p className="font-semibold">
            Authorized Signature
          </p>

        </div>

      </div>

      {/* ==========================================
          Footer
      ========================================== */}

      <div className="mt-12 border-t-2 border-black pt-6">

        <div className="flex items-center justify-between">

          <div>

            <h4 className="text-lg font-bold">
              LAPPY CARE
            </h4>

            <p className="text-sm">
              Laptop Repair & Services
            </p>

            <p className="text-sm">
              Datta Mandir Road,
              Janoba Chowk,
              Wakad, Pune
            </p>

            <p className="text-sm">
              📞 +91 9595057006
            </p>

          </div>

          <div className="text-right">

            <p className="text-sm">
              Thank you for choosing
            </p>

            <h3 className="text-2xl font-bold">
              LAPPY CARE
            </h3>

            <p className="mt-2 text-xs text-gray-600">
              Generated by Lappy Care ERP
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}