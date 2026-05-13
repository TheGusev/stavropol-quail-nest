import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { CategoryCard } from "@/components/CategoryCard";
import { PageHero, Section } from "@/components/PageHero";
import { FaqAccordion, faqJsonLd, type FaqItem } from "@/components/FaqAccordion";
import { buildHead, jsonLdScript } from "@/lib/seo";
import catEggs from "@/assets/cat-eggs.jpg";
import catPtitsa from "@/assets/cat-ptitsa-group.jpg";
import catMyasoGroup from "@/assets/cat-myaso-group.jpg";
import catSoput from "@/assets/cat-soput-group.jpg";
import catCages from "@/assets/cat-cages.jpg";
import catKorm from "@/assets/cat-korm-group.jpg";

const FAQ: FaqItem[] = [
  { q: "Что есть в каталоге фермы?", a: "Пять направлений: яйца (пищевые и инкубационные), птица для разведения (от суточных до родительского стада), мясо и продукты переработки, сопутствующие товары (помёт, скорлупа, перо, потроха), а также клетки для перепелов." },
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <CategoryCard to="/yaytsa" title="Яйца" description="Пищевые и инкубационные перепелиные яйца." image={catEggs} imageAlt="Перепелиные яйца" />
          <CategoryCard to="/ptitsa" title="Птица для разведения" description="Суточные, подрощенные, несушки, самцы, родительское стадо." image={catPtitsa} imageAlt="Перепела на ферме" />
          <CategoryCard to="/myaso" title="Мясо и переработка" description="Охлаждённое, замороженное, маринованные, копчёные, для запекания." image={catMyasoGroup} imageAlt="Продукция из перепела" />
          <CategoryCard to="/soputstvuyushchie" title="Сопутствующие товары" description="Помёт, скорлупа, перо и пух, потроха." image={catSoput} imageAlt="Сопутствующие товары" />
          <CategoryCard to="/korm" title="Корм для перепелов" description="Стартовый комбикорм собственного производства, без накруток." image={catKorm} imageAlt="Корм для перепелов" />
          <CategoryCard to="/kletki" title="Клетки для перепелов" description="Клетки и батареи на 20–100 голов, брудеры для молодняка." image={catCages} imageAlt="Клетки для перепелов" />
        </div>
      </Section>
      <Section>
        <h2 className="text-2xl font-bold mb-4">Частые вопросы</h2>
        <FaqAccordion items={FAQ} />
      </Section>
    </PageShell>
  );
}
