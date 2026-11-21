import { createFileRoute } from "@tanstack/react-router";
import { HERO_FARAON } from "@/lib/breed-photos";
import { HubPage } from "@/components/HubPage";
import { buildHead, jsonLdScript } from "@/lib/seo";
import { faqJsonLd } from "@/components/FaqAccordion";
import { SITE_URL } from "@/lib/contacts";
import catBirds from "@/assets/cat-birds.jpg";
import catPtitsa from "@/assets/cat-ptitsa-group.jpg";

const FAQ = [
  { q: "С чего начать разведение?", a: "Если опыта нет — берите подрощенных перепелят 2–3 недель: они уже окрепли и проще в уходе. Опытные птицеводы часто берут суточных." },
  { q: "Когда перепела начинают нестись?", a: "Уже на 40–50 день жизни. Несушки дают по 250–300 яиц в год при правильном кормлении." },
  { q: "Сколько самок на одного самца?", a: "Стандартное родительское семейство — 5–6 самок и 1 самец." },
  { q: "Поставляете в любое время года?", a: "Основной сезон — с весны по осень, зимой — по запросу и наличию." },
];

export const Route = createFileRoute("/ptitsa/")({
  head: () => ({
    ...buildHead({
      title: "Птица для разведения — перепелята, несушки, родительское стадо",
      description: "Суточные и подрощенные перепелята, несушки, самцы и родительское стадо. Здоровая птица с фермы под Ставрополем.",
      path: "/ptitsa/",
    }),
    scripts: [jsonLdScript(faqJsonLd(FAQ)), jsonLdScript({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: "Птица", item: SITE_URL + "/ptitsa/" },
      ],
    })],
  }),
  component: () => (
    <HubPage
      title="Птица для разведения"
      kicker="Раздел каталога"
      lead="Здоровая птица под любую задачу — от старта домашнего хозяйства до пополнения родительского стада."
      image={HERO_FARAON}
      imageAlt="Перепела на ферме"
      intro="Разводим проверенные мясо-яичные линии. Контролируем кормление и здоровье поголовья на каждом этапе. К каждой партии — памятка по содержанию."
      cards={[
        { to: "/ptitsa/sutochnye", title: "Суточные цыплята", description: "Только что вылупившиеся перепелята. Минимальные вложения, быстрый старт.", image: catBirds, imageAlt: "Суточные перепелята" },
        { to: "/ptitsa/podroshchennye", title: "Подрощенные 2–3 недели", description: "Окрепшие птенцы — критический период позади, проще в уходе.", image: catBirds, imageAlt: "Подрощенные перепелята" },
        { to: "/ptitsa/nesushki", title: "Несушки", description: "Молодки на пике яйцекладки — сразу в дело, диетические яйца каждый день.", image: catPtitsa, imageAlt: "Несушки перепелов" },
        { to: "/ptitsa/samtsy", title: "Самцы (петушки)", description: "Для собственного стада и получения инкубационного яйца.", image: catPtitsa, imageAlt: "Самец перепела" },
        { to: "/ptitsa/roditelskoe-stado", title: "Родительское стадо", description: "Готовые семьи 5 самок + 1 самец. Отборные высокопродуктивные особи.", image: catPtitsa, imageAlt: "Родительское стадо перепелов" },
      ]}
      faq={FAQ}
      ctaText="Здравствуйте! Хочу заказать птицу для разведения."
    />
  ),
});
