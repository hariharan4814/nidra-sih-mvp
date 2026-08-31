import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Info, Sparkles } from "lucide-react";
import { AppShell } from "@/components/nidra/shells";
import { Card, Reveal, StatCard } from "@/components/nidra/atoms";
import { insightCards, trendData } from "@/lib/nidra-data";

export const Route = createFileRoute("/insights")({
  component: InsightsPage,
  head: () => ({
    meta: [
      { title: "Your Sleep & Mind Patterns — NIDRA" },
      {
        name: "description",
        content:
          "Track sleep quality, evening anxiety and time to fall asleep, with plain-language observations from your logged data.",
      },
      { property: "og:title", content: "Your Sleep & Mind Patterns — NIDRA" },
      {
        property: "og:description",
        content: "Charts and observations built from your own logged evenings.",
      },
    ],
  }),
});

function InsightsPage() {
  return (
    <AppShell>
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Your Sleep &amp; Mind Patterns
        </h1>
        <p className="mt-2 text-muted-foreground">Last 7 logged evenings.</p>
      </Reveal>

      <Reveal delay={80} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Average sleep quality" value="6.9 / 10" hint="+0.6 vs last week" />
        <StatCard label="Average evening anxiety" value="5.7 / 10" hint="−0.4 vs last week" />
        <StatCard label="Average time to fall asleep" value="37 min" hint="−6 min vs last week" />
        <StatCard label="Most-used intervention" value="Brain Dump" hint="7 of 12 sessions" />
      </Reveal>

      <Reveal delay={120} className="mt-6">
        <Card>
          <h2 className="text-lg font-semibold">Sleep quality vs evening anxiety</h2>
          <p className="mt-1 text-sm text-muted-foreground">Self-reported, 1–10 scale.</p>
          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ left: -20, right: 8 }}>
                <defs>
                  <linearGradient id="gq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#14B8A6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 6" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" tickLine={false} axisLine={false} />
                <YAxis domain={[0, 10]} stroke="#64748B" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 12px 32px -12px rgba(79,70,229,0.25)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="quality"
                  name="Sleep quality"
                  stroke="#4F46E5"
                  strokeWidth={2.5}
                  fill="url(#gq)"
                />
                <Area
                  type="monotone"
                  dataKey="anxiety"
                  name="Evening anxiety"
                  stroke="#14B8A6"
                  strokeWidth={2.5}
                  fill="url(#ga)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <Reveal delay={60} className="lg:col-span-3">
          <Card className="h-full">
            <h2 className="text-lg font-semibold">Time to fall asleep</h2>
            <p className="mt-1 text-sm text-muted-foreground">Minutes, self-reported.</p>
            <div className="mt-6 h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData} margin={{ left: -20, right: 8 }}>
                  <CartesianGrid strokeDasharray="4 6" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="day" stroke="#64748B" tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: "rgba(139,92,246,0.08)" }}
                    contentStyle={{ borderRadius: 16, border: "1px solid #E2E8F0" }}
                  />
                  <Bar dataKey="onset" name="Minutes" fill="#8B5CF6" radius={[10, 10, 4, 4]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-2">
          <Card className="h-full bg-muted">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Sparkles size={18} className="text-primary" /> NIDRA noticed
            </h2>
            <ul className="mt-4 space-y-3">
              {insightCards.map((c) => (
                <li key={c} className="rounded-2xl bg-card p-4 text-sm text-muted-foreground">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
              <Info size={14} className="mt-0.5 shrink-0" />
              Insights are based on your logged information and are not medical diagnoses.
            </p>
          </Card>
        </Reveal>
      </div>
    </AppShell>
  );
}
