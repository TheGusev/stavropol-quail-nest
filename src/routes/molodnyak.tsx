import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero, Section, Prose } from "@/components/PageHero";
import { PackagingCard } from "@/components/PackagingCard";
import { HowToOrder } from "@/components/HowToOrder";
import { FinalCta } from "@/components/FinalCta";
import { FaqAccordion, faqJsonLd, type FaqItem } from "@/components/FaqAccordion";
import { buildHead, jsonLdScript } from "@/lib/seo";
import catBirds from "@/assets/cat-birds.jpg";
import { Bird, ShieldCheck, BookOpen, Calendar } from "lucide-react";

const FAQ: FaqItem[] = [
  { q: "Какой возраст молодняка?", a: "Суточные перепелята и подрощенные птенцы 2–4 недель. Уточняйте наличие при заказе." },
  { q: "Делаете ли вы предзаказ?", a: "Да, молодняк поставляется по предварительному заказу за 1–2 недели." },
  { q: "Даёте ли рекомендации по содержанию?", a: "Да, при покупке делимся памяткой по кормлению, температуре и освещению." },
  { q: "Как перевозить молодняк?", a: "В вентилируемых картонных коробках с подстилкой. Рекомендуем личный транспорт или короткую дистанцию." },
  { q: "Как определяется пол?", a: "У суточных птенцов пол не определяется визуально, у подрощенных — приблизительно по оперению. Точно — после 4–5 недель." },
];

const PACKAGES = [
  { title: "Суточные перепелята", description: "Только что вылупившиеся птенцы. Самый экономичный вариант для опытных птицеводов.", price: "по запросу", note: "минимальная партия — 30 шт.", waText: "Здравствуйте! Хочу заказать суточных перепелят." },
  { title: "Подрощенные 2 недели", description: "Прошли первый критический период, проще в содержании.", price: "по запросу", note: "минимальная партия — 20 шт.", badge: "проще в выращивании", waText: "Здравствуйте! Хочу заказать подрощенный молодняк перепелов 2 недели." },
  { title: "Подрощенные 4 недели", description: "Готовы к переезду на постоянное место содержания, скоро начнут нестись.", price: "по запросу", note: "минимальная партия — 20 шт.", waText: "Здравствуйте! Хочу заказать подрощенный молодняк перепелов 4 недели." },
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

const TRUST = [
  { icon: Bird, label: "Здоровая птица" },
  { icon: ShieldCheck, label: "Контроль линии" },
  { icon: BookOpen, label: "Памятка по уходу" },
  { icon: Calendar, label: "По предзаказу" },
];

function Page() {
  return (
    <PageShell>
      <PageHero kicker="Категория" title="Молодняк перепелов" lead="Суточные и подрощенные перепелята по предварительному заказу." image={catBirds} imageAlt="Перепелята" />

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
              Молодняк — для тех, кто заводит своих перепелов или развивает хозяйство. Здоровая птица,
              проверенные линии, рекомендации по содержанию.
            </p>
            <h2>Что мы предлагаем</h2>
            <ul>
              <li>Суточные перепелята — для опытных птицеводов</li>
              <li>Подрощенный молодняк 2–4 недель — проще в содержании</li>
              <li>Памятка по кормлению, температуре и освещению</li>
            </ul>
            <h2>Условия заказа</h2>
            <ul>
              <li>Поставка — по предварительному заказу за 1–2 недели</li>
              <li>Передача — самовывоз с фермы или согласование транспорта</li>
              <li>Сезон — обычно с весны по осень, зимой — по запросу</li>
            </ul>
          </Prose>
        </div>
      </Section>

      <Section className="border-t border-border">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">Варианты молодняка</h2>
        <p className="mt-2 text-muted-foreground">Цены — индивидуально, зависят от объёма и сезона.</p>
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

      <Section><FinalCta title="Оставить заявку на молодняк" subtitle="Согласуем дату, объём и возраст птицы." text="Здравствуйте! Хочу заказать молодняк перепелов." /></Section>
    </PageShell>
  );
}
