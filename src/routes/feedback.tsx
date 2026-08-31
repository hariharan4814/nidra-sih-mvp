import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Minus, Smile, Frown } from "lucide-react";
import { NightShell } from "@/components/nidra/shells";
import { Btn, ScaleSlider } from "@/components/nidra/atoms";
import { useNidra } from "@/lib/nidra-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/feedback")({
  component: FeedbackPage,
  head: () => ({
    meta: [
      { title: "How do you feel now? — NIDRA" },
      {
        name: "description",
        content:
          "Share how you feel after your session so NIDRA can learn which techniques tend to work better for you.",
      },
      { property: "og:title", content: "How do you feel now? — NIDRA" },
      {
        property: "og:description",
        content: "Quick post-session feedback that shapes future recommendations.",
      },
    ],
  }),
});

const options = [
  { key: "Better", icon: Smile },
  { key: "About the same", icon: Minus },
  { key: "Worse", icon: Frown },
];

function FeedbackPage() {
  const { barrier, intensity: beforeIntensity, feedback, setFeedback } = useNidra();
  const [intensity, setIntensity] = useState(4);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <NightShell>
        <section className="animate-rise py-12 text-center max-w-xl mx-auto space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/15 text-teal">
            <CheckCircle2 size={36} />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Session completed.</h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Your feedback helps NIDRA understand what tends to work better for you over time.
          </p>

          <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-border bg-card/50 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Logged for tonight</p>
            <p className="mt-1">
              Intensity changed from{" "}
              <span className="font-semibold text-primary">{beforeIntensity}/10</span> to{" "}
              <span className="font-semibold text-teal">{intensity}/10</span> ({feedback}).
            </p>
          </div>

          <Link to="/dashboard" className="mt-8 inline-block">
            <Btn size="lg" className="h-14 px-8 shadow-lift">
              Return to Dashboard <ArrowRight size={18} />
            </Btn>
          </Link>
        </section>
      </NightShell>
    );
  }

  return (
    <NightShell>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="animate-rise">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">
            How do you feel now?
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            There is no right or wrong answer — honest feedback helps refine your future wind-down
            recommendations.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {options.map(({ key, icon: Icon }) => (
            <button
              key={key}
              type="button"
              aria-pressed={feedback === key}
              onClick={() => setFeedback(key)}
              className={cn(
                "flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-3xl border p-6 text-base font-medium transition-all duration-300",
                feedback === key
                  ? "border-primary bg-primary/15 shadow-glow ring-1 ring-primary/40"
                  : "border-border bg-card/60 hover:-translate-y-0.5 hover:bg-card",
              )}
            >
              <Icon
                size={26}
                className={feedback === key ? "text-teal" : "text-muted-foreground"}
              />
              {key}
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-card/60 p-6 space-y-4">
          <ScaleSlider
            label="How intense does it feel now?"
            value={intensity}
            lowLabel="Settled (1)"
            highLabel="Very intense (10)"
            onChange={setIntensity}
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/60">
            <span>
              Before session: <strong className="text-foreground">{beforeIntensity} / 10</strong>
            </span>
            <span>
              Now: <strong className="text-teal">{intensity} / 10</strong>
            </span>
          </div>
        </div>

        <Btn size="lg" className="w-full h-14" disabled={!feedback} onClick={() => setDone(true)}>
          Save feedback &amp; Finish <ArrowRight size={18} />
        </Btn>
      </div>
    </NightShell>
  );
}
