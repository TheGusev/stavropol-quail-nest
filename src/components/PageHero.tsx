import type { ReactNode } from "react";

/** Заголовок страницы: текст сверху, фото целиком под ним — без затемнения. */
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
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto grid max-w-5xl items-center gap-6 px-4 py-8 md:grid-cols-2 md:py-12">
        <div>
          {kicker && (
            <div className="text-sm font-semibold uppercase tracking-wider text-primary animate-fade-in" style={{ animationFillMode: "both" }}>
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
            <p className="mt-3 text-lg text-foreground/85 animate-fade-in" style={{ animationDelay: "160ms", animationFillMode: "both" }}>
              {lead}
            </p>
          )}
        </div>
        {image && (
          <img
            src={image}
            alt={imageAlt ?? ""}
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-md animate-fade-in"
            style={{ animationDelay: "200ms", animationFillMode: "both" }}
          />
        )}
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-5xl px-4 py-10 ${className}`}>{children}</section>;
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 text-[17px] leading-relaxed text-foreground/90 md:text-lg [&>h2]:mt-8 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-semibold [&>h3]:mt-6 [&>h3]:font-serif [&>h3]:text-xl [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:my-1">
      {children}
    </div>
  );
}
