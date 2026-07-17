"use client";

export default function PrintStyles() {
  return (
    <style jsx global>{`

      /* ==========================================
         Page
      ========================================== */

      @page {
        size: A4 portrait;
        margin: 10mm;
      }

      /* ==========================================
         Screen
      ========================================== */

      .print-area{
        width:210mm;
        min-height:297mm;
        margin:auto;
        background:#fff;
      }

      /* ==========================================
         Print
      ========================================== */

      @media print{

        html,
        body{

          margin:0 !important;
          padding:0 !important;

          width:210mm;
          min-height:297mm;

          background:#fff !important;

          -webkit-print-color-adjust:exact;
          print-color-adjust:exact;

        }

        body{

          overflow:visible !important;

        }

        /* Hide UI */

        .no-print,
        button{

          display:none !important;

        }

        /* Printable Area */

        .print-area{

          width:100% !important;

          margin:0 !important;

          padding:0 !important;

          border:none !important;

          box-shadow:none !important;

          overflow:visible !important;

        }

        /* Prevent Page Break */

        table,
        tr,
        td,
        th,
        thead,
        tbody{

          page-break-inside:avoid !important;

          break-inside:avoid !important;

        }

        section,
        article,
        .print-section{

          page-break-inside:avoid !important;

          break-inside:avoid !important;

        }

        img,
        svg{

          page-break-inside:avoid !important;

        }

        h1,h2,h3,h4,h5,h6{

          page-break-after:avoid;

        }

        *{

          -webkit-print-color-adjust:exact;

          print-color-adjust:exact;

        }

      }

    `}</style>
  );
}