## Что меняем

### 1. Заменяем фото на ваши реальные
Копируем загруженные фото в `src/assets/` и переиспользуем в проекте:

| Файл | Куда | Замещает |
|---|---|---|
| `IMG_6575.jpeg` (тушки на весах) | `src/assets/cat-meat.jpg` | старое «нереалистичное» фото мяса (главная, /catalog, /myaso-perepela) |
| `IMG_6571.jpeg` (живые перепела в вольере) | `src/assets/cat-birds.jpg` | старое фото молодняка (главная, /catalog, /molodnyak, /o-ferme) |
| `IMG_6577.jpeg` (упаковка яиц с лого) | `src/assets/cat-eggs.jpg` | старое фото яиц (главная, /catalog, /perepelinye-yaytsa) |
| `IMG_6573.jpeg` (птенцы под лампой) | `src/assets/cat-incubation.jpg` | фото инкубации (/inkubatsionnoe-yaytso, /catalog) |
| `IMG_6578.jpeg` (упаковки на дереве) | `src/assets/hero-eggs.jpg` + `src/assets/farm.jpg` | главный hero и /o-ferme, /dostavka |
| `IMG_6580.jpeg` (рука в перчатке с упаковкой) | новый `src/assets/store-pack.jpg` | hero на /opt, /kontakty, /sertifikaty (как «розница/опт/доверие») |

Подключаем новые ассеты в шапки страниц `opt.tsx`, `kontakty.tsx`, `sertifikaty.tsx` и в /о-ферме (где сейчас стоит общий `farm.jpg`).

### 2. Убираем затемнение на всех страницах
Сейчас тёмные оверлеи в:
- `src/components/PageHero.tsx` — `opacity-25` + `bg-gradient-to-b from-background/60 to-background`
- `src/routes/index.tsx` — `opacity-40` + `bg-gradient-to-b from-background/70 via-background/50 to-background`

Убираем оба. Вместо этого делаем фото на 100% яркости и читаемость текста обеспечиваем «карточкой»:
- Текстовый блок hero оборачиваем в полупрозрачный «glass-card» — `rounded-3xl border border-border/50 bg-card/80 backdrop-blur-md shadow-xl px-5 py-4 sm:px-7 sm:py-6`.
- На очень светлых участках текст всё равно читается за счёт фона карточки, само фото остаётся ярким.
- Для главной hero — двуколоночный лэйаут на десктопе: фото справа без оверлея, текст слева в карточке. На мобилке — фото сверху, карточка наезжает снизу с лёгким `-mt-10`.

### 3. Анимация текста hero
Добавляем плавное появление с уже существующими утилитами Tailwind (`animate-fade-in`, `animate-scale-in` из `tailwind.config`):
- Заголовок: `animate-fade-in` (translateY+opacity).
- Подзаголовок: тот же эффект с `animation-delay` через inline `style={{ animationDelay: '120ms', animationFillMode: 'both' }}`.
- CTA-кнопки: `animate-scale-in` с задержкой `240ms`.
- Применяем эти три каскада в `PageHero.tsx` (везде сразу) и в hero на `index.tsx`.

### 4. Телефон с упаковки — везде
На фото-упаковках указан номер **8 977 559 72 15**. Обновляем `src/lib/contacts.ts`:
- `PHONE_DISPLAY = "+7 (977) 559-72-15"`
- `PHONE_TEL = "+79775597215"`
- `WHATSAPP_NUMBER = "79775597215"`

Поскольку весь сайт берёт телефон из этих констант (`Header`, `Footer`, hero CTA, /kontakty, JSON-LD, schema.org, опт-форма и т.д.) — номер автоматически появится везде. Дополнительно проверяем `src/routes/__root.tsx` и city-страницы (`/stavropol`, `/pyatigorsk`, `/essentuki`, `/mihaylovsk`, `/nevinnomyssk`) — если где-то номер захардкожен, заменяем на `PHONE_DISPLAY`.

### 5. Тихий фикс рантайм-ошибки
В `Mascot.tsx` `SpeechBubble` стартует с `pos=null` и читает `anchorRef.current` до того, как родитель смонтировался — отсюда `undefined is not an object`. Делаем guard: ранний `return null`, если `!anchorRef.current` ещё; и явная типизация `RefObject<HTMLButtonElement | null>` в пропсах. Без изменений UX.

## Технические детали (файлы)
- `src/lib/contacts.ts` — телефон/WhatsApp.
- `src/assets/*` — заменяем 5 файлов, добавляем `store-pack.jpg`.
- `src/components/PageHero.tsx` — убрать оверлеи, обернуть текст в glass-card, добавить fade/scale-in.
- `src/routes/index.tsx` — убрать оверлей hero, перевёрстка в 2 колонки + glass-card + анимации.
- `src/routes/opt.tsx`, `kontakty.tsx`, `sertifikaty.tsx`, `o-ferme.tsx`, `dostavka.tsx` — поменять `image=` на новые ассеты, где уместно.
- `src/components/mascot/Mascot.tsx` — guard для `anchorRef`.

## Acceptance
- На всех страницах (главной, разделах, городах) телефон **+7 977 559 72 15**, кликабельный, в WhatsApp ведёт на тот же номер.
- На главной и в hero всех страниц нет тёмного оверлея — фото отображаются как есть, в полную яркость; текст читается за счёт светлой glass-card.
- Заголовок/подзаголовок/CTA hero плавно появляются (fade-in + лёгкий scale).
- На /myaso-perepela, /molodnyak, /perepelinye-yaytsa, /inkubatsionnoe-yaytso, /catalog — реальные фото из загрузок, без «рендерных» картинок.
- Маскот без runtime-ошибки.
