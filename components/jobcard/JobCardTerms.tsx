"use client";

export default function JobCardTerms() {
  const terms = [
    "Customer is responsible for taking a backup of all personal data before submitting the device.",
    "Lappy Care is not responsible for any loss of data during diagnosis or repair.",
    "Repair charges may change after detailed diagnosis. Customer approval will be taken before additional work.",
    "Warranty is applicable only on repaired/replaced parts and does not cover physical or liquid damage.",
    "Warranty becomes void if the device is opened or repaired by any third party.",
    "Devices not collected within 90 days may attract storage charges or be disposed of as per company policy.",
    "Accessories not mentioned on this Job Card will not be the responsibility of Lappy Care.",
  ];

  return (
    <div className="mt-10 border-t-2 border-black pt-6">

      {/* ==========================
          Terms & Conditions
      ========================== */}

      <h2 className="mb-4 text-xl font-bold uppercase tracking-wide">
        Terms & Conditions
      </h2>

      <ol className="list-decimal space-y-2 rounded-lg border border-gray-300 bg-gray-50 p-5 pl-8 text-sm leading-7">

        {terms.map((term) => (
          <li key={term}>
            {term}
          </li>
        ))}

      </ol>

      {/* ==========================
          Warranty
      ========================== */}

      <div className="mt-8 rounded-lg border border-green-500 bg-green-50 p-5">

        <h3 className="mb-3 text-lg font-bold text-green-700">
          Warranty Policy
        </h3>

        <p className="text-sm leading-7">
          Warranty is applicable only on the repaired or replaced
          components mentioned in the Job Card and Invoice.
          Physical damage, liquid damage, software issues,
          virus infection, customer mishandling and electrical
          surge are not covered under warranty.
        </p>

      </div>

      {/* ==========================
          Customer Declaration
      ========================== */}

      <div className="mt-8 rounded-lg border border-yellow-400 bg-yellow-50 p-5">

        <h3 className="mb-3 text-lg font-bold text-yellow-700">
          Customer Declaration
        </h3>

        <p className="text-sm leading-7">
          I hereby confirm that the above device and accessories
          have been handed over to Lappy Care for diagnosis and
          repair. I have verified all information mentioned in
          this Job Card and agree to the above Terms &
          Conditions.
        </p>

      </div>

      {/* ==========================
          Signatures
      ========================== */}

      <div className="mt-12 grid grid-cols-3 gap-8">

        <SignatureBox
          title="Customer Signature"
        />

        <SignatureBox
          title="Technician Signature"
        />

        <SignatureBox
          title="Delivery Signature"
        />

      </div>

      {/* ==========================
          Footer
      ========================== */}

      <div className="mt-12 rounded-lg border border-gray-300 bg-gray-100 p-6 text-center">

        <h3 className="text-2xl font-bold">
          LAPPY CARE
        </h3>

        <p className="mt-2 text-sm">
          Laptop Repair & Service
        </p>

        <p className="text-sm">
          Datta Mandir Road, Wakad, Pune
        </p>

        <p className="text-sm">
          📞 +91 9595057006
        </p>

        <p className="text-sm">
          ✉ support@lappycare.in
        </p>

        <p className="mt-3 text-sm font-semibold">
          Thank You For Choosing Lappy Care
        </p>

      </div>

    </div>
  );
}

// ==========================================
// Signature Box
// ==========================================

type SignatureProps = {
  title: string;
};

function SignatureBox({
  title,
}: SignatureProps) {
  return (
    <div className="text-center">

      <div className="mb-3 h-24 rounded-lg border border-dashed border-gray-400 bg-white">
      </div>

      <div className="border-t border-black pt-2 font-semibold">
        {title}
      </div>

    </div>
  );
}