import { createFileRoute } from "@tanstack/react-router";
import { HubPage } from "@/components/HubPage";
import { buildHead, jsonLdScript } from "@/lib/seo";
import { faqJsonLd } from "@/components/FaqAccordion";
import { SITE_URL } from "@/lib/contacts";
import catSoput from "@/assets/cat-soput-group.jpg";
import catPomet from "@/assets/cat-pomet.jpg";
import catSkorlupa from "@/assets/cat-skorlupa.jpg";
import catPero from "@/assets/cat-pero.jpg";
import catPotroha from "@/assets/cat-potroha.jpg";

const FAQ = [
  { q: "Можно ли использовать свежий помёт?", a: "Только разведённый: 1:15–1:20 водой. В чистом виде высокая концентрация мочевой кислоты сожжёт корни. Безопаснее — компост или гранулы." },
  { q: "Где использовать молотую скорлупу?", a: "Минеральная подкормка для птицы и других животных, а также как удобрение для сада-огорода." },
  { q: "Большие объёмы помёта поставляете?", a: "Да, оптом мешками или россыпью. Согласуем самовывоз или доставку." },
];

export const Route = createFileRoute("/soputstvuyushchie")({
  head: () => ({
    ...buildHead({
      title: "Сопутствующие товары — помёт, скорлупа, перо, потроха",
      description: "Перепелиный помёт (свежий, компост, гранулы), молотая скорлупа, перо и пух, потроха. Натуральная продукция фермы.",
      path: "/soputstvuyushchie/",
    }),
    scripts: [jsonLdScript(faqJsonLd(FAQ)), jsonLdScript({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: "Сопутствующие товары", item: SITE_URL + "/soputstvuyushchie/" },
      ],
    })],
  }),
  component: () => (
    <HubPage
      title="Сопутствующие товары"
      kicker="Раздел каталога"
      lead="Натуральные продукты фермы — органическое удобрение, кальциевая подкормка, перо и пух, потроха."
      image={catSoput}
      imageAlt="Сопутствующие товары перепелиной фермы"
      intro="Когда хозяйство своё, в дело идёт всё. Помёт становится ценным удобрением, скорлупа — кальциевой подкормкой, перо — материалом для подушек. Выбирайте, что нужно вашему саду, огороду или хозяйству."
      cards={[
        { to: "/soputstvuyushchie/pomet", title: "Перепелиный помёт", description: "Концентрированное органическое удобрение: свежий, компост, гранулы.", image: catPomet, imageAlt: "Перепелиный помёт" },
        { to: "/soputstvuyushchie/skorlupa", title: "Скорлупа молотая", description: "Источник кальция для птицы и животных, удобрение для огорода.", image: catSkorlupa, imageAlt: "Молотая скорлупа перепелиных яиц" },
        { to: "/soputstvuyushchie/pero-pukh", title: "Перо и пух", description: "Для набивки подушек и декоративных целей.", image: catPero, imageAlt: "Перепелиное перо и пух" },
        { to: "/soputstvuyushchie/potroha", title: "Потроха", description: "Сердечки, печень, желудки — нежный диетический субпродукт.", image: catPotroha, imageAlt: "Потроха перепела" },
      ]}
      faq={FAQ}
      ctaText="Здравствуйте! Хочу заказать сопутствующие товары фермы."
    />
  ),
});
