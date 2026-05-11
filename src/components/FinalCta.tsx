import { CtaButtons } from "./CtaButtons";

export function FinalCta({ title = "Готовы заказать?", text = "Здравствуйте! Хочу сделать заказ.", subtitle }: { title?: string; text?: string; subtitle?: string }) {
  return (
    <div className="rounded-3xl border border-border bg-secondary/40 p-8 text-center md:p-12">
      <h2 className="font-serif text-3xl font-semibold md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
      <div className="mt-6 flex justify-center"><CtaButtons size="lg" text={text} /></div>
    </div>
  );
}
