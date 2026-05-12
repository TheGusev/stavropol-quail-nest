## Цель
Привести SEO в соответствие с ТЗ: полный sitemap.xml без плейсхолдеров и FAQ JSON-LD на главной, страницах категорий, опта и доставки.

## 1. sitemap.xml (`public/sitemap.xml`)
Текущий sitemap не содержит двух реальных страниц сайта: `/dostavka/` и `/budyonnovsk/`. Также в `lastmod` не используется — добавлю текущую дату для всех URL.

Итоговый список URL (все реально существуют как route-файлы в `src/routes/`):
- `/` (priority 1.0)
- `/catalog/` (0.9)
- `/perepelinye-yaytsa/`, `/inkubatsionnoe-yaytso/`, `/myaso-perepela/`, `/molodnyak/` (категории, 0.8–0.9)
- `/opt/` (0.8)
- `/dostavka/` (0.8) — добавить
- `/o-ferme/`, `/sertifikaty/`, `/faq/`, `/kontakty/` (0.5–0.7)
- Города: `/stavropol/`, `/mihaylovsk/`, `/pyatigorsk/`, `/essentuki/`, `/nevinnomyssk/`, `/budyonnovsk/` (0.7–0.8) — добавить Будённовск

Каждому URL добавлю `<lastmod>2026-05-12</lastmod>` и оставлю `changefreq`/`priority`. Это статический файл в `public/`, отдаётся как есть.

## 2. FAQ JSON-LD
Уже есть на: `index.tsx`, `opt.tsx`, `perepelinye-yaytsa.tsx`, `inkubatsionnoe-yaytso.tsx`, `myaso-perepela.tsx`, `molodnyak.tsx`.

Не хватает на двух страницах из ТЗ:
- **`src/routes/catalog.tsx`** — добавить локальный массив `FAQ: FaqItem[]` (5 вопросов про каталог: ассортимент, как заказать, минимальный заказ, доставка, опт), отрисовать `<FaqAccordion>` в конце страницы и зарегистрировать `jsonLdScript(faqJsonLd(FAQ))` через `head().scripts`.
- **`src/routes/dostavka.tsx`** — добавить FAQ (5 вопросов: зоны доставки, сроки, минимальная сумма, самовывоз, оплата), `<FaqAccordion>` внизу страницы и `jsonLdScript(faqJsonLd(FAQ))` в `head().scripts`.

Используются существующие хелперы: `FaqAccordion`, `faqJsonLd` из `@/components/FaqAccordion` и `jsonLdScript` из `@/lib/seo` — никакой новой инфраструктуры.

## 3. Проверка
- Открыть `/sitemap.xml` в preview — убедиться, что отдаётся валидный XML со всеми 18 URL.
- `rg "FAQPage" src/routes` — должно найти все 8 страниц (главная, 4 категории, opt, catalog, dostavka).
- Прогнать build — без ошибок TS.

## Файлы
- `public/sitemap.xml` — перезапись
- `src/routes/catalog.tsx` — добавить FAQ + JSON-LD
- `src/routes/dostavka.tsx` — добавить FAQ + JSON-LD