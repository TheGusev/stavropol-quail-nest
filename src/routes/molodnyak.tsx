import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero, Section, Prose } from "@/components/PageHero";
import { CtaButtons } from "@/components/CtaButtons";
import { FaqAccordion, faqJsonLd, type FaqItem } from "@/components/FaqAccordion";
import { buildHead, jsonLdScript } from "@/lib/seo";
import catBirds from "@/assets/cat-birds.jpg";

const FAQ: FaqItem[] = [
  { q: "Какой возраст молодняка?", a: "Суточные перепелята и подрощенные птенцы 2–4 недель. Уточняйте наличие при заказе." },
  { q: "Делаете ли вы предзаказ?", a: "Да, молодняк поставляется по предварительному заказу за 1–2 недели." },
  { q: "Даёте ли рекомендации по содержанию?", a: "Да, при покупке делимся памяткой по кормлению, температуре и освещению." },
];

export const Route = createFileRoute("/molodnyak")({
  head: () => ({
    ...buildHead({
      title: "Молодняк перепелов — суточные и подрощенные птенцы",
      description:
        "Суточные перепелята и подрощенный молодняк по предварительному заказу. Здоровая птица с фермы в Ставропольском крае.",
      path: "/molodnyak/",
    }),
    scripts: [jsonLdScript(faqJsonLd(FAQ))],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero kicker="Категория" title="Молодняк перепелов" lead="Суточные и подрощенные перепелята по предварительному заказу." image={catBirds} imageAlt="Перепелята" />
      <Section>
        <div className="grid gap-8 md:grid-cols-[1fr,320px]">
          <Prose>
            <p>
              Молодняк — для тех, кто заводит своих перепелов или развивает хозяйство. Здоровая птица, проверенные
              линии, рекомендации по содержанию.
            </p>
            <h2>Что мы предлагаем</h2>
            <ul>
              <li>Суточные перепелята</li>
              <li>Подрощенный молодняк 2–4 недель</li>
              <li>Рекомендации по кормлению и условиям</li>
            </ul>
            <p className="rounded-xl bg-secondary/60 p-4 text-sm text-muted-foreground">
              Поставка — по запросу. Согласуем дату, объём и способ передачи.
            </p>
          </Prose>
          <aside className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <div>
              <div className="text-sm text-muted-foreground">Цена</div>
              <div className="font-serif text-2xl font-semibold">по запросу</div>
            </div>
            <CtaButtons text="Здравствуйте! Хочу заказать молодняк перепелов." />
          </aside>
        </div>
      </Section>
      <Section className="border-t border-border">
        <h2 className="font-serif text-2xl font-semibold">Вопросы и ответы</h2>
        <div className="mt-4"><FaqAccordion items={FAQ} /></div>
      </Section>
    </PageShell>
  );
}
