import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { PHONE_DISPLAY, telUrl, whatsappUrl } from "@/lib/contacts";

const PRODUCTS = ["Перепелиные яйца", "Мясо перепела", "Инкубационное яйцо", "Молодняк", "Всё вместе"] as const;
const VOLUMES = ["до 500 шт./нед", "500–2000 шт./нед", "2000–10 000 шт./нед", "более 10 000 шт./нед"] as const;
const FREQUENCIES = ["разово (тестовая партия)", "1 раз в неделю", "2 раза в неделю", "по индивидуальному графику"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Минимум 2 символа").max(80),
  phone: z.string().trim().min(6, "Введите телефон").max(30),
  company: z.string().trim().max(120).optional(),
  product: z.enum(PRODUCTS),
  volume: z.enum(VOLUMES),
  frequency: z.enum(FREQUENCIES),
  message: z.string().trim().max(500).optional(),
});

type Data = z.infer<typeof schema>;

function buildWaText(d: Data): string {
  return [
    "Здравствуйте! Заявка на опт со страницы /opt/:",
    `• Имя: ${d.name}`,
    `• Телефон: ${d.phone}`,
    d.company ? `• Организация: ${d.company}` : null,
    `• Категория: ${d.product}`,
    `• Объём: ${d.volume}`,
    `• Частота: ${d.frequency}`,
    d.message ? `• Комментарий: ${d.message}` : null,
  ].filter(Boolean).join("\n");
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
          product: String(fd.get("product") ?? ""),
          volume: String(fd.get("volume") ?? ""),
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
      <div>
        <Label htmlFor="product">Что интересует *</Label>
        <select
          id="product"
          name="product"
          required
          defaultValue={PRODUCTS[0]}
          className="mt-1 block h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          {PRODUCTS.map((p) => <option key={p}>{p}</option>)}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="volume">Объём *</Label>
          <select
            id="volume"
            name="volume"
            required
            defaultValue={VOLUMES[0]}
            className="mt-1 block h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {VOLUMES.map((v) => <option key={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <Label htmlFor="frequency">Частота *</Label>
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
