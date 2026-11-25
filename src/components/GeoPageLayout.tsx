import type { ReactNode } from "react";
import { PageShell } from "./PageShell";
import { PageHero, Section, Prose } from "./PageHero";
import { CtaButtons } from "./CtaButtons";
import { FaqAccordion, type FaqItem } from "./FaqAccordion";

export function GeoPageLayout({
  city,
  region = "Ставропольский край",
  intro,
  body,
  faq,
}: {
  city: string;
  region?: string;
  intro: string;
  body: ReactNode;
  faq: FaqItem[];
}) {
  return (
    <PageShell>
      <PageHero kicker={`${region} · Доставка по всей России`} title={`Инкубационные яйца, перепелята и тушки в ${city}`} lead={intro} />
      <Section>
        <Prose>{body}</Prose>
        <div className="mt-8"><CtaButtons text={`Здравствуйте! Интересуют инкубационные яйца, перепелята или тушки. Доставка: ${city}.`} /></div>
      </Section>
      <Section className="border-t border-border">
        <h2 className="font-serif text-2xl font-semibold">Частые вопросы — {city}</h2>
        <div className="mt-4"><FaqAccordion items={faq} /></div>
      </Section>
    </PageShell>
  );
}
