import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { CategoryCard } from "@/components/CategoryCard";
import { PageHero, Section } from "@/components/PageHero";
import { buildHead } from "@/lib/seo";
import catEggs from "@/assets/cat-eggs.jpg";
import catIncubation from "@/assets/cat-incubation.jpg";
import catMeat from "@/assets/cat-meat.jpg";
import catBirds from "@/assets/cat-birds.jpg";

export const Route = createFileRoute("/catalog")({
  head: () =>
    buildHead({
      title: "Каталог — перепелиные яйца, мясо и молодняк",
      description:
        "Каталог продукции фермы: пищевые перепелиные яйца, инкубационное яйцо, мясо перепела и молодняк. Доставка по Ставропольскому краю.",
      path: "/catalog/",
    }),
  component: CatalogPage,
});

function CatalogPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Каталог"
        title="Продукция фермы"
        lead="Четыре направления: пищевые яйца, инкубационное яйцо, мясо перепела и молодняк."
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          <CategoryCard to="/perepelinye-yaytsa" title="Перепелиные яйца" description="Свежие пищевые яйца. Лотки 20, упаковки 30 и 60 шт." image={catEggs} imageAlt="Перепелиные яйца" />
          <CategoryCard to="/inkubatsionnoe-yaytso" title="Инкубационное яйцо" description="Племенное яйцо для вывода. Высокий процент оплода." image={catIncubation} imageAlt="Инкубационное яйцо" />
          <CategoryCard to="/myaso-perepela" title="Мясо перепела" description="Охлаждённые тушки 220–280 г. Без заморозки." image={catMeat} imageAlt="Мясо перепела" />
          <CategoryCard to="/molodnyak" title="Молодняк" description="Суточные перепелята и подрощенная птица по запросу." image={catBirds} imageAlt="Молодняк перепелов" />
        </div>
      </Section>
    </PageShell>
  );
}
