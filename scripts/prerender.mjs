#!/usr/bin/env node
/**
 * Post-build prerender: spins up a static server on dist/, visits each route
 * with headless Chromium, waits for hydration, snapshots the fully-rendered
 * HTML (with head meta from TanStack Router's head() option), and writes it
 * to dist/<route>/index.html.
 *
 * Skipped automatically if PRERENDER=0 or no Chromium found.
 */
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const PORT = 5174;

const ROUTES = [
  "/",
  "/budyonnovsk",
  "/catalog",
  "/dostavka",
  "/essentuki",
  "/faq",
  "/inkubatsionnoe-yaytso",
  "/kletki",
  "/kontakty",
  "/korm",
  "/korm/startovyy",
  "/mihaylovsk",
  "/molodnyak",
  "/myaso-perepela",
  "/myaso",
  "/myaso/dlya-zapekaniya",
  "/myaso/marinovannye-kopchenye",
  "/myaso/marinovannye-yaytsa",
  "/myaso/vybrakovannye",
  "/myaso/zamorozhennoe",
  "/nevinnomyssk",
  "/o-ferme",
  "/opt",
  "/perepelinye-yaytsa",
  "/ptitsa",
  "/ptitsa/nesushki",
  "/ptitsa/podroshchennye",
  "/ptitsa/roditelskoe-stado",
  "/ptitsa/samtsy",
  "/ptitsa/sutochnye",
  "/pyatigorsk",
  "/sertifikaty",
  "/soputstvuyushchie",
  "/soputstvuyushchie/pero-pukh",
  "/soputstvuyushchie/pomet",
  "/soputstvuyushchie/potroha",
  "/soputstvuyushchie/skorlupa",
  "/stavropol",
  "/yaytsa",
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

function findChromium() {
  for (const p of ["/bin/chromium", "/bin/chromium-browser", "/usr/bin/chromium", "/usr/bin/google-chrome"]) {
    if (existsSync(p)) return p;
  }
  return null;
}

async function serveStatic() {
  const indexHtml = await readFile(join(DIST, "index.html"));
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      let filePath = join(DIST, decodeURIComponent(url.pathname));
      if (filePath.endsWith("/")) filePath += "index.html";
      let st;
      try { st = await stat(filePath); } catch { st = null; }
      if (st && st.isDirectory()) filePath = join(filePath, "index.html");
      try {
        const data = await readFile(filePath);
        res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
        res.end(data);
      } catch {
        // SPA fallback
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(indexHtml);
      }
    } catch (e) {
      res.writeHead(500); res.end(String(e));
    }
  });
  await new Promise((r) => server.listen(PORT, "127.0.0.1", r));
  return server;
}

async function main() {
  if (process.env.PRERENDER === "0") {
    console.log("[prerender] skipped (PRERENDER=0)");
    return;
  }
  const chromiumPath = process.env.PUPPETEER_EXECUTABLE_PATH || findChromium();
  if (!chromiumPath) {
    console.warn("[prerender] no Chromium binary found — skipping prerender. Set PUPPETEER_EXECUTABLE_PATH or install chromium.");
    return;
  }

  const server = await serveStatic();
  console.log(`[prerender] serving dist/ on http://127.0.0.1:${PORT}`);

  const browser = await puppeteer.launch({
    executablePath: chromiumPath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      try {
        const url = `http://127.0.0.1:${PORT}${route}`;
        await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
        // give the router a tick to settle head tags
        await new Promise((r) => setTimeout(r, 100));
        const html = await page.content();
        const outDir = route === "/" ? DIST : join(DIST, route);
        await mkdir(outDir, { recursive: true });
        await writeFile(join(outDir, "index.html"), html);
        console.log(`[prerender] ✓ ${route}`);
      } catch (e) {
        console.error(`[prerender] ✗ ${route}: ${e.message}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
  console.log("[prerender] done");
}

main().catch((e) => { console.error(e); process.exit(1); });
