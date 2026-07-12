"use client";

import { useState } from "react";

export default function RepairForm() {
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNo, setSerialNo] = useState("");

  const [problem, setProblem] = useState("");

  const [estimatedCost, setEstimatedCost] = useState("");

  const [technician, setTechnician] = useState("");

  const [remarks, setRemarks] = useState("");

  return (
    <div className="rounded-3xl border border-yellow-500/20 bg-[#181818] p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        New Repair Ticket
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Customer Name"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile Number"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        <input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Laptop Brand"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        <input
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Laptop Model"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        <input
          value={serialNo}
          onChange={(e) => setSerialNo(e.target.value)}
          placeholder="Serial Number"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        <input
          type="number"
          value={estimatedCost}
          onChange={(e) => setEstimatedCost(e.target.value)}
          placeholder="Estimated Cost"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

      </div>

      <textarea
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        placeholder="Problem Description"
        rows={5}
        className="mt-6 w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
      />

      <input
        value={technician}
        onChange={(e) => setTechnician(e.target.value)}
        placeholder="Assigned Technician"
        className="mt-6 w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
      />

      <textarea
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        placeholder="Remarks"
        rows={4}
        className="mt-6 w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
      />

      <button
        type="button"
        className="mt-8 w-full rounded-xl bg-yellow-400 py-4 font-bold text-black transition hover:bg-yellow-300"
      >
        Save Repair
      </button>

    </div>
  );
}