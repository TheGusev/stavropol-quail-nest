import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PHONE_DISPLAY, telUrl, whatsappUrl } from "@/lib/contacts";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/mascot/Mascot";

const NAV = [
  { to: "/catalog", label: "Каталог" },
  { to: "/yaytsa", label: "Яйца" },
  { to: "/ptitsa", label: "Птица" },
  { to: "/myaso", label: "Мясо" },
  { to: "/korm", label: "Корм" },
  { to: "/kletki", label: "Клетки" },
  { to: "/opt", label: "Опт" },
  { to: "/dostavka", label: "Доставка" },
  { to: "/kontakty", label: "Контакты" },
] as const;

const TITLE = "Ставропольский Перепел";
const SPECIAL_ATTRS: Record<number, string[]> = {
  0: ["data-mascot-walk-start"],
  1: ["data-mascot-egg-start"],
  6: ["data-mascot-hatch-zone-start"],
  8: ["data-mascot-hatch-zone-end"],
  15: ["data-mascot-jump"],
  21: ["data-mascot-walk-end", "data-mascot-menu-anchor"],
};

function LogoTitle({ reduced }: { reduced: boolean }) {
  return (
    <Link
      to="/"
      aria-label="Ставропольский Перепел — на главную"
      className="inline-block text-foreground focus-visible:outline-none"
    >
      <span className="title-shimmer block whitespace-nowrap font-serif text-[18px] [@media(min-width:360px)]:text-[19px] font-bold leading-none sm:text-2xl lg:text-2xl">
        {Array.from(TITLE).map((ch, i) => {
          const attrs = SPECIAL_ATTRS[i];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const extra: Record<string, any> = {};
          if (attrs) attrs.forEach((a) => (extra[a] = ""));
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

function MobileNavStrip({ reduced }: { reduced: boolean }) {
  return (
    <motion.nav
      aria-label="Разделы сайта"
      className="lg:hidden -mx-3 sm:-mx-4 overflow-x-auto px-3 sm:px-4 pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      initial={reduced ? false : { opacity: 0, y: -4 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={reduced ? undefined : { duration: 0.3, ease: "easeOut", delay: 0.2 }}
    >
      <ul className="flex gap-1.5">
        {NAV.map((n) => (
          <li key={n.to} className="shrink-0">
            <Link
              to={n.to}
              className="inline-flex items-center rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
              activeProps={{
                className:
                  "inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
              }}
            >
              {n.label}
            </Link>
          </li>
        ))}
        <li className="shrink-0">
          <a
            href={whatsappUrl("Здравствуйте! Хочу сделать заказ.")}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center rounded-full border border-whatsapp/40 bg-whatsapp/10 px-3 py-1 text-xs font-semibold text-whatsapp transition-colors hover:bg-whatsapp/20"
          >
            WhatsApp
          </a>
        </li>
        <li className="shrink-0">
          <a
            href={telUrl()}
            className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
          >
            <Phone className="h-3 w-3" /> Позвонить
          </a>
        </li>
      </ul>
    </motion.nav>
  );
}

export function Header() {
  const reduced = !!useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="relative mx-auto max-w-6xl px-3 sm:px-4">
        <div className="flex flex-col gap-0 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-3">
          {/* Track: верхняя зона — поле для птенца; снизу — фундамент-название */}
          <div data-mascot-track className="relative pt-10 sm:pt-11 lg:pt-9">
            <LogoTitle reduced={reduced} />
            {mounted && <Mascot />}
          </div>

          <MobileNavStrip reduced={reduced} />

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
      </div>
    </header>
  );
}
