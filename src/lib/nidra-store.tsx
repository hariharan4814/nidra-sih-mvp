import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { BarrierId } from "./nidra-data";

type CheckIn = { anxiety: number; mood: string; energy: number; focus: number };

type NidraState = {
  barrier: BarrierId | null;
  setBarrier: (b: BarrierId | null) => void;
  note: string;
  setNote: (n: string) => void;
  checkIn: CheckIn;
  setCheckIn: (c: CheckIn) => void;
  intensity: number;
  setIntensity: (v: number) => void;
  feedback: string | null;
  setFeedback: (f: string) => void;
};

const Ctx = createContext<NidraState | null>(null);

export function NidraProvider({ children }: { children: ReactNode }) {
  const [barrier, setBarrier] = useState<BarrierId | null>("tomorrow-worry");
  const [note, setNote] = useState(
    "I have a presentation tomorrow and I can't stop thinking that I'll mess it up.",
  );
  const [intensity, setIntensity] = useState(7);
  const [checkIn, setCheckIn] = useState<CheckIn>({
    anxiety: 6,
    mood: "Okay",
    energy: 5,
    focus: 5,
  });
  const [feedback, setFeedback] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      barrier,
      setBarrier,
      note,
      setNote,
      intensity,
      setIntensity,
      checkIn,
      setCheckIn,
      feedback,
      setFeedback,
    }),
    [barrier, note, intensity, checkIn, feedback],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useNidra() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useNidra must be used within NidraProvider");
  return ctx;
}
