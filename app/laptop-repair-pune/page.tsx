import { Metadata } from "next";
import Link from "next/link";

import ServiceSchema from "./ServiceSchema";
import FaqSchema from "./FaqSchema";
import BreadcrumbSchema from "./BreadcrumbSchema";

import TrackCallButton from "@/components/analytics/TrackCallButton";
import TrackWhatsappButton from "@/components/analytics/TrackWhatsappButton";
import TrackBookRepairButton from "@/components/analytics/TrackBookRepairButton";
import { HelpCircle, Plus } from "lucide-react";

import {
  trackCallClick,
  trackWhatsAppClick,
  trackBookRepairClick,
} from "../../lib/analytics";

import {
  PhoneCall,
  MessageCircle,
} from "lucide-react";

import {
  ArrowRight,
} from "lucide-react";

import {
  Quote,
  CircleUserRound,
} from "lucide-react";

import {
  CalendarCheck,
  SearchCheck,
  CircleCheckBig,
} from "lucide-react";

import {
  Star,
  ShieldCheck,
  Truck,
  Wrench,
  Award,
  Clock3,
} from "lucide-react";

import {
  BadgeCheck,
  IndianRupee,
} from "lucide-react";

import { MapPin } from "lucide-react";

import {
  Cpu,
  Monitor,
  HardDrive,
  MemoryStick,
  BatteryCharging,
  Database,
  Keyboard,
  Fan,
  Wifi,
  Laptop,
  PlugZap,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Laptop Repair in Pune | Dell, HP, Lenovo Repair | Lappy Care",

  description:
    "Professional Laptop Repair in Pune. Dell, HP, Lenovo, ASUS, Acer, Apple Laptop Repair, Screen Replacement, SSD Upgrade, Motherboard Repair, Data Recovery and Refurbished Laptop Sales.",

  keywords: [
  "Laptop Repair Pune",
  "Laptop Repair Near Me",
  "Laptop Service Pune",
  "Laptop Service Center Pune",
  "Computer Repair Pune",
  "Computer Service Pune",
  "Laptop Repair PCMC",
  "Laptop Repair Wakad",
  "Laptop Repair Hinjawadi",
  "Laptop Repair Baner",
  "Laptop Repair Balewadi",
  "Laptop Repair Punawale",
  "Laptop Repair Ravet",
  "Laptop Repair Tathawade",
  "Laptop Repair Pimple Saudagar",
  "Laptop Repair Pimpri",
  "Laptop Repair Chinchwad",
  "Laptop Repair Aundh",
  "Laptop Repair Pashan",
  "Dell Laptop Repair Pune",
  "HP Laptop Repair Pune",
  "Lenovo Laptop Repair Pune",
  "ASUS Laptop Repair Pune",
  "Acer Laptop Repair Pune",
  "Apple MacBook Repair Pune",
  "MacBook Repair Pune",
  "Gaming Laptop Repair Pune",
  "Laptop Screen Replacement Pune",
  "Laptop Keyboard Repair Pune",
  "Laptop Battery Replacement Pune",
  "Laptop Motherboard Repair Pune",
  "Motherboard Repair Pune",
  "Chip Level Laptop Repair Pune",
  "SSD Upgrade Pune",
  "RAM Upgrade Pune",
  "Laptop SSD Upgrade Pune",
  "Laptop RAM Upgrade Pune",
  "Laptop Hinge Repair Pune",
  "Laptop Charging Port Repair Pune",
  "Laptop Fan Cleaning Pune",
  "Laptop Overheating Repair Pune",
  "Laptop Water Damage Repair Pune",
  "Laptop Data Recovery Pune",
  "Laptop Virus Removal Pune",
  "Laptop Cleaning Service Pune",
  "Business Laptop Repair Pune",
  "Corporate Laptop Repair Pune",
  "Student Laptop Repair Pune",
  "Same Day Laptop Repair Pune",
  "Emergency Laptop Repair Pune",
  "Laptop Pickup and Drop Service Pune",
  "Affordable Laptop Repair Pune",
  "Best Laptop Repair Pune",
  "Refurbished Laptops Pune",


  ],

  alternates: {
    canonical: "https://lappycarepune.in/laptop-repair-pune",
  },

  openGraph: {
    title: "Laptop Repair Pune | Lappy Care",

    description:
      "Professional Laptop Repair & Computer Service Center in Pune.",

    url: "https://lappycarepune.in/laptop-repair-pune",

    siteName: "Lappy Care",

    locale: "en_IN",

    type: "website",
  },
};

export default function LaptopRepairPage() {
  const services = [
    
  {
    icon: Cpu,
    title: "Motherboard Repair",
    desc: "Professional chip-level motherboard repair for all laptop brands.",
  },
  {
    icon: Monitor,
    title: "Screen Replacement",
    desc: "Original quality LCD & LED screen replacement.",
  },
  {
    icon: HardDrive,
    title: "SSD Upgrade",
    desc: "Boost your laptop speed with high-performance SSD upgrades.",
  },
  {
    icon: MemoryStick,
    title: "RAM Upgrade",
    desc: "Increase memory for smoother multitasking.",
  },
  {
    icon: BatteryCharging,
    title: "Battery Replacement",
    desc: "Genuine battery replacement with warranty.",
  },
  {
    icon: Database,
    title: "Data Recovery",
    desc: "Recover important files from damaged drives.",
  },
  {
    icon: Keyboard,
    title: "Keyboard Repair",
    desc: "Keyboard replacement and key repair services.",
  },
  {
    icon: Fan,
    title: "Fan Cleaning",
    desc: "Reduce overheating with complete internal cleaning.",
  },
  {
    icon: Wifi,
    title: "WiFi Repair",
    desc: "Resolve wireless connectivity issues.",
  },
  {
    icon: Laptop,
    title: "Laptop Servicing",
    desc: "Complete preventive maintenance and servicing.",
  },
  {
    icon: PlugZap,
    title: "Charging Port Repair",
    desc: "Repair damaged charging ports professionally.",
  },
  {
    icon: ShieldCheck,
    title: "Virus Removal",
    desc: "Protect your laptop from malware and viruses.",
  },
];

const faqs = [
  {
    q: "Do you repair all laptop brands?",
    a: "Yes. We repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook, MSI, Samsung, LG and most major laptop brands.",
  },
  {
    q: "How long does laptop repair take?",
    a: "Most repairs are completed within the same day or within 1–3 working days depending on the issue.",
  },
  {
    q: "Do you provide pickup & drop service?",
    a: "Yes. Pickup and drop service is available across Wakad, Hinjawadi, Baner, Balewadi, Punawale and nearby areas.",
  },
  {
    q: "Do you provide warranty?",
    a: "Yes. Warranty is available on eligible repairs and replacement parts.",
  },
  {
    q: "Can you upgrade SSD and RAM?",
    a: "Yes. We provide SSD upgrades, RAM upgrades and complete laptop performance optimization.",
  },
  {
    q: "Do you recover lost data?",
    a: "Yes. We provide professional data recovery services depending on the condition of the storage device.",
  },
  {
    q: "Do you sell refurbished laptops?",
    a: "Yes. We sell quality-tested refurbished Dell, HP and Lenovo laptops with warranty.",
  },
];
  return (

    
    <>
      <ServiceSchema />
      <FaqSchema />
      <BreadcrumbSchema />

      <main className="bg-white">

        {/* HERO */}

       <section className="bg-black text-white">
  <div className="max-w-7xl mx-auto px-6 py-20">

    <div className="grid lg:grid-cols-2 gap-14 items-center">

      {/* LEFT */}

      <div>

        <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold mb-6">
          <Star size={16} fill="currentColor" />
          4.7 Google Rated Laptop Repair
        </div>

        <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
          Laptop Repair
          <span className="text-yellow-400"> in Pune</span>
        </h1>

        <p className="text-gray-300 mt-6 text-lg leading-8">
          Professional laptop repair for Dell, HP, Lenovo, ASUS,
          Acer, Apple MacBook and all major brands.
          Chip-level repair, SSD upgrades, screen replacement,
          battery replacement and data recovery.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-10">

          <div className="flex items-center gap-3">
            <ShieldCheck className="text-yellow-400" />
            <span>Genuine Parts</span>
          </div>

          <div className="flex items-center gap-3">
            <Truck className="text-yellow-400" />
            <span>Pickup & Drop</span>
          </div>

          <div className="flex items-center gap-3">
            <Clock3 className="text-yellow-400" />
            <span>Same Day Service</span>
          </div>

          <div className="flex items-center gap-3">
            <Award className="text-yellow-400" />
            <span>Repair Warranty</span>
          </div>

        </div>

        <div className="flex flex-wrap gap-4 mt-10">

          <TrackCallButton
            className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition"
          />

          <TrackWhatsappButton
            className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-500 transition"
          />

          <TrackBookRepairButton
            className="border border-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-black transition"
          />

        </div>

      </div>

     

      {/* RIGHT */}

      <div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-black rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-yellow-400">
                5000+
              </div>
              <p className="text-gray-400 mt-2">
                Repairs Completed
              </p>
            </div>

            <div className="bg-black rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-yellow-400">
                4.9★
              </div>
              <p className="text-gray-400 mt-2">
                Google Rating
              </p>
            </div>

            <div className="bg-black rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-yellow-400">
                Same Day
              </div>
              <p className="text-gray-400 mt-2">
                Express Repairs
              </p>
            </div>

            <div className="bg-black rounded-xl p-6 text-center">
              <Wrench
                className="mx-auto text-yellow-400"
                size={42}
              />
              <p className="text-gray-400 mt-4">
                Chip Level Repair
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</section>

{/* SERVICES */}

<section className="py-24 bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <div className="text-center max-w-3xl mx-auto">

      <span className="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-4 py-2 text-sm font-semibold">
        Our Expertise
      </span>

      <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold text-gray-900">
        Professional Laptop Repair Services
      </h2>

      <p className="mt-6 text-lg text-gray-600 leading-8">
        We repair all major laptop brands including Dell, HP, Lenovo,
        ASUS, Acer and Apple MacBook using genuine parts and
        professional diagnostic equipment.
      </p>

    </div>

    {/* Cards */}

    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16">

      {services.map((service) => {

        const Icon = service.icon;

        return (

          <div
            key={service.title}
            className="group flex flex-col rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-2xl"
          >

            {/* Icon */}

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 transition-transform duration-300 group-hover:scale-110">

              <Icon
                size={32}
                className="text-yellow-600"
              />

            </div>

            {/* Title */}

            <h3 className="mt-6 text-2xl font-bold text-gray-900 leading-tight">
              {service.title}
            </h3>

            {/* Description */}

            <p className="mt-4 text-gray-600 leading-7 flex-grow">
              {service.desc}
            </p>

            {/* Features */}

            <div className="space-y-3 mt-6">

              <div className="flex items-center gap-3 text-sm text-gray-700">

                <CheckCircle2
                  size={18}
                  className="text-green-600 flex-shrink-0"
                />

                <span>Experienced Technicians</span>

              </div>

              <div className="flex items-center gap-3 text-sm text-gray-700">

                <CheckCircle2
                  size={18}
                  className="text-green-600 flex-shrink-0"
                />

                <span>Warranty Available</span>

              </div>

              <div className="flex items-center gap-3 text-sm text-gray-700">

                <CheckCircle2
                  size={18}
                  className="text-green-600 flex-shrink-0"
                />

                <span>Fast Turnaround</span>

              </div>

            </div>

            {/* CTA */}

            <Link
              href="/#booking"
              className="mt-8 inline-flex items-center font-semibold text-yellow-600 transition-all duration-300 group-hover:translate-x-1"
            >
              Book This Service →
            </Link>

          </div>

        );

      })}

    </div>

  </div>
</section>
        {/* AREAS WE SERVE */}

<section className="py-24 bg-black text-white">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <div className="text-center max-w-3xl mx-auto">

      <span className="inline-flex items-center rounded-full bg-yellow-400 text-black px-4 py-2 text-sm font-semibold">
        Service Locations
      </span>

      <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold">
        Areas We Serve
      </h2>

      <p className="mt-6 text-lg text-gray-300 leading-8">
        We proudly provide laptop repair, computer service,
        pickup & drop, SSD upgrades, motherboard repair,
        screen replacement and data recovery across Pune and
        Pimpri-Chinchwad.
      </p>

    </div>

    {/* Areas */}

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">

      {[
        "Wakad",
        "Hinjawadi",
        "Baner",
        "Balewadi",
        "Punawale",
        "Tathawade",
        "Ravet",
        "Pimple Saudagar",
        "Pimpri",
        "Chinchwad",
        "Aundh",
        "Pashan",
      ].map((area) => (

        <div
          key={area}
          className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-yellow-400 hover:bg-zinc-800 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >

          <div className="flex flex-col items-center">

            <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">

              📍

            </div>

            <h3 className="mt-5 text-xl font-semibold">
              {area}
            </h3>

            <p className="mt-2 text-sm text-gray-400 text-center">
              Laptop Repair
            </p>

          </div>

        </div>

      ))}

    </div>

    {/* Bottom CTA */}

    <div className="mt-20 rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-500 p-10 text-center">

      <h3 className="text-3xl font-bold text-black">
        Need Pickup & Drop Service?
      </h3>

      <p className="mt-4 text-black/80 max-w-2xl mx-auto">
        We offer doorstep pickup and delivery for selected laptop
        repair services across Pune and PCMC.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-8">

        <TrackCallButton
          className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-zinc-900 transition"
        />

        <TrackWhatsappButton
          className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-500 transition"
        />

      </div>

    </div>

  </div>

</section>

        {/* WHY CHOOSE */}

<section className="py-24 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <div className="text-center max-w-3xl mx-auto">

      <span className="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-4 py-2 text-sm font-semibold">
        Why Customers Trust Us
      </span>

      <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold text-gray-900">
        Why Choose Lappy Care?
      </h2>

      <p className="mt-6 text-lg text-gray-600 leading-8">
        We deliver professional laptop repair services using genuine parts,
        experienced technicians and transparent pricing with complete customer satisfaction.
      </p>

    </div>

    {/* Cards */}

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

      {[
        {
          icon: Wrench,
          title: "Experienced Technicians",
          desc: "Certified technicians with years of experience repairing all major laptop brands.",
        },
        {
          icon: ShieldCheck,
          title: "Genuine Parts",
          desc: "Only high-quality replacement parts for reliable and long-lasting repairs.",
        },
        {
          icon: IndianRupee,
          title: "Affordable Pricing",
          desc: "Transparent pricing with no hidden charges and free repair estimates.",
        },
        {
          icon: Clock3,
          title: "Fast Turnaround",
          desc: "Most repairs are completed on the same day whenever possible.",
        },
        {
          icon: Truck,
          title: "Pickup & Drop",
          desc: "Convenient doorstep pickup and delivery service across Pune & PCMC.",
        },
        {
          icon: BadgeCheck,
          title: "Repair Warranty",
          desc: "Warranty available on eligible repairs and replacement parts.",
        },
      ].map((item) => {

        const Icon = item.icon;

        return (

          <div
            key={item.title}
            className="group flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:-translate-y-2 hover:border-yellow-400 hover:shadow-2xl transition-all duration-300"
          >

            <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">

              <Icon
                size={32}
                className="text-yellow-600"
              />

            </div>

            <h3 className="mt-6 text-2xl font-bold text-gray-900">
              {item.title}
            </h3>

            <p className="mt-4 text-gray-600 leading-7 flex-grow">
              {item.desc}
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-green-700">

              <ShieldCheck size={18} />

              <span>Trusted by Thousands of Customers</span>

            </div>

          </div>

        );

      })}

    </div>

    {/* Bottom Statistics */}

    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">

      <div className="rounded-2xl bg-black text-white p-8 text-center">
        <h3 className="text-4xl font-bold text-yellow-400">5000+</h3>
        <p className="mt-2 text-gray-300">Repairs Completed</p>
      </div>

      <div className="rounded-2xl bg-black text-white p-8 text-center">
        <h3 className="text-4xl font-bold text-yellow-400">4.9★</h3>
        <p className="mt-2 text-gray-300">Google Rating</p>
      </div>

      <div className="rounded-2xl bg-black text-white p-8 text-center">
        <h3 className="text-4xl font-bold text-yellow-400">14+</h3>
        <p className="mt-2 text-gray-300">Years Experience</p>
      </div>

      <div className="rounded-2xl bg-black text-white p-8 text-center">
        <h3 className="text-4xl font-bold text-yellow-400">100%</h3>
        <p className="mt-2 text-gray-300">Customer Satisfaction</p>
      </div>

    </div>

  </div>

</section>

        {/* REPAIR PROCESS */}

<section className="py-24 bg-gradient-to-b from-gray-50 to-white">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <div className="text-center max-w-3xl mx-auto">

      <span className="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-4 py-2 text-sm font-semibold">
        Simple & Transparent Process
      </span>

      <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold text-gray-900">
        Our Laptop Repair Process
      </h2>

      <p className="mt-6 text-lg text-gray-600 leading-8">
        From booking your repair to final quality testing, every step is
        transparent and handled by experienced technicians.
      </p>

    </div>

    {/* Process */}

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

      {[
        {
          step: "01",
          icon: CalendarCheck,
          title: "Book Repair",
          desc: "Call us, WhatsApp or submit an online booking request.",
        },
        {
          step: "02",
          icon: SearchCheck,
          title: "Diagnosis",
          desc: "Our experts inspect your laptop and identify the exact issue.",
        },
        {
          step: "03",
          icon: Wrench,
          title: "Professional Repair",
          desc: "We repair your laptop using genuine parts after your approval.",
        },
        {
          step: "04",
          icon: CircleCheckBig,
          title: "Testing & Delivery",
          desc: "Final testing, quality check and safe delivery of your device.",
        },
      ].map((item) => {

        const Icon = item.icon;

        return (

          <div
            key={item.step}
            className="relative group bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-2xl hover:border-yellow-400 hover:-translate-y-2 transition-all duration-300"
          >

            {/* Step Number */}

            <div className="absolute -top-5 left-6 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold shadow-lg">
              {item.step}
            </div>

            {/* Icon */}

            <div className="mt-8 w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">

              <Icon
                size={32}
                className="text-yellow-600"
              />

            </div>

            {/* Title */}

            <h3 className="mt-6 text-2xl font-bold text-gray-900">
              {item.title}
            </h3>

            {/* Description */}

            <p className="mt-4 text-gray-600 leading-7">
              {item.desc}
            </p>

            {/* Bottom Badge */}

            <div className="mt-6 inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-2 text-sm font-medium">
              ✓ Professional Service
            </div>

          </div>

        );

      })}

    </div>

    {/* Bottom Trust Bar */}

    <div className="mt-20 rounded-3xl bg-black text-white p-10">

      <div className="grid md:grid-cols-3 gap-8 text-center">

        <div>
          <h3 className="text-4xl font-bold text-yellow-400">
            Same Day
          </h3>
          <p className="mt-2 text-gray-300">
            Fast Repair Available
          </p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-yellow-400">
            Genuine
          </h3>
          <p className="mt-2 text-gray-300">
            High Quality Parts
          </p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-yellow-400">
            Warranty
          </h3>
          <p className="mt-2 text-gray-300">
            On Eligible Repairs
          </p>
        </div>

      </div>

    </div>

  </div>

</section>


        {/* CUSTOMER REVIEWS */}

<section className="py-24 bg-gradient-to-b from-white to-gray-50">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <div className="text-center max-w-3xl mx-auto">

      <span className="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 px-4 py-2 text-sm font-semibold">
        Google Reviews
      </span>

      <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold text-gray-900">
        What Our Customers Say
      </h2>

      <p className="mt-6 text-lg text-gray-600 leading-8">
        Thousands of customers trust Lappy Care for professional laptop
        repair, genuine parts and excellent customer service.
      </p>

    </div>

    {/* Review Cards */}

    <div className="grid md:grid-cols-3 gap-8 mt-16">

      {[
        {
          name: "Rahul Patil",
          review:
            "Excellent service! My Dell laptop motherboard was repaired within a day. Highly recommended.",
        },
        {
          name: "Sneha Kulkarni",
          review:
            "Very professional team. SSD upgrade was completed quickly and my laptop is much faster now.",
        },
        {
          name: "Amit Shinde",
          review:
            "Affordable pricing, genuine parts and great customer support. Will definitely recommend Lappy Care.",
        },
      ].map((review) => (

        <div
          key={review.name}
          className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:-translate-y-2 hover:border-yellow-400 hover:shadow-2xl transition-all duration-300"
        >

          {/* Quote */}

          <Quote
            size={34}
            className="text-yellow-500"
          />

          {/* Stars */}

          <div className="flex gap-1 mt-5">

            {[1, 2, 3, 4, 5].map((star) => (

              <Star
                key={star}
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />

            ))}

          </div>

          {/* Review */}

          <p className="mt-6 text-gray-600 leading-7 italic">
            "{review.review}"
          </p>

          {/* Customer */}

          <div className="flex items-center gap-4 mt-8">

            <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">

              <CircleUserRound
                size={30}
                className="text-yellow-600"
              />

            </div>

            <div>

              <h4 className="font-bold text-gray-900">
                {review.name}
              </h4>

              <div className="flex items-center gap-2 text-sm text-green-700 mt-1">

                <BadgeCheck size={16} />

                <span>Verified Customer</span>

              </div>

            </div>

          </div>

        </div>

      ))}

    </div>

    {/* Bottom Trust Box */}

    <div className="mt-20 rounded-3xl bg-black text-white p-10">

      <div className="grid md:grid-cols-3 gap-8 text-center">

        <div>
          <h3 className="text-5xl font-bold text-yellow-400">
            4.9★
          </h3>

          <p className="mt-3 text-gray-300">
            Average Google Rating
          </p>
        </div>

        <div>
          <h3 className="text-5xl font-bold text-yellow-400">
            5000+
          </h3>

          <p className="mt-3 text-gray-300">
            Happy Customers
          </p>
        </div>

        <div>
          <h3 className="text-5xl font-bold text-yellow-400">
            98%
          </h3>

          <p className="mt-3 text-gray-300">
            Customer Satisfaction
          </p>
        </div>

      </div>

    </div>

  </div>

</section>

                {/* FAQ */}

<section className="py-24 bg-gradient-to-b from-gray-50 to-white">

  <div className="max-w-5xl mx-auto px-6">

    {/* Heading */}

    <div className="text-center max-w-3xl mx-auto">

      <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
        <HelpCircle size={16} />
        FAQs
      </span>

      <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold text-gray-900">
        Frequently Asked Questions
      </h2>

      <p className="mt-6 text-lg leading-8 text-gray-600">
        Find answers to the most common questions about our laptop
        repair services, warranty, turnaround time and pickup & drop.
      </p>

    </div>

    {/* FAQ List */}

    <div className="mt-16 space-y-5">

      {faqs.map((item) => (

        <details
          key={item.q}
          className="group rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-yellow-400 hover:shadow-lg"
        >

          <summary className="flex cursor-pointer list-none items-center justify-between p-6">

            <h3 className="text-lg font-semibold text-gray-900">
              {item.q}
            </h3>

            <Plus
              size={22}
              className="text-yellow-600 transition-transform duration-300 group-open:rotate-45"
            />

          </summary>

          <div className="border-t border-gray-100 px-6 pb-6 pt-4">

            <p className="leading-7 text-gray-600">
              {item.a}
            </p>

          </div>

        </details>

      ))}

    </div>

    {/* Bottom Box */}

    <div className="mt-16 rounded-3xl bg-black p-10 text-center text-white">

      <h3 className="text-3xl font-bold">
        Still Have Questions?
      </h3>

      <p className="mt-4 text-gray-300">
        Our experts are ready to help you choose the right repair solution.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">

        <TrackCallButton
          className="rounded-xl bg-yellow-400 px-8 py-4 font-bold text-black transition hover:bg-yellow-300"
        />

        <TrackWhatsappButton
          className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-500"
        />

      </div>

    </div>

  </div>

</section>

        {/* RELATED SERVICES */}

<section className="py-24 bg-black text-white">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <div className="text-center max-w-3xl mx-auto">

      <span className="inline-flex items-center rounded-full bg-yellow-400 text-black px-4 py-2 text-sm font-semibold">
        Explore More Services
      </span>

      <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold">
        Related Laptop Repair Services
      </h2>

      <p className="mt-6 text-lg text-gray-300 leading-8">
        Explore our specialized laptop repair and upgrade services for
        better performance, reliability and longer device life.
      </p>

    </div>

    {/* Cards */}

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

      {[
        {
          title: "SSD Upgrade",
          href: "/ssd-upgrade-pune",
          icon: HardDrive,
          desc: "Boost your laptop speed with high-performance SSD upgrades.",
        },
        {
          title: "RAM Upgrade",
          href: "/ram-upgrade-pune",
          icon: MemoryStick,
          desc: "Increase memory for faster multitasking and performance.",
        },
        {
          title: "Motherboard Repair",
          href: "/motherboard-repair-pune",
          icon: Cpu,
          desc: "Professional chip-level motherboard repair services.",
        },
        {
          title: "Screen Replacement",
          href: "/laptop-screen-replacement-pune",
          icon: Monitor,
          desc: "Replace cracked or damaged laptop screens with quality panels.",
        },
        {
          title: "Data Recovery",
          href: "/data-recovery-pune",
          icon: Database,
          desc: "Recover important files from damaged or corrupted storage devices.",
        },
        {
          title: "Refurbished Laptops",
          href: "/refurbished-laptops-pune",
          icon: Laptop,
          desc: "Certified refurbished laptops with warranty at affordable prices.",
        },
      ].map((service) => {

        const Icon = service.icon;

        return (

          <Link
            key={service.title}
            href={service.href}
            className="group rounded-3xl border border-zinc-700 bg-zinc-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-2xl"
          >

            <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">

              <Icon
                size={32}
                className="text-yellow-600"
              />

            </div>

            <h3 className="mt-6 text-2xl font-bold">
              {service.title}
            </h3>

            <p className="mt-4 text-gray-400 leading-7">
              {service.desc}
            </p>

            <div className="mt-8 inline-flex items-center gap-2 font-semibold text-yellow-400">

              Learn More

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />

            </div>

          </Link>

        );

      })}

    </div>

    {/* Bottom CTA */}

    <div className="mt-20 rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-500 p-10 text-center">

      <h3 className="text-3xl font-bold text-black">
        Can't Find the Service You're Looking For?
      </h3>

      <p className="mt-4 text-black/80 max-w-2xl mx-auto">
        Contact our experts today. We repair almost every laptop issue,
        from minor upgrades to advanced chip-level motherboard repairs.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">

        <TrackCallButton
          className="rounded-xl bg-black px-8 py-4 font-bold text-white transition hover:bg-zinc-900"
        />

        <TrackWhatsappButton
          className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-500"
        />

      </div>

    </div>

  </div>

</section>

        {/* LOCATIONS */}

<section className="py-24 bg-gradient-to-b from-white to-gray-50">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <div className="max-w-3xl mx-auto text-center">

      <span className="inline-flex items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
        Service Locations
      </span>

      <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold text-gray-900">
        Laptop Repair Near You in Pune
      </h2>

      <p className="mt-6 text-lg leading-8 text-gray-600">
        Lappy Care provides professional laptop repair services across
        Wakad, Hinjawadi, Baner, Balewadi, Punawale, Ravet and nearby
        areas. We also offer pickup & drop service for eligible locations.
      </p>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

      {[
        {
          name: "Laptop Repair Wakad",
          href: "/laptop-repair-wakad",
          desc: "Motherboard repair, screen replacement, SSD & RAM upgrades, battery replacement and data recovery in Wakad.",
        },
        {
          name: "Laptop Repair Hinjawadi",
          href: "/laptop-repair-hinjawadi",
          desc: "Professional laptop repair for IT professionals and businesses in Hinjawadi Phase 1, 2 & 3.",
        },
        {
          name: "Laptop Repair Baner",
          href: "/laptop-repair-baner",
          desc: "Same-day laptop repair, SSD upgrades and genuine spare parts in Baner.",
        },
        {
          name: "Laptop Repair Balewadi",
          href: "/laptop-repair-balewadi",
          desc: "Reliable laptop servicing and chip-level motherboard repair in Balewadi.",
        },
        {
          name: "Laptop Repair Punawale",
          href: "/laptop-repair-punawale",
          desc: "Laptop servicing, keyboard replacement and pickup & drop service in Punawale.",
        },
        {
          name: "Laptop Repair Ravet",
          href: "/laptop-repair-ravet",
          desc: "Affordable laptop repair with warranty and genuine spare parts in Ravet.",
        },
      ].map((location) => (

        <Link
          key={location.name}
          href={location.href}
          className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl"
        >

          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-100">

            <MapPin
              size={30}
              className="text-yellow-600"
            />

          </div>

          <h3 className="mt-6 text-2xl font-bold text-gray-900">
            {location.name}
          </h3>

          <p className="mt-4 text-gray-600 leading-7">
            {location.desc}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 font-semibold text-yellow-600">

            Explore Location

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />

          </div>

        </Link>

      ))}

    </div>

    {/* SEO Content */}

    <div className="mt-20 rounded-3xl bg-black p-10 text-white">

      <h3 className="text-3xl font-bold">
        Looking for Laptop Repair Near Me?
      </h3>

      <p className="mt-6 text-gray-300 leading-8">
        If you're searching for <strong>laptop repair near me</strong>,
        <strong> laptop service center near me</strong>,
        <strong> motherboard repair in Pune</strong>,
        <strong> laptop screen replacement</strong>,
        <strong> SSD upgrade</strong>,
        <strong> RAM upgrade</strong> or
        <strong> data recovery services</strong>,
        Lappy Care is one of the trusted laptop repair centres serving
        Wakad, Hinjawadi, Baner, Balewadi, Punawale, Ravet and nearby
        locations with experienced technicians and genuine spare parts.
      </p>

    </div>

  </div>

</section>
        {/* FINAL CTA */}

<section className="py-24 bg-gradient-to-r from-black via-zinc-900 to-black text-white overflow-hidden relative">

  {/* Background Glow */}

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_45%)]" />

  <div className="relative max-w-6xl mx-auto px-6">

    <div className="rounded-[32px] border border-yellow-400/30 bg-white/5 backdrop-blur-sm p-10 lg:p-16">

      {/* Badge */}

      <div className="flex justify-center">

        <span className="inline-flex items-center rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-black">
          Lappy Care • Pune
        </span>

      </div>

      {/* Heading */}

      <h2 className="mt-8 text-center text-4xl lg:text-6xl font-extrabold leading-tight">

        Need Professional
        <span className="block text-yellow-400">
          Laptop Repair?
        </span>

      </h2>

      <p className="mt-8 max-w-3xl mx-auto text-center text-lg leading-8 text-gray-300">

        Whether it's a broken screen, motherboard issue,
        SSD upgrade, RAM upgrade, battery replacement or
        data recovery, our certified technicians are ready
        to help.

      </p>

      {/* Trust Points */}

      <div className="mt-12 grid md:grid-cols-3 gap-6">

        <div className="flex items-center justify-center gap-3 rounded-2xl bg-white/10 p-5">

          <Clock3 className="text-yellow-400" />

          <span>Fast Turnaround</span>

        </div>

        <div className="flex items-center justify-center gap-3 rounded-2xl bg-white/10 p-5">

          <ShieldCheck className="text-yellow-400" />

          <span>Warranty Available</span>

        </div>

        <div className="flex items-center justify-center gap-3 rounded-2xl bg-white/10 p-5">

          <BadgeCheck className="text-yellow-400" />

          <span>Genuine Parts</span>

        </div>

      </div>

     {/* CTA Buttons */}

<div className="mt-14 flex flex-wrap justify-center gap-5">

  <TrackCallButton
    className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 transition"
  />

  <TrackWhatsappButton
    className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-500 transition"
  />

  <TrackBookRepairButton
    className="border border-white px-8 py-4 rounded-xl font-bold text-white hover:bg-white hover:text-black transition"
  />

</div>

      {/* Bottom Stats */}

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

        <div>

          <h3 className="text-4xl font-bold text-yellow-400">
            5000+
          </h3>

          <p className="mt-2 text-gray-400">
            Repairs Completed
          </p>

        </div>

        <div>

          <h3 className="text-4xl font-bold text-yellow-400">
            4.7★
          </h3>

          <p className="mt-2 text-gray-400">
            Google Rating
          </p>

        </div>

        <div>

          <h3 className="text-4xl font-bold text-yellow-400">
            14+
          </h3>

          <p className="mt-2 text-gray-400">
            Years Experience
          </p>

        </div>

        <div>

          <h3 className="text-4xl font-bold text-yellow-400">
            Same Day
          </h3>

          <p className="mt-2 text-gray-400">
            Available for Many Repairs
          </p>
          

        </div>

      </div>

    </div>

  </div>

</section>
<p className="mt-12 text-center text-sm leading-7 text-gray-400 max-w-4xl mx-auto">
  Lappy Care provides laptop repair services in Wakad, Hinjawadi, Baner,
  Balewadi, Punawale, Ravet and nearby Pune areas. Contact us for motherboard
  repair, laptop screen replacement, SSD upgrades, RAM upgrades, battery
  replacement, keyboard repair, data recovery and refurbished laptops.
</p>
      </main>
    </>
  );
}