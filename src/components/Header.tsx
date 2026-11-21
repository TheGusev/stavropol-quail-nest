import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { PHONE_DISPLAY, telUrl } from "@/lib/contacts";
import { NAV } from "@/lib/nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="flex items-center justify-between gap-3 py-2.5 lg:py-3">
          <Link to="/" aria-label="Ставропольский Перепел — на главную" className="min-w-0">
            <span className="title-shimmer block whitespace-nowrap font-serif text-[19px] font-bold leading-none sm:text-2xl">
              Ставропольский Перепел
            </span>
          </Link>
          <a
            href={telUrl()}
            aria-label={`Позвонить ${PHONE_DISPLAY}`}
            className="flex shrink-0 items-center gap-2 rounded-full bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground lg:px-4"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          </a>
        </div>
        <nav aria-label="Разделы сайта" className="-mx-3 overflow-x-auto px-3 pb-2.5 [scrollbar-width:none] sm:-mx-4 sm:px-4 [&::-webkit-scrollbar]:hidden">
          <ul className="flex gap-2 lg:justify-center">
            {NAV.map((n) => (
              <li key={n.to} className="shrink-0">
                <Link
                  to={n.to}
                  className="block rounded-full border border-border bg-card px-3.5 py-2 text-[15px] font-medium text-foreground transition-colors hover:border-primary"
                  activeProps={{ className: "!border-primary !bg-primary !text-primary-foreground" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
