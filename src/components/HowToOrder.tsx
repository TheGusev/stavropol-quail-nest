import { MessageCircle, Calendar, Truck } from "lucide-react";

const STEPS = [
  { icon: MessageCircle, title: "Напишите в WhatsApp", text: "Или позвоните. Мы примем заказ за 1–2 минуты." },
  { icon: Calendar, title: "Согласуем дату и состав", text: "Подберём фасовку, объём и удобное время." },
  { icon: Truck, title: "Доставка или самовывоз", text: "Курьер по Ставрополю/Михайловску, ТК — по краю." },
];

export function HowToOrder() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {STEPS.map((s, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{i + 1}</span>
            <s.icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="mt-3 font-serif text-lg font-semibold">{s.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
        </div>
      ))}
    </div>
  );
}
