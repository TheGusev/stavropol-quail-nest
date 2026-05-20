# Ставропольский Перепел

Статический сайт на Vite + React + TanStack Router (file-based роутинг).
После сборки в `dist/` лежит готовый набор HTML + ассетов для любого статического хостинга.

## Команды

```bash
npm install
npm run dev          # дев-сервер
npm run build        # сборка + пререндер всех страниц → dist/
npm run build:prod   # то же самое; используется в CI
npm run build:spa    # сборка без пререндера (только index.html)
npm run preview      # локальный просмотр готового dist/
```

## Пререндер

`npm run build` запускает Vite + headless Chromium, который проходит по всем
маршрутам и сохраняет полный HTML с уникальными `<title>`, `meta`, OG-тегами
и JSON-LD в `dist/<route>/index.html`. Для работы нужен chromium в системе:

- Linux: `apt install chromium-browser`
- macOS: `brew install chromium`
- Можно указать путь вручную: `PUPPETEER_EXECUTABLE_PATH=/path/to/chrome npm run build`
- Отключить пререндер: `PRERENDER=0 npm run build` (равносильно `build:spa`)

Список маршрутов — в `scripts/routes.mjs` (единая точка для пререндера и
sitemap.xml). Новую страницу добавляем туда же.

## Автодеплой: GitHub Actions → Beget (FTPS)

Любой push в `main` (включая правки из Lovable через GitHub sync) запускает
`.github/workflows/deploy.yml`:

1. `npm ci` + установка Chromium на runner-е.
2. `npm run build:prod` — Vite собирает `dist/`, prerender обходит все
   маршруты, генерируется `sitemap.xml` и `robots.txt`.
3. `dist/` сохраняется как GitHub artifact (`dist-<sha>`, хранится 14 дней —
   для отката).
4. `SamKirkland/FTP-Deploy-Action` заливает содержимое `dist/` по FTPS на
   Beget в каталог из `FTP_PATH`.

### GitHub Secrets

Settings → Secrets and variables → Actions → New repository secret:

| Secret | Значение | Где взять |
|---|---|---|
| `FTP_HOST` | `<имя_аккаунта>.beget.tech` или IP | Beget → «Сайты» / «FTP» |
| `FTP_USER` | FTP-логин | Beget → «FTP» |
| `FTP_PASSWORD` | пароль FTP-пользователя | Beget → «FTP» |
| `FTP_PATH` | путь к корню сайта, напр. `/site-root/` или `/<домен>/public_html/` | Beget → «Сайты» → корневая папка домена |

Beget по умолчанию поддерживает FTPS на порту 21 (explicit). Менять ничего
не нужно.

### .htaccess

В `public/.htaccess` уже настроены SPA-fallback (`mod_rewrite`) и
кеш-заголовки (`mod_headers`). Оба модуля на Beget включены по умолчанию.

### Откат

1. GitHub → вкладка **Actions** → выбрать предыдущий успешный run.
2. Скачать артефакт `dist-<sha>.zip`.
3. Загрузить содержимое через FTP-клиент в каталог `FTP_PATH` на Beget
   (или временно изменить `FTP_PATH` и перезапустить workflow вручную:
   Actions → Build & Deploy to Beget → Run workflow).

## Альтернативные варианты деплоя

`dist/` — обычная статика, можно залить куда угодно:

- **Netlify / Cloudflare Pages** — `public/_redirects` уже настроен
  (`/* /index.html 200`).
- **Nginx**: `try_files $uri $uri/index.html /index.html;`
- **GitHub Pages / S3** — настроить 404 → index.html для SPA-фолбэка.
