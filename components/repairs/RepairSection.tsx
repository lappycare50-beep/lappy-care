"use client";

type Priority = "Low" | "Medium" | "High" | "Urgent";

type Props = {
  problem: string;
  setProblem: (value: string) => void;

  accessories: string;
  setAccessories: (value: string) => void;

  technician: string;
  setTechnician: (value: string) => void;

  priority: Priority;
  setPriority: (value: Priority) => void;
};

export default function RepairSection({
  problem,
  setProblem,
  accessories,
  setAccessories,
  technician,
  setTechnician,
  priority,
  setPriority,
}: Props) {
  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Repair Details
      </h2>

      <div className="grid gap-6">

        {/* Problem */}
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Describe the problem..."
          rows={4}
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400 resize-none"
        />

        {/* Accessories */}
        <input
          value={accessories}
          onChange={(e) => setAccessories(e.target.value)}
          placeholder="Accessories Received (Adapter, Bag, Mouse...)"
          className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
        />

        <div className="grid gap-6 md:grid-cols-2">

          {/* Technician */}
          <input
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
            placeholder="Technician Name"
            className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

          {/* Priority */}
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as Priority)
            }
            className="rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          >
            <option value="Low">🟢 Low</option>
            <option value="Medium">🟡 Medium</option>
            <option value="High">🟠 High</option>
            <option value="Urgent">🔴 Urgent</option>
          </select>

        </div>

      </div>

    </div>
  );
}