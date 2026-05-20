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
import { readFile, writeFile, mkdir, stat, rm, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { ROUTES as ROUTE_ENTRIES } from "./routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const PORT = 5174;

// Use canonical paths from the shared routes module. Strip trailing slash for
// the in-browser visit (the dev server / TanStack Router resolves both forms);
// the output is still written to dist/<route>/index.html which serves both.
const ROUTES = ROUTE_ENTRIES.map((r) =>
  r.path === "/" ? "/" : r.path.replace(/\/$/, ""),
);

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
  for (const p of [
    "/bin/chromium",
    "/bin/chromium-browser",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
  ]) {
    if (existsSync(p)) return p;
  }
  return null;
}

async function cleanStaleHtml() {
  // Remove any stale dist/<route>/index.html from previous prerender runs.
  // Vite only writes dist/index.html; everything else is our artifact and
  // must be regenerated — stale files without <div id="root"> trigger React #299.
  let removed = 0;
  async function walk(dir) {
    let ents;
    try { ents = await readdir(dir, { withFileTypes: true }); } catch { return; }
    for (const ent of ents) {
      const full = join(dir, ent.name);
      if (ent.isDirectory()) {
        await walk(full);
      } else if (ent.name === "index.html" && dir !== DIST) {
        await rm(full, { force: true });
        removed++;
      }
    }
  }
  await walk(DIST);
  if (removed) console.log(`[prerender] cleaned ${removed} stale index.html`);
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
      // SPA fallback: only static assets (with a file extension) are served
      // from disk; every routed path falls back to the root index.html so
      // Puppeteer always boots the React app.
      const ext = extname(filePath);
      if (!ext || ext === ".html") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(indexHtml);
        return;
      }
      try {
        const data = await readFile(filePath);
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        res.end(data);
      } catch {
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

  await cleanStaleHtml();

  const server = await serveStatic();
  console.log(`[prerender] serving dist/ on http://127.0.0.1:${PORT}`);

  const browser = await puppeteer.launch({
    executablePath: chromiumPath,
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-first-run",
      "--no-zygote",
    ],
    timeout: 60000,
  });

  let failures = 0;
  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      const pageErrors = [];
      page.on("pageerror", (e) => {
        pageErrors.push(e.message);
        console.error(`[prerender] [${route}] pageerror: ${e.message}`);
      });
      page.on("console", (m) => {
        if (m.type() === "error") {
          console.error(`[prerender] [${route}] console.error: ${m.text()}`);
        }
      });
      try {
        const url = `http://127.0.0.1:${PORT}${route}`;
        await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
        // Wait for either the app shell (<main id="main">) or the error
        // boundary — whichever appears first. Prevents 30s hangs when the
        // route throws but lets us still capture the error HTML.
        await Promise.race([
          page.waitForSelector("#main", { timeout: 30000 }),
          page.waitForSelector("[data-error-boundary]", { timeout: 30000 }),
        ]);
        // give the router a tick to settle head tags
        await new Promise((r) => setTimeout(r, 100));
        const html = await page.content();
        const outDir = route === "/" ? DIST : join(DIST, route);
        await mkdir(outDir, { recursive: true });
        await writeFile(join(outDir, "index.html"), html);
        console.log(`[prerender] ✓ ${route}`);
      } catch (e) {
        failures++;
        console.error(`[prerender] ✗ ${route}: ${e.message}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
  if (failures > 0) {
    console.error(`[prerender] failed: ${failures} route(s)`);
    process.exit(1);
  }
  console.log("[prerender] done");
}

main().catch((e) => { console.error(e); process.exit(1); });
