import { Link } from "@tanstack/react-router";
import { ADDRESS, EMAIL, PHONE_DISPLAY, SITE_NAME, telUrl } from "@/lib/contacts";

const COLS = [
  {
    title: "Каталог",
    links: [
      { to: "/perepelinye-yaytsa", label: "Пищевые яйца" },
      { to: "/inkubatsionnoe-yaytso", label: "Инкубационное яйцо" },
      { to: "/myaso-perepela", label: "Мясо перепела" },
      { to: "/molodnyak", label: "Молодняк" },
      { to: "/kletki", label: "Клетки" },
    ],
  },
  {
    title: "Покупателям",
    links: [
      { to: "/dostavka", label: "Доставка" },
      { to: "/opt", label: "Опт / HoReCa" },
      { to: "/sertifikaty", label: "Документы" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "География",
    links: [
      { to: "/stavropol", label: "Ставрополь" },
      { to: "/mihaylovsk", label: "Михайловск" },
      { to: "/pyatigorsk", label: "Пятигорск" },
      { to: "/essentuki", label: "Ессентуки" },
      { to: "/nevinnomyssk", label: "Невинномысск" },
      { to: "/budyonnovsk", label: "Будённовск" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="font-serif text-xl font-bold">{SITE_NAME}</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Свежие перепелиные яйца и мясо с фермы в Ставропольском крае.
          </p>
          <p className="mt-3 text-sm">
            <a href={telUrl()} className="block hover:text-primary">{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`} className="block hover:text-primary">{EMAIL}</a>
            <span className="mt-1 block text-muted-foreground">
              {ADDRESS.region}, {ADDRESS.locality}
            </span>
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{c.title}</div>
            <ul className="space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-primary">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE_NAME}. Все права защищены.
      </div>
    </footer>
  );
}
