import { createFileRoute } from "@tanstack/react-router";
import { OurBirds } from "@/components/BreedGallery";
import { BreedPriceGrid, EGG_BREEDS } from "@/components/BreedPrices";
import { PageShell } from "@/components/PageShell";
import { PageHero, Section, Prose } from "@/components/PageHero";
import { PackagingCard } from "@/components/PackagingCard";
import { HowToOrder } from "@/components/HowToOrder";
import { FinalCta } from "@/components/FinalCta";
import { FaqAccordion, faqJsonLd, type FaqItem } from "@/components/FaqAccordion";
import { buildHead, jsonLdScript } from "@/lib/seo";
import { SITE_URL, SITE_NAME } from "@/lib/contacts";
import catIncubation from "@/assets/cat-incubation.jpg";
import { Egg, Thermometer, ShieldCheck, Truck } from "lucide-react";

const FAQ: FaqItem[] = [
  { q: "Какой процент оплода вы гарантируете?", a: "В среднем 80–90% при соблюдении режима инкубации. Мы отбираем яйцо по размеру, чистоте и форме." },
  { q: "Какой срок годности инкубационного яйца?", a: "Оптимально заложить в инкубатор в течение 7 дней с даты сбора. Храним при +10…+12 °C." },
  { q: "Можно ли отправить инкубационное яйцо в другой регион?", a: "Да, отправляем транспортной компанией в спецупаковке. Сохранность и аккуратность гарантируем." },
  { q: "Какие породы и почём?", a: "Яичные: Феникс золотистый 13–14 ₽, Фараон 15 ₽, Саладон 15 ₽. Мясные: Техас утяжелённый 11 ₽, Дмитровская 15 ₽, Радонежская 15 ₽ за штуку." },
  { q: "Даёте ли рекомендации по инкубации?", a: "Да, к каждой партии прикладываем памятку: режимы температуры, влажности, переворота и периоды." },
];

const PACKAGES = [
  { title: "Партия 50 шт.", description: "Для домашнего инкубатора и пробной закладки.", price: "от 600 ₽", note: "за партию", waText: "Здравствуйте! Хочу заказать инкубационное яйцо перепела, 50 шт." },
  { title: "Партия 100 шт.", description: "Стандартная партия для опытных птицеводов.", price: "от 1100 ₽", note: "за партию", badge: "популярное", waText: "Здравствуйте! Хочу заказать инкубационное яйцо перепела, 100 шт." },
  { title: "Партия 200 шт.", description: "Для расширения поголовья и небольших ферм.", price: "от 2100 ₽", note: "за партию", waText: "Здравствуйте! Хочу заказать инкубационное яйцо перепела, 200 шт." },
];

export const Route = createFileRoute("/inkubatsionnoe-yaytso")({
  head: () => {
    const products = PACKAGES.map((p) => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: `Инкубационное яйцо перепела — ${p.title}`,
      description: p.description,
      brand: { "@type": "Brand", name: SITE_NAME },
      image: `${SITE_URL}/og-inkubatsionnoe-yaytso.jpg`,
      offers: {
        "@type": "Offer",
        priceCurrency: "RUB",
        price: p.price.replace(/[^0-9]/g, ""),
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/inkubatsionnoe-yaytso/`,
      },
    }));
    return {
      ...buildHead({
        title: "Инкубационное перепелиное яйцо — Ставропольский край",
        description:
          "Племенное инкубационное яйцо перепела с высоким процентом оплода. Отбор по размеру и форме, доставка по краю и в регионы.",
        path: "/inkubatsionnoe-yaytso/",
      }),
      scripts: [jsonLdScript(faqJsonLd(FAQ)), ...products.map(jsonLdScript)],
    };
  },
  component: Page,
});

const TRUST = [
  { icon: Egg, label: "Отбор по форме и размеру" },
  { icon: ShieldCheck, label: "Контроль здоровья стада" },
  { icon: Thermometer, label: "Хранение +10…+12 °C" },
  { icon: Truck, label: "Отправка по регионам" },
];

function Page() {
  return (
    <PageShell>
      <PageHero kicker="Категория" title="Инкубационное яйцо" lead="Племенное яйцо для вывода. Высокий процент оплода и аккуратная упаковка." image={catIncubation} imageAlt="Инкубационное яйцо перепела" />

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
              Инкубационное перепелиное яйцо — для тех, кто заводит собственную птицу или расширяет хозяйство.
              Мы работаем с проверенными линиями, контролируем кормление и здоровье родительского стада, отбираем
              яйцо по форме, размеру и чистоте скорлупы.
            </p>
            <h2>Что входит в поставку</h2>
            <ul>
              <li>Отобранное яйцо в спецлотках</li>
              <li>Памятка по режиму инкубации</li>
              <li>Возможность отправки ТК в другие регионы</li>
            </ul>
            <h2>Условия хранения и транспортировки</h2>
            <ul>
              <li>Закладка в инкубатор — в течение 7 дней с даты сбора</li>
              <li>Хранение: +10…+12 °C, влажность 70–80%</li>
              <li>Перевозка — в спецлотках с дополнительной защитой</li>
            </ul>
          </Prose>
        </div>
      </Section>

      <Section className="border-t border-border">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">Породы и цены за штуку</h2>
        <p className="mt-2 text-muted-foreground">Инкубационное яйцо с нашей фермы. Стабильный вывод — около 90%.</p>
        <div className="mt-6"><BreedPriceGrid breeds={EGG_BREEDS} product="инкубационное яйцо" /></div>
        <div className="mt-10"><OurBirds /></div>
      </Section>

      <Section className="border-t border-border">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">Партии и цены</h2>
        <p className="mt-2 text-muted-foreground">Цены ориентировочные, зависят от породы и сезона.</p>
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

      <Section><FinalCta title="Заказать инкубационное яйцо" subtitle="Согласуем партию, упаковку и доставку — напишите нам." text="Здравствуйте! Хочу заказать инкубационное яйцо перепела." /></Section>
    </PageShell>
  );
}
