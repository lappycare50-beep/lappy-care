"use client";

type Props = {
  contentRef: React.RefObject<HTMLDivElement | null>;
};

export default function JobCardPrintButton({
  contentRef,
}: Props) {

  function handlePrint() {

    if (!contentRef.current) {

      alert("Printable content not found.");

      return;

    }

    window.print();

  }

  return (

    <button
      type="button"
      onClick={handlePrint}
      className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
    >
      🖨️ Print / Save as PDF
    </button>

  );

}