"use client";

import { useState } from "react";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";

import {
  addContactMessage,
} from "@/services/contactService";

const defaultForm = {
  name: "",
  email: "",
  mobile: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(defaultForm);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSuccess("");

    setError("");

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!form.mobile.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    if (!form.message.trim()) {
      setError("Please enter your message.");
      return;
    }

    try {
      setLoading(true);

      await addContactMessage({
        name: form.name,
        mobile: form.mobile,
        email: form.email,
        subject: form.subject,
        message: form.message,

        status: "New",

        source: "Website",

        assignedTo: "",

        remarks: "",

        timeline: [
          {
            status: "New",
            date: new Date().toISOString(),
            updatedBy: "Website",
          },
        ],
      });

      setSuccess(
        "Thank you! Your message has been sent successfully."
      );

      setForm(defaultForm);
    } catch (error) {
      console.error(error);

      setError(
        "Failed to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="bg-[#111111] py-20">
  <div className="mx-auto max-w-7xl px-6">

    {/* Heading */}

    <div className="mb-14 text-center">
      <p className="font-semibold uppercase tracking-[0.2em] text-yellow-400">
        Contact Us
      </p>

      <h2 className="mt-3 text-4xl font-bold text-white">
        Get In Touch
      </h2>

      <p className="mt-4 text-gray-400">
        We're here to help with laptop repair and refurbished laptops.
      </p>
    </div>

    <div className="grid gap-10 lg:grid-cols-2">

      {/* Left Side */}

      <div className="space-y-6">

        <div className="flex items-start gap-4 rounded-2xl border border-yellow-500/20 bg-black p-6">
          <Phone className="text-yellow-400" />

          <div>
            <h3 className="font-semibold text-white">
              Call Us
            </h3>

            <p className="text-gray-400">
              +91 95950 57006
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl border border-yellow-500/20 bg-black p-6">
          <MessageCircle className="text-yellow-400" />

          <div>
            <h3 className="font-semibold text-white">
              WhatsApp
            </h3>

            <a
              href="https://wa.me/919595057006"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:underline"
            >
              Chat Now
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl border border-yellow-500/20 bg-black p-6">
          <Mail className="text-yellow-400" />

          <div>
            <h3 className="font-semibold text-white">
              Email
            </h3>

            <p className="text-gray-400">
              info@lappycare.in
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl border border-yellow-500/20 bg-black p-6">
          <MapPin className="text-yellow-400" />

          <div>
            <h3 className="font-semibold text-white">
              Address
            </h3>

            <p className="text-gray-400">
              Lappy Care,
              <br />
              Wakad, Pune, Maharashtra
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl border border-yellow-500/20 bg-black p-6">
          <Clock className="text-yellow-400" />

          <div>
            <h3 className="font-semibold text-white">
              Working Hours
            </h3>

            <p className="text-gray-400">
              Mon - Sat : 10:00 AM - 8:00 PM
            </p>
          </div>
        </div>

      </div>

      {/* Right Side */}

      <div className="rounded-2xl border border-yellow-500/20 bg-black p-8">

        <h3 className="mb-6 text-2xl font-bold text-white">
          Send a Message
        </h3>

        {success && (
          <div className="mb-4 rounded-xl border border-green-600 bg-green-900/20 p-4 text-green-300">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-xl border border-red-600 bg-red-900/20 p-4 text-red-300">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
                    <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full rounded-xl border border-gray-700 bg-[#111] p-4 text-white outline-none focus:border-yellow-400"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full rounded-xl border border-gray-700 bg-[#111] p-4 text-white outline-none focus:border-yellow-400"
          />

          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full rounded-xl border border-gray-700 bg-[#111] p-4 text-white outline-none focus:border-yellow-400"
          />

          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full rounded-xl border border-gray-700 bg-[#111] p-4 text-white outline-none focus:border-yellow-400"
          />

          <textarea
            rows={5}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message..."
            className="w-full rounded-xl border border-gray-700 bg-[#111] p-4 text-white outline-none focus:border-yellow-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-yellow-400 py-4 font-bold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>

      </div>

    </div>

  </div>

</section>
  );
}