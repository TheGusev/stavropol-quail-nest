#!/usr/bin/env bash
# Runs ON the production server. Triggered by GitHub Actions over SSH.
# Pulls latest main, builds, atomically swaps the "current" symlink.
set -euo pipefail

ROOT="${DEPLOY_ROOT:-/var/www/stavropolskiy-perepel}"
REPO="$ROOT/repo"
RELEASES="$ROOT/releases"
CURRENT="$ROOT/current"
STAMP=$(date +%Y%m%d-%H%M%S)
NEW="$RELEASES/$STAMP"

mkdir -p "$RELEASES"

cd "$REPO"
echo "[deploy] git pull"
git fetch --depth 1 origin main
git reset --hard origin/main

echo "[deploy] npm ci"
npm ci --no-audit --no-fund

echo "[deploy] build"
# Point puppeteer at the system Chromium installed on the server.
export PUPPETEER_EXECUTABLE_PATH="${PUPPETEER_EXECUTABLE_PATH:-/usr/bin/chromium}"
npm run build

echo "[deploy] stage release $STAMP"
mkdir -p "$NEW"
cp -a dist/. "$NEW/"

echo "[deploy] atomic swap"
ln -sfn "$NEW" "$CURRENT.tmp"
mv -Tf "$CURRENT.tmp" "$CURRENT"

echo "[deploy] prune old releases (keep last 5)"
ls -1dt "$RELEASES"/*/ 2>/dev/null | tail -n +6 | xargs -r rm -rf

echo "[deploy] done: $STAMP"
