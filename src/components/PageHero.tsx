import type { ReactNode } from "react";

export function PageHero({
  kicker,
  title,
  lead,
  image,
  imageAlt,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/40">
      {image && (
        <>
          <div className="absolute inset-0 -z-10">
            <img
              src={image}
              alt={imageAlt ?? ""}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />
        </>
      )}
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div>
          {kicker && (
            <div
              className="text-xs font-medium uppercase tracking-wider text-primary animate-fade-in"
              style={{ animationFillMode: "both" }}
            >
              {kicker}
            </div>
          )}
          <h1
            className="mt-2 font-serif text-3xl font-bold leading-tight text-foreground animate-fade-in md:text-5xl"
            style={{ animationDelay: "80ms", animationFillMode: "both" }}
          >
            {title}
          </h1>
          {lead && (
            <p
              className="mt-3 max-w-2xl text-lg text-foreground/80 animate-fade-in"
              style={{ animationDelay: "180ms", animationFillMode: "both" }}
            >
              {lead}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-5xl px-4 py-12 ${className}`}>{children}</section>;
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-foreground/90 [&>h2]:mt-8 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-semibold [&>h3]:mt-6 [&>h3]:font-serif [&>h3]:text-xl [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:my-1">
      {children}
    </div>
  );
}
