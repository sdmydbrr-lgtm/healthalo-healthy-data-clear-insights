import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/healthalo-logo.svg";
import { Activity, Heart, Sparkles, Eye, EyeOff, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "HealtHalo — Healthy data. Clear insights." },
      { name: "description", content: "Sign in to HealtHalo, your wellness dashboard for healthy data and clear insights." },
    ],
  }),
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPwd, setShowPwd] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient mesh background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ backgroundImage: "var(--gradient-mesh)" }}
      />
      <div
        aria-hidden
        className="absolute -top-40 -right-40 -z-10 h-[500px] w-[500px] rounded-full blur-3xl opacity-60"
        style={{ background: "var(--gradient-primary)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 -z-10 h-[500px] w-[500px] rounded-full blur-3xl opacity-40"
        style={{ background: "linear-gradient(135deg, oklch(0.82 0.14 165), oklch(0.85 0.12 200))" }}
      />

      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-2 lg:px-12 lg:py-12">
        {/* Left: brand panel */}
        <section className="hidden flex-col justify-between rounded-[2rem] p-10 lg:flex"
          style={{
            background: "linear-gradient(160deg, oklch(1 0 0 / 0.7), oklch(0.97 0.03 60 / 0.5))",
            backdropFilter: "blur(24px)",
            border: "1px solid var(--glass-border)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <header className="flex items-center gap-4">
            <img src={logo} alt="HealtHalo" className="h-20 w-20 drop-shadow-md" />
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">HealtHalo</h1>
              <p className="text-sm text-muted-foreground">Healthy data. Clear insights.</p>
            </div>
          </header>

          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <Sparkles className="h-3 w-3" /> Wellness, beautifully measured
              </span>
              <h2 className="text-5xl font-semibold leading-[1.05] tracking-tight text-foreground">
                Your body's signal,<br/>
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>in perfect clarity.</span>
              </h2>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                Sync your wearables, scales, and sleep data into one calm dashboard. We turn raw numbers into the insights that actually move the needle.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-md">
              <FeatureChip icon={<Heart className="h-4 w-4" />} label="Heart & HRV" sub="Live tracking" />
              <FeatureChip icon={<Activity className="h-4 w-4" />} label="Body comp." sub="Lean & BMR" />
            </div>
          </div>

          <footer className="flex items-center justify-between text-xs text-muted-foreground">
            <span>© 2026 HealtHalo</span>
            <span>Trusted by 40k+ wellness obsessives</span>
          </footer>
        </section>

        {/* Right: auth card */}
        <section className="flex flex-col items-center justify-center">
          <div
            className="w-full max-w-md rounded-[2rem] p-8 sm:p-10"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(28px)",
              border: "1px solid var(--glass-border)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <div className="mb-8 flex flex-col items-center gap-3 text-center lg:hidden">
              <img src={logo} alt="HealtHalo" className="h-20 w-20 drop-shadow-md" />
              <div>
                <p className="text-xl font-semibold text-foreground">HealtHalo</p>
                <p className="text-xs text-muted-foreground">Healthy data. Clear insights.</p>
              </div>
            </div>

            <h3 className="text-3xl font-semibold tracking-tight text-foreground">
              {mode === "signin" ? "Welcome back" : "Create your halo"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {mode === "signin"
                ? "Sign in to continue your wellness journey."
                : "Start tracking the signals that matter most."}
            </p>

            {/* Tab toggle */}
            <div className="mt-6 grid grid-cols-2 gap-1 rounded-full bg-muted p-1">
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    mode === m
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m === "signin" ? "Sign in" : "Sign up"}
                </button>
              ))}
            </div>

            <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              {mode === "signup" && (
                <Field label="Full name">
                  <input type="text" placeholder="Sudhamoy Debbarma" className={inputCls} />
                </Field>
              )}
              <Field label="Email">
                <input type="email" placeholder="you@healthalo.app" className={inputCls} />
              </Field>
              <Field label="Password">
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    placeholder="••••••••"
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPwd ? "Hide password" : "Show password"}
                  >
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </Field>

              {mode === "signin" && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <input type="checkbox" className="h-4 w-4 rounded border-border accent-primary" />
                    Remember me
                  </label>
                  <a href="#" className="font-medium text-primary hover:underline">Forgot?</a>
                </div>
              )}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-soft)" }}
              >
                {mode === "signin" ? "Sign in" : "Create account"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center"><span className="bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground" style={{ background: "transparent" }}>or</span></div>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card"
              >
                <GoogleIcon />
                Continue with Google
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing you agree to our{" "}
              <a href="#" className="text-foreground underline-offset-2 hover:underline">Terms</a> &{" "}
              <a href="#" className="text-foreground underline-offset-2 hover:underline">Privacy</a>.
            </p>
          </div>

          <Link to="/" className="mt-6 text-xs text-muted-foreground hover:text-foreground">
            ← Back to HealtHalo
          </Link>
        </section>
      </div>
    </main>
  );
}

const inputCls =
  "w-full rounded-2xl border border-border bg-card/70 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function FeatureChip({ icon, label, sub }: { icon: React.ReactNode; label: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm">
      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12s4.3 9.5 9.5 9.5c5.5 0 9.1-3.9 9.1-9.3 0-.6-.1-1.1-.2-1.6H12z"/>
    </svg>
  );
}
