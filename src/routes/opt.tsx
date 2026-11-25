import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero, Section, Prose } from "@/components/PageHero";
import { OptLeadForm } from "@/components/OptLeadForm";
import { CtaButtons } from "@/components/CtaButtons";
import { FaqAccordion, faqJsonLd, type FaqItem } from "@/components/FaqAccordion";
import { buildHead, jsonLdScript } from "@/lib/seo";
import { Bird, Utensils, Store, Building2, FileCheck, Truck, BadgePercent, Calendar } from "lucide-react";
import storePack from "@/assets/pack/trays-labeled.jpg";

const FAQ: FaqItem[] = [
  { q: "Какой минимальный объём опта?", a: "Объём партии инкубационных яиц, перепелят или тушек согласуем индивидуально. Укажите товар и количество в заявке — уточним наличие и условия." },
  { q: "Можно ли работать с отсрочкой платежа?", a: "После 1–2 месяцев стабильных поставок мы рассматриваем отсрочку 7–14 дней по договору." },
  { q: "Какие документы вы предоставляете?", a: "Договор поставки, счета и акты, электронные ВСД через систему «Меркурий» на каждую партию." },
  { q: "Можете ли подстроиться под наш график?", a: "Да, регулярные поставки по графику клиента — это наша основная модель работы с HoReCa и магазинами." },
  { q: "Доставляете ли по России?", a: "Да, доставка по всей России. Способ перевозки подбираем по продукции, объёму и адресу; для перепелят и тушек отдельно согласуем необходимые условия." },
  { q: "Как быстро высылаете прайс?", a: "В течение рабочего дня после получения заявки. Чаще — в течение часа в рабочее время." },
];

const SEGMENTS = [
  { icon: Bird, title: "Птицеводы", text: "Инкубационные яйца и перепелята для собственного выращивания." },
  { icon: Utensils, title: "Рестораны и кафе", text: "Тушки перепела для меню и авторских блюд." },
  { icon: Store, title: "Магазины и лавки", text: "Тушки с нашей фермы для продажи покупателям." },
  { icon: Building2, title: "Фермерские хозяйства", text: "Партии инкубационных яиц и молодняка по согласованной дате." },
];

const PACKAGE_INCLUDES = [
  { icon: BadgePercent, title: "Прямая цена", text: "Без посредников и наценок дистрибьюторов." },
  { icon: Calendar, title: "Гарантия графика", text: "Поставки по согласованным дням, без срывов." },
  { icon: FileCheck, title: "Документы", text: "Договор, закрывающие, ВСД через «Меркурий»." },
  { icon: Truck, title: "Доставка по всей России", text: "Подберём перевозку под продукцию и адрес получателя." },
];

export const Route = createFileRoute("/opt")({
  head: () => ({
    ...buildHead({
      title: "Опт — инкубационные яйца, перепелята и тушки",
      description:
        "Оптовые партии инкубационных яиц, перепелят и тушек с собственной фермы. Объём и график по заявке, доставка по всей России.",
      path: "/opt/",
    }),
    scripts: [jsonLdScript(faqJsonLd(FAQ))],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero kicker="Для бизнеса" title="Оптовые поставки" lead="Инкубационные яйца, перепелята и тушки с нашей фермы. Доставка по всей России." image={storePack} imageAlt="Инкубационные яйца в подписанных лотках" />

      <Section>
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold">Нужен прайс прямо сейчас?</h2>
              <p className="mt-1 text-muted-foreground">Напишите в WhatsApp или позвоните — пришлём цены сегодня.</p>
            </div>
            <CtaButtons size="lg" text="Здравствуйте! Интересует опт инкубационных яиц, перепелят или тушек. Пришлите, пожалуйста, прайс." />
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">С кем мы работаем</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-5">
              <s.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-serif text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-10 md:grid-cols-[1fr,460px]">
          <div>
            <h2 className="font-serif text-2xl font-semibold md:text-3xl">Что входит в опт-пакет</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {PACKAGE_INCLUDES.map((it) => (
                <div key={it.title} className="rounded-2xl border border-border bg-card p-5">
                  <it.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-3 font-serif text-lg font-semibold">{it.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{it.text}</p>
                </div>
              ))}
            </div>
            <Prose>
              <h2>Как начать</h2>
              <p>
                Оставьте заявку — пришлём актуальный прайс и согласуем тестовую партию. Решение по сотрудничеству —
                в течение одного рабочего дня.
              </p>
            </Prose>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold">Получить прайс</h2>
            <p className="mt-1 text-sm text-muted-foreground">Заполните форму — мы откроем чат WhatsApp с готовой заявкой.</p>
            <div className="mt-4"><OptLeadForm /></div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">Частые вопросы оптовых клиентов</h2>
        <div className="mt-4"><FaqAccordion items={FAQ} /></div>
      </Section>
    </PageShell>
  );
}
