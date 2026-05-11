import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero, Section, Prose } from "@/components/PageHero";
import { CtaButtons } from "@/components/CtaButtons";
import { FaqAccordion, faqJsonLd, type FaqItem } from "@/components/FaqAccordion";
import { buildHead, jsonLdScript } from "@/lib/seo";
import catEggs from "@/assets/cat-eggs.jpg";

const FAQ: FaqItem[] = [
  { q: "Какой срок хранения у перепелиных яиц?", a: "До 60 дней при +2…+5 °C. Мы передаём яйца возрастом до 7 дней с даты сбора." },
  { q: "В какой упаковке вы продаёте?", a: "Картонные лотки по 20 шт., упаковки по 30 и 60 шт. Для опта — короба по 240 шт." },
  { q: "Можно ли заказать доставку на дом?", a: "Да, по Ставрополю и Михайловску — собственным курьером. Минимальный заказ обсуждаем при оформлении." },
  { q: "Чем перепелиные яйца отличаются от куриных?", a: "Они мельче, насыщеннее по составу, не вызывают сальмонеллёза и подходят для детского и диетического питания." },
];

export const Route = createFileRoute("/perepelinye-yaytsa")({
  head: () => ({
    ...buildHead({
      title: "Перепелиные яйца от фермы — купить в Ставропольском крае",
      description:
        "Свежие пищевые перепелиные яйца с собственной фермы. Лотки 20 шт., упаковки 30 и 60 шт. Доставка по Ставрополю и краю, опт.",
      path: "/perepelinye-yaytsa/",
    }),
    scripts: [jsonLdScript(faqJsonLd(FAQ))],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero kicker="Категория" title="Перепелиные яйца" lead="Свежие пищевые яйца с фермы. Возраст до 7 дней, удобная упаковка, доставка по краю." image={catEggs} imageAlt="Перепелиные яйца" />
      <Section>
        <div className="grid gap-8 md:grid-cols-[1fr,320px]">
          <Prose>
            <p>
              Перепелиные яйца — натуральный продукт ежедневного спроса. Подходят для детского, диетического и
              спортивного питания, а также для приготовления блюд высокой кухни. Мы поставляем только свежие яйца с
              нашей фермы в Ставропольском крае: возраст до 7 дней с даты сбора.
            </p>
            <h2>Для кого подойдёт</h2>
            <ul>
              <li>Семьи с детьми и приверженцы здорового питания</li>
              <li>Кафе, рестораны, пекарни — стабильное качество и объём</li>
              <li>Фермерские лавки и магазины здорового питания</li>
            </ul>
            <h2>Условия хранения и доставки</h2>
            <ul>
              <li>Хранение: до 60 дней при +2…+5 °C</li>
              <li>Перевозка: в картонных лотках, защита от боя</li>
              <li>Доставка: Ставрополь и Михайловск — свой транспорт; край — ТК</li>
            </ul>
          </Prose>
          <aside className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <div>
              <div className="text-sm text-muted-foreground">Цена</div>
              <div className="font-serif text-2xl font-semibold">от 70 ₽ / лоток 20 шт.</div>
              <div className="mt-1 text-xs text-muted-foreground">Точная цена — при заказе, зависит от объёма.</div>
            </div>
            <CtaButtons text="Здравствуйте! Хочу заказать перепелиные яйца." />
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
