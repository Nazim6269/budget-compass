import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Monthly",
    price: "$3.99",
    period: "/month",
    description: "Perfect for getting started with smart budgeting.",
    features: [
      "Unlimited Safe to Spend calculations",
      "Bills, goals & debt tracking",
      "Real-time recalculation",
      "Spending insights & charts",
      "Bill reminder notifications",
      "One Official Memorial Notice",
      "Charity Integration",
      "Verified Professional Seal",
      "Stripe Secure Processing",
    ],
    cta: "Start Monthly Plan",
    highlighted: false,
  },
  {
    name: "Yearly",
    price: "$39.99",
    period: "/year",
    description: "Save over 15% — the best value for serious budgeters.",
    badge: "Best Value",
    features: [
      "Everything in Monthly",
      "Priority support",
      "Advanced analytics",
      "Export reports",
      "Multi-device sync",
      "One Official Memorial Notice",
      "Charity Integration",
      "Verified Professional Seal",
      "Stripe Secure Processing",
    ],
    cta: "Start Yearly Plan",
    highlighted: true,
  },
];

export default function PricingPage() {
  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-textPrimary tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-grayBlack2 max-w-md mx-auto">
            No hidden fees. Cancel anytime. Start free and upgrade when you&apos;re ready.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-textPrimary bg-primaryBg shadow-lg"
                  : "border-border bg-background"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-textPrimary px-4 py-1 text-xs font-medium text-white">
                  {plan.badge}
                </div>
              )}

              <h3 className="text-lg font-semibold text-textPrimary">
                {plan.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-textPrimary">
                  {plan.price}
                </span>
                <span className="text-sm text-grayBlack2">{plan.period}</span>
              </div>

              <p className="mt-2 text-sm text-grayBlack2">{plan.description}</p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-textPrimary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  href="/login"
                  className={`block w-full rounded-lg py-2.5 text-center text-sm font-medium transition-colors ${
                    plan.highlighted
                      ? "bg-textPrimary text-white hover:bg-textSecondary"
                      : "border border-border text-textPrimary hover:bg-primaryBg"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ note */}
        <p className="mt-10 text-center text-sm text-grayBlack2">
          Questions?{" "}
          <Link href="/contact" className="underline hover:text-textPrimary transition-colors">
            Contact us
          </Link>{" "}
          and we&apos;ll help you pick the right plan.
        </p>
      </div>
    </section>
  );
}
