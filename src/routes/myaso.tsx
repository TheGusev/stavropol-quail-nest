import { createFileRoute } from "@tanstack/react-router";
import { HubPage } from "@/components/HubPage";
import { buildHead, jsonLdScript } from "@/lib/seo";
import { faqJsonLd } from "@/components/FaqAccordion";
import { SITE_URL } from "@/lib/contacts";
import catMeat from "@/assets/cat-meat.jpg";
import catMyasoGroup from "@/assets/cat-myaso-group.jpg";
import catZamorozh from "@/assets/cat-zamorozh.jpg";
import catMarinovannye from "@/assets/cat-marinovannye.jpg";

const FAQ = [
  { q: "Чем перепелятина полезна?", a: "Низкое содержание холестерина, высокое — белка и витаминов B, A, E, PP. Нежная текстура, гипоаллергенна, подходит для диетического и детского питания." },
  { q: "Охлаждённое или замороженное брать?", a: "Охлаждённое — для бульонов и быстрого приготовления, идеально по вкусу. Замороженное — для длительного хранения и опта." },
  { q: "Делаете ли разделку?", a: "Да, по запросу — целиком, филе, набор для бульона. Под опт обсуждаем индивидуально." },
];

export const Route = createFileRoute("/myaso")({
  head: () => ({
    ...buildHead({
      title: "Мясо перепела и продукты переработки",
      description: "Охлаждённое и замороженное мясо перепела, маринованные и копчёные тушки, маринованные яйца. Доставка по Ставропольскому краю.",
      path: "/myaso/",
    }),
    scripts: [jsonLdScript(faqJsonLd(FAQ)), jsonLdScript({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: "Мясо и переработка", item: SITE_URL + "/myaso/" },
      ],
    })],
  }),
  component: () => (
    <HubPage
      title="Мясо и переработка"
      kicker="Раздел каталога"
      lead="Свежие тушки, замороженные партии и готовая продукция — маринованные, копчёные, для запекания."
      image={catMyasoGroup}
      imageAlt="Продукция из перепела"
      intro="Перепелятина — диетический деликатес: низкое содержание жира, мягкий вкус, быстрое приготовление. У нас вы найдёте мясо в любом удобном виде — от охлаждённой тушки до готового к подаче маринованного перепела."
      cards={[
        { to: "/myaso-perepela", title: "Охлаждённое мясо", description: "Тушки 220–280 г без заморозки. Срок реализации 5 суток при +2…+4 °C.", image: catMeat, imageAlt: "Охлаждённое мясо перепела" },
        { to: "/myaso/zamorozhennoe", title: "Замороженное мясо", description: "Длительное хранение, удобно для опта и заготовок впрок.", image: catZamorozh, imageAlt: "Замороженное мясо перепела" },
        { to: "/myaso/dlya-zapekaniya", title: "Тушки для запекания", description: "Подготовленные со специями или фаршированные перепела — готовы в духовку.", image: catMarinovannye, imageAlt: "Перепела для запекания" },
        { to: "/myaso/marinovannye-kopchenye", title: "Маринованные и копчёные", description: "Готовая закуска — оригинальный деликатес для стола и подарка.", image: catMarinovannye, imageAlt: "Маринованные и копчёные перепела" },
        { to: "/myaso/marinovannye-yaytsa", title: "Маринованные яйца", description: "Деликатесная закуска — отлично к пиву, в салаты и на праздничный стол.", image: catMarinovannye, imageAlt: "Маринованные перепелиные яйца" },
        { to: "/myaso/vybrakovannye", title: "Выбракованные перепела", description: "Живой вес, охлаждённые и замороженные тушки по сниженной цене.", image: catMyasoGroup, imageAlt: "Выбракованные перепела" },
      ]}
      faq={FAQ}
      ctaText="Здравствуйте! Хочу заказать мясо перепела или продукцию переработки."
    />
  ),
});
