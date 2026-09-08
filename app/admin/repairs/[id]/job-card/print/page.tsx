import { notFound } from "next/navigation";

import JobCardPreview from "@/components/jobcard/JobCardPreview";
import { getRepairById } from "@/services/repairService";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobCardPrintPage({
  params,
}: Props) {
  const { id } = await params;

  const repair = await getRepairById(id);

  if (!repair) {
    notFound();
  }

  return (
    <>
      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          background: white !important;
        }

        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        #job-card-print-page {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          background: white;
        }

        @media print {
          html,
          body {
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            padding: 0;
            overflow: visible !important;
          }

          #job-card-print-page {
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            padding: 0;
            overflow: visible !important;
          }

          #job-card-print-page * {
            box-sizing: border-box;
          }

          .no-print {
            display: none !important;
          }
        }

        @media screen {
          #job-card-print-page {
            margin: 20px auto;
          }
        }
      `}</style>

      <main
        id="job-card-print-page"
        className="bg-white"
      >
        <JobCardPreview repair={repair} />
      </main>
    </>
  );
}