# Ставропольский Перепел

Статический сайт на Vite + React + TanStack Router (file-based роутинг).
После сборки в `dist/` лежит готовый набор HTML + ассетов для любого статического хостинга.

## Команды

```bash
npm install
npm run dev          # дев-сервер
npm run build        # сборка + пререндер всех страниц → dist/
npm run build:spa    # сборка без пререндера (только index.html)
npm run preview      # локальный просмотр готового dist/
```

## Пререндер

`npm run build` запускает Vite + headless Chromium, который проходит по всем
маршрутам и сохраняет полный HTML с уникальными `<title>`, `meta`, OG-тегами
и JSON-LD в `dist/<route>/index.html`. Для работы нужен chromium в системе:

- Linux: `apt install chromium` или `nix-env -iA nixpkgs.chromium`
- macOS: `brew install chromium`
- Можно указать путь вручную: `PUPPETEER_EXECUTABLE_PATH=/path/to/chrome npm run build`
- Отключить пререндер: `PRERENDER=0 npm run build` (равносильно `build:spa`)

Список маршрутов жёстко задан в `scripts/prerender.mjs` — при добавлении
новой страницы добавь её туда же.

## Деплой

Папка `dist/` — статика. Заливай как есть.

**Nginx** — пример конфига для SPA-фолбэка (если зайдут на путь без
пререндера):

```nginx
server {
  root /var/www/site/dist;
  index index.html;
  location / {
    try_files $uri $uri/index.html $uri/ /index.html;
  }
}
```

**Netlify / Cloudflare Pages** — файл `public/_redirects` уже настроен
(`/* /index.html 200`).

**GitHub Pages / S3** — настрой 404 → index.html для SPA-фолбэка.

## Автодеплой по SSH (GitHub Actions → Apache)

Любой push в `main` (включая правки из Lovable через GitHub sync) запускает
`.github/workflows/deploy.yml`, который по SSH вызывает на сервере
`scripts/server-deploy.sh`. Скрипт делает `git pull`, `npm ci`, `npm run build`
и атомарно меняет симлинк `current` на новый релиз.

### Настройка сервера (один раз)

```bash
# 1. Node 20 + Chromium (для prerender)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs chromium git

# 2. Пользователь и структура
sudo useradd -m -s /bin/bash deploy
sudo mkdir -p /var/www/stavropolskiy-perepel/{releases,repo}
sudo chown -R deploy:deploy /var/www/stavropolskiy-perepel

# 3. Клон репозитория
sudo -u deploy git clone https://github.com/<user>/<repo>.git \
  /var/www/stavropolskiy-perepel/repo

# 4. SSH-ключ для GitHub Actions
sudo -u deploy mkdir -p ~deploy/.ssh && sudo -u deploy chmod 700 ~deploy/.ssh
# вставить публичный ключ в ~deploy/.ssh/authorized_keys
```

### Apache vhost

```apache
<VirtualHost *:443>
  ServerName stavropolskiy-perepel.ru
  DocumentRoot /var/www/stavropolskiy-perepel/current

  <Directory /var/www/stavropolskiy-perepel/current>
    Options -Indexes +FollowSymLinks
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
```

Модули: `a2enmod rewrite headers`.

### GitHub Secrets (Settings → Secrets → Actions)

| Secret | Значение |
|---|---|
| `SSH_HOST` | IP или домен сервера |
| `SSH_USER` | `deploy` |
| `SSH_PORT` | `22` |
| `SSH_KEY` | приватный ключ deploy-пользователя, целиком (PEM) |
| `DEPLOY_PATH` | `/var/www/stavropolskiy-perepel` |

### Откат

```bash
ssh deploy@server
cd /var/www/stavropolskiy-perepel/releases
ls -1t                                 # список релизов
ln -sfn /var/www/stavropolskiy-perepel/releases/<STAMP> \
        /var/www/stavropolskiy-perepel/current.tmp
mv -Tf /var/www/stavropolskiy-perepel/current.tmp \
       /var/www/stavropolskiy-perepel/current
```

Хранятся последние 5 релизов.
