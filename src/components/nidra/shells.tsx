import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Blobs, Wordmark } from "./atoms";
import { cn } from "@/lib/utils";
import nightBg from "@/assets/nidra-bg.jpg";

const appNav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/check-in", label: "Check-in" },
  { to: "/insights", label: "Insights" },
  { to: "/night", label: "Night Mode" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Blobs />
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6 sm:py-2.5">
          <Link to="/" aria-label="NIDRA home">
            <Wordmark />
          </Link>
          <nav className="flex items-center gap-1 overflow-x-auto text-sm">
            {appNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="whitespace-nowrap rounded-xl px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "bg-muted text-foreground font-medium" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">{children}</main>
    </div>
  );
}

export function NightShell({
  children,
  className,
  containerClassName,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <div className="dark">
      <div
        className={cn(
          "relative min-h-screen overflow-hidden bg-background text-foreground",
          className,
        )}
        style={{ backgroundImage: "linear-gradient(160deg, #0F172A, #1b1b4d 70%, #312E81)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-55"
          style={{ backgroundImage: `url(${nightBg})` }}
        />
        <Blobs variant="night" />
        <div
          className={cn("mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8", containerClassName)}
        >
          <div className="flex items-center justify-between">
            <Link
              to="/dashboard"
              className="inline-block transition-opacity hover:opacity-90"
              aria-label="Back to dashboard"
            >
              <Wordmark />
            </Link>
            <Link
              to="/dashboard"
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Exit to Dashboard
            </Link>
          </div>
          <div className="mt-8 sm:mt-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
