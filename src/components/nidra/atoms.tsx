import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";

/* ---------------------------------- Logo --------------------------------- */

export function NidraLogo({ className, alt = "NIDRA Logo" }: { className?: string; alt?: string }) {
  return (
    <img
      src={logoImg}
      alt={alt}
      className={cn("h-8 md:h-9 w-auto object-contain shrink-0", className)}
      loading="eager"
    />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <NidraLogo className="h-8 md:h-9 w-auto max-h-9 object-contain" />
    </span>
  );
}

/* --------------------------------- Reveal -------------------------------- */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(className, shown ? "animate-rise" : "opacity-0")}
      style={shown ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* --------------------------------- Blobs --------------------------------- */

export function Blobs({ variant = "day" }: { variant?: "day" | "night" }) {
  const day = variant === "day";
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className={cn(
          "absolute -left-24 -top-24 h-[26rem] w-[26rem] rounded-full blur-3xl animate-blob",
          day ? "bg-secondary/20" : "bg-primary/25",
        )}
      />
      <div
        className={cn(
          "absolute -right-32 top-24 h-[30rem] w-[30rem] rounded-full blur-3xl animate-blob-slow",
          day ? "bg-teal/15" : "bg-teal/10",
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full blur-3xl animate-blob",
          day ? "bg-primary/12" : "bg-secondary/15",
        )}
      />
    </div>
  );
}

/* --------------------------------- Stars --------------------------------- */

const STARS: Array<[number, number, number, number]> = [
  [8, 18, 3.2, 0],
  [22, 8, 2.2, 1.4],
  [40, 26, 2.6, 3],
  [61, 12, 2, 2.2],
  [78, 30, 3, 4.5],
  [88, 14, 2.4, 1],
  [15, 62, 2.2, 5.2],
  [70, 68, 2.6, 2.8],
  [93, 55, 2, 3.9],
];

export function Stars({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      {STARS.map(([x, y, s, d], i) => (
        <span
          key={i}
          className="absolute rounded-full bg-secondary animate-twinkle"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: s,
            height: s,
            animationDelay: `${d}s`,
            boxShadow: "0 0 8px currentColor",
          }}
        />
      ))}
    </div>
  );
}

/* --------------------------------- Button -------------------------------- */

export function Btn({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline" | "teal";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-5 py-3 text-sm",
        size === "lg" && "px-7 py-4 text-base",
        variant === "primary" &&
          "gradient-primary text-primary-foreground shadow-soft hover:shadow-lift hover:-translate-y-0.5",
        variant === "teal" && "bg-teal text-teal-foreground hover:opacity-90",
        variant === "outline" &&
          "border border-border bg-card text-foreground hover:bg-muted hover:-translate-y-0.5",
        variant === "ghost" && "text-muted-foreground hover:text-foreground hover:bg-muted",
        className,
      )}
      {...props}
    />
  );
}

/* --------------------------------- Slider -------------------------------- */

export function ScaleSlider({
  label,
  value,
  onChange,
  lowLabel,
  highLabel,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  lowLabel: string;
  highLabel: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={label} className="text-base font-medium text-foreground">
          {label}
        </label>
        <span className="rounded-xl bg-muted px-3 py-1 text-sm font-semibold text-accent-foreground">
          {value} / 10
        </span>
      </div>
      <input
        id={label}
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-[#8B5CF6]"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}

/* --------------------------------- Card ---------------------------------- */

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("surface-card p-6", className)}>{children}</div>;
}

export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <Card className="transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        {icon ? <span className="text-primary">{icon}</span> : null}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </Card>
  );
}
