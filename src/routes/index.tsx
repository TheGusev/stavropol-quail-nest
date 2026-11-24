import { createFileRoute, Link } from "@tanstack/react-router";
import { FarmTeam } from "@/components/FarmTeam";
import { PageShell } from "@/components/PageShell";
import { CtaButtons } from "@/components/CtaButtons";
import { FaqAccordion, faqJsonLd, type FaqItem } from "@/components/FaqAccordion";
import { buildHead, jsonLdScript } from "@/lib/seo";
import { ADDRESS, EMAIL, PHONE_DISPLAY, PHONE_TEL, SITE_NAME, SITE_URL, telUrl } from "@/lib/contacts";
import { ArrowRight } from "lucide-react";
import heroQuail from "@/assets/tehas-home.jpg";
import { DAY_CHICKS } from "@/lib/chick-photos";
import { INCUBATOR_PHOTOS } from "@/lib/pack-photos";
import { MEAT_PHOTOS } from "@/lib/breed-photos";

const FAQ: FaqItem[] = [
  { q: "Как сделать заказ?", a: "Напишите в WhatsApp или позвоните по телефону — мы примем заказ за 1–2 минуты, согласуем дату и способ доставки." },
    { q: "Как долго хранятся перепелиные яйца?", a: "До 60 дней при температуре +2…+5 °C. Мы передаём яйца возрастом не старше 7 дней с даты сбора." },
  { q: "Доставляете ли вы по России?", a: "Да, по всей России. По Ставрополю и Михайловску — собственным транспортом, в другие города и регионы — транспортной компанией или Почтой России." },
  { q: "Есть ли документы на продукцию?", a: "Да, ферма оформлена официально, продукция сопровождается ветеринарными документами через систему «Меркурий»." },
  { q: "Можно ли приехать на ферму?", a: "Да, по предварительной договорённости. Мы открыты, показываем процесс и условия содержания птицы." },
];

export const Route = createFileRoute("/")({
  head: () => {
    const seo = buildHead({
      title: `${SITE_NAME} — перепелиные яйца и мясо в Ставропольском крае`,
      description:
        "Инкубационное яйцо, перепелята и тушки перепела с нашей фермы. Доставка по краю, опт.",
      path: "/",
    });
    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${SITE_URL}/#org`,
          name: SITE_NAME,
          url: SITE_URL,
          email: EMAIL,
          telephone: PHONE_TEL,
        },
        {
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/#business`,
          name: SITE_NAME,
          url: SITE_URL,
          telephone: PHONE_TEL,
          priceRange: "₽",
          address: {
            "@type": "PostalAddress",
            streetAddress: ADDRESS.street,
            addressLocality: ADDRESS.locality,
            addressRegion: ADDRESS.region,
            postalCode: ADDRESS.postalCode,
            addressCountry: ADDRESS.country,
          },
          areaServed: ADDRESS.region,
        },
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          inLanguage: "ru-RU",
        },
      ],
    };
    return {
      ...seo,
      scripts: [jsonLdScript(graph), jsonLdScript(faqJsonLd(FAQ))],
    };
  },
  component: HomePage,
});

const PRODUCTS = [
  { to: "/inkubatsionnoe-yaytso", title: "Инкубационное яйцо", text: "Феникс, Фараон, Техас и другие породы. От 11 ₽ за штуку.", img: INCUBATOR_PHOTOS[0]! },
  { to: "/perepelyata", title: "Перепелята", text: "Суточные и подрощенные, разные породы.", img: DAY_CHICKS[0]! },
  { to: "/myaso-perepela", title: "Тушки перепела", text: "850 ₽/кг, опт — 550 ₽/кг.", img: MEAT_PHOTOS[1]! },
] as const;

function HomePage() {
  return (
    <PageShell>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-5xl items-center gap-6 px-4 py-8 text-center md:grid-cols-2 md:py-14">
          <div>
            <h1 className="font-serif text-3xl font-bold leading-tight animate-fade-in md:text-5xl" style={{ animationFillMode: "both" }}>
              Перепела с нашей фермы
            </h1>
            <p className="mt-3 text-lg text-foreground/85 animate-fade-in" style={{ animationDelay: "120ms", animationFillMode: "both" }}>
              Инкубационное яйцо, перепелята и тушки. Выращиваем сами в Ставропольском крае.
            </p>
            <a href={telUrl()} className="mt-5 block text-2xl font-bold text-primary">{PHONE_DISPLAY}</a>
            <div className="mt-4 flex justify-center"><CtaButtons size="lg" /></div>
          </div>
          <img src={heroQuail} alt="Белый перепел породы Техас в руках" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-md" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-center font-serif text-2xl font-semibold md:text-3xl">Что мы продаём</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {PRODUCTS.map((p) => (
            <Link key={p.to} to={p.to} className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md">
              <img src={p.img} alt={p.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div className="flex items-center justify-between gap-3 p-4">
                <div>
                  <div className="font-serif text-xl font-semibold">{p.title}</div>
                  <div className="mt-1 text-muted-foreground">{p.text}</div>
                </div>
                <ArrowRight className="h-6 w-6 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-10"><FarmTeam /></div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-center font-serif text-2xl font-semibold md:text-3xl">Частые вопросы</h2>
          <div className="mt-4"><FaqAccordion items={FAQ} /></div>
        </div>
      </section>
    </PageShell>
  );
}
