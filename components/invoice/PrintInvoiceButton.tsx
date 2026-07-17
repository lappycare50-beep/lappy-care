"use client";

type Props = {
  label?: string;
};

export default function PrintInvoiceButton({
  label = "Print Invoice",
}: Props) {

  function handlePrint() {
    window.print();
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300"
    >
      🖨️ {label}
    </button>
  );
}