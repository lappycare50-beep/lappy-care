"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/#hero" },
    { name: "Services", href: "/#services" },
    { name: "Laptops", href: "/#products" },
    { name: "Booking", href: "/#booking" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-yellow-500/20 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Lappy Care"
            width={55}
            height={55}
            priority
          />

          <div>
            <h1 className="text-2xl font-bold text-white">
              Lappy<span className="text-yellow-400">Care</span>
            </h1>

            <p className="text-xs text-gray-400">
              Laptop Repair & Refurbished Store
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              scroll={true}
              className="font-medium text-gray-300 transition hover:text-yellow-400"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+919595057006"
            className="rounded-xl border border-yellow-400 p-3 text-white transition hover:bg-yellow-400 hover:text-black"
          >
            <Phone size={20} />
          </a>

          <a
            href="https://wa.me/919595057006"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:scale-105"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white lg:hidden"
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-yellow-500/20 bg-[#111111] lg:hidden">
          <div className="flex flex-col gap-4 p-6">

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                scroll={true}
                onClick={() => setMenuOpen(false)}
                className="text-lg text-white transition hover:text-yellow-400"
              >
                {item.name}
              </Link>
            ))}

            <a
              href="tel:+919595057006"
              className="mt-4 rounded-xl border border-yellow-400 py-3 text-center font-semibold text-white transition hover:bg-yellow-400 hover:text-black"
            >
              📞 Call Now
            </a>

            <a
              href="https://wa.me/919595057006"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-yellow-400 py-3 text-center font-bold text-black transition hover:opacity-90"
            >
              💬 WhatsApp
            </a>

          </div>
        </div>
      )}
    </header>
  );
}