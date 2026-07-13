"use client";

type Props = {
  customerName: string;
  setCustomerName: (value: string) => void;

  mobile: string;
  setMobile: (value: string) => void;

  email: string;
  setEmail: (value: string) => void;
};

export default function CustomerSection({
  customerName,
  setCustomerName,
  mobile,
  setMobile,
  email,
  setEmail,
}: Props) {
  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

      {/* Heading */}
      <h2 className="mb-6 text-2xl font-bold text-white">
        Customer Details
      </h2>

      {/* Form */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* Customer Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Customer Name
          </label>

          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter Customer Name"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none transition focus:border-yellow-400"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Mobile Number
          </label>

          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter Mobile Number"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none transition focus:border-yellow-400"
          />
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address (Optional)"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none transition focus:border-yellow-400"
          />
        </div>

      </div>

    </div>
  );
}