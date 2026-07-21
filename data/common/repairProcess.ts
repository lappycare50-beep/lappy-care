import {
  CalendarCheck,
  SearchCheck,
  Wrench,
  CircleCheckBig,
} from "lucide-react";

export interface RepairProcessStep {
  step: string;
  icon: typeof CalendarCheck;
  title: string;
  description: string;
}

export const repairProcessSteps: RepairProcessStep[] = [
  {
    step: "01",
    icon: CalendarCheck,
    title: "Book Your Repair",
    description:
      "Call us, send a WhatsApp message or submit an online repair request. We will schedule your laptop inspection at your convenience.",
  },
  {
    step: "02",
    icon: SearchCheck,
    title: "Diagnosis & Estimate",
    description:
      "Our technicians perform a detailed diagnosis and provide a transparent repair estimate before any work begins.",
  },
  {
    step: "03",
    icon: Wrench,
    title: "Professional Repair",
    description:
      "After your approval, we repair your laptop using quality spare parts and professional repair equipment.",
  },
  {
    step: "04",
    icon: CircleCheckBig,
    title: "Testing & Delivery",
    description:
      "Every repaired laptop undergoes complete quality testing before safe delivery or pickup.",
  },
];

export const repairProcessStats = [
  {
    title: "Same Day",
    subtitle: "Fast Repair Available",
  },
  {
    title: "Genuine",
    subtitle: "Quality Spare Parts",
  },
  {
    title: "Warranty",
    subtitle: "On Eligible Repairs",
  },
];