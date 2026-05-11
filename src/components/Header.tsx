import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { PHONE_DISPLAY, telUrl, whatsappUrl } from "@/lib/contacts";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/catalog", label: "Каталог" },
  { to: "/opt", label: "Опт" },
  { to: "/dostavka", label: "Доставка" },
  { to: "/o-ferme", label: "О ферме" },
  { to: "/faq", label: "FAQ" },
  { to: "/kontakty", label: "Контакты" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-serif text-lg font-bold text-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">СП</span>
          <span className="hidden sm:inline">Ставропольский Перепел</span>
          <span className="sm:hidden">СП</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary font-semibold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a href={telUrl()} className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary">
            <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
          </a>
          <Button asChild className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
            <a href={whatsappUrl("Здравствуйте! Хочу сделать заказ.")} target="_blank" rel="noopener">WhatsApp</a>
          </Button>
        </div>
        <button
          className="lg:hidden"
          aria-label="Меню"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-foreground"
              >
                {n.label}
              </Link>
            ))}
            <a href={telUrl()} className="flex items-center gap-2 py-3 text-foreground">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
