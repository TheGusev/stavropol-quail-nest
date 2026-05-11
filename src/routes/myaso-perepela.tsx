import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero, Section, Prose } from "@/components/PageHero";
import { CtaButtons } from "@/components/CtaButtons";
import { FaqAccordion, faqJsonLd, type FaqItem } from "@/components/FaqAccordion";
import { buildHead, jsonLdScript } from "@/lib/seo";
import catMeat from "@/assets/cat-meat.jpg";

const FAQ: FaqItem[] = [
  { q: "Свежее или замороженное мясо?", a: "По умолчанию — охлаждённое, без заморозки. По запросу можем заморозить." },
  { q: "Какой вес тушки?", a: "Стандартная тушка — 220–280 г. Возможна разделка по запросу." },
  { q: "Можно ли заказать партию для ресторана?", a: "Да, регулярные поставки HoReCa — спецусловия и графики. Напишите в WhatsApp или на странице «Опт»." },
];

export const Route = createFileRoute("/myaso-perepela")({
  head: () => ({
    ...buildHead({
      title: "Мясо перепела охлаждённое — купить в Ставропольском крае",
      description:
        "Охлаждённые тушки перепела 220–280 г с собственной фермы. Без заморозки, разделка на заказ, доставка по краю и опт для HoReCa.",
      path: "/myaso-perepela/",
    }),
    scripts: [jsonLdScript(faqJsonLd(FAQ))],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero kicker="Категория" title="Мясо перепела" lead="Охлаждённые тушки 220–280 г. Без заморозки, нежное и диетическое." image={catMeat} imageAlt="Тушки перепела" />
      <Section>
        <div className="grid gap-8 md:grid-cols-[1fr,320px]">
          <Prose>
            <p>
              Перепелиное мясо — деликатес и ценный диетический продукт. Низкое содержание жира, мягкий вкус,
              быстрое приготовление. Поставляем в охлаждённом виде, без заморозки и без хлорной обработки.
            </p>
            <h2>Для кого подойдёт</h2>
            <ul>
              <li>Семьи, выбирающие натуральные продукты</li>
              <li>Рестораны и кафе авторской кухни</li>
              <li>Фермерские магазины и лавки деликатесов</li>
            </ul>
            <h2>Условия хранения и доставки</h2>
            <ul>
              <li>Срок реализации охлаждённого мяса — 5 суток при +2…+4 °C</li>
              <li>Доставка в термобоксах с хладоэлементами</li>
            </ul>
          </Prose>
          <aside className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <div>
              <div className="text-sm text-muted-foreground">Цена</div>
              <div className="font-serif text-2xl font-semibold">от 220 ₽ / тушка</div>
              <div className="mt-1 text-xs text-muted-foreground">Точная цена — по объёму партии.</div>
            </div>
            <CtaButtons text="Здравствуйте! Хочу заказать мясо перепела." />
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
