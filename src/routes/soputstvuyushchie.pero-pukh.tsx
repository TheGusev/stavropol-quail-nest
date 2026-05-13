import { createFileRoute } from "@tanstack/react-router";
import { SubcategoryPage } from "@/components/SubcategoryPage";
import { buildHead, jsonLdScript } from "@/lib/seo";
import { faqJsonLd } from "@/components/FaqAccordion";
import catPero from "@/assets/cat-pero.jpg";

const FAQ = [
  { q: "Перо обработано?", a: "Да, проходит мойку и сушку. Готово к использованию для набивки." },
  { q: "Сколько пуха нужно для подушки?", a: "Стандартная подушка 50×70 см — около 1 кг пухо-перовой смеси." },
  { q: "Используете ли в декоре?", a: "Да, перо берут флористы, мастера хендмейда, для оформления интерьеров и фотозон." },
];

export const Route = createFileRoute("/soputstvuyushchie/pero-pukh")({
  head: () => ({
    ...buildHead({
      title: "Перепелиное перо и пух — для рукоделия и набивки",
      description: "Чистое перепелиное перо и пух. Для набивки подушек, декоративных и рукодельных целей.",
      path: "/soputstvuyushchie/pero-pukh/",
    }),
    scripts: [jsonLdScript(faqJsonLd(FAQ))],
  }),
  component: () => (
    <SubcategoryPage
      group={{ label: "Сопутствующие товары", to: "/soputstvuyushchie" }}
      title="Перо и пух"
      lead="Чистое перепелиное перо и пух — для подушек, рукоделия и декоративных проектов."
      image={catPero}
      imageAlt="Перепелиное перо и пух"
      intro={<>
        <p>Когда хозяйство своё, в дело идёт всё. Перо и пух мы моем, сушим и упаковываем — готово к использованию.</p>
        <h2>Где применяют</h2>
        <ul>
          <li>Набивка маленьких подушек и игрушек</li>
          <li>Флористика и декор интерьеров</li>
          <li>Рукоделие и фотозоны</li>
        </ul>
      </>}
      variants={[
        { title: "Пакет 100 г", description: "Для небольшого декоративного проекта.", price: "от 150 ₽", waText: "Здравствуйте! Хочу перепелиное перо и пух, 100 г." },
        { title: "Пакет 500 г", description: "Под подушку или несколько изделий.", price: "от 600 ₽", badge: "популярное", waText: "Здравствуйте! Хочу перепелиное перо и пух, 500 г." },
        { title: "Опт", description: "Для мастерских и магазинов рукоделия.", price: "по запросу", note: "опт", waText: "Здравствуйте! Нужно перо и пух перепела оптом." },
      ]}
      faq={FAQ}
      ctaText="Здравствуйте! Хочу заказать перепелиное перо и пух."
    />
  ),
});
