"use client";

import { Repair } from "@/types/repair";

import JobCardHeader from "./JobCardHeader";
import JobCardCustomer from "./JobCardCustomer";
import JobCardDevice from "./JobCardDevice";
import JobCardAccessories from "./JobCardAccessories";
import JobCardCondition from "./JobCardCondition";
import JobCardEstimate from "./JobCardEstimate";
import JobCardTerms from "./JobCardTerms";

type Props = {
  repair: Repair;
};

export default function JobCard({
  repair,
}: Props) {
  return (
    <div
  id="job-card"
  className="
    print-area
    w-[210mm]
    min-h-[297mm]
    bg-white
    text-black
    p-8
    mx-auto
  "
>
      {/* ==========================
          Header
      ========================== */}

      <section className="print-section">
        <JobCardHeader repair={repair} />
      </section>

      {/* ==========================
          Customer
      ========================== */}

      <section className="print-section mt-8">
        <JobCardCustomer repair={repair} />
      </section>

      {/* ==========================
          Device
      ========================== */}

      <section className="print-section mt-8">
        <JobCardDevice repair={repair} />
      </section>

      {/* ==========================
          Accessories
      ========================== */}

      <section className="print-section mt-8">
        <JobCardAccessories repair={repair} />
      </section>

      {/* ==========================
          Complaint & Inspection
      ========================== */}

      <section className="print-section mt-8">
        <JobCardCondition repair={repair} />
      </section>

      {/* ==========================
          Estimate
      ========================== */}

      <section className="print-section mt-8">
        <JobCardEstimate repair={repair} />
      </section>

      {/* ==========================
          Terms
      ========================== */}

      <section className="print-section mt-8">
        <JobCardTerms />
      </section>

    </div>
  );
}