"use client";

import { useState } from "react";
import { Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate submission
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
    setSubmitting(false);
  };

  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-textPrimary tracking-tight">
            Get in touch
          </h1>
          <p className="mt-4 text-lg text-grayBlack2 max-w-md mx-auto">
            Have a question, suggestion, or just want to say hello? We&apos;d love
            to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            {[
              {
                icon: Mail,
                label: "Email",
                value: "support@budgetcompass.com",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Remote-first, Worldwide",
              },
              {
                icon: Clock,
                label: "Response time",
                value: "Within 24 hours",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primaryBg border border-border">
                  <item.icon className="h-4 w-4 text-textSecondary" />
                </div>
                <div>
                  <p className="text-xs text-grayBlack2">{item.label}</p>
                  <p className="text-sm font-medium text-textPrimary">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-background p-6 sm:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-textPrimary">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-border bg-primaryBg px-3 py-2.5 text-sm text-textPrimary placeholder:text-grayBlack2 focus:outline-none focus:ring-2 focus:ring-textPrimary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-textPrimary">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-border bg-primaryBg px-3 py-2.5 text-sm text-textPrimary placeholder:text-grayBlack2 focus:outline-none focus:ring-2 focus:ring-textPrimary/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-textPrimary">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help?"
                className="w-full rounded-lg border border-border bg-primaryBg px-3 py-2.5 text-sm text-textPrimary placeholder:text-grayBlack2 focus:outline-none focus:ring-2 focus:ring-textPrimary/20 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-textPrimary px-6 py-2.5 text-sm font-medium text-white hover:bg-textSecondary transition-colors disabled:opacity-60 cursor-pointer"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
