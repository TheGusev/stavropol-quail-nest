import { createFileRoute } from "@tanstack/react-router";
import { FarmVideo } from "@/components/FarmVideo";
import { PhotoStrip } from "@/components/PhotoStrip";
import { ChickBreeds } from "@/components/BreedPrices";
import { PageShell } from "@/components/PageShell";
import { PageHero, Section, Prose } from "@/components/PageHero";
import { FinalCta } from "@/components/FinalCta";
import { FaqAccordion, faqJsonLd, type FaqItem } from "@/components/FaqAccordion";
import { DAY_CHICKS, BROODER_PHOTOS } from "@/lib/chick-photos";
import { buildHead, jsonLdScript } from "@/lib/seo";

const FAQ: FaqItem[] = [
  { q: "Каких перепелят лучше взять новичку?", a: "Подрощенных 2–3 недель: они уже окрепли, проще в содержании и сохранность выше." },
  { q: "Какая температура нужна суточным?", a: "+35…+37 °C в брудере, к концу первой недели снижают до +25 °C." },
  { q: "Когда перепела начнут нестись?", a: "Примерно на 40–50 день жизни." },
  { q: "Сколько стоят перепелята?", a: "Цена зависит от породы, возраста и количества — уточняйте по телефону или в WhatsApp." },
];

export const Route = createFileRoute("/perepelyata")({
  head: () => ({
    ...buildHead({
      title: "Перепелята суточные и подрощенные — купить с фермы",
      description: "Суточные и подрощенные перепелята разных пород с нашей фермы в Ставропольском крае. Свой инкубатор и брудер.",
      path: "/perepelyata/",
    }),
    scripts: [jsonLdScript(faqJsonLd(FAQ))],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero kicker="Для разведения" title="Перепелята" lead="Суточные и подрощенные перепелята из нашего инкубатора." image={DAY_CHICKS[0]} imageAlt="Суточные перепелята" />
      <Section>
        <ChickBreeds product="перепелята" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-serif text-2xl font-semibold">Суточные</h2>
            <p className="mt-2 text-lg text-foreground/85">Самый недорогой старт. Нужен брудер с теплом +35…+37 °C в первую неделю.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-serif text-2xl font-semibold">Подрощенные (2–3 недели)</h2>
            <p className="mt-2 text-lg text-foreground/85">Уже окрепли и оперились. Лучший выбор, если вы только начинаете.</p>
          </div>
        </div>
        <Prose>
          <FarmVideo kind="hatch" title="Так появляются наши перепелята" />
          <PhotoStrip title="Суточные перепелята" photos={DAY_CHICKS} alt="Суточные перепелята" />
          <FarmVideo kind="brooder" />
          <PhotoStrip title="Наш брудер" photos={BROODER_PHOTOS} alt="Перепелята в брудере" />
        </Prose>
      </Section>
      <Section className="border-t border-border">
        <h2 className="font-serif text-2xl font-semibold">Вопросы и ответы</h2>
        <div className="mt-4"><FaqAccordion items={FAQ} /></div>
      </Section>
      <Section><FinalCta title="Заказать перепелят" subtitle="Скажите породу и количество — подскажем цену и дату." text="Здравствуйте! Хочу заказать перепелят." /></Section>
    </PageShell>
  );
}
