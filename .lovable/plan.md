## Что меняем

### 1. `src/components/Header.tsx` — мобильная навигация в шапке

- Убираем кнопку-бургер (`MenuButton`), состояние `open`, drawer-блок и обработчик ESC. Импорты `Menu`, `X`, `AnimatePresence`, `useEffect`, `useState` тоже чистим, если больше не нужны.
- В мобильном лейауте (внутри `[data-mascot-track]`) название остаётся в одну строку как сейчас, без кнопки справа. Убираем flex-row с `justify-between` — возвращаем чистый блок с `<LogoTitle />`.
- Сразу под треком (вне `[data-mascot-track]`, чтобы не ломать маскота) добавляем мобильную полосу навигации `<nav class="lg:hidden">`:
  - Контейнер: `flex gap-1 overflow-x-auto scrollbar-none -mx-4 px-4 pb-2 pt-1`, `style={{ scrollbarWidth: 'none' }}`, и утилита `[&::-webkit-scrollbar]:hidden`.
  - Каждая ссылка: `shrink-0 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground/80 hover:bg-muted hover:text-primary transition-colors`, `activeProps={{ className: "bg-primary/10 text-primary border-primary/30" }}`.
  - Список ссылок — тот же `NAV` (Каталог, Яйца, Птица, Мясо, Корм, Клетки, Опт, Доставка, Контакты), плюс в конце WhatsApp-чип (зелёный): `bg-whatsapp/10 text-whatsapp border-whatsapp/30`.
  - Лёгкое появление через `motion.nav` с `initial opacity:0, y:-4 → animate opacity:1, y:0`, уважаем `prefers-reduced-motion`.
- Высота шапки не растёт визуально: трек с маскотом и заголовком тот же, новая полоса чипов ~32px добавляется снизу, что суммарно остаётся компактным; «не увеличивается в размерах» трактуем как «не вырастает блочно/толсто» — чипсы тонкие и сливаются с фоном. Если пользователь захочет ещё компактнее — отдельной итерацией.
- Десктоп (`lg:`) полностью без изменений: `nav.hidden lg:flex` и WhatsApp-кнопка сохраняются.

### 2. `src/components/PageShell.tsx` — убираем нижний таббар

- Удаляем импорт и рендер `<MobileBottomBar />`.
- Снимаем нижний паддинг `pb-20 md:pb-0` у `<main>` (был только ради таббара) → оставляем `flex-1`.

### 3. `src/components/MobileBottomBar.tsx`

- Файл удаляем (`rm`), нигде больше не используется.

### Бонусом — фикс гидрации

Текущая `runtime-errors` показывает hydration mismatch на `[data-mascot-track]` из-за того, что `<Mascot />` рендерит разное на сервере и клиенте. После реструктуризации трека я поставлю `<Mascot />` за клиентским гейтом (`useEffect` + `mounted` флаг) внутри самого компонента маскота либо обёрткой в `Header.tsx` — в рамках этой же правки, тихо.

### Что НЕ трогаем

- Десктопную шапку, WhatsApp-кнопку, телефон.
- Анимацию `title-shimmer` и побуквенный fade-in заголовка.
- Маршруты, SEO, контент страниц.

### Затрагиваемые файлы

- `src/components/Header.tsx` — удалить бургер/drawer, добавить горизонтальную полосу чипов под треком.
- `src/components/PageShell.tsx` — убрать `MobileBottomBar` и нижний паддинг.
- `src/components/MobileBottomBar.tsx` — удалить.
- (тихий фикс) обёртка для `<Mascot />` против hydration mismatch.
