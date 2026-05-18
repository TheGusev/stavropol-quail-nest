## Цель
Любой коммит в `main` (включая правки, которые я пушу через Lovable→GitHub sync) автоматически собирается и выкатывается на ваш Apache-сервер по SSH.

## Архитектура

```
Lovable ──push──> GitHub (main)
                     │
                     ▼
              GitHub Actions
                     │ SSH
                     ▼
              ваш сервер (Apache)
              ├── git pull
              ├── npm ci && npm run build   (vite + sitemap + prerender)
              └── атомарный swap dist → DocumentRoot
```

## Предусловия (один раз вручную)

### На сервере
1. Установить **Node.js 20 LTS** и **Chromium** (нужен для `scripts/prerender.mjs`):
   ```bash
   # Debian/Ubuntu
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs chromium
   ```
2. Создать пользователя `deploy` с доступом к директории сайта.
3. Сделать `git clone` репозитория один раз в `/var/www/stavropolskiy-perepel/repo`.
4. DocumentRoot Apache указывает на `/var/www/stavropolskiy-perepel/current` (симлинк на актуальный релиз).
5. В Apache vhost — SPA fallback (для путей без trailing slash):
   ```apache
   <Directory /var/www/stavropolskiy-perepel/current>
     Options -Indexes +FollowSymLinks
     AllowOverride All
     Require all granted
     FallbackResource /index.html
   </Directory>
   ```
6. Положить публичный ключ deploy-пользователя GitHub Actions в `~deploy/.ssh/authorized_keys`.

### В GitHub репозитории (Settings → Secrets and variables → Actions)
Добавить **Repository secrets**:
- `SSH_HOST` — IP или домен сервера
- `SSH_USER` — `deploy`
- `SSH_PORT` — обычно `22`
- `SSH_KEY` — приватный SSH-ключ (PEM, целиком)
- `DEPLOY_PATH` — `/var/www/stavropolskiy-perepel`

## Файлы, которые я создам

### `.github/workflows/deploy.yml`
Срабатывает на `push` в `main`. Делает один SSH-вызов, который на сервере выполняет деплой-скрипт:

```yaml
name: Deploy
on:
  push:
    branches: [main]
  workflow_dispatch:
concurrency:
  group: deploy-prod
  cancel-in-progress: false
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.SSH_KEY }}
      - run: ssh-keyscan -p ${{ secrets.SSH_PORT }} ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts
      - name: Trigger remote deploy
        run: |
          ssh -p ${{ secrets.SSH_PORT }} ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} \
            "cd ${{ secrets.DEPLOY_PATH }}/repo && bash scripts/server-deploy.sh"
```

### `scripts/server-deploy.sh` (запускается НА сервере)
Идемпотентный, atomic release-swap, откатывается при ошибке:

```bash
#!/usr/bin/env bash
set -euo pipefail
ROOT="/var/www/stavropolskiy-perepel"
REPO="$ROOT/repo"
RELEASES="$ROOT/releases"
CURRENT="$ROOT/current"
STAMP=$(date +%Y%m%d-%H%M%S)
NEW="$RELEASES/$STAMP"

cd "$REPO"
git fetch --depth 1 origin main
git reset --hard origin/main

# Сборка во временный каталог, чтобы текущий релиз не ломался при ошибке
npm ci
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium npm run build

mkdir -p "$NEW"
cp -a dist/. "$NEW/"

# Atomic swap
ln -sfn "$NEW" "$CURRENT.tmp"
mv -Tf "$CURRENT.tmp" "$CURRENT"

# Чистим старые релизы (оставляем 5)
ls -1dt "$RELEASES"/*/ | tail -n +6 | xargs -r rm -rf

echo "Deployed $STAMP"
```

### `.htaccess` в `public/` (поедет в dist/)
SPA-fallback на случай, если на сервере не настроен `FallbackResource`:

```apache
RewriteEngine On
# Не трогаем реальные файлы и директории
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]
# Всё остальное → SPA
RewriteRule . /index.html [L]
```

### Документация — добавлю в `README.md`
Шаги «как настроить сервер с нуля» и «как откатиться» (поменять симлинк `current` на любой релиз из `releases/`).

## Что НЕ меняется
- Lovable→GitHub sync уже двусторонний; никакой допнастройки не требуется.
- `scripts/routes.mjs`, `scripts/generate-seo.mjs`, `scripts/prerender.mjs` уже готовы — деплой просто запускает `npm run build`.
- Lovable-публикация (`.lovable.app`) остаётся доступной как preview, но реальный прод — ваш сервер.

## Что нужно от вас перед реализацией
1. **SSH-доступ к серверу** (host / user / port / путь к DocumentRoot) — пришлите в чате, я подставлю в README. Приватный ключ — НЕ в чат, его кладёте сами в GitHub Secrets.
2. **Подтверждение**: проект уже подключён к GitHub? Если нет — нужно сначала подключить через `+` → GitHub в Lovable.

После того как пришлёте SSH-данные и подключите GitHub, я создам workflow, deploy-скрипт и `.htaccess`.