import { cn } from "@/lib/utils";

/** Extremely slow, heavily blurred gradient fields + faint particles. */
export function Ambient({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="absolute -left-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-secondary/12 blur-[120px] animate-drift" />
      <div className="absolute -right-44 top-40 h-[38rem] w-[38rem] rounded-full bg-primary/10 blur-[130px] animate-drift-slow" />
      <div className="absolute bottom-[-14rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-teal/10 blur-[120px] animate-drift" />
      <Particles />
    </div>
  );
}

const PARTICLES: Array<[number, number, number, number]> = [
  [6, 12, 2, 0],
  [18, 34, 1.5, 3],
  [31, 8, 2.2, 6],
  [44, 22, 1.6, 1.5],
  [57, 40, 2, 4.5],
  [69, 14, 1.7, 7],
  [82, 28, 2.1, 2.2],
  [93, 9, 1.5, 5.4],
  [12, 62, 1.8, 8],
  [37, 74, 1.5, 2.8],
  [64, 66, 2, 6.4],
  [88, 80, 1.6, 4],
];

export function Particles({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0", className)} aria-hidden="true">
      {PARTICLES.map(([x, y, s, d], i) => (
        <span
          key={i}
          className="absolute rounded-full bg-secondary/40 animate-twinkle"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: s,
            height: s,
            animationDelay: `${d}s`,
            animationDuration: "14s",
          }}
        />
      ))}
    </div>
  );
}
