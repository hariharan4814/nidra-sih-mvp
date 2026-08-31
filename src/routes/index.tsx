import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowDown,
  Brain,
  CalendarClock,
  ChevronDown,
  Compass,
  LineChart,
  Menu,
  MoonStar,
  Shield,
  ShieldCheck,
  Sparkles,
  Waves,
  X,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Btn, Card, Reveal, Stars, Wordmark } from "@/components/nidra/atoms";
import { Ambient } from "@/components/nidra/ambient";
import { barriers, trendData } from "@/lib/nidra-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "NIDRA — Calm the mind. Reclaim your sleep." },
      {
        name: "description",
        content:
          "NIDRA is a digital wellness platform for people whose worry and overthinking make sleep hard. Non-prescription, guided self-management.",
      },
      { property: "og:title", content: "NIDRA — Calm the mind. Reclaim your sleep." },
      {
        property: "og:description",
        content:
          "Understand what's keeping you awake, get one trusted technique, and see your patterns over time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const navLinks = [
  ["How It Works", "#how"],
  ["Why NIDRA", "#why"],
  ["Insights", "#insights"],
  ["About", "#about"],
] as const;

function Landing() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Differentiator />
      <NightShowcase />
      <DashboardPreview />
      <Safety />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* -------------------------------- Section -------------------------------- */

function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("px-5 py-20 sm:px-6 sm:py-28", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function SectionHead({
  eyebrow,
  title,
  text,
  light,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: string;
  light?: boolean;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.22em]",
            light ? "text-teal" : "text-secondary",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-3 text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-4xl",
          light && "text-[#F8FAFC]",
        )}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            light ? "text-[#CBD5E1]" : "text-muted-foreground",
          )}
        >
          {text}
        </p>
      ) : null}
    </Reveal>
  );
}

/* --------------------------------- Navbar -------------------------------- */

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-6">
        <Wordmark />
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="hidden md:block">
            <Btn size="sm">Try NIDRA</Btn>
          </Link>
          <button
            className="rounded-xl p-2 text-foreground md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-border bg-background/95 px-5 py-3 md:hidden">
          {navLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-3 text-sm text-muted-foreground hover:bg-muted"
            >
              {label}
            </a>
          ))}
          <Link to="/dashboard" className="mt-2 block">
            <Btn className="h-12 w-full">Try NIDRA</Btn>
          </Link>
        </div>
      ) : null}
    </header>
  );
}

/* ---------------------------------- Hero --------------------------------- */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-5 pb-24 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
      <Ambient />
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground shadow-soft">
            <Sparkles size={13} className="text-secondary" /> Personalized support for calmer nights
          </span>
          <h1 className="mt-7 text-[2.5rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            <span className="gradient-text">Calm the mind.</span>
            <br />
            <span className="gradient-text">Reclaim your sleep.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Personalized, trustworthy, non-prescription support for people whose worry and
            overthinking make it difficult to sleep.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/night" className="sm:w-auto">
              <Btn size="lg" className="h-14 w-full sm:w-auto">
                <MoonStar size={18} /> Help Me Sleep
              </Btn>
            </Link>
            <a href="#how" className="sm:w-auto">
              <Btn size="lg" variant="outline" className="h-14 w-full sm:w-auto">
                See How It Works
              </Btn>
            </a>
          </div>
          <p className="mt-7 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck size={14} className="text-teal" /> No diagnosis. No medication. Guided
            self-management.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-lg xl:max-w-xl animate-float">
      <div className="absolute -inset-8 -z-10 rounded-[3.5rem] bg-secondary/15 blur-3xl" />
      <div
        className="relative overflow-hidden rounded-[2.25rem] border border-white/10 p-6 shadow-lift sm:p-8"
        style={{ backgroundImage: "linear-gradient(160deg, #0F172A, #1E293B 55%, #312E81)" }}
      >
        <Stars className="opacity-80" />
        <svg
          viewBox="0 0 320 300"
          className="relative w-full"
          role="img"
          aria-label="Abstract night illustration: racing thoughts settling into calm waves around a resting figure"
        >
          <defs>
            <linearGradient id="nx-moon" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#5EEAD4" />
            </linearGradient>
            <linearGradient id="nx-wave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="nx-body" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          {/* moon */}
          <g className="animate-breathe" style={{ transformOrigin: "236px 66px" }}>
            <circle cx="236" cy="66" r="48" fill="url(#nx-moon)" opacity="0.16" />
            <path d="M250 38a30 30 0 1 0 18 43 24 24 0 0 1-18-43Z" fill="url(#nx-moon)" />
          </g>

          {/* clouds */}
          <ellipse cx="86" cy="52" rx="48" ry="17" fill="#ffffff" opacity="0.07" />
          <ellipse cx="128" cy="40" rx="30" ry="11" fill="#ffffff" opacity="0.05" />

          {/* racing thought lines that settle to the right */}
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M14 ${104 + i * 17} C 60 ${74 + i * 20}, 108 ${132 + i * 12}, 168 ${104 + i * 17} S 250 ${118 + i * 12}, 300 ${112 + i * 14}`}
              stroke="#A78BFA"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity={0.5 - i * 0.09}
              strokeDasharray="5 11"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-80"
                dur={`${20 + i * 6}s`}
                repeatCount="indefinite"
              />
            </path>
          ))}

          {/* resting silhouette */}
          <g opacity="0.95" className="animate-breathe" style={{ transformOrigin: "150px 214px" }}>
            <circle cx="92" cy="204" r="16" fill="url(#nx-body)" />
            <path
              d="M108 220c18-14 38-18 58-13 12 3 20 9 34 9h46"
              stroke="url(#nx-body)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* calm waves */}
          {[0, 1, 2, 3].map((i) => (
            <path
              key={`w-${i}`}
              d={`M-10 ${248 + i * 15} q 40 -11 80 0 t 80 0 t 80 0 t 80 0`}
              stroke="url(#nx-wave)"
              strokeWidth="2"
              fill="none"
              opacity={0.45 - i * 0.09}
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 20 0; 0 0"
                dur={`${18 + i * 4}s`}
                repeatCount="indefinite"
              />
            </path>
          ))}
        </svg>

        <div className="relative mt-5 flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-xs text-[#CBD5E1]">
          <span>Overthinking</span>
          <span className="text-[#5EEAD4]">→ Calming</span>
          <span>Rest</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Problem -------------------------------- */

const problems = [
  {
    icon: Brain,
    title: "Racing Thoughts",
    text: "The day replays on a loop long after the lights go off.",
  },
  {
    icon: CalendarClock,
    title: "Worry About Tomorrow",
    text: "Unfinished plans and tasks follow you into bed.",
  },
  {
    icon: MoonStar,
    title: "Sleep Anxiety",
    text: "Worrying about not sleeping quietly makes sleeping harder.",
  },
];

function Problem() {
  return (
    <Section>
      <SectionHead
        eyebrow="The problem"
        title="When the body is tired but the mind isn't."
        text="Anxiety and overthinking don't clock off at bedtime. They often get louder once the distractions of the day disappear."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {problems.map((p, i) => (
          <Reveal key={p.title} delay={i * 90} className="h-full">
            <Card className="group h-full border-border/70 transition-all duration-500 hover:-translate-y-1.5 hover:border-secondary/40 hover:shadow-lift">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-primary transition-colors duration-500 group-hover:bg-secondary/10">
                <p.icon size={22} />
              </span>
              <h3 className="mt-6 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------ How it works ------------------------------ */

const steps = [
  ["01", "Understand", "Say what's keeping your mind awake.", Compass],
  ["02", "Match", "NIDRA identifies the type of difficulty.", Sparkles],
  ["03", "Guide", "One trusted technique, guided step by step.", Waves],
  ["04", "Learn", "Your feedback shapes the next night.", LineChart],
] as const;

function HowItWorks() {
  return (
    <Section id="how" className="bg-muted/50">
      <SectionHead eyebrow="How NIDRA works" title="Support that starts by understanding." />

      <div className="relative mt-16">
        <div
          className="absolute left-[1.45rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/40 via-secondary/40 to-teal/40 sm:block lg:left-0 lg:top-6 lg:h-px lg:w-full lg:bg-gradient-to-r"
          aria-hidden="true"
        />
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-6">
          {steps.map(([num, title, text, Icon], i) => (
            <Reveal key={num} delay={i * 110}>
              <div className="relative pl-16 sm:pl-20 lg:pl-0 lg:pt-16">
                <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full gradient-primary text-sm font-semibold text-primary-foreground shadow-soft">
                  {num}
                </span>
                <span
                  className="absolute left-[3.6rem] top-3 hidden text-secondary/50 sm:block lg:left-auto lg:right-6 lg:top-3"
                  aria-hidden="true"
                >
                  {i < 3 ? (
                    <>
                      <ArrowDown size={16} className="lg:hidden" />
                      <ArrowRight size={16} className="hidden lg:block" />
                    </>
                  ) : null}
                </span>
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <Icon size={18} className="text-secondary" /> {title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ----------------------------- Differentiator ----------------------------- */

function Differentiator() {
  const [stage, setStage] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timers = [900, 1900, 2900].map((ms, i) => window.setTimeout(() => setStage(i + 1), ms));
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <Section id="why">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <Reveal className="space-y-4 lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Core Differentiator
          </p>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Not another library of sleep tips.
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Generic tips like "drink chamomile tea" or scrolling through endless playlists only
            increase cognitive load when your mind is racing.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            NIDRA identifies your active sleep barrier in seconds and offers{" "}
            <strong>one targeted technique</strong> with full transparency on why it was chosen.
          </p>

          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-3 text-xs">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/15 text-destructive font-bold">
                ✕
              </span>
              <span>No 50-track audio libraries or decision paralysis</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-3 text-xs">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal font-bold">
                ✓
              </span>
              <span>One tailored activity matched to tonight's state</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-3 text-xs">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary font-bold">
                ✓
              </span>
              <span>Explainable, rules-based guided self-management</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-7">
          <div className="surface-card overflow-hidden shadow-lift">
            <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-secondary/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-teal/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <p className="ml-2 text-xs font-medium text-muted-foreground">
                NIDRA · Night session simulator
              </p>
            </div>

            <div className="space-y-4 p-5 sm:p-7">
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md gradient-primary px-4 py-3 text-sm text-primary-foreground shadow-soft">
                "My thoughts won't stop."
              </div>

              <Processing active={stage === 0} />

              <DemoRow
                show={stage >= 1}
                label="Detected"
                value="Racing thoughts"
                tone="secondary"
              />
              <DemoRow
                show={stage >= 2}
                label="Recommended"
                value="Brain Dump · 2 min"
                tone="teal"
              />

              <div
                className={cn(
                  "rounded-2xl border border-border transition-all duration-500",
                  stage >= 3 ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                )}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-medium"
                  aria-expanded={open}
                  onClick={() => setOpen((o) => !o)}
                >
                  Why this recommendation?
                  <ChevronDown
                    size={18}
                    className={cn(
                      "shrink-0 text-muted-foreground transition-transform duration-300",
                      open && "rotate-180",
                    )}
                  />
                </button>
                {open ? (
                  <p className="animate-rise border-t border-border px-4 py-4 text-sm leading-relaxed text-muted-foreground">
                    You described repetitive thoughts about tomorrow. Writing them down moves those
                    concerns out of active attention, which is a widely used self-management step
                    before a wind-down routine.
                  </p>
                ) : null}
              </div>

              <Link to="/night" className="block pt-1">
                <Btn className="h-12 w-full sm:w-auto">
                  Start Night Mode <ArrowRight size={16} />
                </Btn>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Processing({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-hidden transition-all duration-500",
        active ? "h-8 opacity-100" : "h-0 opacity-0",
      )}
      aria-hidden={!active}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-secondary/70 animate-breathe"
          style={{ animationDelay: `${i * 250}ms`, animationDuration: "1.4s" }}
        />
      ))}
      <span className="text-xs text-muted-foreground">Understanding what you said…</span>
    </div>
  );
}

function DemoRow({
  show,
  label,
  value,
  tone,
}: {
  show: boolean;
  label: string;
  value: string;
  tone: "secondary" | "teal";
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-2xl border p-4 transition-all duration-700",
        tone === "secondary" ? "border-secondary/25 bg-secondary/5" : "border-teal/25 bg-teal/5",
        show ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p
        className={cn(
          "text-sm font-semibold",
          tone === "secondary" ? "text-secondary" : "text-teal",
        )}
      >
        {value}
      </p>
    </div>
  );
}

/* ----------------------------- Night showcase ----------------------------- */

function NightShowcase() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="dark relative">
      <div
        className="h-32"
        style={{ backgroundImage: "linear-gradient(to bottom, #F8FAFC, #E7E3FB 45%, #0F172A)" }}
      />
      <section
        className="relative overflow-hidden px-5 py-20 text-foreground sm:px-6 sm:py-28"
        style={{ backgroundImage: "linear-gradient(165deg, #0F172A, #1E293B 55%, #312E81)" }}
      >
        <Stars className="opacity-70" />
        <div className="relative mx-auto max-w-5xl">
          <SectionHead
            light
            eyebrow="Night Mode Showcase"
            title="Your mind won't switch off?"
            text="You don't have to search through dozens of techniques. Start with what you're experiencing."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {barriers.map((b, i) => {
              const active = selected === b.id;
              return (
                <Reveal key={b.id} delay={i * 70} className="h-full">
                  <button
                    type="button"
                    onClick={() => setSelected(b.id)}
                    aria-pressed={active}
                    className={cn(
                      "h-full w-full rounded-3xl border p-5 text-left transition-all duration-400 sm:p-6",
                      "border-white/10 bg-white/5 hover:-translate-y-1 hover:border-[#A78BFA]/60 hover:bg-white/10",
                      "hover:shadow-[0_0_0_1px_rgba(167,139,250,0.25),0_18px_40px_-20px_rgba(94,234,212,0.45)]",
                      active &&
                        "border-[#5EEAD4]/60 bg-white/10 shadow-[0_0_0_1px_rgba(94,234,212,0.35)]",
                    )}
                  >
                    <p className="text-base font-medium text-[#F8FAFC]">{b.nightLabel}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#CBD5E1]">{b.description}</p>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link to="/night" className="inline-block w-full sm:w-auto">
              <Btn
                size="lg"
                className="h-14 w-full bg-[#F8FAFC] text-[#312E81] shadow-glow hover:bg-white sm:w-auto"
              >
                <MoonStar size={18} /> Start Night Mode
              </Btn>
            </Link>
          </div>
        </div>
      </section>
      <div
        className="h-32"
        style={{ backgroundImage: "linear-gradient(to bottom, #312E81, #E7E3FB 55%, #F8FAFC)" }}
      />
    </div>
  );
}

/* ---------------------------- Dashboard preview --------------------------- */

const previewStats = [
  ["Average Sleep", "6h 42m"],
  ["Sleep Quality", "7.2 / 10"],
  ["Evening Anxiety", "5.4 / 10"],
] as const;

function DashboardPreview() {
  return (
    <Section id="insights">
      <SectionHead
        eyebrow="Insights"
        title="See what changes, night by night."
        text="Gentle tracking — never a scoreboard you can fail."
      />

      <Reveal delay={90} className="mt-14">
        <div className="surface-card overflow-hidden p-5 sm:p-7">
          <div className="grid gap-4 sm:grid-cols-3">
            {previewStats.map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-muted/70 p-4">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-1.5 text-2xl font-semibold tracking-tight">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-border p-4">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm font-medium">This week</p>
              <p className="text-xs text-muted-foreground">Sleep quality</p>
            </div>
            <div className="mt-3 h-40 w-full sm:h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ left: 0, right: 0, top: 6, bottom: 0 }}>
                  <defs>
                    <linearGradient id="lq" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 16,
                      border: "1px solid #E2E8F0",
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="quality"
                    name="Sleep quality"
                    stroke="#6D5AE6"
                    strokeWidth={2.5}
                    fill="url(#lq)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-muted/70 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles size={16} className="text-secondary" /> NIDRA noticed
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Your reported sleep quality tends to be better on nights when you complete a wind-down
              activity.
            </p>
            <Link to="/insights" className="mt-3 inline-block">
              <Btn variant="ghost" size="sm">
                Open insights <ArrowRight size={16} />
              </Btn>
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* --------------------------------- Safety --------------------------------- */

function Safety() {
  return (
    <Section id="about" className="bg-muted/50">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-card text-teal shadow-soft">
            <Shield size={22} />
          </span>
          <h2 className="mt-6 text-[1.75rem] font-semibold tracking-tight sm:text-4xl">
            Designed to know its limits.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            NIDRA provides guided self-management support for everyday sleep worry. It does not
            diagnose conditions, does not prescribe medication, and does not replace qualified
            professional care. When self-guided support doesn't seem to be helping, NIDRA says so
            and points toward additional support.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <Card className="space-y-3">
            {["Self-guided support", "Monitor response", "Additional support when needed"].map(
              (step, i) => (
                <div key={step}>
                  <div className="flex items-center gap-3 rounded-2xl border border-border p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-accent-foreground">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium">{step}</span>
                  </div>
                  {i < 2 ? <div className="ml-8 h-5 w-px bg-border" aria-hidden="true" /> : null}
                </div>
              ),
            )}
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------- CTA ----------------------------------- */

function FinalCta() {
  return (
    <Section>
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-16 text-center shadow-soft sm:px-12 sm:py-20">
          <Ambient className="opacity-90" />
          <h2 className="relative mx-auto max-w-2xl text-[1.6rem] font-semibold leading-snug tracking-tight sm:text-[2rem]">
            A calmer night can start with understanding what's keeping you awake.
          </h2>
          <Link to="/dashboard" className="relative mt-9 inline-block w-full sm:w-auto">
            <Btn size="lg" className="h-14 w-full sm:w-auto">
              Try NIDRA <ArrowRight size={18} />
            </Btn>
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}

/* --------------------------------- Footer --------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-border px-5 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 sm:flex-row">
        <div>
          <Wordmark />
          <p className="mt-3 text-sm text-muted-foreground">Calm the mind. Reclaim your sleep.</p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
          {["About", "Privacy", "Support", "Resources"].map((l) => (
            <a key={l} href="#about" className="transition-colors hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-muted-foreground">
        Prototype developed for Smart India Hackathon. NIDRA does not provide medical diagnosis or
        prescriptions.
      </p>
    </footer>
  );
}
