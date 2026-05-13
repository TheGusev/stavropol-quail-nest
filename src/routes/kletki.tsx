import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero, Section, Prose } from "@/components/PageHero";
import { PackagingCard } from "@/components/PackagingCard";
import { HowToOrder } from "@/components/HowToOrder";
import { FinalCta } from "@/components/FinalCta";
import { FaqAccordion, faqJsonLd, type FaqItem } from "@/components/FaqAccordion";
import { buildHead, jsonLdScript } from "@/lib/seo";
import catCages from "@/assets/cat-cages.jpg";
import { ShieldCheck, Truck, Wrench, Hammer } from "lucide-react";

const FAQ: FaqItem[] = [
  { q: "Из чего сделаны клетки?", a: "Каркас и сетка — оцинкованная сталь, поддоны для помёта — оцинковка или пластик. Долговечно, не ржавеет." },
  { q: "Есть ли поилки и кормушки в комплекте?", a: "Да, в базовый комплект входят ниппельные поилки и навесные кормушки. Можно докомплектовать каплеуловителями." },
  { q: "Можно ли установить дома или в гараже?", a: "Да, клетки рассчитаны на содержание в помещении. Размеры подбираются под ваше пространство." },
  { q: "Как доставляете?", a: "По Ставрополю и Михайловску — своим транспортом. По краю и РФ — транспортной компанией. Возможен самовывоз." },
  { q: "Делаете ли клетки под заказ?", a: "Да, изготавливаем по индивидуальным размерам — на нужное поголовье и под ваше помещение." },
  { q: "Есть ли опт?", a: "Да, для фермерских хозяйств — спецусловия от 5 шт. Уточняйте в WhatsApp." },
];

const PACKAGES = [
  {
    title: "Клетка на 20 голов",
    description: "Компактная одноярусная клетка для домашнего содержания. С поддоном, поилкой и кормушкой.",
    price: "по запросу",
    note: "65×45×30 см, оцинкованная сетка",
    waText: "Здравствуйте! Хочу клетку для перепелов на 20 голов.",
  },
  {
    title: "Батарея на 50 голов",
    description: "Двухъярусная клеточная батарея для небольшого хозяйства. Удобный сбор яиц, ниппельные поилки.",
    price: "по запросу",
    note: "100×55×80 см, 2 яруса",
    badge: "хит продаж",
    waText: "Здравствуйте! Хочу клеточную батарею для перепелов на 50 голов.",
  },
  {
    title: "Батарея на 100 голов",
    description: "Трёхъярусная промышленная батарея. Автопоилки, выкатные поддоны, отдельный приёмник яиц.",
    price: "по запросу",
    note: "120×60×120 см, 3 яруса",
    waText: "Здравствуйте! Хочу клеточную батарею для перепелов на 100 голов.",
  },
  {
    title: "Брудер для молодняка",
    description: "Тёплая клетка для суточных перепелят с лампой обогрева и мелкой сеткой.",
    price: "по запросу",
    note: "до 100 птенцов, с обогревом",
    waText: "Здравствуйте! Хочу брудер для молодняка перепелов.",
  },
];

export const Route = createFileRoute("/kletki")({
  head: () => ({
    ...buildHead({
      title: "Клетки для перепелов — производство и продажа в Ставропольском крае",
      description:
        "Клетки и клеточные батареи для перепелов на 20, 50, 100 голов. Брудеры для молодняка. Оцинкованная сталь, доставка по краю и РФ.",
      path: "/kletki/",
    }),
    scripts: [jsonLdScript(faqJsonLd(FAQ))],
  }),
  component: Page,
});

const TRUST = [
  { icon: ShieldCheck, label: "Оцинкованная сталь" },
  { icon: Wrench, label: "Под ваши размеры" },
  { icon: Hammer, label: "Сборка за час" },
  { icon: Truck, label: "Доставка по РФ" },
];

function Page() {
  return (
    <PageShell>
      <PageHero
        kicker="Категория"
        title="Клетки для перепелов"
        lead="Готовые клетки и клеточные батареи на 20–100 голов. Производство, доставка и сборка."
        image={catCages}
        imageAlt="Клеточная батарея для перепелов"
      />

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
              Делаем клетки для перепелов на собственной ферме — для себя и для тех, кто заводит птицу.
              Знаем, какие нужны размеры, какая сетка удобна для уборки, где должен быть приёмник яиц.
            </p>
            <h2>Что мы предлагаем</h2>
            <ul>
              <li>Готовые клетки и батареи — от 20 до 100 голов в одном модуле</li>
              <li>Брудеры для суточных перепелят с обогревом</li>
              <li>Изготовление под индивидуальные размеры помещения</li>
              <li>Комплектация — поилки, кормушки, поддоны, приёмники яиц</li>
            </ul>
            <h2>Материалы и комплектация</h2>
            <ul>
              <li>Каркас и сетка — оцинкованная сталь, не ржавеет</li>
              <li>Поддоны — оцинковка или пищевой пластик</li>
              <li>Ниппельные поилки и навесные кормушки в комплекте</li>
              <li>Сборные конструкции — собирается за 30–60 минут</li>
            </ul>
          </Prose>
        </div>
      </Section>

      <Section className="border-t border-border">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">Модели клеток</h2>
        <p className="mt-2 text-muted-foreground">Цены — индивидуально, зависят от комплектации и объёма заказа.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
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

      <Section>
        <FinalCta
          title="Подобрать клетку"
          subtitle="Расскажите о своём поголовье и помещении — подберём подходящую модель."
          text="Здравствуйте! Хочу подобрать клетку для перепелов."
        />
      </Section>
    </PageShell>
  );
}
