"use client";

export default function JobCardSignature() {
  return (
    <div className="mt-12 border-t border-gray-300 pt-10">

      <div className="grid grid-cols-2 gap-16">

        <div className="text-center">
          <div className="mx-auto h-16 border-b border-black" />

          <p className="mt-3 font-semibold">
            Customer Signature
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto h-16 border-b border-black" />

          <p className="mt-3 font-semibold">
            Authorized Signature
          </p>
        </div>

      </div>

    </div>
  );
}