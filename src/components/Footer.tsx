import { Link } from "@tanstack/react-router";
import { ADDRESS, EMAIL, PHONE_DISPLAY, SITE_NAME, telUrl } from "@/lib/contacts";

const COLS = [
  {
    title: "Яйца и птица",
    links: [
      { to: "/perepelinye-yaytsa", label: "Пищевые яйца" },
      { to: "/inkubatsionnoe-yaytso", label: "Инкубационное яйцо" },
      { to: "/ptitsa/sutochnye", label: "Суточные перепелята" },
      { to: "/ptitsa/podroshchennye", label: "Подрощенные" },
      { to: "/ptitsa/nesushki", label: "Несушки" },
      { to: "/ptitsa/roditelskoe-stado", label: "Родительское стадо" },
    ],
  },
  {
    title: "Мясо и переработка",
    links: [
      { to: "/myaso-perepela", label: "Охлаждённое мясо" },
      { to: "/myaso/zamorozhennoe", label: "Замороженное" },
      { to: "/myaso/dlya-zapekaniya", label: "Для запекания" },
      { to: "/myaso/marinovannye-kopchenye", label: "Маринованные / копчёные" },
      { to: "/myaso/marinovannye-yaytsa", label: "Маринованные яйца" },
      { to: "/myaso/vybrakovannye", label: "Выбракованные" },
    ],
  },
  {
    title: "Ещё",
    links: [
      { to: "/soputstvuyushchie/pomet", label: "Помёт" },
      { to: "/soputstvuyushchie/skorlupa", label: "Скорлупа" },
      { to: "/soputstvuyushchie/pero-pukh", label: "Перо и пух" },
      { to: "/korm", label: "Корм для перепелов" },
      { to: "/korm/startovyy", label: "Стартовый комбикорм" },
      { to: "/kletki", label: "Клетки" },
      { to: "/opt", label: "Опт / HoReCa" },
      { to: "/dostavka", label: "Доставка" },
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
