## Что меняем

Переходим с модели «SSH → сборка на сервере Apache» на модель «GitHub Actions собирает → заливает `dist/` по FTPS на Beget». Плюс закаляем prerender по рекомендациям из скриншотов.

## 1. GitHub Actions workflow

Заменить `.github/workflows/deploy.yml` на ваш вариант (Build & Deploy to Beget, FTPS через `SamKirkland/FTP-Deploy-Action@v4.3.5`).

Мелкие правки относительно присланного:
- Условие `if: hashFiles('scripts/prerender.ts')` поправить на `scripts/prerender.mjs` (у нас `.mjs`, не `.ts`) — иначе Chromium не поставится и prerender молча отвалится.
- Добавить шаг `Upload dist artifact` (`actions/upload-artifact@v4`) — на случай разбора, если FTP-деплой упадёт.
- Concurrency оставляем как у вас.

Секреты в GitHub: `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`, `FTP_PATH` (например `/site-root/` или `/public_html/`).

## 2. Скрипт `package.json`

Добавить алиас `"build:prod": "npm run build"` (или вынести в него очистку + build + verify), чтобы workflow с `npm run build:prod` работал без правок.

## 3. Усиление `scripts/prerender.mjs`

По вашим скриншотам (2.1–2.6):

- **2.1 Очистка stale HTML** перед прогоном: `rm` всем `dist/**/index.html`, **кроме** корневого `dist/index.html` (его пишет Vite, остальные — артефакты прошлого прогона). Защищает от React #299 при повторных сборках.
- **2.3 Флаги Chromium для CI**: добавить `--disable-gpu`, `--no-first-run`, `--no-zygote`, `timeout: 60000`. Один `browser.launch`, переиспользовать через `browser.newPage()` (уже так).
- **2.4 Сбор ошибок страницы**: повесить `page.on('pageerror')` и `page.on('console', m => m.type()==='error')` с логом — чтобы при падении в CI видеть стек, а не TimeoutError.
- **2.5 Устойчивое ожидание**: `Promise.race([waitForSelector('#main'), waitForSelector('[data-error-boundary]')])` с timeout 30s, плюс `networkidle0`.
- **2.6 Метка ErrorBoundary**: в `src/routes/__root.tsx` у корневого `<div>` в `ErrorComponent` добавить `data-error-boundary`. Заодно убедиться, что `<main id="main">` живёт **только** в `PageShell` (он у нас один) и не дублируется в страницах. Беглый чек по `src/components/PageShell.tsx`: у нас `<main>` без `id="main"` — добавим `id="main"`, чтобы селектор из 2.5 работал.

## 4. Apache → Beget shared hosting

Beget — обычный shared FTP, `.htaccess` уже создан. Оставляем как есть, он будет работать и на Beget (`mod_rewrite` + `mod_headers` там включены по умолчанию).

Из README выкидываем разделы:
- настройка сервера (Node, Chromium, `deploy` user, vhost) — не нужны;
- секреты `SSH_HOST`/`SSH_USER`/`SSH_PORT`/`SSH_KEY`/`DEPLOY_PATH`;
- раздел «Откат через симлинки».

Добавляем:
- список секретов FTP;
- куда залить корень сайта в панели Beget (`~/site-root/` или public-папка домена);
- как откатиться (перезалить предыдущий артефакт сборки из вкладки Actions → Artifacts).

## 5. Удалить

- `scripts/server-deploy.sh` — больше не нужен (сборка на CI).

## Файлы, которые буду менять

- `.github/workflows/deploy.yml` — переписать на FTPS-вариант
- `scripts/prerender.mjs` — clean stale + флаги Chromium + page-error logging + Promise.race ожидание
- `src/routes/__root.tsx` — `data-error-boundary` на корневой div ErrorComponent
- `src/components/PageShell.tsx` — `id="main"` на `<main>`
- `package.json` — скрипт `build:prod`
- `README.md` — переписать раздел деплоя под Beget + FTP
- `scripts/server-deploy.sh` — удалить

## Что нужно от вас (после внедрения)

1. В GitHub → Settings → Secrets and variables → Actions добавить 4 секрета: `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`, `FTP_PATH`.
2. Убедиться, что в Beget включён FTPS на 21 порту (по умолчанию да).
3. Подключить проект к GitHub (Lovable → `+` → GitHub → Connect project), иначе workflow негде запускать.
