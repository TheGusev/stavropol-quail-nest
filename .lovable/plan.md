## Цель
Построить MVP e-commerce витрину перепелиной фермы со ставкой на локальное SEO (Ставрополь и край), B2C+B2B, заявки идут в WhatsApp/звонок/форму. Никакой оплаты.

## Дизайн-система
Тёплый фермерский стиль:
- Фон: кремово-бежевый (`oklch(0.98 0.01 80)`)
- Primary: травяно-зелёный (`oklch(0.55 0.13 145)`)
- Accent: тёплый жёлто-охристый (для бейджей/CTA)
- Шрифты: serif для H1/H2 (Playfair Display), sans для текста (Inter)
- Скруглённые углы, мягкие тени, фото-ориентированный layout
- Все цвета — в `src/styles.css` как семантические токены (oklch)

Контакты-плейсхолдеры:
- WhatsApp: `79000000000`
- Телефон: `+7 (000) 000-00-00`
- Вынести в `src/lib/contacts.ts` константой — легко заменить.

## Структура маршрутов (TanStack Router, file-based)

Route файлы в `src/routes/`. Trailing slash в URL обеспечим через canonical/sitemap (роуты сами по себе будут без слэша в декларации, т.к. `/path/` и `/path` обрабатываются одинаково — canonical явно укажем со слэшем).

Основные:
- `index.tsx` → `/`
- `catalog.tsx` → `/catalog/`
- `perepelinye-yaytsa.tsx` → `/perepelinye-yaytsa/`
- `inkubatsionnoe-yaytso.tsx`
- `myaso-perepela.tsx`
- `molodnyak.tsx`
- `opt.tsx`
- `dostavka.tsx`
- `o-ferme.tsx`
- `sertifikaty.tsx`
- `faq.tsx`
- `kontakty.tsx`

GEO (5):
- `stavropol.tsx`, `mihaylovsk.tsx`, `pyatigorsk.tsx`, `essentuki.tsx`, `nevinnomyssk.tsx`

Каждый route экспортирует `head()` с уникальными title (≤60), description (≤160), canonical (self, без UTM), og:title/og:description. Никаких "Ниша:", никаких `:slug`/`brand.example`/`[object Object]`.

## Общие компоненты (`src/components/`)
- `Header.tsx` — sticky, лого, меню, телефон, WhatsApp-кнопка
- `Footer.tsx` — контакты, ссылки, юр.инфо
- `MobileBottomBar.tsx` — sticky bottom: WhatsApp / Позвонить / Каталог
- `WhatsAppButton.tsx` — формирует `https://wa.me/...?text=...` с encodeURIComponent
- `LeadForm.tsx` — zod-валидация, success-state, отправка stub в console.log
- `ProductCard.tsx`, `CategoryCard.tsx`
- `FAQAccordion.tsx` (shadcn Accordion) + рендерит JSON-LD FAQPage
- `TrustBadges.tsx`, `SectionHeading.tsx`
- `JsonLd.tsx` — хелпер вставки `<script type="application/ld+json">` через TanStack `head().scripts`

## Главная (`/`)
Блоки в порядке из ТЗ: Hero → Каталог-витрина (4 категории) → Почему мы (6 преимуществ) → B2B-врезка → Доставка → О ферме → FAQ (6) → Финальный CTA → Footer.

JSON-LD на главной: `@graph` с `Organization` + `LocalBusiness` (адрес Ставропольский край) + `WebSite`.

## Категории/товары
Шаблон страницы категории:
- Hero с H1 и фото
- Описание "для кого"
- Условия хранения/доставки
- 2–4 карточки товара/фасовки с ценой "от ..." или "по запросу"
- CTA WhatsApp+tel
- FAQ 3–5 вопросов
- JSON-LD `Product`+`Offer` только если указана конкретная цена

## GEO-страницы (≥400 слов уникального текста)
Шаблон: H1 с городом → первый абзац с упоминанием города → блоки: доставка по городу, точки выдачи/районы, почему выбирают нас в [город], отзывы-плейсхолдеры, FAQ для города, CTA. Тексты пишутся вручную, разные для каждого города (особенности района, расстояние от фермы, варианты доставки).

## Файлы в `public/`
- `robots.txt` — закрыть `/api/`, UTM-параметры, разрешить AI-ботов (GPTBot, ClaudeBot, PerplexityBot и т.д.), указать sitemap
- `sitemap.xml` — только реальные URL всех 17 страниц с trailing slash, lastmod
- `llms.txt` — AI-паспорт: бизнес, гео, разделы, контакты

## Изображения
Сгенерировать ключевые ассеты (`imagegen`, fast):
- Hero (перепелиные яйца, ферма)
- 4 категорийных фото
- 1 фото "о ферме"
- OG-image 1200×630 для главной
Остальные — placeholder с пометкой "заменить".

## Acceptance criteria (проверим перед сдачей)
- [ ] Все 17 страниц открываются без 404
- [ ] Нет `brand.example`, `:slug`, `[object Object]` в коде/тексте
- [ ] Title/Description без "Ниша: ..."
- [ ] Self-canonical на всех страницах
- [ ] `robots.txt`, `sitemap.xml`, `llms.txt` доступны напрямую
- [ ] Sitemap содержит только реальные URL
- [ ] WhatsApp ссылки корректно экранируют текст
- [ ] FAQPage и Product/Offer JSON-LD валидны
- [ ] Каждая GEO-страница: 400+ слов уникального текста, город в H1 и первом абзаце
- [ ] Mobile sticky bottom bar работает
- [ ] Формы валидируются (zod) и показывают success

## Технические детали
- TanStack Start (уже в шаблоне), shadcn компоненты (Accordion, Button, Input, Form)
- zod для валидации форм
- `lucide-react` для иконок
- Контакты — единый источник в `src/lib/contacts.ts`
- JSON-LD через `head().scripts` с `type: "application/ld+json"`
- Replace placeholder index из шаблона на реальную главную
