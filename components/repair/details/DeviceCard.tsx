"use client";

import {
  Cpu,
  HardDrive,
  Laptop,
  MemoryStick,
  Palette,
  ScanLine,
} from "lucide-react";

import { RepairDevice } from "@/types/repair";

interface DeviceCardProps {
  device: RepairDevice;
}

export default function DeviceCard({
  device,
}: DeviceCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
      {/* ==========================
          Header
      ========================== */}

      <div className="mb-6 flex items-center gap-3">
        <Laptop
          size={22}
          className="text-yellow-400"
        />

        <h2 className="text-xl font-bold text-yellow-400">
          Device Information
        </h2>
      </div>

      {/* ==========================
          Body
      ========================== */}

      <div className="grid gap-5 md:grid-cols-2">
        {/* Device Type */}

        <InfoItem
          icon={<Laptop size={18} />}
          label="Device Type"
          value={device.type}
        />

        {/* Brand */}

        <InfoItem
          label="Brand"
          value={device.brand}
        />

        {/* Model */}

        <InfoItem
          label="Model"
          value={device.model}
        />

        {/* Serial Number */}

        <InfoItem
          icon={<ScanLine size={18} />}
          label="Serial Number"
          value={device.serialNo || "-"}
        />

        {/* Processor */}

        <InfoItem
          icon={<Cpu size={18} />}
          label="Processor"
          value={device.processor || "-"}
        />

        {/* RAM */}

        <InfoItem
          icon={<MemoryStick size={18} />}
          label="RAM"
          value={device.ram || "-"}
        />

        {/* Storage */}

        <InfoItem
          icon={<HardDrive size={18} />}
          label="Storage"
          value={device.storage || "-"}
        />

        {/* Color */}

        <InfoItem
          icon={<Palette size={18} />}
          label="Color"
          value={device.color || "-"}
        />
      </div>

      {/* ==========================
          Device Photos
      ========================== */}

      {device.devicePhotos &&
        device.devicePhotos.length > 0 && (
          <>
            <div className="mt-8 mb-4">
              <h3 className="font-semibold text-yellow-400">
                Device Photos
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {device.devicePhotos.map(
                (photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Device ${index + 1}`}
                    className="h-32 w-full rounded-lg border border-white/10 object-cover"
                  />
                )
              )}
            </div>
          </>
        )}
    </div>
  );
}

// ==========================================
// Info Item
// ==========================================

interface InfoItemProps {
  icon?: React.ReactNode;

  label: string;

  value: string;
}

function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2 text-sm text-gray-400">
        {icon}

        <span>{label}</span>
      </div>

      <div className="rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-3 font-medium text-white">
        {value}
      </div>
    </div>
  );
}