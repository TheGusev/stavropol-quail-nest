## Цель
Привести SEO‑мета и краулинговые файлы в порядок: единый fallback OG‑картинки, чистый self‑canonical, и автогенерация `sitemap.xml` / `robots.txt` из единого списка роутов.

## 1. Единый fallback OG / Twitter image
- Создать `public/og-default.jpg` (1200×630, копия `hero-eggs.jpg` с лёгким брендингом — название фермы). Файл будет доступен по `https://stavropolskiy-perepel.ru/og-default.jpg`.
- В `src/lib/seo.ts` в `buildHead`:
  - всегда добавлять `og:image`, `og:image:width=1200`, `og:image:height=630`, `og:image:alt` и `twitter:image`;
  - если у роута есть свой `ogImage` — использовать его, иначе абсолютный URL `${SITE_URL}/og-default.jpg`;
  - если переданный `ogImage` относительный (`/...` или `src/assets/...`), приводить к абсолютному.

## 2. Self‑canonical без UTM
- `buildHead` уже строит `canonical` из `SITE_URL + path` — параметров там нет, это уже self‑canonical без UTM. План:
  - проверить, что во всех роутах `path` передаётся в каноничной форме (с завершающим `/`, нижний регистр) — собрать список из `grep "path:"` и сверить с файлами;
  - убрать дублирование: `<link rel="canonical">` объявлять ТОЛЬКО на листовых роутах (как и сейчас). В `__root.tsx` canonical не добавлять (TanStack Router конкатенирует `links` без дедупа);
  - добавить в `buildHead` дедуп `og:url` (он уже один) и единый формат `og:url === canonical`;
  - чтобы исключить шаблонные значения, добавить в `buildHead` валидацию dev‑time: если `title`/`description` совпадают с дефолтом из `__root.tsx`, выводить `console.warn` (не ломает прод).

## 3. Единый источник роутов + автогенерация sitemap / robots
- Создать `scripts/routes.mjs` — единственный источник правды:
  ```js
  export const ROUTES = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/catalog/", priority: "0.9", changefreq: "weekly" },
    // ... все 39 страниц с приоритетами
  ];
  ```
- Переписать `scripts/prerender.mjs`: импортировать `ROUTES` оттуда (вместо хардкода).
- Создать `scripts/generate-seo.mjs`:
  - генерирует `dist/sitemap.xml` из `ROUTES` (`<loc>`, `<lastmod>` = текущая дата сборки, `<changefreq>`, `<priority>`);
  - генерирует `dist/robots.txt` (сохраняя текущие директивы: разрешения для GPTBot/ClaudeBot/PerplexityBot/Google‑Extended, `Disallow: /api/`, `Disallow: /*?utm_`, `Sitemap:` строка);
  - удалить статические `public/sitemap.xml` и `public/robots.txt`, чтобы не было двух источников.
- В `package.json` обновить `build`:
  ```
  "build": "vite build && node scripts/generate-seo.mjs && node scripts/prerender.mjs"
  ```

## 4. Проверка трейлинг‑слешей
- Все URL в `ROUTES` (и, соответственно, в sitemap) — с `/` на конце (кроме корня), что совпадает с `path` в `buildHead` → canonical и `<loc>` в sitemap идентичны.
- Пререндер сохраняет каждую страницу в `dist/<route>/index.html` — это автоматически обслуживается и по `/foo`, и по `/foo/` любым статическим сервером (nginx, GitHub Pages).
- В `scripts/generate-seo.mjs` после генерации запускать самопроверку: для каждого URL из sitemap проверять, что соответствующий `dist/<path>/index.html` существует. Если нет — упасть с ошибкой сборки.

## Затронутые файлы
- new `public/og-default.jpg`
- new `scripts/routes.mjs`
- new `scripts/generate-seo.mjs`
- edit `scripts/prerender.mjs` (использовать общий ROUTES)
- edit `src/lib/seo.ts` (fallback og:image, абсолютизация)
- edit `package.json` (build chain)
- delete `public/sitemap.xml`, `public/robots.txt`

## Технические детали
- Абсолютизация ogImage: `ogImage.startsWith("http") ? ogImage : SITE_URL + (ogImage.startsWith("/") ? ogImage : "/" + ogImage)`.
- `lastmod` в sitemap — `new Date().toISOString().slice(0,10)` на момент сборки.
- Самопроверка sitemap — простая `fs.existsSync(path.join(DIST, route, "index.html"))`.
- Никаких изменений в роуты не требуется — `buildHead` уже принимает `path` с трейлинг‑слешем.