"use client";

import { RepairDevice } from "@/types/repair";

type Props = {
  device: RepairDevice;
  setDevice: (device: RepairDevice) => void;
};

export default function DeviceSection({
  device,
  setDevice,
}: Props) {

  const update = <K extends keyof RepairDevice>(
    key: K,
    value: RepairDevice[K]
  ) => {
    setDevice({
      ...device,
      [key]: value,
    });
  };

  return (

    <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Device Details
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        {/* Device Type */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Device Type
          </label>

          <select
            value={device.type}
            onChange={(e) =>
              update("type", e.target.value)
            }
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          >
            <option value="Laptop">Laptop</option>
            <option value="Desktop">Desktop</option>
            <option value="MacBook">MacBook</option>
            <option value="Printer">Printer</option>
            <option value="Monitor">Monitor</option>
          </select>

        </div>

        {/* Brand */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Brand *
          </label>

          <input
            type="text"
            value={device.brand}
            onChange={(e) =>
              update("brand", e.target.value)
            }
            placeholder="Dell / HP / Lenovo"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* Model */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Model *
          </label>

          <input
            type="text"
            value={device.model}
            onChange={(e) =>
              update("model", e.target.value)
            }
            placeholder="Latitude 5420"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* Serial Number */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Serial Number
          </label>

          <input
            type="text"
            value={device.serialNo}
            onChange={(e) =>
              update("serialNo", e.target.value)
            }
            placeholder="Serial Number"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* Processor */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Processor
          </label>

          <input
            type="text"
            value={device.processor ?? ""}
            onChange={(e) =>
              update("processor", e.target.value)
            }
            placeholder="Intel Core i5 11th Gen"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* RAM */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            RAM
          </label>

          <input
            type="text"
            value={device.ram ?? ""}
            onChange={(e) =>
              update("ram", e.target.value)
            }
            placeholder="8 GB"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* Storage */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Storage
          </label>

          <input
            type="text"
            value={device.storage ?? ""}
            onChange={(e) =>
              update("storage", e.target.value)
            }
            placeholder="512 GB SSD"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

        {/* Color */}

        <div>

          <label className="mb-2 block text-sm text-gray-300">
            Color
          </label>

          <input
            type="text"
            value={device.color ?? ""}
            onChange={(e) =>
              update("color", e.target.value)
            }
            placeholder="Black"
            className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>

      </div>

    </div>

  );

}