import { createFileRoute } from "@tanstack/react-router";
import { FarmTeam, FARM_INCUBATOR } from "@/components/FarmTeam";
import { ExtraContacts } from "@/components/ExtraContacts";
import { PageShell } from "@/components/PageShell";
import { PageHero, Section } from "@/components/PageHero";
import { LeadForm } from "@/components/LeadForm";
import { buildHead } from "@/lib/seo";
import { ADDRESS, EMAIL, PHONE_DISPLAY, telUrl, whatsappUrl } from "@/lib/contacts";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/kontakty")({
  head: () =>
    buildHead({
      title: "О ферме и контакты — «Ставропольский Перепел»",
      description:
        "Телефон, WhatsApp, email и адрес фермы. Напишите нам — ответим в течение рабочего дня и согласуем заказ.",
      path: "/kontakty/",
    }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero kicker="Связаться" title="О ферме и контакты" lead="Позвоните или напишите в WhatsApp — ответим и всё подскажем." image={FARM_INCUBATOR} imageAlt="Хозяин фермы у инкубатора" />
      <Section>
        <div className="grid gap-10 md:grid-cols-[1fr,1fr]">
          <div className="space-y-4">
            <a href={telUrl()} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary">
              <Phone className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Телефон</div>
                <div className="font-medium">{PHONE_DISPLAY}</div>
              </div>
            </a>
            <a href={whatsappUrl("Здравствуйте!")} target="_blank" rel="noopener" className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary">
              <MessageCircle className="mt-0.5 h-5 w-5 text-whatsapp" />
              <div>
                <div className="text-sm text-muted-foreground">WhatsApp</div>
                <div className="font-medium">Написать в WhatsApp</div>
              </div>
            </a>
            <ExtraContacts />
            <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary">
              <Mail className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="font-medium">{EMAIL}</div>
              </div>
            </a>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Адрес</div>
                <div className="font-medium">{ADDRESS.region}, {ADDRESS.locality}</div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold">Отправить заявку</h2>
            <p className="mt-1 text-sm text-muted-foreground">Перезвоним и согласуем заказ.</p>
            <div className="mt-4"><LeadForm subject="Заявка через контакты" /></div>
          </div>
        </div>
      </Section>
      <Section className="border-t border-border"><FarmTeam /></Section>
    </PageShell>
  );
}
