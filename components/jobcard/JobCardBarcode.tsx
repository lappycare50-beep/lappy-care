"use client";

import Barcode from "react-barcode";

type Props = {
  repairId: string;
};

export default function JobCardBarcode({
  repairId,
}: Props) {
  return (
    <div className="mt-6 flex flex-col items-center">

      <Barcode
        value={repairId}
        width={1.5}
        height={50}
        fontSize={14}
        margin={0}
        displayValue={true}
      />

    </div>
  );
}