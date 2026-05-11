import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero, Section, Prose } from "@/components/PageHero";
import { PackagingCard } from "@/components/PackagingCard";
import { HowToOrder } from "@/components/HowToOrder";
import { FinalCta } from "@/components/FinalCta";
import { FaqAccordion, faqJsonLd, type FaqItem } from "@/components/FaqAccordion";
import { buildHead, jsonLdScript } from "@/lib/seo";
import { SITE_URL, SITE_NAME } from "@/lib/contacts";
import catEggs from "@/assets/cat-eggs.jpg";
import { Sprout, ShieldCheck, Snowflake, Package } from "lucide-react";

const FAQ: FaqItem[] = [
  { q: "Какой срок хранения у перепелиных яиц?", a: "До 60 дней при +2…+5 °C. Мы передаём яйца возрастом до 7 дней с даты сбора." },
  { q: "В какой упаковке вы продаёте?", a: "Картонные лотки по 20 шт., упаковки по 30 и 60 шт. Для опта — короба по 240 шт." },
  { q: "Можно ли заказать доставку на дом?", a: "Да, по Ставрополю и Михайловску — собственным курьером. Минимальный заказ обсуждаем при оформлении." },
  { q: "Чем перепелиные яйца отличаются от куриных?", a: "Они мельче, насыщеннее по составу, не вызывают сальмонеллёза и подходят для детского и диетического питания." },
  { q: "Можно ли есть перепелиные яйца сырыми?", a: "Перепела практически не болеют сальмонеллёзом, поэтому такие яйца традиционно считают пригодными для употребления сырыми." },
  { q: "Сколько яиц в день можно есть взрослому?", a: "Обычно рекомендуют 4–6 шт. в день для взрослого здорового человека." },
];

const PACKAGES = [
  { title: "Лоток 20 шт.", description: "Удобный формат для семьи — на 4–5 дней.", price: "от 70 ₽", note: "за лоток", waText: "Здравствуйте! Хочу заказать перепелиные яйца, лоток 20 шт." },
  { title: "Упаковка 30 шт.", description: "Оптимально для активных семей и небольших кафе.", price: "от 100 ₽", note: "за упаковку", badge: "популярное", waText: "Здравствуйте! Хочу заказать перепелиные яйца, упаковка 30 шт." },
  { title: "Упаковка 60 шт.", description: "Для регулярного потребления и пекарен.", price: "от 195 ₽", note: "за упаковку", waText: "Здравствуйте! Хочу заказать перепелиные яйца, упаковка 60 шт." },
];

export const Route = createFileRoute("/perepelinye-yaytsa")({
  head: () => {
    const products = PACKAGES.map((p) => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: `Перепелиные яйца — ${p.title}`,
      description: p.description,
      brand: { "@type": "Brand", name: SITE_NAME },
      image: `${SITE_URL}/og-perepelinye-yaytsa.jpg`,
      offers: {
        "@type": "Offer",
        priceCurrency: "RUB",
        price: p.price.replace(/[^0-9]/g, ""),
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/perepelinye-yaytsa/`,
      },
    }));
    return {
      ...buildHead({
        title: "Перепелиные яйца от фермы — купить в Ставропольском крае",
        description:
          "Свежие пищевые перепелиные яйца с собственной фермы. Лотки 20 шт., упаковки 30 и 60 шт. Доставка по Ставрополю и краю, опт.",
        path: "/perepelinye-yaytsa/",
      }),
      scripts: [jsonLdScript(faqJsonLd(FAQ)), ...products.map(jsonLdScript)],
    };
  },
  component: Page,
});

const TRUST = [
  { icon: Sprout, label: "Возраст до 7 дней" },
  { icon: ShieldCheck, label: "Своя ферма" },
  { icon: Snowflake, label: "Хранение +2…+5 °C" },
  { icon: Package, label: "Защита от боя" },
];

function Page() {
  return (
    <PageShell>
      <PageHero kicker="Категория" title="Перепелиные яйца" lead="Свежие пищевые яйца с фермы. Возраст до 7 дней, удобная упаковка, доставка по краю." image={catEggs} imageAlt="Перепелиные яйца" />

      <Section>
        <div className="flex flex-wrap gap-3">
          {TRUST.map((t) => (
            <span key={t.label} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium">
              <t.icon className="h-4 w-4 text-primary" /> {t.label}
            </span>
          ))}
        </div>
        <div className="mt-8">
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
        </div>
      </Section>

      <Section className="border-t border-border">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">Фасовки и цены</h2>
        <p className="mt-2 text-muted-foreground">Цены ориентировочные, точную сумму подтвердим при заказе.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((p) => <PackagingCard key={p.title} {...p} />)}
        </div>
      </Section>

      <Section className="border-t border-border">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">Как заказать</h2>
        <div className="mt-6"><HowToOrder /></div>
      </Section>

      <Section className="border-t border-border">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">Вопросы и ответы</h2>
        <div className="mt-4"><FaqAccordion items={FAQ} /></div>
      </Section>

      <Section><FinalCta title="Заказать перепелиные яйца" subtitle="WhatsApp — самый быстрый способ. Согласуем заказ за пару минут." text="Здравствуйте! Хочу заказать перепелиные яйца." /></Section>
    </PageShell>
  );
}
