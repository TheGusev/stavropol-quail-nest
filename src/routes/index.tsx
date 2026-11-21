import { createFileRoute } from "@tanstack/react-router";
import { ExtraContacts } from "@/components/ExtraContacts";
import { PageShell } from "@/components/PageShell";
import { CtaButtons } from "@/components/CtaButtons";
import { CategoryCard } from "@/components/CategoryCard";
import { FaqAccordion, faqJsonLd, type FaqItem } from "@/components/FaqAccordion";
import { buildHead, jsonLdScript } from "@/lib/seo";
import { ADDRESS, EMAIL, PHONE_DISPLAY, PHONE_TEL, SITE_NAME, SITE_URL, telUrl, whatsappUrl } from "@/lib/contacts";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, Truck, Sprout, Clock, BadgeCheck, Building2, MessageCircle, Phone } from "lucide-react";
import heroEggs from "@/assets/hero-eggs.jpg";
import catEggs from "@/assets/cat-eggs.jpg";
import catPtitsa from "@/assets/cat-ptitsa-group.jpg";
import catMyasoGroup from "@/assets/cat-myaso-group.jpg";
import catSoput from "@/assets/cat-soput-group.jpg";
import catCages from "@/assets/cat-cages.jpg";
import catKorm from "@/assets/cat-korm-group.jpg";
import farmImg from "@/assets/farm.jpg";

const FAQ: FaqItem[] = [
  { q: "Как сделать заказ?", a: "Напишите в WhatsApp или позвоните по телефону — мы примем заказ за 1–2 минуты, согласуем дату и способ доставки." },
  { q: "Какая минимальная партия?", a: "Для частных клиентов — от одного лотка (20 шт.). Для опта — от 1000 яиц с прямой ценой производителя." },
  { q: "Как долго хранятся перепелиные яйца?", a: "До 60 дней при температуре +2…+5 °C. Мы передаём яйца возрастом не старше 7 дней с даты сбора." },
  { q: "Доставляете ли вы по Ставропольскому краю?", a: "Да, по Ставрополю и Михайловску — собственным транспортом, в другие города — транспортной компанией или с попутным рейсом." },
  { q: "Есть ли документы на продукцию?", a: "Да, ферма оформлена официально, продукция сопровождается ветеринарными документами через систему «Меркурий»." },
  { q: "Можно ли приехать на ферму?", a: "Да, по предварительной договорённости. Мы открыты, показываем процесс и условия содержания птицы." },
];

export const Route = createFileRoute("/")({
  head: () => {
    const seo = buildHead({
      title: `${SITE_NAME} — перепелиные яйца и мясо в Ставропольском крае`,
      description:
        "Свежие перепелиные яйца, инкубационное яйцо и мясо перепела с фермы под Ставрополем. Доставка по краю, опт для кафе и магазинов.",
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
      scripts: [jsonLdScript(graph), jsonLdScript(faqJsonLd(FAQ.slice(0, 6)))],
    };
  },
  component: HomePage,
});

const ADVANTAGES = [
  { icon: Sprout, title: "Свежесть", text: "Яйца возрастом до 7 дней, мясо охлаждённое — не замороженное." },
  { icon: ShieldCheck, title: "Своя ферма", text: "Контролируем корма, условия содержания и качество на каждом этапе." },
  { icon: Truck, title: "Доставка по краю", text: "Ставрополь и Михайловск — своим транспортом, по краю — ТК." },
  { icon: BadgeCheck, title: "Документы", text: "Ветсопровождение через «Меркурий», оформление по требованию B2B." },
  { icon: Building2, title: "Опт для бизнеса", text: "Спецусловия для кафе, ресторанов, магазинов и фермерских лавок." },
  { icon: Clock, title: "Заказ за 30 секунд", text: "WhatsApp, звонок или короткая форма — без сложной регистрации." },
];

function HomePage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 md:items-center md:gap-10 md:py-20">
          {/* Текстовая часть */}
          <div className="order-2 md:order-1">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary animate-fade-in"
              style={{ animationFillMode: "both" }}
            >
              Ферма в Ставропольском крае
            </span>
            <h1
              className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight text-foreground animate-fade-in md:text-6xl"
              style={{ animationDelay: "100ms", animationFillMode: "both" }}
            >
              Свежие перепелиные яйца с фермы в Ставропольском крае
            </h1>
            <p
              className="mt-4 max-w-2xl text-lg text-foreground/80 animate-fade-in"
              style={{ animationDelay: "220ms", animationFillMode: "both" }}
            >
              Пищевые и инкубационные яйца, охлаждённое мясо перепела и молодняк. Доставка по Ставрополю,
              Михайловску и краю. Опт для кафе, ресторанов и магазинов.
            </p>
            <div
              className="mt-6 animate-scale-in"
              style={{ animationDelay: "320ms", animationFillMode: "both" }}
            >
              <CtaButtons size="lg" />
            </div>
            <div
              className="mt-8 flex flex-wrap gap-2 animate-fade-in"
              style={{ animationDelay: "420ms", animationFillMode: "both" }}
            >
              {["Свежесть до 7 дней", "Своя ферма", "Документы Меркурий", "Заказ за 30 сек"].map((b) => (
                <span key={b} className="rounded-full bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                  {b}
                </span>
              ))}
            </div>
          </div>
          {/* Фото — без затемнения */}
          <div
            className="order-1 overflow-hidden rounded-3xl border border-border shadow-xl animate-scale-in md:order-2"
            style={{ animationFillMode: "both" }}
          >
            <img
              src={heroEggs}
              alt="Свежие перепелиные яйца и тушки фермы «Ставропольский Перепел»"
              width={1536}
              height={1024}
              className="aspect-[4/3] h-full w-full object-cover md:aspect-auto"
            />
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">Наша продукция</h2>
            <p className="mt-2 text-muted-foreground">Четыре направления — выбирайте подходящее.</p>
          </div>
          <Link to="/catalog" className="hidden text-sm font-medium text-primary hover:underline md:inline">
            Весь каталог →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <CategoryCard to="/yaytsa" title="Яйца" description="Пищевые и инкубационные перепелиные яйца." image={catEggs} imageAlt="Перепелиные яйца в лотке" />
          <CategoryCard to="/ptitsa" title="Птица для разведения" description="Суточные, подрощенные, несушки, самцы, родительское стадо." image={catPtitsa} imageAlt="Перепела для разведения" />
          <CategoryCard to="/myaso" title="Мясо и переработка" description="Охлаждённое, замороженное, маринованные, копчёные, для запекания." image={catMyasoGroup} imageAlt="Продукция из перепела" />
          <CategoryCard to="/soputstvuyushchie" title="Сопутствующие товары" description="Помёт, скорлупа, перо и пух, потроха." image={catSoput} imageAlt="Сопутствующие товары фермы" />
          <CategoryCard to="/korm" title="Корм для перепелов" description="Стартовый комбикорм собственного производства, без накруток." image={catKorm} imageAlt="Корм для перепелов" />
          <CategoryCard to="/kletki" title="Клетки" description="Клетки и батареи на 20–100 голов, брудеры для молодняка." image={catCages} imageAlt="Клетки для перепелов" />
        </div>
      </section>

      {/* Advantages */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">Почему нас выбирают</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="rounded-2xl border border-border bg-card p-6">
                <a.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-3 font-serif text-lg font-semibold">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 rounded-3xl bg-primary p-8 text-primary-foreground md:grid-cols-2 md:p-12">
          <div>
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">Опт для HoReCa и магазинов</h2>
            <p className="mt-3 text-primary-foreground/80">
              Регулярные поставки яйца и мяса перепела для кафе, ресторанов, фермерских лавок и сетей.
              Стабильное качество, прямые цены от производителя, ветеринарное сопровождение.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>• Цены от производителя без посредников</li>
              <li>• Гарантированный объём и график поставок</li>
              <li>• Документы и ветсопровождение «Меркурий»</li>
            </ul>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/opt">Получить прайс</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href={whatsappUrl("Здравствуйте! Интересует опт перепелиных яиц.")} target="_blank" rel="noopener">
                <MessageCircle className="mr-2 h-5 w-5" /> Написать в WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Delivery + About */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <Truck className="h-8 w-8 text-primary" />
            <h3 className="mt-3 font-serif text-2xl font-semibold">Доставка и самовывоз</h3>
            <p className="mt-2 text-muted-foreground">
              Своим транспортом — по Ставрополю и Михайловску. По краю — транспортными компаниями или попутным рейсом.
              Самовывоз с фермы по предварительной договорённости.
            </p>
            <Link to="/dostavka" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
              Условия доставки →
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <img src={farmImg} alt="Перепелиная ферма" loading="lazy" width={1536} height={1024} className="h-56 w-full object-cover" />
            <div className="p-8">
              <h3 className="font-serif text-2xl font-semibold">О ферме</h3>
              <p className="mt-2 text-muted-foreground">
                Семейная ферма в Ставропольском крае. Сами выращиваем птицу, контролируем корма и каждый этап.
                Открыты к визитам — приезжайте, всё покажем.
              </p>
              <Link to="/o-ferme" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
                Подробнее о ферме →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">Частые вопросы</h2>
          <div className="mt-6">
            <FaqAccordion items={FAQ} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="font-serif text-3xl font-semibold md:text-4xl">Готовы оформить заказ?</h2>
        <p className="mt-3 text-muted-foreground">
          Напишите нам в WhatsApp или позвоните — ответим за пару минут и согласуем удобную доставку.
        </p>
        <div className="mt-6 flex justify-center">
          <CtaButtons size="lg" />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Или позвоните: <a href={telUrl()} className="font-medium text-foreground hover:text-primary"><Phone className="mr-1 inline h-4 w-4" />{PHONE_DISPLAY}</a>
        </p>
        <ExtraContacts className="mt-4 justify-center" />
      </section>
    </PageShell>
  );
}
