import { Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero, Section } from "@/components/PageHero";
import { CategoryCard, type CategoryCardProps } from "@/components/CategoryCard";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { FinalCta } from "@/components/FinalCta";
import { ChevronRight } from "lucide-react";

export interface HubPageProps {
  title: string;
  kicker?: string;
  lead?: string;
  image: string;
  imageAlt: string;
  intro?: string;
  cards: CategoryCardProps[];
  faq?: FaqItem[];
  ctaText: string;
}

export function HubPage(p: HubPageProps) {
  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 pt-6 text-sm text-muted-foreground">
        <nav className="flex items-center gap-1">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{p.title}</span>
        </nav>
      </div>
      <PageHero kicker={p.kicker ?? "Раздел каталога"} title={p.title} lead={p.lead} image={p.image} imageAlt={p.imageAlt} />

      {p.intro && (
        <Section>
          <p className="max-w-3xl text-base leading-relaxed text-foreground/90">{p.intro}</p>
        </Section>
      )}

      <Section className={p.intro ? "border-t border-border" : ""}>
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">Что в этом разделе</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {p.cards.map((c) => <CategoryCard key={c.to} {...c} />)}
        </div>
      </Section>

      {p.faq && p.faq.length > 0 && (
        <Section className="border-t border-border">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">Частые вопросы</h2>
          <div className="mt-4"><FaqAccordion items={p.faq} /></div>
        </Section>
      )}

      <Section>
        <FinalCta title="Готовы оформить заказ?" subtitle="Напишите в WhatsApp — подскажем, что подойдёт именно вам." text={p.ctaText} />
      </Section>
    </PageShell>
  );
}
