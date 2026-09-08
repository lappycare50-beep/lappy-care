"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import AdminLayout from "@/components/admin/AdminLayout";
import JobCardPreview from "@/components/jobcard/JobCardPreview";

import type { Repair } from "@/types/repair";
import { getRepairById } from "@/services/repairService";

export default function JobCardPage() {
  const params = useParams();
  const id = params.id as string;

  const [repair, setRepair] = useState<Repair | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRepair() {
      try {
        if (!id) return;

        const data = await getRepairById(id);

        setRepair(data);
      } catch (error) {
        console.error("Failed to load repair:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRepair();
  }, [id]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="text-xl text-white">
            Loading Job Card...
          </div>
        </div>
      </AdminLayout>
    );
  }

  // =========================================================
  // NOT FOUND
  // =========================================================

  if (!repair) {
    return (
      <AdminLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="rounded-xl bg-red-600 px-8 py-5 text-xl font-semibold text-white">
            Repair Not Found
          </div>
        </div>
      </AdminLayout>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <>
      <AdminLayout>
        <div className="job-card-page-wrapper">
          <div
            id="job-card-print-area"
            className="mx-auto w-full max-w-5xl"
          >
            <JobCardPreview repair={repair} />
          </div>
        </div>
      </AdminLayout>

      {/* =====================================================
          PRINT CSS
      ===================================================== */}

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }

          html,
          body {
            width: 210mm !important;
            min-width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          /* -----------------------------------------------
             HIDE EVERYTHING
          ----------------------------------------------- */

          body * {
            visibility: hidden !important;
          }

          /* -----------------------------------------------
             SHOW ONLY JOB CARD
          ----------------------------------------------- */

          #job-card-print-area,
          #job-card-print-area * {
            visibility: visible !important;
          }

          /* -----------------------------------------------
             JOB CARD PRINT AREA
          ----------------------------------------------- */

          #job-card-print-area {
            position: absolute !important;

            top: 0 !important;
            left: 0 !important;

            width: 210mm !important;
            max-width: 210mm !important;

            min-height: 297mm !important;

            margin: 0 !important;
            padding: 10mm !important;

            overflow: visible !important;

            background: white !important;
            color: black !important;

            box-sizing: border-box !important;
          }

          /* -----------------------------------------------
             REMOVE SCREEN CONTAINER LIMITS
          ----------------------------------------------- */

          #job-card-print-area,
          #job-card-print-area > div,
          #job-card-print-area section {
            max-width: none !important;
          }

          /* -----------------------------------------------
             PREVENT HORIZONTAL TEXT BREAKING
          ----------------------------------------------- */

          #job-card-print-area * {
            box-sizing: border-box !important;
          }

          #job-card-print-area p,
          #job-card-print-area span,
          #job-card-print-area div,
          #job-card-print-area td,
          #job-card-print-area th {
            word-break: normal !important;
            overflow-wrap: normal !important;
          }

          /* -----------------------------------------------
             KEEP TABLES TOGETHER
          ----------------------------------------------- */

          #job-card-print-area table {
            width: 100% !important;
            max-width: 100% !important;
            table-layout: auto !important;
          }

          #job-card-print-area tr {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          /* -----------------------------------------------
             HIDE PRINT / EMAIL / WHATSAPP / ACTION BUTTONS
          ----------------------------------------------- */

          #job-card-print-area button,
          #job-card-print-area a[href^="mailto:"],
          #job-card-print-area a[href^="https://wa.me/"],
          #job-card-print-area a[href^="tel:"] {
            display: none !important;
          }

          /* -----------------------------------------------
             DO NOT PRINT SCREEN-ONLY ELEMENTS
          ----------------------------------------------- */

          .no-print {
            display: none !important;
          }

          [data-no-print="true"] {
            display: none !important;
          }

          /* -----------------------------------------------
             FORCE WHITE BACKGROUND
          ----------------------------------------------- */

          #job-card-print-area,
          #job-card-print-area * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* -----------------------------------------------
             REMOVE SHADOWS
          ----------------------------------------------- */

          #job-card-print-area * {
            box-shadow: none !important;
          }

          /* -----------------------------------------------
             AVOID CONTENT BEING CUT
          ----------------------------------------------- */

          #job-card-print-area {
            height: auto !important;
          }
        }
      `}</style>
    </>
  );
}