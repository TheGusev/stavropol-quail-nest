import { FarmVideo } from "@/components/FarmVideo";
import { createFileRoute } from "@tanstack/react-router";
import { PhotoStrip } from "@/components/PhotoStrip";
import { BROODER_PHOTOS } from "@/lib/chick-photos";
import { ChickBreeds } from "@/components/BreedPrices";
import { SubcategoryPage } from "@/components/SubcategoryPage";
import { buildHead, jsonLdScript } from "@/lib/seo";
import { faqJsonLd } from "@/components/FaqAccordion";

const FAQ = [
  { q: "Чем подрощенные лучше суточных?", a: "Прошёл самый критический возраст: птенцы окрепли, оперились, менее требовательны к температуре. Сохранность выше." },
  { q: "Как везти подрощенных?", a: "В вентилируемых картонных коробках с подстилкой. Поддерживаем температуру около +20…+22 °C." },
  { q: "Когда они начнут нестись?", a: "Через 3–4 недели после покупки — то есть в общей сложности на 40–50 день жизни." },
];

export const Route = createFileRoute("/ptitsa/podroshchennye")({
  head: () => ({
    ...buildHead({
      title: "Подрощенные перепелята 2–3 недель — купить",
      description: "Подрощенный молодняк перепелов 2–3 недели. Окрепли, прошли критический возраст, проще в содержании. Доставка по краю.",
      path: "/ptitsa/podroshchennye/",
    }),
    scripts: [jsonLdScript(faqJsonLd(FAQ))],
  }),
  component: () => (
    <SubcategoryPage
      group={{ label: "Птица для разведения", to: "/ptitsa" }}
      title="Подрощенные перепелята 2–3 недели"
      lead="Окрепшая птица — критический возраст уже позади. Лучший выбор, если вы только начинаете разведение."
      image={BROODER_PHOTOS[0]!}
      imageAlt="Подрощенные перепелята"
      intro={<>
        <FarmVideo kind="brooder" />
        <PhotoStrip title="Наш брудер" photos={BROODER_PHOTOS} alt="Перепелята в брудере" />
        <ChickBreeds product="подрощенные перепелята" />
        <p>Возраст 2–3 недели — один из самых важных рубежей в развитии перепелов. Птенцы уже окрепли, у них сформировалось оперение, и они менее требовательны к температуре, чем суточные. Это самый «дружелюбный» к новичку вариант.</p>
        <h2>Преимущества</h2>
        <ul>
          <li>Высокая сохранность — критический период позади</li>
          <li>Проще режим температуры (+20…+24 °C)</li>
          <li>До яйцекладки остаётся 3–4 недели</li>
        </ul>
        <h2>Передача</h2>
        <ul>
          <li>Самовывоз с фермы или согласованная доставка</li>
          <li>Памятка по содержанию и кормлению — в комплекте</li>
        </ul>
      </>}
      variants={[
        { title: "20 шт.", description: "Минимальная партия для домашнего хозяйства.", price: "по запросу", waText: "Здравствуйте! Хочу 20 подрощенных перепелят 2–3 недель." },
        { title: "50 шт.", description: "Оптимально для старта своего стада.", price: "по запросу", badge: "оптимально", waText: "Здравствуйте! Хочу 50 подрощенных перепелят 2–3 недель." },
        { title: "100+", description: "Под расширение хозяйства и небольшие фермы.", price: "по запросу", note: "опт", waText: "Здравствуйте! Нужна партия подрощенных перепелят от 100 шт." },
      ]}
      faq={FAQ}
      ctaText="Здравствуйте! Хочу заказать подрощенных перепелят 2–3 недель."
    />
  ),
});
