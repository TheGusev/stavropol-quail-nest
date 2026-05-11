import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Минимум 2 символа").max(80),
  phone: z.string().trim().min(6, "Введите телефон").max(30),
  message: z.string().trim().max(500).optional(),
});

export function LeadForm({ subject = "Заявка с сайта" }: { subject?: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <h3 className="font-serif text-xl">Спасибо! Заявка отправлена</h3>
        <p className="text-sm text-muted-foreground">Мы свяжемся с вами в течение рабочего дня.</p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const data = {
          name: String(fd.get("name") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          message: String(fd.get("message") ?? ""),
        };
        const res = schema.safeParse(data);
        if (!res.success) {
          const errs: Record<string, string> = {};
          for (const issue of res.error.issues) errs[String(issue.path[0])] = issue.message;
          setErrors(errs);
          return;
        }
        setErrors({});
        // MVP: stub-отправка
        console.log("[lead]", subject, res.data);
        setDone(true);
      }}
    >
      <div>
        <Label htmlFor="name">Имя</Label>
        <Input id="name" name="name" required maxLength={80} />
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
      </div>
      <div>
        <Label htmlFor="phone">Телефон</Label>
        <Input id="phone" name="phone" required type="tel" maxLength={30} placeholder="+7 ___ ___-__-__" />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
      </div>
      <div>
        <Label htmlFor="message">Комментарий</Label>
        <Textarea id="message" name="message" maxLength={500} rows={3} />
      </div>
      <Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button>
      <p className="text-xs text-muted-foreground">
        Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных.
      </p>
    </form>
  );
}
