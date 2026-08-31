import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, HeartHandshake } from "lucide-react";
import { AppShell } from "@/components/nidra/shells";
import { Btn, Card, Reveal, ScaleSlider } from "@/components/nidra/atoms";
import { useNidra } from "@/lib/nidra-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/check-in")({
  component: CheckInPage,
  head: () => ({
    meta: [
      { title: "Quick Check-in — NIDRA" },
      {
        name: "description",
        content:
          "A 30-second evening check-in on anxiety, mood, energy and focus so NIDRA can suggest a fitting wind-down.",
      },
      { property: "og:title", content: "Quick Check-in — NIDRA" },
      {
        property: "og:description",
        content: "Log anxiety, mood, energy and focus in about 30 seconds.",
      },
    ],
  }),
});

const moods = ["Low", "Okay", "Good", "Great"];

function CheckInPage() {
  const { checkIn, setCheckIn } = useNidra();
  const [draft, setDraft] = useState(checkIn);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  return (
    <AppShell>
      <Reveal className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Quick check-in</h1>
        <p className="mt-2 text-muted-foreground">
          Four quick questions — no long questionnaire, just a snapshot of tonight.
        </p>

        <Card className="mt-6 space-y-8">
          <ScaleSlider
            label="How anxious do you feel right now?"
            value={draft.anxiety}
            lowLabel="Calm"
            highLabel="Very anxious"
            onChange={(v) => setDraft({ ...draft, anxiety: v })}
          />

          <div className="space-y-3">
            <p className="text-base font-medium">How is your mood?</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {moods.map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={draft.mood === m}
                  onClick={() => setDraft({ ...draft, mood: m })}
                  className={cn(
                    "rounded-2xl border px-4 py-4 text-sm font-medium transition-all duration-300",
                    draft.mood === m
                      ? "border-transparent gradient-primary text-primary-foreground shadow-soft"
                      : "border-border bg-card hover:-translate-y-0.5 hover:bg-muted",
                  )}
                >
                  {draft.mood === m ? "✓ " : ""}
                  {m}
                </button>
              ))}
            </div>
          </div>

          <ScaleSlider
            label="How is your energy?"
            value={draft.energy}
            lowLabel="Drained"
            highLabel="Energised"
            onChange={(v) => setDraft({ ...draft, energy: v })}
          />
          <ScaleSlider
            label="How focused do you feel?"
            value={draft.focus}
            lowLabel="Scattered"
            highLabel="Sharp"
            onChange={(v) => setDraft({ ...draft, focus: v })}
          />

          <div className="flex flex-wrap items-center gap-3">
            <Btn
              size="lg"
              onClick={() => {
                setCheckIn(draft);
                setSaved(true);
                setTimeout(() => navigate({ to: "/dashboard" }), 1200);
              }}
            >
              <Check size={18} /> Save Check-in
            </Btn>
            {saved ? (
              <span className="text-sm text-teal">Saved — heading back to your dashboard.</span>
            ) : null}
          </div>
        </Card>

        <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <HeartHandshake size={14} /> Your answers stay on this device in this prototype.
        </p>
      </Reveal>
    </AppShell>
  );
}
