import { Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero, Section, Prose } from "@/components/PageHero";
import { PackagingCard, type PackagingCardProps } from "@/components/PackagingCard";
import { HowToOrder } from "@/components/HowToOrder";
import { FinalCta } from "@/components/FinalCta";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { ChevronRight } from "lucide-react";

export interface SubcategoryPageProps {
  group: { label: string; to: string };
  kicker?: string;
  title: string;
  lead?: string;
  image: string;
  imageAlt: string;
  intro: React.ReactNode;
  variants?: PackagingCardProps[];
  variantsTitle?: string;
  variantsNote?: string;
  faq?: FaqItem[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaText: string;
}

export function Breadcrumbs({ group, current }: { group: { label: string; to: string }; current: string }) {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 text-sm text-muted-foreground">
      <nav className="flex flex-wrap items-center gap-1">
        <Link to="/" className="hover:text-primary">Главная</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to={group.to as "/catalog"} className="hover:text-primary">{group.label}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{current}</span>
      </nav>
    </div>
  );
}

export function SubcategoryPage(p: SubcategoryPageProps) {
  return (
    <PageShell>
      <Breadcrumbs group={p.group} current={p.title} />
      <PageHero kicker={p.kicker ?? "Подкатегория"} title={p.title} lead={p.lead} image={p.image} imageAlt={p.imageAlt} />

      <Section>
        <Prose>{p.intro}</Prose>
      </Section>

      {p.variants && p.variants.length > 0 && (
        <Section className="border-t border-border">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">{p.variantsTitle ?? "Варианты и цены"}</h2>
          {p.variantsNote && <p className="mt-2 text-muted-foreground">{p.variantsNote}</p>}
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.variants.map((v) => <PackagingCard key={v.title} {...v} />)}
          </div>
        </Section>
      )}

      <Section className="border-t border-border">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">Как заказать</h2>
        <div className="mt-6"><HowToOrder /></div>
      </Section>

      {p.faq && p.faq.length > 0 && (
        <Section className="border-t border-border">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">Вопросы и ответы</h2>
          <div className="mt-4"><FaqAccordion items={p.faq} /></div>
        </Section>
      )}

      <Section>
        <FinalCta title={p.ctaTitle ?? `Заказать: ${p.title}`} subtitle={p.ctaSubtitle} text={p.ctaText} />
      </Section>
    </PageShell>
  );
}
