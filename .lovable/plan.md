## Цель

После `npm run build` получить папку `dist/` с `index.html`, `assets/` и пререндеренными HTML для каждого маршрута, готовую к деплою на любой статический хостинг (nginx / S3 / GitHub Pages).

## Важное предупреждение

Это уводит проект **с рельсов Lovable**: автодеплой через кнопку «Publish», превью‑URL и Cloud‑функции больше не будут работать корректно, потому что платформа ожидает TanStack Start с Cloudflare Workers. После миграции деплой полностью на вашей стороне. Откатить можно, но это потребует ручной работы. Подтвердите перед стартом.

## Что меняется

### Удаляется
- `src/server.ts`, `src/start.ts`, `src/lib/error-capture.ts`, `src/lib/error-page.ts`
- `wrangler.jsonc`
- Зависимости: `@tanstack/react-start`, `@cloudflare/vite-plugin`, `@lovable.dev/vite-tanstack-config`

### Добавляется / переписывается
- `index.html` в корне (точка входа Vite SPA)
- `src/main.tsx` — bootstrap React + `RouterProvider`
- `vite.config.ts` — обычный Vite с `@vitejs/plugin-react`, `@tanstack/router-plugin/vite` (file-based routing), `@tailwindcss/vite`, `vite-tsconfig-paths`, плюс `vite-plugin-prerender` (или `vite-plugin-ssg`) для пререндера

### Адаптируется
- `src/routes/__root.tsx` — убрать `RootShell` с `<html>/<body>` и `Scripts`; head управляется через head‑механизм роутера, который при пререндере зафиксирует мета‑теги в HTML
- Все `src/routes/*.tsx` — оставить как есть (file-based роутинг сохраняется), `head()` и `buildHead` продолжают работать
- `src/router.tsx` — без изменений по сути, только без SSR‑контекста

## SEO через пререндер

На этапе `vite build` плагин обойдёт список маршрутов и сохранит для каждого готовый `dist/<route>/index.html` с уникальными `<title>`, `<meta>`, canonical, og:tags и JSON‑LD — ровно то, что сейчас даёт SSR. Список маршрутов соберём из `src/routes/` (плюс динамические — нужно перечислить вручную, см. ниже).

### Динамические маршруты для пререндера

Перечислю все статические URL, которые надо отрисовать. У вас в проекте маршруты только статические (нет `$param`), но проверю по `routeTree.gen.ts` и составлю полный список (~40 страниц): `/`, `/o-ferme`, `/catalog`, `/dostavka`, `/faq`, `/kontakty`, `/opt`, `/sertifikaty`, все `/ptitsa/*`, `/myaso/*`, `/korm/*`, `/soputstvuyushchie/*`, гео‑страницы (`/stavropol`, `/budyonnovsk`, …), и т.д.

## Конфигурация SPA‑фолбэка

Для хостинга добавлю `public/_redirects` и пример `nginx.conf` в README, чтобы при заходе по deep‑link на не пререндеренный путь сервер отдавал `index.html` (SPA‑фолбэк).

## Технические детали

```ts
// vite.config.ts (упрощённо)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import prerender from "vite-plugin-prerender";

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    prerender({
      staticDir: "dist",
      routes: [/* список из routeTree */],
    }),
  ],
});
```

```html
<!-- index.html -->
<!doctype html>
<html lang="ru">
  <head><meta charset="utf-8" /><div id="head-outlet"></div></head>
  <body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>
</html>
```

```ts
// src/main.tsx
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";
createRoot(document.getElementById("root")!).render(<RouterProvider router={getRouter()} />);
```

## Риски

1. **`HeadContent`/`Scripts` из `@tanstack/react-router`** работают и в SPA — head‑теги обновляются на клиенте. Для SEO их фиксирует пререндер на этапе сборки.
2. **`@tanstack/react-start` import’ы** в `routeTree.gen.ts` исчезнут после первой перегенерации router‑плагином.
3. **Превью в Lovable** перестанет работать корректно — это ожидаемо.

## Шаги выполнения

1. Удалить `src/server.ts`, `src/start.ts`, `src/lib/error-capture.ts`, `src/lib/error-page.ts`, `wrangler.jsonc`
2. Обновить `package.json` (убрать ненужное, добавить `vite-plugin-prerender`)
3. Переписать `vite.config.ts`
4. Создать `index.html` и `src/main.tsx`
5. Упростить `src/routes/__root.tsx` (убрать `RootShell`, `Scripts`, `shellComponent`)
6. Прогнать `npm install` и `npm run build`, убедиться что `dist/` собирается с пререндером
7. Добавить `public/_redirects` и краткий README по деплою

Подтвердите план — после одобрения начну реализацию.
