import { Link } from "@tanstack/react-router";
import { ExtraContacts } from "@/components/ExtraContacts";
import { PHONE_DISPLAY, SITE_NAME, telUrl } from "@/lib/contacts";
import { NAV } from "@/lib/nav";

const CITIES = [
  { to: "/stavropol", label: "Ставрополь" },
  { to: "/mihaylovsk", label: "Михайловск" },
  { to: "/budyonnovsk", label: "Будённовск" },
  { to: "/pyatigorsk", label: "Пятигорск" },
  { to: "/essentuki", label: "Ессентуки" },
  { to: "/nevinnomyssk", label: "Невинномысск" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-[1.3fr,1fr]">
        <div>
          <div className="font-serif text-xl font-bold">{SITE_NAME}</div>
          <p className="mt-2 text-muted-foreground">Своя перепелиная ферма в Ставропольском крае.</p>
          <a href={telUrl()} className="mt-3 block text-2xl font-bold text-primary">{PHONE_DISPLAY}</a>
          <ExtraContacts className="mt-3" />
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-base">
          {NAV.map((l) => (
            <li key={l.to}><Link to={l.to} className="hover:text-primary">{l.label}</Link></li>
          ))}
        </ul>
      </div>
      <div className="border-t border-border/60 px-4 py-4 text-center text-xs text-muted-foreground">
        Доставка:{" "}
        {CITIES.map((c, i) => (
          <span key={c.to}>{i > 0 && " · "}<Link to={c.to} className="hover:text-primary">{c.label}</Link></span>
        ))}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>© {new Date().getFullYear()} {SITE_NAME}</span>
          <Link to="/privacy" className="hover:text-primary">Политика конфиденциальности</Link>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
            className="hover:text-primary"
          >
            Настройки куки
          </button>
        </div>
      </div>
    </footer>
  );
}
