#!/usr/bin/env node
/**
 * Generates dist/sitemap.xml and dist/robots.txt from scripts/routes.mjs.
 * Run AFTER `vite build` and BEFORE `prerender.mjs` (so prerender doesn't
 * snapshot a stale sitemap).
 *
 * Also validates: for every URL listed, a prerendered HTML file is expected
 * at dist/<path>/index.html. This check runs in a second pass after prerender
 * via the --verify flag.
 */
import { writeFile, access } from "node:fs/promises";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES, SITE_URL } from "./routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");

const TODAY = new Date().toISOString().slice(0, 10);

function buildSitemap() {
  const urls = ROUTES.map((r) => {
    const loc = `${SITE_URL}${r.path}`;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <lastmod>${TODAY}</lastmod>`,
      r.changefreq ? `    <changefreq>${r.changefreq}</changefreq>` : null,
      r.priority ? `    <priority>${r.priority}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n");
  });

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    "",
  ].join("\n");
}

function buildRobots() {
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /*?utm_",
    "",
    "User-agent: GPTBot",
    "Allow: /",
    "",
    "User-agent: ClaudeBot",
    "Allow: /",
    "",
    "User-agent: PerplexityBot",
    "Allow: /",
    "",
    "User-agent: Google-Extended",
    "Allow: /",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
}

async function verify() {
  const missing = [];
  for (const r of ROUTES) {
    const rel = r.path === "/" ? "index.html" : join(r.path.replace(/^\/|\/$/g, ""), "index.html");
    const full = join(DIST, rel);
    try {
      await access(full);
    } catch {
      missing.push(r.path);
    }
  }
  if (missing.length) {
    console.error(`[seo] ✗ missing prerendered files for: ${missing.join(", ")}`);
    process.exit(1);
  }
  console.log(`[seo] ✓ verified ${ROUTES.length} prerendered routes`);
}

async function main() {
  if (process.argv.includes("--verify")) {
    await verify();
    return;
  }
  await writeFile(join(DIST, "sitemap.xml"), buildSitemap(), "utf8");
  await writeFile(join(DIST, "robots.txt"), buildRobots(), "utf8");
  console.log(`[seo] ✓ wrote dist/sitemap.xml (${ROUTES.length} urls) and dist/robots.txt`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
