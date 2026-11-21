import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { PHONE_DISPLAY, telUrl, whatsappUrl } from "@/lib/contacts";

export const PRODUCTS = ["Пищевое яйцо", "Инкубационное яйцо", "Мясо и тушки", "Суточные / подрощенные перепелята", "Несушки и родительское стадо", "Комбикорм", "Клетки", "Сопутствующие товары"] as const;
export const UNITS = ["шт.", "кг", "лотков", "голов"] as const;
export const FREQUENCIES = ["разово (пробная партия)", "1 раз в неделю", "2 раза в неделю", "1 раз в 2 недели", "1 раз в месяц", "по своему графику"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Минимум 2 символа").max(80),
  phone: z.string().trim().min(6, "Введите телефон").max(30),
  company: z.string().trim().max(120).optional(),
  products: z.array(z.enum(PRODUCTS)).min(1, "Выберите хотя бы один товар"),
  amount: z.coerce.number({ invalid_type_error: "Укажите объём" }).positive("Укажите объём").max(1_000_000),
  unit: z.enum(UNITS),
  frequency: z.enum(FREQUENCIES),
  message: z.string().trim().max(500).optional(),
});

export type OptLead = z.infer<typeof schema>;
type Data = OptLead;
export const optLeadSchema = schema;

function formatAmount(n: number): string {
  return Number.isInteger(n) ? n.toLocaleString("ru-RU") : String(n);
}

export function buildWaText(d: Data): string {
  const lines = [
    "Здравствуйте! Заявка на опт со страницы «Опт»:",
    `• Имя: ${d.name}`,
    `• Телефон: ${d.phone}`,
  ];
  if (d.company) lines.push(`• Организация: ${d.company}`);
  lines.push(`• Продукция (${d.products.length}):`);
  d.products.forEach((p, i) => lines.push(`   ${i + 1}. ${p}`));
  lines.push(`• Объём: ${formatAmount(d.amount)} ${d.unit} за поставку`);
  lines.push(`• Частота поставок: ${d.frequency}`);
  if (d.message) lines.push(`• Комментарий: ${d.message}`);
  return lines.join("\n");
}

export function OptLeadForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<{ waUrl: string } | null>(null);

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <h3 className="font-serif text-xl">Спасибо! Заявка принята</h3>
        <p className="text-sm text-muted-foreground">
          Мы откроем чат WhatsApp — отправьте сообщение и мы вышлем актуальный прайс.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <Button asChild className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
            <a href={done.waUrl} target="_blank" rel="noopener">
              <MessageCircle className="mr-2 h-5 w-5" /> Открыть WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={telUrl()}><Phone className="mr-2 h-5 w-5" /> {PHONE_DISPLAY}</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const raw = {
          name: String(fd.get("name") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          company: String(fd.get("company") ?? "") || undefined,
          products: fd.getAll("products").map(String),
          amount: String(fd.get("amount") ?? ""),
          unit: String(fd.get("unit") ?? ""),
          frequency: String(fd.get("frequency") ?? ""),
          message: String(fd.get("message") ?? "") || undefined,
        };
        const res = schema.safeParse(raw);
        if (!res.success) {
          const errs: Record<string, string> = {};
          for (const issue of res.error.issues) errs[String(issue.path[0])] = issue.message;
          setErrors(errs);
          return;
        }
        setErrors({});
        const text = buildWaText(res.data);
        const url = whatsappUrl(text);
        console.log("[opt-lead]", res.data);
        // открываем WhatsApp в новой вкладке
        if (typeof window !== "undefined") window.open(url, "_blank", "noopener");
        setDone({ waUrl: url });
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Имя *</Label>
          <Input id="name" name="name" required maxLength={80} />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Телефон *</Label>
          <Input id="phone" name="phone" required type="tel" maxLength={30} placeholder="+7 ___ ___-__-__" />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="company">Организация</Label>
        <Input id="company" name="company" maxLength={120} placeholder="Кафе, ресторан, магазин…" />
      </div>
      <fieldset>
        <legend className="text-sm font-medium">Продукция * <span className="font-normal text-muted-foreground">(можно несколько)</span></legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {PRODUCTS.map((p) => (
            <label key={p} className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <input type="checkbox" name="products" value={p} className="h-4 w-4 accent-primary" />
              {p}
            </label>
          ))}
        </div>
        {errors.products && <p className="mt-1 text-xs text-destructive">{errors.products}</p>}
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="amount">Объём за поставку *</Label>
          <div className="mt-1 flex gap-2">
            <Input id="amount" name="amount" type="number" inputMode="decimal" min={0.1} step="any" required placeholder="Например, 500" className="flex-1" />
            <select name="unit" aria-label="Единица" defaultValue={UNITS[0]} className="h-10 rounded-md border border-input bg-background px-2 text-sm">
              {UNITS.map((u) => <option key={u}>{u}</option>)}
            </select>
          </div>
          {errors.amount && <p className="mt-1 text-xs text-destructive">{errors.amount}</p>}
        </div>
        <div>
          <Label htmlFor="frequency">Частота поставок *</Label>
          <select
            id="frequency"
            name="frequency"
            required
            defaultValue={FREQUENCIES[0]}
            className="mt-1 block h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {FREQUENCIES.map((f) => <option key={f}>{f}</option>)}
          </select>
        </div>
      </div>
      <div>
        <Label htmlFor="message">Комментарий</Label>
        <Textarea id="message" name="message" rows={3} maxLength={500} placeholder="Город доставки, сроки, особые требования…" />
      </div>
      <Button type="submit" size="lg" className="w-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 sm:w-auto">
        <MessageCircle className="mr-2 h-5 w-5" /> Получить прайс в WhatsApp
      </Button>
      <p className="text-xs text-muted-foreground">
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных. Мы откроем чат WhatsApp с готовым сообщением.
      </p>
    </form>
  );
}
