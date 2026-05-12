import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero, Section, Prose } from "@/components/PageHero";
import { CtaButtons } from "@/components/CtaButtons";
import { buildHead } from "@/lib/seo";
import storePack from "@/assets/store-pack.jpg";

export const Route = createFileRoute("/sertifikaty")({
  head: () =>
    buildHead({
      title: "Документы и качество — Ставропольский Перепел",
      description:
        "Ферма работает официально. Продукция сопровождается ветеринарными документами через систему «Меркурий», есть полный пакет для B2B.",
      path: "/sertifikaty/",
    }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero kicker="Качество" title="Документы и качество" lead="Работаем официально. Документы предоставляем по запросу." image={storePack} imageAlt="Упаковка с маркировкой фермы" />
      <Section>
        <Prose>
          <p>
            Мы оформлены как сельхозпроизводитель и работаем в рамках действующего ветеринарного законодательства
            РФ. На каждую партию продукции оформляем электронные ветеринарные сопроводительные документы (ВСД)
            через государственную систему <b>«Меркурий»</b>.
          </p>
          <h2>Что мы можем предоставить</h2>
          <ul>
            <li>Электронные ВСД на партию</li>
            <li>Договор поставки для юридических лиц</li>
            <li>Закрывающие документы (акты, счета)</li>
            <li>Информацию о составе кормов и схеме содержания птицы</li>
          </ul>
          <h2>Контроль качества</h2>
          <p>
            Стадо находится под наблюдением ветеринарного специалиста. Контролируем условия содержания, состав
            кормов и гигиену сбора яйца. Несвежий и нестандартный продукт в продажу не идёт.
          </p>
          <p className="rounded-xl bg-secondary/60 p-4 text-sm text-muted-foreground">
            Сканы документов готовим по запросу — для частных клиентов это обычно не требуется, для бизнеса
            присылаем полный пакет.
          </p>
        </Prose>
        <div className="mt-8"><CtaButtons text="Здравствуйте! Хочу запросить документы на продукцию." /></div>
      </Section>
    </PageShell>
  );
}
