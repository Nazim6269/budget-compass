export function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
  ];

  const strength = checks.filter((c) => c.pass).length;

  const colors = ["bg-red-500", "bg-violet-500", "bg-emerald-500"];
  const labels = ["Weak", "Fair", "Strong"];

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${
              i < strength ? colors[strength - 1] : "bg-white/10"
            }`}
          />
        ))}

        <span
          className={`ml-1 text-xs font-medium ${
            strength === 3
              ? "text-emerald-400"
              : strength === 2
              ? "text-violet-300"
              : "text-red-400"
          }`}
        >
          {labels[strength - 1] ?? ""}
        </span>
      </div>

      <div className="flex gap-4">
        {checks.map((c) => (
          <span
            key={c.label}
            className={`text-xs ${c.pass ? "text-emerald-400" : "text-zinc-600"}`}
          >
            {c.pass ? "✓" : "·"} {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}