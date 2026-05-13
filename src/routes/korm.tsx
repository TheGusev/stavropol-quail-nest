import { createFileRoute } from "@tanstack/react-router";
import { HubPage } from "@/components/HubPage";
import { buildHead, jsonLdScript } from "@/lib/seo";
import { faqJsonLd } from "@/components/FaqAccordion";
import { SITE_URL } from "@/lib/contacts";
import catKorm from "@/assets/cat-korm-group.jpg";
import catStart from "@/assets/cat-korm-startovyy.jpg";

const FAQ = [
  { q: "Корм собственного производства?", a: "Да. Готовим, фасуем и продаём сами — без накруток посредников. Цена честная, состав знаем до грамма." },
  { q: "Можно фирменную упаковку под мой бренд?", a: "Да, делаем брендированную фасовку под заказ — обсудим тираж, дизайн и фасовку в WhatsApp." },
  { q: "Какие фасовки доступны?", a: "От розничных пакетов до мешков 25–40 кг. Точные фасовки и цены уточняем по запросу — зависит от объёма и адреса доставки." },
];

export const Route = createFileRoute("/korm")({
  head: () => ({
    ...buildHead({
      title: "Корм для перепелов — собственное производство фермы",
      description: "Комбикорм для перепелов от производителя: стартовый для молодняка. Готовим, фасуем, продаём без накруток. Возможна брендированная упаковка.",
      path: "/korm/",
    }),
    scripts: [jsonLdScript(faqJsonLd(FAQ)), jsonLdScript({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: "Корм для перепелов", item: SITE_URL + "/korm/" },
      ],
    })],
  }),
  component: () => (
    <HubPage
      title="Корм для перепелов"
      kicker="Раздел каталога"
      lead="Комбикорм собственного производства — без посредников и накруток. Готовим, фасуем и продаём сами."
      image={catKorm}
      imageAlt="Мешок с комбикормом для перепелов"
      intro="Корм у нас свой: знаем рецептуру, контролируем сырьё, фасуем под себя и под клиента. Можем сделать брендированную упаковку под ваш бренд — для магазина, фермы или частного хозяйства."
      cards={[
        { to: "/korm/startovyy", title: "Стартовый комбикорм", description: "Для молодняка перепелов 0–3 недели. Высокобелковый старт — крепкий рост и иммунитет.", image: catStart, imageAlt: "Стартовый комбикорм для перепелят" },
      ]}
      faq={FAQ}
      ctaText="Здравствуйте! Интересует корм для перепелов."
    />
  ),
});
