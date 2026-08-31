import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, PenLine, Sparkles } from "lucide-react";
import { NightShell } from "@/components/nidra/shells";
import { Btn } from "@/components/nidra/atoms";
import { brainDumpItems } from "@/lib/nidra-data";

export const Route = createFileRoute("/intervention")({
  component: InterventionPage,
  head: () => ({
    meta: [
      { title: "Brain Dump session — NIDRA" },
      {
        name: "description",
        content:
          "A guided brain dump followed by slow breathing, to give tonight's thoughts somewhere else to stay.",
      },
      { property: "og:title", content: "Brain Dump session — NIDRA" },
      {
        property: "og:description",
        content: "Write it down, sort it for tomorrow, then breathe slowly for a minute.",
      },
    ],
  }),
});

type Stage = "write" | "sorted" | "breathe";
const phases = ["Breathe In", "Hold", "Breathe Out"] as const;

function InterventionPage() {
  const [stage, setStage] = useState<Stage>("write");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  return (
    <NightShell>
      {stage === "write" ? (
        <section className="animate-rise">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="space-y-4 lg:col-span-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
                <PenLine size={13} className="text-primary" /> Worry Management
              </span>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Brain Dump</h1>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Give your thoughts somewhere else to stay for tonight. Write whatever is looping in
                your head.
              </p>

              <div className="rounded-2xl border border-border/70 bg-card/40 p-4 text-xs leading-relaxed text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground">💡 How this works:</p>
                <p>1. Write freely without editing or organizing.</p>
                <p>2. NIDRA will help group tasks and worries for tomorrow.</p>
                <p>3. Your thoughts are kept safe so you can let your mind rest tonight.</p>
              </div>

              <div className="hidden sm:block pt-2">
                <Btn
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={text.trim().length === 0}
                  onClick={() => setStage("sorted")}
                >
                  <PenLine size={18} /> Save for Tomorrow
                </Btn>
              </div>
            </div>

            <div className="relative lg:col-span-7">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary/10 blur-2xl animate-breathe" />
              <label
                htmlFor="dump"
                className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-2"
              >
                Your thoughts for tonight
              </label>
              <textarea
                id="dump"
                rows={11}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tomorrow's presentation, the email I forgot to reply to, what if I don't wake up on time..."
                className="w-full rounded-3xl border border-border bg-card/70 p-5 text-sm leading-relaxed placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring sm:text-base"
              />
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {text.trim().length > 0
                    ? `${text.trim().split(/\s+/).length} words written`
                    : "Ready when you are"}
                </span>
                <div className="sm:hidden">
                  <Btn
                    size="md"
                    disabled={text.trim().length === 0}
                    onClick={() => setStage("sorted")}
                  >
                    <PenLine size={16} /> Save for Tomorrow
                  </Btn>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {stage === "sorted" ? (
        <section className="animate-rise space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1 text-xs text-teal">
              ✓ Processed
            </span>
            <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">Sorted for tomorrow</h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              NIDRA grouped what you wrote so it can wait safely until morning.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 pt-2">
            {brainDumpItems.map((item) => (
              <div
                key={item.text}
                className="rounded-3xl border border-border bg-card/70 p-5 space-y-3 flex flex-col justify-between"
              >
                <span className="inline-block self-start rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-foreground">
                  {item.type}
                </span>
                <p className="text-sm sm:text-base font-medium leading-relaxed">{item.text}</p>
                <span className="text-xs text-muted-foreground">Parked for morning</span>
              </div>
            ))}
          </div>

          <div className="pt-4 text-center space-y-6">
            <p className="text-lg font-medium text-teal sm:text-xl">
              “You don't need to solve everything tonight.”
            </p>
            <Btn size="lg" className="mx-auto" onClick={() => setStage("breathe")}>
              Continue to Breathing Activity <ArrowRight size={18} />
            </Btn>
          </div>
        </section>
      ) : null}

      {stage === "breathe" ? <Breathing onFinish={() => navigate({ to: "/feedback" })} /> : null}
    </NightShell>
  );
}

function Breathing({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % phases.length), 4000);
    return () => clearInterval(id);
  }, []);

  const label = phases[phase] ?? "Breathe In";

  return (
    <section className="animate-rise text-center">
      <h1 className="text-2xl font-semibold sm:text-3xl">A minute of slow breathing</h1>
      <p className="mt-2 text-muted-foreground">Follow the circle. Let the exhale be longest.</p>
      <div className="mt-12 flex items-center justify-center">
        <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
          <span className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-breathe" />
          <span
            className="absolute inset-4 rounded-full border border-primary/40 transition-transform duration-[4000ms] ease-in-out"
            style={{ transform: `scale(${phase === 0 ? 1.07 : phase === 1 ? 1.07 : 0.93})` }}
          />
          <span className="relative text-xl font-medium">{label}</span>
        </div>
      </div>
      <div className="mt-10 flex justify-center gap-2" aria-hidden="true">
        {phases.map((p, i) => (
          <span
            key={p}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === phase ? "w-8 bg-teal" : "w-3 bg-border"}`}
          />
        ))}
      </div>
      <Btn size="lg" className="mt-10" onClick={onFinish}>
        <Sparkles size={18} /> Finish Session
      </Btn>
    </section>
  );
}
