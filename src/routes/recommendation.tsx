import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Clock,
  LifeBuoy,
  ShieldCheck,
  Wind,
} from "lucide-react";
import { NightShell } from "@/components/nidra/shells";
import { Btn, Stars } from "@/components/nidra/atoms";
import { getBarrier } from "@/lib/nidra-data";
import { useNidra } from "@/lib/nidra-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recommendation")({
  component: RecommendationPage,
  head: () => ({
    meta: [
      { title: "Your recommendation — NIDRA" },
      {
        name: "description",
        content:
          "See what NIDRA understood from tonight's check-in, the one matched activity, and a plain-language explanation of why it was selected.",
      },
      { property: "og:title", content: "Your recommendation — NIDRA" },
      {
        property: "og:description",
        content: "One matched technique, with the reasoning shown in plain language.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function RecommendationPage() {
  const { barrier, intensity, note } = useNidra();
  const b = getBarrier(barrier);
  const [why, setWhy] = useState(true);

  return (
    <NightShell>
      <Stars className="-z-10" />

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Column: What NIDRA Understood & Why It Matches */}
        <div className="space-y-5 lg:col-span-5">
          <section className="animate-rise rounded-3xl border border-border bg-card/40 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              What NIDRA Understood
            </p>

            {note.trim() ? (
              <p className="mt-3 rounded-2xl border-l-2 border-primary/60 bg-background/50 px-4 py-3 text-sm italic leading-relaxed text-muted-foreground">
                “{note.trim()}”
              </p>
            ) : null}

            <dl className="mt-4 space-y-2.5">
              {[
                ["Primary difficulty", b.primaryDifficulty],
                ["Related factor", b.relatedFactor],
                ["Current intensity", `${intensity} / 10`],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/60 px-4 py-2.5"
                >
                  <dt className="text-xs text-muted-foreground">{k}</dt>
                  <dd className="text-xs font-medium text-foreground sm:text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            className="animate-rise overflow-hidden rounded-3xl border border-border bg-card/50"
            style={{ animationDelay: "120ms" }}
          >
            <button
              type="button"
              aria-expanded={why}
              onClick={() => setWhy((v) => !v)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-card/80"
            >
              <span className="text-sm font-semibold sm:text-base">Why this recommendation?</span>
              <ChevronDown
                size={18}
                className={cn(
                  "shrink-0 text-primary transition-transform duration-300",
                  why && "rotate-180",
                )}
              />
            </button>
            {why ? (
              <div className="animate-rise border-t border-border/60 px-5 py-4 space-y-3.5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {b.intervention.reason}
                </p>
                <div className="flex flex-col gap-2 pt-1">
                  <span className="inline-flex items-center gap-2 rounded-xl bg-teal/10 px-3 py-1.5 text-xs text-teal">
                    <ShieldCheck size={14} className="shrink-0" /> Selected from NIDRA's approved
                    intervention library.
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <BadgeCheck size={13} className="shrink-0 text-primary" /> Rules-based matching
                    — no diagnosis involved.
                  </span>
                </div>
              </div>
            ) : null}
          </section>

          <div className="space-y-2 pt-1 text-xs leading-relaxed text-muted-foreground">
            <p>
              NIDRA provides guided self-management support and does not replace qualified
              mental-health care.
            </p>
            <div className="flex items-center justify-between pt-2">
              <Link
                to="/night"
                className="inline-flex items-center gap-1.5 text-primary underline-offset-4 hover:underline"
              >
                <LifeBuoy size={13} /> Need more support?
              </Link>
              <Link
                to="/night"
                className="text-muted-foreground hover:text-foreground hover:underline"
              >
                Choose something else
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Recommended Technique & Alternative */}
        <div className="space-y-6 lg:col-span-7">
          <div className="animate-rise" style={{ animationDelay: "80ms" }}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              Matched Recommendation
            </p>
            <h1 className="mt-1 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              We think this may help right now.
            </h1>
          </div>

          <section
            className="animate-rise rounded-3xl border border-primary/50 bg-primary/10 p-6 shadow-glow sm:p-8"
            style={{ animationDelay: "140ms" }}
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-background/50 px-3 py-1 font-medium text-foreground">
                {b.intervention.category}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-background/50 px-3 py-1 font-medium text-foreground">
                <Clock size={12} /> {b.intervention.duration}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              {b.intervention.name}
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {b.intervention.short}
            </p>

            <Link to="/intervention" className="mt-7 block">
              <Btn size="lg" className="h-14 w-full shadow-lift sm:w-auto">
                Start {b.intervention.name} <ArrowRight size={18} />
              </Btn>
            </Link>
          </section>

          <section
            className="animate-rise rounded-3xl border border-border bg-card/40 p-5 sm:p-6"
            style={{ animationDelay: "200ms" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Another option
            </p>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-teal/15 text-teal">
                  <Wind size={17} />
                </span>
                <div>
                  <p className="text-sm font-semibold sm:text-base">{b.alternative.name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {b.alternative.note}
                  </p>
                </div>
              </div>
              <Link to="/intervention" className="shrink-0">
                <Btn variant="outline" size="sm">
                  Try instead
                </Btn>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </NightShell>
  );
}
