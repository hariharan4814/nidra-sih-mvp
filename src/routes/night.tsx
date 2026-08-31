import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Brain, Calendar, CircleHelp, HeartPulse, Moon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NightShell } from "@/components/nidra/shells";
import { Btn, Stars } from "@/components/nidra/atoms";
import { barriers, type BarrierId } from "@/lib/nidra-data";
import { useNidra } from "@/lib/nidra-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/night")({
  component: NightPage,
  head: () => ({
    meta: [
      { title: "Night Mode — What's keeping your mind awake?" },
      {
        name: "description",
        content:
          "A calm, full-screen Night Mode: tell NIDRA what's keeping you awake tonight and get one matched self-management activity.",
      },
      { property: "og:title", content: "Night Mode — What's keeping your mind awake?" },
      {
        property: "og:description",
        content: "Choose what's closest to what you're experiencing and get one fitting technique.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const ICONS: Record<BarrierId, LucideIcon> = {
  "racing-thoughts": Brain,
  "tomorrow-worry": Calendar,
  "body-tension": HeartPulse,
  "sleep-anxiety": Moon,
  unsure: CircleHelp,
};

const MAX_CHARS = 300;

function intensityWord(v: number) {
  if (v <= 3) return "Very mild";
  if (v <= 7) return "Noticeable";
  return "Overwhelming";
}

function NightPage() {
  const { barrier, setBarrier, note, setNote, intensity, setIntensity } = useNidra();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const canContinue = Boolean(barrier) || note.trim().length > 0;

  if (processing) return <Processing onDone={() => navigate({ to: "/recommendation" })} />;

  return (
    <NightShell>
      <Stars className="-z-10" />
      <CrescentMoon />

      <div className="animate-rise space-y-3 pb-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1 text-xs tracking-wide text-muted-foreground">
          <Moon size={13} className="text-primary" /> Night Mode
        </span>
        <h1 className="text-2xl font-semibold leading-tight tracking-tight sm:text-4xl">
          What's keeping your mind awake?
        </h1>
        <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Choose what feels closest to what you're experiencing right now, or jot down a quick note.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Barrier Selection */}
        <div className="space-y-3 lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Select what you are noticing
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {barriers.map((b, i) => {
              const Icon = ICONS[b.id];
              const active = barrier === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setBarrier(active ? null : b.id)}
                  style={{ animationDelay: `${i * 50}ms` }}
                  className={cn(
                    "animate-rise flex min-h-[100px] items-start gap-4 rounded-3xl border p-4 sm:p-5 text-left transition-all duration-400",
                    active
                      ? "border-primary/80 bg-primary/15 shadow-glow ring-1 ring-primary/40"
                      : "border-border bg-card/50 hover:border-primary/30 hover:bg-card/80",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-colors duration-400",
                      active
                        ? "bg-primary/25 text-primary"
                        : "bg-background/40 text-muted-foreground",
                    )}
                  >
                    <Icon size={19} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base font-medium leading-snug">{b.nightLabel}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                      {b.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Note + Intensity Slider + CTA */}
        <div className="space-y-5 lg:col-span-5">
          <section className="rounded-3xl border border-border bg-card/40 p-5 sm:p-6">
            <label htmlFor="mind-note" className="text-sm font-medium">
              Want to tell us more?
            </label>
            <p className="mt-1 text-xs text-muted-foreground">Optional — a sentence is enough.</p>
            <textarea
              id="mind-note"
              value={note}
              maxLength={MAX_CHARS}
              onChange={(e) => setNote(e.target.value.slice(0, MAX_CHARS))}
              rows={3}
              placeholder="I have a presentation tomorrow and I can't stop thinking that I'll mess it up..."
              className="mt-3 w-full resize-none rounded-2xl border border-border bg-background/40 p-3.5 text-sm leading-relaxed placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="mt-1.5 text-right text-xs text-muted-foreground/80">
              {note.length}/{MAX_CHARS}
            </p>
          </section>

          <section className="rounded-3xl border border-border bg-card/40 p-5 sm:p-6">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="intensity" className="text-sm font-medium">
                How intense does this feel right now?
              </label>
              <span className="rounded-xl bg-primary/15 px-3 py-1 text-sm font-semibold text-primary">
                {intensity} / 10
              </span>
            </div>
            <input
              id="intensity"
              type="range"
              min={1}
              max={10}
              step={1}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-background/60 accent-[#A78BFA]"
            />
            <div className="mt-2.5 flex justify-between text-xs text-muted-foreground">
              <span>Very mild (1-3)</span>
              <span>Noticeable (4-7)</span>
              <span>Overwhelming (8-10)</span>
            </div>
            <p className="mt-2.5 text-xs text-muted-foreground">
              Current feeling:{" "}
              <span className="font-semibold text-teal">{intensityWord(intensity)}</span>.
            </p>
          </section>

          <div className="hidden sm:block">
            <Btn
              size="lg"
              className="w-full"
              disabled={!canContinue}
              onClick={() => setProcessing(true)}
            >
              Find what may help <ArrowRight size={18} />
            </Btn>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            NIDRA offers guided self-management support only. No diagnosis, no medication.
          </p>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 p-4 backdrop-blur-xl sm:hidden">
        <Btn
          size="lg"
          className="w-full"
          disabled={!canContinue}
          onClick={() => setProcessing(true)}
        >
          Find what may help <ArrowRight size={18} />
        </Btn>
      </div>
    </NightShell>
  );
}

/* ------------------------------ Processing ------------------------------- */

const STEPS = ["Understanding what you're experiencing...", "Finding an appropriate activity..."];

function Processing({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 900);
    const t2 = setTimeout(onDone, 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <NightShell>
      <Stars className="-z-10" />
      <div className="flex min-h-[62vh] flex-col items-center justify-center text-center">
        <div className="relative flex h-52 w-52 items-center justify-center">
          <span className="absolute h-full w-full rounded-full bg-primary/10 blur-2xl animate-breathe" />
          <span className="absolute h-40 w-40 rounded-full border border-primary/30 animate-breathe" />
          <span className="h-24 w-24 rounded-full bg-primary/25 blur-md animate-breathe" />
        </div>
        <p key={step} className="mt-10 animate-rise text-base text-muted-foreground">
          {STEPS[step]}
        </p>
      </div>
    </NightShell>
  );
}

/* -------------------------------- Moon ----------------------------------- */

function CrescentMoon() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-4 top-10 -z-10 opacity-40 animate-float sm:right-10"
    >
      <svg width="72" height="72" viewBox="0 0 64 64" fill="none">
        <path
          d="M45 40A20 20 0 0 1 24 12a22 22 0 1 0 21 28Z"
          fill="#A78BFA"
          fillOpacity="0.35"
          stroke="#A78BFA"
          strokeOpacity="0.5"
        />
      </svg>
    </div>
  );
}
