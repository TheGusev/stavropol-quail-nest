import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero, Section, Prose } from "@/components/PageHero";
import { CtaButtons } from "@/components/CtaButtons";
import { FaqAccordion, faqJsonLd, type FaqItem } from "@/components/FaqAccordion";
import { buildHead, jsonLdScript } from "@/lib/seo";
import catIncubation from "@/assets/cat-incubation.jpg";

const FAQ: FaqItem[] = [
  { q: "Какой процент оплода вы гарантируете?", a: "В среднем 80–90% при соблюдении режима инкубации. Мы отбираем яйцо по размеру, чистоте и форме." },
  { q: "Какой срок годности инкубационного яйца?", a: "Оптимально заложить в инкубатор в течение 7 дней с даты сбора. Храним при +10…+12 °C." },
  { q: "Можно ли отправить инкубационное яйцо в другой регион?", a: "Да, отправляем транспортной компанией в спецупаковке. Сохранность и аккуратность гарантируем." },
];

export const Route = createFileRoute("/inkubatsionnoe-yaytso")({
  head: () => ({
    ...buildHead({
      title: "Инкубационное перепелиное яйцо — Ставропольский край",
      description:
        "Племенное инкубационное яйцо перепела с высоким процентом оплода. Отбор по размеру и форме, доставка по краю и в регионы.",
      path: "/inkubatsionnoe-yaytso/",
    }),
    scripts: [jsonLdScript(faqJsonLd(FAQ))],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero kicker="Категория" title="Инкубационное яйцо" lead="Племенное яйцо для вывода. Высокий процент оплода и аккуратная упаковка." image={catIncubation} imageAlt="Инкубационное яйцо перепела" />
      <Section>
        <div className="grid gap-8 md:grid-cols-[1fr,320px]">
          <Prose>
            <p>
              Инкубационное перепелиное яйцо — для тех, кто заводит собственную птицу или расширяет хозяйство.
              Мы работаем с проверенными линиями, контролируем кормление и здоровье родительского стада, отбираем
              яйцо по форме, размеру и чистоте скорлупы.
            </p>
            <h2>Что входит в поставку</h2>
            <ul>
              <li>Отобранное яйцо в спецлотках</li>
              <li>Рекомендации по режиму инкубации</li>
              <li>Возможность отправки ТК в другие регионы</li>
            </ul>
            <h2>Условия хранения</h2>
            <ul>
              <li>Закладка в инкубатор — в течение 7 дней с даты сбора</li>
              <li>Хранение: +10…+12 °C, влажность 70–80%</li>
            </ul>
          </Prose>
          <aside className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <div>
              <div className="text-sm text-muted-foreground">Цена</div>
              <div className="font-serif text-2xl font-semibold">от 12 ₽ / шт.</div>
              <div className="mt-1 text-xs text-muted-foreground">Зависит от породы и партии — уточняйте.</div>
            </div>
            <CtaButtons text="Здравствуйте! Хочу заказать инкубационное яйцо." />
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
