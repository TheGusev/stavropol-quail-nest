import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/contacts";
import { MessageCircle } from "lucide-react";

export interface PackagingCardProps {
  title: string;
  description: string;
  price?: string;
  note?: string;
  waText: string;
  badge?: string;
}

export function PackagingCard({ title, description, price, note, waText, badge }: PackagingCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
      {badge && (
        <span className="mb-2 self-start rounded-full bg-accent/30 px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
          {badge}
        </span>
      )}
      <h3 className="font-serif text-xl font-semibold">{title}</h3>
      <p className="mt-1 flex-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4">
        <div className="font-serif text-2xl font-semibold text-foreground">{price ?? "по запросу"}</div>
        {note && <div className="mt-0.5 text-xs text-muted-foreground">{note}</div>}
      </div>
      <Button asChild className="mt-4 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
        <a href={whatsappUrl(waText)} target="_blank" rel="noopener">
          <MessageCircle className="mr-2 h-4 w-4" /> Заказать в WhatsApp
        </a>
      </Button>
    </div>
  );
}
