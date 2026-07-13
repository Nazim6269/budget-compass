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
  Smartphone,
  CreditCard,
  PiggyBank,
  ArrowRight,
} from "lucide-react";
import BackgroundCarousel from "@/widgets/marketing/ui/BackgroundCarousel";

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
      <section className="relative min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden bg-black pt-20">
        {/* Carousel as background */}
        <div className="absolute inset-0 z-0">
          <BackgroundCarousel />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 z-10 bg-black/40" />

        <div className="relative z-20 mx-auto max-w-3xl text-center px-4 sm:px-6 py-20 sm:py-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Now available on iOS &amp; Android
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Know Your
            <br />
            <span className="text-white/80">Safe to Spend</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl mx-auto">
            Smart budgeting that tells you exactly what you can spend today —
            after bills, goals, and debt are covered.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-textPrimary hover:bg-white/90 transition-colors w-full sm:w-auto text-center"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-white hover:bg-white/20 transition-colors w-full sm:w-auto text-center"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────── */}
      <section id="features" className="bg-background px-4 sm:px-6 py-20 sm:py-28">
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
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-border">
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

      {/* ── Mobile App ──────────────────────────────────────────────── */}
      <section className="bg-background px-4 sm:px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-textSecondary">
                <Smartphone className="h-3.5 w-3.5" />
                Mobile App
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary tracking-tight">
                Your budget,
                <br />
                in your pocket
              </h2>
              <p className="mt-4 text-grayBlack2 text-lg leading-relaxed">
                Manage your finances on the go. The BudgetCompass mobile app
                gives you real-time access to your Safe to Spend, bill
                reminders, and spending insights — anywhere, anytime.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: CreditCard,
                    title: "Track spending in real time",
                    desc: "See transactions as they happen and watch your Safe to Spend update instantly.",
                  },
                  {
                    icon: PiggyBank,
                    title: "Reach your savings goals",
                    desc: "Set targets, track progress, and get notified when you're ahead of schedule.",
                  },
                  {
                    icon: Bell,
                    title: "Smart bill reminders",
                    desc: "Never miss a payment with customizable alerts before each due date.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-white">
                      <item.icon className="h-4 w-4 text-textSecondary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-textPrimary">
                        {item.title}
                      </p>
                      <p className="text-sm text-grayBlack2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-textPrimary px-5 py-2.5 text-sm font-medium text-white hover:bg-textSecondary transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  App Store
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-textPrimary hover:bg-white transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.72c.73.47 1.63.28 2.16-.17l8.14-6.96L4.5 8.16c-.53-.54-.53-1.43 0-1.97l.54-.54 8.98 8.98 8.98-8.98c.54-.54 1.43-.54 1.97 0l.54.54-8.98 8.98 8.14 6.96c.54.46.73 1.24.38 1.9-.35.66-1.07.98-1.79.74L12 16.5l-11.03 7.96c-.72.24-1.44-.08-1.79-.74z" />
                  </svg>
                  Google Play
                </Link>
              </div>
            </div>

            {/* Right - Phone mockup */}
            <div className="flex justify-center">
              <div className="relative w-[260px] h-[520px] rounded-[3rem] border-[6px] border-grayBlack50 bg-white shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-grayBlack50 rounded-b-2xl z-10" />
                {/* Screen content */}
                <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-white to-primaryBg px-6 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-textPrimary text-white">
                    <span className="text-lg font-bold">BC</span>
                  </div>
                  <p className="text-xs font-medium text-textSecondary mb-1">Safe to Spend</p>
                  <p className="text-3xl font-bold text-textPrimary">$1,240</p>
                  <div className="mt-6 w-full space-y-2">
                    {[
                      { label: "Bills", amount: "$890", pct: 72 },
                      { label: "Goals", amount: "$320", pct: 26 },
                      { label: "Debt", amount: "$180", pct: 14 },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-xs">
                        <span className="text-grayBlack2">{item.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-textPrimary">{item.amount}</span>
                          <div className="w-16 h-1.5 rounded-full bg-grayBlack50 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-textSecondary"
                              style={{ width: `${item.pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────── */}
      <section className="bg-background px-4 sm:px-6 py-20 sm:py-28">
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
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white text-textPrimary text-lg font-bold">
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
