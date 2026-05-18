# Ставропольский Перепел

Статический сайт на Vite + React + TanStack Router (file-based роутинг).
После сборки в `dist/` лежит готовый набор HTML + ассетов для любого статического хостинга.

## Команды

```bash
npm install
npm run dev          # дев-сервер
npm run build        # сборка + пререндер всех страниц → dist/
npm run build:spa    # сборка без пререндера (только index.html)
npm run preview      # локальный просмотр готового dist/
```

## Пререндер

`npm run build` запускает Vite + headless Chromium, который проходит по всем
маршрутам и сохраняет полный HTML с уникальными `<title>`, `meta`, OG-тегами
и JSON-LD в `dist/<route>/index.html`. Для работы нужен chromium в системе:

- Linux: `apt install chromium` или `nix-env -iA nixpkgs.chromium`
- macOS: `brew install chromium`
- Можно указать путь вручную: `PUPPETEER_EXECUTABLE_PATH=/path/to/chrome npm run build`
- Отключить пререндер: `PRERENDER=0 npm run build` (равносильно `build:spa`)

Список маршрутов жёстко задан в `scripts/prerender.mjs` — при добавлении
новой страницы добавь её туда же.

## Деплой

Папка `dist/` — статика. Заливай как есть.

**Nginx** — пример конфига для SPA-фолбэка (если зайдут на путь без
пререндера):

```nginx
server {
  root /var/www/site/dist;
  index index.html;
  location / {
    try_files $uri $uri/index.html $uri/ /index.html;
  }
}
```

**Netlify / Cloudflare Pages** — файл `public/_redirects` уже настроен
(`/* /index.html 200`).

**GitHub Pages / S3** — настрой 404 → index.html для SPA-фолбэка.
