import { createFileRoute } from "@tanstack/react-router";
import { MeatGallery } from "@/components/MeatGallery";
import { MEAT_PHOTOS } from "@/lib/breed-photos";
import { MeatPrices } from "@/components/BreedPrices";
import { SubcategoryPage } from "@/components/SubcategoryPage";
import { buildHead, jsonLdScript } from "@/lib/seo";
import { faqJsonLd } from "@/components/FaqAccordion";
import catZamorozh from "@/assets/cat-zamorozh.jpg";

const FAQ = [
  { q: "Сколько хранится замороженное мясо?", a: "До 6 месяцев при -18 °C без потери качества." },
  { q: "Чем замороженное удобно?", a: "Делаете запас впрок и используете по мере необходимости. Удобно для опта, ресторанов и заготовок на сезон." },
  { q: "Можно ли заказать большую партию?", a: "Да, отгружаем оптом для HoReCa и магазинов. Цена — от объёма." },
];

export const Route = createFileRoute("/myaso/zamorozhennoe")({
  head: () => ({
    ...buildHead({
      title: "Замороженное мясо перепела — купить с фермы",
      description: "Замороженные тушки перепела для длительного хранения. Диетический белковый продукт, удобен для опта и заготовок.",
      path: "/myaso/zamorozhennoe/",
    }),
    scripts: [jsonLdScript(faqJsonLd(FAQ))],
  }),
  component: () => (
    <SubcategoryPage
      group={{ label: "Мясо и переработка", to: "/myaso" }}
      title="Замороженное мясо перепела"
      lead="Длительное хранение, удобство опта и стабильное качество — без потери диетических свойств."
      image={MEAT_PHOTOS[0]!}
      imageAlt="Замороженное мясо перепела"
      intro={<>
        <MeatGallery />
        <MeatPrices />
        <p>Замороженное мясо перепела — диетический продукт длительного хранения. Низкое содержание холестерина, высокая питательность и богатый витаминный состав (B, A, C, E, PP).</p>
        <h2>Для кого подойдёт</h2>
        <ul>
          <li>Семьи, которые хотят сделать запас здорового мяса</li>
          <li>Рестораны и кафе с регулярным меню</li>
          <li>Магазины и фермерские лавки — стабильный товар</li>
        </ul>
        <h2>Хранение</h2>
        <ul>
          <li>До 6 месяцев при -18 °C</li>
          <li>Перевозка в термобоксах с хладоэлементами</li>
        </ul>
      </>}
      variants={[
        { title: "5 тушек", description: "Семейный набор — на пару ужинов или бульонов.", price: "от 1100 ₽", waText: "Здравствуйте! Хочу 5 замороженных тушек перепела." },
        { title: "10 тушек", description: "Удобный запас для домашней морозилки.", price: "от 2100 ₽", badge: "популярное", waText: "Здравствуйте! Хочу 10 замороженных тушек перепела." },
        { title: "Опт от 5 кг", description: "Для HoReCa и магазинов — спецусловия.", price: "по запросу", note: "опт", waText: "Здравствуйте! Нужен опт замороженного перепела от 5 кг." },
      ]}
      faq={FAQ}
      ctaText="Здравствуйте! Хочу заказать замороженное мясо перепела."
    />
  ),
});
