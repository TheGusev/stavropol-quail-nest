import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero, Section, Prose } from "@/components/PageHero";
import { LeadForm } from "@/components/LeadForm";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/opt")({
  head: () =>
    buildHead({
      title: "Опт перепелиных яиц и мяса для HoReCa и магазинов",
      description:
        "Регулярные оптовые поставки перепелиных яиц, мяса и инкубационного яйца для кафе, ресторанов и магазинов Ставропольского края.",
      path: "/opt/",
    }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero kicker="B2B" title="Опт для HoReCa и магазинов" lead="Прямые цены от производителя, стабильное качество, документы и график поставок." />
      <Section>
        <div className="grid gap-10 md:grid-cols-[1fr,420px]">
          <Prose>
            <p>
              Мы поставляем перепелиные яйца и мясо для кафе, ресторанов, пекарен, фермерских лавок и магазинов
              здорового питания в Ставрополе, Михайловске и по краю. Работаем напрямую — без посредников и наценок.
            </p>
            <h2>Что вы получаете</h2>
            <ul>
              <li>Цены от производителя</li>
              <li>Гарантированный объём и регулярный график</li>
              <li>Ветсопровождение через систему «Меркурий»</li>
              <li>Договор и закрывающие документы</li>
              <li>Стабильное качество — одна ферма, один стандарт</li>
            </ul>
            <h2>Как начать</h2>
            <p>
              Оставьте заявку — пришлём актуальный прайс и согласуем тестовую партию. Решение по сотрудничеству —
              в течение одного рабочего дня.
            </p>
          </Prose>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold">Получить прайс</h2>
            <p className="mt-1 text-sm text-muted-foreground">Оставьте контакты — мы свяжемся в течение рабочего дня.</p>
            <div className="mt-4">
              <LeadForm subject="Заявка на опт" />
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
