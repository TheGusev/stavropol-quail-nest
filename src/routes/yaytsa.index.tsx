import { createFileRoute } from "@tanstack/react-router";
import { HubPage } from "@/components/HubPage";
import { buildHead, jsonLdScript } from "@/lib/seo";
import { faqJsonLd } from "@/components/FaqAccordion";
import { SITE_URL } from "@/lib/contacts";
import catEggs from "@/assets/cat-eggs.jpg";
import catIncubation from "@/assets/cat-incubation.jpg";

const FAQ = [
  { q: "Чем пищевое яйцо отличается от инкубационного?", a: "Пищевое предназначено для еды и хранится в холоде, инкубационное — для вывода птенцов: его отбирают по форме, чистоте и весу, не моют и держат при +10…+12 °C." },
  { q: "Какой минимальный заказ?", a: "От одного лотка 20 шт. для пищевого яйца и от 50 шт. для инкубационного." },
  { q: "Доставляете по краю?", a: "Да, по Ставрополю и Михайловску — своим транспортом, по краю — ТК или попутным рейсом." },
];

export const Route = createFileRoute("/yaytsa/")({
  head: () => ({
    ...buildHead({
      title: "Перепелиные яйца — пищевые и инкубационные",
      description: "Свежие пищевые перепелиные яйца и племенное инкубационное яйцо с собственной фермы в Ставропольском крае.",
      path: "/yaytsa/",
    }),
    scripts: [jsonLdScript(faqJsonLd(FAQ)), jsonLdScript({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: "Яйца", item: SITE_URL + "/yaytsa/" },
      ],
    })],
  }),
  component: () => (
    <HubPage
      title="Яйца перепела"
      kicker="Раздел каталога"
      lead="Пищевые и инкубационные перепелиные яйца от собственной фермы."
      image={catEggs}
      imageAlt="Перепелиные яйца"
      intro="В разделе — два направления: свежие пищевые яйца для ежедневного питания и племенное инкубационное яйцо для вывода собственного поголовья."
      cards={[
        { to: "/perepelinye-yaytsa", title: "Пищевые яйца", description: "Свежие диетические яйца до 7 дней с даты сбора. Лотки 20, 30, 60 шт.", image: catEggs, imageAlt: "Пищевые перепелиные яйца" },
        { to: "/inkubatsionnoe-yaytso", title: "Инкубационное яйцо", description: "Племенное яйцо с высоким процентом оплода. Партии от 50 шт.", image: catIncubation, imageAlt: "Инкубационное перепелиное яйцо" },
      ]}
      faq={FAQ}
      ctaText="Здравствуйте! Хочу заказать перепелиные яйца."
    />
  ),
});
