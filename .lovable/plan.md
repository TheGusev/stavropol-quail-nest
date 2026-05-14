## Что меняем

Файл: `src/components/Header.tsx` (только мобильный, ≤1023px). Десктоп не трогаем.

### 1. Бургер — на уровне названия

Сейчас кнопка позиционирована `absolute right-3 top-2`, из-за чего она «висит» над текстом (см. скриншот пользователя). Нужно опустить её по вертикали так, чтобы центр кнопки совпадал с центром строки заголовка.

- Поменять позиционирование на `absolute right-3 top-1/2 -translate-y-1/2` относительно того же `relative` родителя.
- Чтобы это работало корректно, привязать `relative` не ко всему верхнему контейнеру, а к контейнеру `[data-mascot-track]` (он и содержит заголовок). Кнопку перенести внутрь этого контейнера, сразу после `<Mascot />`.
- Сохранить `pr-12 lg:pr-0`, чтобы длинный заголовок «Ставропольский Перепел» не подлезал под кнопку.
- Маскотный слой остаётся `pointer-events-none absolute inset-0 z-10`; кнопка идёт с `z-20`, так что клики работают.
- Анимации появления/hover/tap и переключение Menu↔X — оставляем как есть.
- Верхний паддинг трека `pt-10 sm:pt-11 lg:pt-9` оставляем (там «поле» для маскота-птенца), кнопка центрируется по полной высоте трека, что визуально совпадает с серединой названия.

### 2. Анимация «перелива» цвета по заголовку

Стиль — тёплый, в духе фермы и скорлупы перепелиного яйца: тёмная база + плавный блик кремово-бежевого цвета, который медленно «пробегает» слева направо по буквам, бесконечно повторяясь. Уважаем `prefers-reduced-motion` (выключаем).

Реализация — чисто CSS, через `background-clip: text` на самой строке заголовка (не на каждой `motion.span`, иначе градиент порвётся побуквенно). 

В `src/styles.css` добавить:

```css
@keyframes shell-shimmer {
  0%   { background-position: -150% 0; }
  100% { background-position: 250% 0; }
}

.title-shimmer {
  background-image: linear-gradient(
    100deg,
    hsl(var(--foreground)) 0%,
    hsl(var(--foreground)) 38%,
    /* блик — цвет скорлупы перепелиного яйца, тёплый кремовый */
    oklch(0.92 0.04 80) 50%,
    hsl(var(--foreground)) 62%,
    hsl(var(--foreground)) 100%
  );
  background-size: 250% 100%;
  background-repeat: no-repeat;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: shell-shimmer 6s linear infinite;
  animation-delay: 1.2s; /* даёт побуквенному fade-in закончиться */
}

@media (prefers-reduced-motion: reduce) {
  .title-shimmer { animation: none; color: hsl(var(--foreground)); -webkit-text-fill-color: currentColor; }
}
```

В `Header.tsx` (`LogoTitle`):
- На обёртку `<span class="block whitespace-nowrap font-serif …">` добавить класс `title-shimmer`.
- Удалить `text-foreground` с этой обёртки (его перебивает `color: transparent` из шиммера; для reduced-motion цвет восстановится через `currentColor` родителя — оставить `text-foreground` на родительском `<Link>`).
- Побуквенный `motion.span` fade-in — оставляем как есть; он работает с opacity/translateY, и это не конфликтует с `background-clip: text` родителя (буквы наследуют закрашивание градиентом).

### Что НЕ делаем

- Не меняем сам шрифт/размер/жирность заголовка.
- Не трогаем десктопную раскладку и WhatsApp-кнопку.
- Не меняем маскота, его атрибуты-якоря и провайдер.
- Не меняем нижний таббар.

### Затрагиваемые файлы

- `src/components/Header.tsx` — перенос кнопки внутрь трека, центрирование по вертикали, добавление класса `title-shimmer`.
- `src/styles.css` — keyframes `shell-shimmer` и утилита `.title-shimmer`.
