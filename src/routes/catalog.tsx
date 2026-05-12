import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { CategoryCard } from "@/components/CategoryCard";
import { PageHero, Section } from "@/components/PageHero";
import { FaqAccordion, faqJsonLd, type FaqItem } from "@/components/FaqAccordion";
import { buildHead, jsonLdScript } from "@/lib/seo";
import catEggs from "@/assets/cat-eggs.jpg";
import catIncubation from "@/assets/cat-incubation.jpg";
import catMeat from "@/assets/cat-meat.jpg";
import catBirds from "@/assets/cat-birds.jpg";

const FAQ: FaqItem[] = [
  { q: "Что есть в каталоге фермы?", a: "Четыре направления: пищевые перепелиные яйца, инкубационное яйцо, охлаждённое мясо перепела и молодняк (суточные перепелята и подрощенная птица)." },
  { q: "Как оформить заказ?", a: "Напишите в WhatsApp или позвоните — согласуем позицию, количество, дату доставки и способ оплаты. Оформление занимает 1–2 минуты." },
  { q: "Есть ли минимальный заказ?", a: "Для розницы минимума нет — можно купить от одного лотка яиц или одной тушки. Для опта — от 10 лотков или 5 кг мяса." },
  { q: "Как доставляете продукцию?", a: "По Ставрополю и Михайловску — собственным транспортом в день заказа. По краю (Пятигорск, Ессентуки, Невинномысск, Будённовск) — транспортной компанией. Возможен самовывоз." },
  { q: "Работаете с оптовыми покупателями и HoReCa?", a: "Да, регулярно отгружаем кафе, ресторанам, магазинам и фермерским лавкам. Подробнее — на странице «Опт»." },
];

export const Route = createFileRoute("/catalog")({
  head: () => ({
    ...buildHead({
      title: "Каталог — перепелиные яйца, мясо и молодняк",
      description:
        "Каталог продукции фермы: пищевые перепелиные яйца, инкубационное яйцо, мясо перепела и молодняк. Доставка по Ставропольскому краю.",
      path: "/catalog/",
    }),
    scripts: [jsonLdScript(faqJsonLd(FAQ))],
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
      <Section>
        <h2 className="text-2xl font-bold mb-4">Частые вопросы</h2>
        <FaqAccordion items={FAQ} />
      </Section>
    </PageShell>
  );
}
