import { Button } from "@/components/ui/button";
import { whatsappUrl, telUrl } from "@/lib/contacts";
import { MessageCircle, Phone } from "lucide-react";

export function CtaButtons({
  text = "Здравствуйте! Хочу сделать заказ.",
  size = "default",
}: {
  text?: string;
  size?: "default" | "lg" | "sm";
}) {
  return (
    <div className="flex w-full flex-wrap justify-center gap-3">
      <Button asChild size={size} className="w-full min-w-[220px] flex-1 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 sm:w-auto sm:flex-none">
        <a href={whatsappUrl(text)} target="_blank" rel="noopener">
          <MessageCircle className="mr-2 h-5 w-5" /> Заказать в WhatsApp
        </a>
      </Button>
      <Button asChild size={size} variant="outline" className="w-full min-w-[220px] flex-1 sm:w-auto sm:flex-none">
        <a href={telUrl()}>
          <Phone className="mr-2 h-5 w-5" /> Позвонить
        </a>
      </Button>
    </div>
  );
}
