import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-500/20">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Lappy<span className="text-yellow-400">Care</span>
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              Professional Laptop Repair, Refurbished Laptop Sales,
              SSD Upgrade, Data Recovery and Laptop Accessories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xl font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-yellow-400">
                  Home
                </Link>
              </li>

              <li>
                <a href="#services" className="text-gray-400 hover:text-yellow-400">
                  Services
                </a>
              </li>

              <li>
                <a href="#products" className="text-gray-400 hover:text-yellow-400">
                  Refurbished Laptops
                </a>
              </li>

              <li>
                <a href="#booking" className="text-gray-400 hover:text-yellow-400">
                  Book Repair
                </a>
              </li>

              <li>
                <a href="#contact" className="text-gray-400 hover:text-yellow-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-xl font-semibold text-white">
              Our Services
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Laptop Repair</li>
              <li>Screen Replacement</li>
              <li>SSD Upgrade</li>
              <li>RAM Upgrade</li>
              <li>Data Recovery</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xl font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="text-yellow-400" />
                <span>+91 95950 57006</span>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="text-yellow-400" />
                <span>info@lappycare.in</span>
              </div>

              <div className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="mt-1 text-yellow-400" />
                <span>
                  Janoba Chowk,<br />
                  Datta Mandir Road,<br />
                  Wakad, Pune - 411057
                </span>
              </div>

              <div className="flex gap-4 pt-4">

                <a
                  href="https://wa.me/919595057006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-yellow-400 p-3 text-black transition hover:scale-110"
                >
                  <MessageCircle size={20} />
                </a>

                

              </div>

            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-yellow-500/20 pt-6 text-center text-gray-500">
          © {new Date().getFullYear()} Lappy Care. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}