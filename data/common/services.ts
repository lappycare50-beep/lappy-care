import {
  Cpu,
  Monitor,
  HardDrive,
  MemoryStick,
  BatteryCharging,
  Keyboard,
  Database,
  Fan,
  Power,
  ShieldCheck,
  Laptop,
  Wrench,
} from "lucide-react";

export const services = [
  {
    title: "Motherboard Repair",
    description:
      "Professional chip-level motherboard diagnosis and repair for all laptop brands.",
    icon: Cpu,
  },
  {
    title: "Screen Replacement",
    description:
      "Original quality LCD & LED screen replacement with warranty.",
    icon: Monitor,
  },
  {
    title: "SSD Upgrade",
    description:
      "Upgrade to high-speed SSD for faster boot and better performance.",
    icon: HardDrive,
  },
  {
    title: "RAM Upgrade",
    description:
      "Increase laptop memory for smooth multitasking and performance.",
    icon: MemoryStick,
  },
  {
    title: "Battery Replacement",
    description:
      "Replace old or damaged laptop batteries with quality replacements.",
    icon: BatteryCharging,
  },
  {
    title: "Keyboard Repair",
    description:
      "Repair or replace faulty laptop keyboards and touchpads.",
    icon: Keyboard,
  },
  {
    title: "Data Recovery",
    description:
      "Recover important files from damaged HDDs and SSDs whenever possible.",
    icon: Database,
  },
  {
    title: "Cooling Fan Service",
    description:
      "Fan cleaning, thermal paste replacement and overheating solutions.",
    icon: Fan,
  },
  {
    title: "Charging Port Repair",
    description:
      "DC jack and charging connector repair for reliable charging.",
    icon: Power,
  },
  {
    title: "Virus & Software Fix",
    description:
      "Windows installation, virus removal and software troubleshooting.",
    icon: ShieldCheck,
  },
  {
    title: "Laptop Servicing",
    description:
      "Complete internal cleaning and preventive maintenance service.",
    icon: Laptop,
  },
  {
    title: "General Laptop Repair",
    description:
      "Diagnosis and repair of hardware and software issues for all brands.",
    icon: Wrench,
  },
];