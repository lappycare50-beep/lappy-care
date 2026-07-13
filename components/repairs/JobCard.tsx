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
      className="mx-auto max-w-4xl bg-white p-10 text-black"
    >

      {/* ==========================
          Header
      ========================== */}

      <div className="mb-8 border-b-2 border-black pb-6">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              LAPPY CARE
            </h1>

            <p className="text-gray-600">
              Laptop Repair & Services
            </p>

            <p className="text-sm text-gray-500">
              Wakad, Pune
            </p>

          </div>

          <div className="text-right">

            <h2 className="text-2xl font-bold">
              JOB CARD
            </h2>

            <p className="mt-2">
              <strong>Repair ID :</strong>
              {" "}
              {repair.repairId}
            </p>

            <p>
              <strong>Date :</strong>
              {" "}
              {repair.createdAt}
            </p>

          </div>

        </div>

      </div>

      {/* ==========================
          Customer Details
      ========================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Customer Details
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <strong>Name:</strong>
            <br />
            {repair.customerName}
          </div>

          <div>
            <strong>Mobile:</strong>
            <br />
            {repair.mobile}
          </div>

          <div className="col-span-2">
            <strong>Email:</strong>
            <br />
            {repair.email || "-"}
          </div>

        </div>

      </div>
            {/* ==========================
          Device Details
      ========================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Device Details
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <strong>Brand:</strong>
            <br />
            {repair.brand}
          </div>

          <div>
            <strong>Model:</strong>
            <br />
            {repair.model}
          </div>

          <div className="col-span-2">
            <strong>Serial Number:</strong>
            <br />
            {repair.serialNo || "-"}
          </div>

        </div>

      </div>

      {/* ==========================
          Repair Details
      ========================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Repair Details
        </h3>

        <div className="space-y-5">

          <div>
            <strong>Problem Reported:</strong>

            <div className="mt-2 rounded border p-3">
              {repair.problem}
            </div>
          </div>

          <div>
            <strong>Accessories Received:</strong>

            <div className="mt-2 rounded border p-3">
              {repair.accessories || "-"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">

            <div>
              <strong>Technician:</strong>
              <br />
              {repair.technician || "-"}
            </div>

            <div>
              <strong>Priority:</strong>
              <br />
              {repair.priority}
            </div>

          </div>

        </div>

      </div>
            {/* ==========================
          Payment Details
      ========================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Payment Details
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <strong>Estimated Cost:</strong>
            <br />
            ₹{repair.estimatedCost.toLocaleString("en-IN")}
          </div>

          <div>
            <strong>Final Cost:</strong>
            <br />
            ₹{repair.finalCost.toLocaleString("en-IN")}
          </div>

          <div>
            <strong>Advance Paid:</strong>
            <br />
            ₹{repair.advancePaid.toLocaleString("en-IN")}
          </div>

          <div>
            <strong>Balance Amount:</strong>
            <br />
            ₹{repair.balanceAmount.toLocaleString("en-IN")}
          </div>

        </div>

      </div>

      {/* ==========================
          Repair Status
      ========================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Repair Status
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <strong>Status:</strong>
            <br />
            {repair.status}
          </div>

          <div>
            <strong>Payment Status:</strong>
            <br />
            {repair.paymentStatus}
          </div>

          <div>
            <strong>Warranty:</strong>
            <br />
            {repair.warranty || "No Warranty"}
          </div>

          <div>
            <strong>Expected Delivery:</strong>
            <br />
            {repair.deliveredAt || "-"}
          </div>

        </div>

      </div>
            {/* ==========================
          Technician Remarks
      ========================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Technician Remarks
        </h3>

        <div className="min-h-[120px] rounded border p-4">
          {repair.remarks || "No remarks available."}
        </div>

      </div>

      {/* ==========================
          Terms & Conditions
      ========================== */}

      <div className="mb-8">

        <h3 className="mb-4 border-b pb-2 text-xl font-bold">
          Terms & Conditions
        </h3>

        <ul className="list-disc space-y-2 pl-6 text-sm">

          <li>
            Please keep this Job Card safely until delivery.
          </li>

          <li>
            Lappy Care is not responsible for data loss during repair.
          </li>

          <li>
            Warranty is applicable only on repaired parts/services.
          </li>

          <li>
            Device must be collected within 30 days after repair completion.
          </li>

          <li>
            Physical damage or liquid damage is not covered under warranty.
          </li>

        </ul>

      </div>

      {/* ==========================
          Signatures
      ========================== */}

      <div className="mt-16 grid grid-cols-2 gap-20">

        <div className="text-center">

          <div className="mb-2 border-t border-black pt-2">
            Customer Signature
          </div>

        </div>

        <div className="text-center">

          <div className="mb-2 border-t border-black pt-2">
            Authorized Signature
          </div>

        </div>

      </div>
            {/* ==========================
          Footer
      ========================== */}

      <div className="mt-16 border-t-2 border-black pt-6">

        <div className="grid grid-cols-2 gap-8">

          <div>

            <h4 className="mb-2 text-lg font-bold">
              Lappy Care
            </h4>

            <p>
              Laptop Repair & Services
            </p>

            <p>
              Wakad, Pune
            </p>

            <p>
              📞 +91 9595057006
            </p>

            <p>
              ✉️ support@lappycare.in
            </p>

            <p>
              🌐 www.lappycare.in
            </p>

          </div>

          <div className="text-right">

            <h4 className="mb-2 text-lg font-bold">
              Thank You!
            </h4>

            <p className="text-sm text-gray-700">
              Thank you for choosing
              <strong> Lappy Care</strong>.
            </p>

            <p className="mt-2 text-sm text-gray-700">
              We appreciate your trust and will
              always strive to provide the best
              repair service.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}