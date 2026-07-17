"use client";

import { Repair } from "@/types/repair";

type Props = {
  repair: Repair;
};

export default function JobCardCondition({
  repair,
}: Props) {

  const conditions =
    repair.problem.physicalCondition
      ?.split("\n")
      .filter(Boolean) || [];

  return (

    <div className="mb-8">

      {/* ==========================
          Section Title
      ========================== */}

      <div className="mb-4 border-b-2 border-black pb-2">

        <h2 className="text-xl font-bold uppercase tracking-wide">

          Complaint & Inspection

        </h2>

      </div>

      {/* ==========================
          Customer Complaint
      ========================== */}

      <Section title="Customer Complaint">

        <p className="min-h-[70px] whitespace-pre-wrap rounded border p-3">

          {repair.problem.complaint || "-"}

        </p>

      </Section>

      {/* ==========================
          Physical Condition
      ========================== */}

      <Section title="Physical Inspection">

        {conditions.length === 0 ? (

          <div className="rounded border p-3">

            -

          </div>

        ) : (

          <div className="grid grid-cols-2 gap-3">

            {conditions.map((item) => (

              <div
                key={item}
                className="flex items-center gap-3 rounded border p-2"
              >

                <div className="flex h-5 w-5 items-center justify-center border border-black text-xs font-bold">

                  ✓

                </div>

                <span>

                  {item}

                </span>

              </div>

            ))}

          </div>

        )}

      </Section>

      {/* ==========================
          Technician Diagnosis
      ========================== */}

      <Section title="Technician Diagnosis">

        <p className="min-h-[80px] whitespace-pre-wrap rounded border p-3">

          {repair.problem.diagnosis || "-"}

        </p>

      </Section>

      {/* ==========================
          Password Details
      ========================== */}

      <div className="mt-6 grid grid-cols-2 gap-6">

        <InfoRow
          label="Windows Password"
          value={repair.problem.password}
        />

        <InfoRow
          label="BIOS Password"
          value={repair.problem.biosPassword}
        />

      </div>

    </div>

  );

}

// ==========================================
// Section
// ==========================================

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({
  title,
  children,
}: SectionProps) {

  return (

    <div className="mb-6">

      <h3 className="mb-2 font-bold">

        {title}

      </h3>

      {children}

    </div>

  );

}

// ==========================================
// Info Row
// ==========================================

type RowProps = {
  label: string;
  value?: string;
};

function InfoRow({
  label,
  value,
}: RowProps) {

  return (

    <div className="flex border-b border-gray-300 pb-2">

      <div className="w-48 font-bold">

        {label}

      </div>

      <div className="flex-1">

        {value || "-"}

      </div>

    </div>

  );

}