import { whatsappUrl, telUrl } from "@/lib/contacts";

export interface Breed { name: string; type: "яичная" | "мясная"; price?: string }

export const EGG_BREEDS: Breed[] = [
  { name: "Феникс золотистый", type: "яичная", price: "13–14 ₽/шт." },
  { name: "Фараон", type: "яичная", price: "15 ₽/шт." },
  { name: "Саладон", type: "яичная", price: "15 ₽/шт." },
  { name: "Техас утяжелённый (белый)", type: "мясная", price: "11 ₽/шт." },
  { name: "Дмитровская", type: "мясная", price: "15 ₽/шт." },
  { name: "Радонежская", type: "мясная", price: "15 ₽/шт." },
];

export const CHICK_BREEDS = ["Саладон", "Фараон", "Техас", "Дмитровские", "Феникс серебристый", "Феникс золотистый"];

export function BreedPriceGrid({ breeds, product }: { breeds: Breed[]; product: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {breeds.map((b) => (
        <div key={b.name} className="flex flex-col rounded-xl border border-border bg-card p-4">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">{b.type} порода</span>
          <span className="mt-1 font-serif text-lg font-semibold">{b.name}</span>
          <span className="mt-2 text-2xl font-bold text-primary">{b.price ?? "по телефону"}</span>
          <a href={whatsappUrl(`Здравствуйте! Интересует ${product}: ${b.name}.`)} target="_blank" rel="noopener" className="mt-3 text-sm font-medium text-primary hover:underline">Заказать в WhatsApp →</a>
        </div>
      ))}
    </div>
  );
}

export function ChickBreeds({ product }: { product: string }) {
  return (
    <div className="not-prose rounded-xl border border-border bg-card p-5">
      <h2 className="font-serif text-xl font-semibold">Породы в наличии</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {CHICK_BREEDS.map((b) => <span key={b} className="rounded-full bg-secondary px-3 py-1 text-sm">{b}</span>)}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">Любой породы. Цену уточняйте по телефону — зависит от возраста и количества.</p>
      <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
        <a href={telUrl()} className="text-primary hover:underline">Уточнить цену по телефону</a>
        <a href={whatsappUrl(`Здравствуйте! Сколько стоят ${product}?`)} target="_blank" rel="noopener" className="text-primary hover:underline">Написать в WhatsApp</a>
      </div>
    </div>
  );
}

export function MeatPrices() {
  return (
    <div className="not-prose grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="text-sm text-muted-foreground">Розница (до 5 кг)</div>
        <div className="mt-1 text-3xl font-bold text-primary">850 ₽/кг</div>
      </div>
      <div className="rounded-xl border border-primary bg-card p-5">
        <div className="text-sm text-muted-foreground">Опт</div>
        <div className="mt-1 text-3xl font-bold text-primary">550 ₽/кг</div>
      </div>
    </div>
  );
}
