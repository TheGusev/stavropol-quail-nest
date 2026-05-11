import { Phone, MessageCircle, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { telUrl, whatsappUrl } from "@/lib/contacts";

export function MobileBottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <a
        href={whatsappUrl("Здравствуйте! Хочу сделать заказ.")}
        target="_blank"
        rel="noopener"
        className="flex flex-col items-center gap-0.5 py-2.5 text-xs text-whatsapp"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>
      <a href={telUrl()} className="flex flex-col items-center gap-0.5 border-x border-border py-2.5 text-xs text-foreground">
        <Phone className="h-5 w-5" />
        Позвонить
      </a>
      <Link to="/catalog" className="flex flex-col items-center gap-0.5 py-2.5 text-xs text-foreground">
        <ShoppingBag className="h-5 w-5" />
        Каталог
      </Link>
    </div>
  );
}
