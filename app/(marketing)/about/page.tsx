import { Shield, Heart, Users } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Trust & Security",
    description:
      "Your financial data is encrypted, never sold, and protected with bank-level security protocols.",
  },
  {
    icon: Heart,
    title: "User-First Design",
    description:
      "Every feature is built around one question: does this make budgeting easier for our users?",
  },
  {
    icon: Users,
    title: "Financial Inclusion",
    description:
      "We believe everyone deserves to understand their finances — not just the wealthy.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-textPrimary tracking-tight">
            Built to remove the guesswork
            <br />
            from your money
          </h1>
          <p className="mt-6 text-lg text-grayBlack2 leading-relaxed max-w-xl mx-auto">
            BudgetCompass was created because managing money shouldn&apos;t feel
            like a second job. We built a simple, powerful tool that tells you
            exactly what you can safely spend — so you can focus on living.
          </p>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-16 bg-background">
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-textPrimary tracking-tight">
              Our Mission
            </h2>
            <p className="mt-4 text-grayBlack2 leading-relaxed">
              We&apos;re on a mission to make financial clarity accessible to
              everyone. Traditional budgeting apps overwhelm you with
              spreadsheets and categories. We took a different approach.
            </p>
            <p className="mt-4 text-grayBlack2 leading-relaxed">
              BudgetCompass distills your entire financial picture into one
              number: your <strong className="text-textPrimary">Safe to
              Spend</strong>. It updates in real time as bills, goals, and
              debts change — giving you instant clarity on what you can
              actually spend today.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-8">
            <div className="space-y-6">
              {[
                { label: "Bills tracked", value: "$12,400/mo" },
                { label: "Goals funded", value: "$8,200" },
                { label: "Debt paid off", value: "$34,000" },
                { label: "Users confident", value: "98%" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-grayBlack2">{item.label}</span>
                  <span className="text-sm font-semibold text-textPrimary">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-textPrimary tracking-tight text-center mb-12">
            What we stand for
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-background p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-border">
                  <value.icon className="h-5 w-5 text-textSecondary" />
                </div>
                <h3 className="text-base font-semibold text-textPrimary mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-grayBlack2 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
