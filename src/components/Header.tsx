import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PHONE_DISPLAY, telUrl, whatsappUrl } from "@/lib/contacts";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/mascot/Mascot";

const NAV = [
  { to: "/catalog", label: "Каталог" },
  { to: "/opt", label: "Опт" },
  { to: "/dostavka", label: "Доставка" },
  { to: "/o-ferme", label: "О ферме" },
  { to: "/faq", label: "FAQ" },
  { to: "/kontakty", label: "Контакты" },
] as const;

const TITLE = "Ставропольский Перепел";
// Индексы букв в TITLE: 0:С 1:т 2:а 3:в 4:р 5:о 6:п 7:о 8:л 9:ь 10:с 11:к 12:и 13:й 14:(space) 15:П 16:е 17:р 18:е 19:п 20:е 21:л
const SPECIAL_ATTRS: Record<number, string> = {
  0: "data-mascot-walk-start",
  1: "data-mascot-egg-start",
  6: "data-mascot-hatch-zone-start",
  8: "data-mascot-hatch-zone-end",
  15: "data-mascot-jump",
  21: "data-mascot-walk-end",
};

function LogoTitle({ reduced }: { reduced: boolean }) {
  return (
    <Link
      to="/"
      aria-label="Ставропольский Перепел — на главную"
      className="inline-block focus-visible:outline-none"
    >
      <span className="block whitespace-nowrap font-serif text-[26px] font-bold leading-none text-foreground sm:text-3xl lg:text-2xl">
        {Array.from(TITLE).map((ch, i) => {
          const dataAttr = SPECIAL_ATTRS[i];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const extra: Record<string, any> = {};
          if (dataAttr) extra[dataAttr] = "";
          return (
            <motion.span
              key={i}
              {...extra}
              className="inline-block"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={reduced ? undefined : { delay: 0.025 * i, duration: 0.32, ease: "easeOut" }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          );
        })}
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const reduced = !!useReducedMotion();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        {/* Mobile: только бургер */}
        <div className="flex items-center justify-end py-2 lg:hidden">
          <button
            className="-mr-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-muted"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Title row + (desktop) nav/actions */}
        <div className="flex flex-col gap-2 pb-2 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-3 lg:pb-3">
          {/* Track: яйцо/птенец живут поверх букв логотипа */}
          <div
            data-mascot-track
            className="relative pt-7 sm:pt-9 lg:pt-9"
          >
            <LogoTitle reduced={reduced} />
            <Mascot />
          </div>

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

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={telUrl()}
              className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <Button
              asChild
              className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
            >
              <a
                href={whatsappUrl("Здравствуйте! Хочу сделать заказ.")}
                target="_blank"
                rel="noopener"
              >
                WhatsApp
              </a>
            </Button>
          </div>
        </div>

        {open && (
          <div className="border-t border-border bg-background lg:hidden">
            <nav className="flex flex-col py-2">
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
              <a
                href={telUrl()}
                className="flex items-center gap-2 py-3 text-foreground"
                onClick={() => setOpen(false)}
              >
                <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
              </a>
              <a
                href={whatsappUrl("Здравствуйте! Хочу сделать заказ.")}
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-md bg-whatsapp px-4 py-2 text-sm font-medium text-whatsapp-foreground hover:bg-whatsapp/90"
              >
                Написать в WhatsApp
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
