import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  BedDouble,
  Flame,
  MoonStar,
  NotebookPen,
  Sparkles,
  Wind,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/nidra/shells";
import { Card, Reveal, StatCard, Btn } from "@/components/nidra/atoms";
import { useNidra } from "@/lib/nidra-store";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "NIDRA Dashboard — Your evening at a glance" },
      {
        name: "description",
        content:
          "Check your evening anxiety, last night's sleep and tonight's wind-down plan in the NIDRA dashboard.",
      },
      { property: "og:title", content: "NIDRA Dashboard — Your evening at a glance" },
      {
        property: "og:description",
        content: "Evening anxiety, sleep summary and tonight's wind-down in one calm view.",
      },
    ],
  }),
});

function Dashboard() {
  const { checkIn } = useNidra();

  return (
    <AppShell>
      <Reveal>
        <p className="text-sm text-muted-foreground">Monday evening</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          Good evening, <span className="gradient-text">Aarav</span>
        </h1>
        <p className="mt-2 text-muted-foreground">How has your mind been today?</p>
      </Reveal>

      <Reveal delay={80} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Current anxiety"
          value={`${checkIn.anxiety} / 10`}
          hint="From your latest check-in"
          icon={<Activity size={18} />}
        />
        <StatCard
          label="Last night's sleep"
          value="6h 42m"
          hint="Quality 7.2 / 10"
          icon={<BedDouble size={18} />}
        />
        <StatCard
          label="Current streak"
          value="5 nights"
          hint="Wind-down completed"
          icon={<Flame size={18} />}
        />
        <StatCard
          label="Sessions completed"
          value="12"
          hint="Last 30 days"
          icon={<Sparkles size={18} />}
        />
      </Reveal>

      <Reveal delay={140} className="mt-6">
        <div
          className="relative overflow-hidden rounded-3xl p-8 text-primary-foreground shadow-lift sm:p-10"
          style={{ backgroundImage: "linear-gradient(120deg, #4F46E5, #8B5CF6)" }}
        >
          <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10 animate-breathe" />
          <div className="relative max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs">
              <MoonStar size={14} /> Tonight
            </span>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">My Mind Won't Switch Off</h2>
            <p className="mt-2 text-sm text-primary-foreground/85">
              Tell NIDRA what's keeping you awake and get one suitable technique — not a library.
            </p>
            <Link to="/night" className="mt-6 inline-block">
              <Btn variant="outline" size="lg" className="border-0 bg-white text-[#4F46E5]">
                <MoonStar size={18} /> Start Night Mode
              </Btn>
            </Link>
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Reveal delay={60} className="lg:col-span-1">
          <Card className="h-full">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <NotebookPen size={18} className="text-primary" /> Quick Check-in
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Four short questions. Around 30 seconds.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              {[
                ["Anxiety", `${checkIn.anxiety}/10`],
                ["Mood", checkIn.mood],
                ["Energy", `${checkIn.energy}/10`],
                ["Focus", `${checkIn.focus}/10`],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between rounded-xl bg-muted px-3 py-2"
                >
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium text-foreground">{v}</span>
                </div>
              ))}
            </div>
            <Link to="/check-in" className="mt-5 inline-block">
              <Btn variant="outline">
                Update check-in <ArrowRight size={16} />
              </Btn>
            </Link>
          </Card>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-1">
          <Card className="h-full">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Wind size={18} className="text-teal" /> Tonight's wind-down
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Suggested order, based on your recent evenings.
            </p>
            <ol className="mt-4 space-y-3">
              {[
                ["Brain Dump", "2–3 min"],
                ["Slow breathing", "4 min"],
                ["Lights low, screens away", "10 min"],
              ].map(([name, time], i) => (
                <li key={name} className="flex items-center gap-3 rounded-xl border p-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-accent-foreground">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium">{name}</span>
                  <span className="text-xs text-muted-foreground">{time}</span>
                </li>
              ))}
            </ol>
          </Card>
        </Reveal>

        <Reveal delay={180} className="lg:col-span-1">
          <Card className="h-full bg-muted">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Sparkles size={18} className="text-primary" /> Recent insights
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="rounded-xl bg-card p-3">
                Sleep quality tends to be better on nights when you complete a wind-down activity.
              </li>
              <li className="rounded-xl bg-card p-3">
                Evening anxiety above 7/10 has matched longer time to fall asleep this week.
              </li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Based on your logged information. Not a medical diagnosis.
            </p>
            <Link to="/insights" className="mt-4 inline-block">
              <Btn variant="ghost" size="sm">
                View all insights <ArrowRight size={16} />
              </Btn>
            </Link>
          </Card>
        </Reveal>
      </div>
    </AppShell>
  );
}
