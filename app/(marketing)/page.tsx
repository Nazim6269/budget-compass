import Link from "next/link";
import {
  Shield,
  TrendingUp,
  Bell,
  BarChart3,
  Wallet,
  Target,
  Zap,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Safe to Spend",
    description:
      "Know exactly how much you can safely spend after bills, goals, and debt are accounted for.",
  },
  {
    icon: Target,
    title: "Goals & Debt Tracking",
    description:
      "Set savings goals and track debt payoff progress — all in one place.",
  },
  {
    icon: Bell,
    title: "Bill Reminders",
    description:
      "Never miss a payment. Get real-time alerts before bills are due.",
  },
  {
    icon: BarChart3,
    title: "Spending Insights",
    description:
      "Visual charts and reports show where your money goes each month.",
  },
  {
    icon: Zap,
    title: "Real-time Recalculation",
    description:
      "Your Safe to Spend updates instantly as transactions come in.",
  },
  {
    icon: Lock,
    title: "Bank-level Security",
    description:
      "Your data is encrypted and never shared. Security is our top priority.",
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "$2M+", label: "Tracked Monthly" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9", label: "App Rating" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background px-4 sm:px-6 py-20 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-primaryBg blur-3xl opacity-60" />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-primaryBg px-4 py-1.5 text-xs font-medium text-textSecondary">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
            Now available on iOS &amp; Android
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-textPrimary leading-[1.1]">
            Know Your
            <br />
            <span className="text-textSecondary">Safe to Spend</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-grayBlack2 leading-relaxed max-w-xl mx-auto">
            Smart budgeting that tells you exactly what you can spend today —
            after bills, goals, and debt are covered.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="rounded-lg bg-textPrimary px-6 py-3 text-sm font-medium text-white hover:bg-textSecondary transition-colors w-full sm:w-auto text-center"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-textPrimary hover:bg-primaryBg transition-colors w-full sm:w-auto text-center"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────── */}
      <section id="features" className="bg-primaryBg px-4 sm:px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary tracking-tight">
              Everything you need to budget smarter
            </h2>
            <p className="mt-3 text-grayBlack2 text-lg max-w-lg mx-auto">
              Tools designed to give you clarity and control over your finances.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-background p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primaryBg border border-border">
                  <feature.icon className="h-5 w-5 text-textSecondary" />
                </div>
                <h3 className="text-base font-semibold text-textPrimary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-grayBlack2 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <section className="bg-background px-4 sm:px-6 py-16">
        <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-bold text-textPrimary">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-grayBlack2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────── */}
      <section className="bg-primaryBg px-4 sm:px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary tracking-tight text-center mb-12">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Connect your accounts",
                desc: "Link your bank accounts and income sources in seconds.",
              },
              {
                step: "2",
                title: "Set your goals",
                desc: "Add bills, savings goals, and debt payoff targets.",
              },
              {
                step: "3",
                title: "Spend with confidence",
                desc: "See your Safe to Spend in real time — no guesswork needed.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-textPrimary text-white text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="text-base font-semibold text-textPrimary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-grayBlack2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-background px-4 sm:px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary tracking-tight">
            Start spending smarter today
          </h2>
          <p className="mt-4 text-grayBlack2 text-lg max-w-md mx-auto">
            Join thousands of people who know exactly what they can spend.
            Free to start.
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-block rounded-lg bg-textPrimary px-8 py-3 text-sm font-medium text-white hover:bg-textSecondary transition-colors"
            >
              Get Started — It&apos;s Free
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
