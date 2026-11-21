// Single source of truth for prerendered routes, sitemap.xml and robots.txt.
// Each entry: path (with trailing slash, except root), changefreq, priority.
export const SITE_URL = "https://stavropolskiy-perepel.ru";

export const ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },

  { path: "/perepelinye-yaytsa/", changefreq: "weekly", priority: "0.9" },
  { path: "/perepelyata/", changefreq: "weekly", priority: "0.9" },
  { path: "/inkubatsionnoe-yaytso/", changefreq: "weekly", priority: "0.8" },

  { path: "/myaso-perepela/", changefreq: "weekly", priority: "0.8" },

  { path: "/opt/", changefreq: "monthly", priority: "0.8" },
  { path: "/dostavka/", changefreq: "monthly", priority: "0.8" },
  { path: "/kontakty/", changefreq: "monthly", priority: "0.7" },

  { path: "/stavropol/", changefreq: "monthly", priority: "0.8" },
  { path: "/mihaylovsk/", changefreq: "monthly", priority: "0.8" },
  { path: "/pyatigorsk/", changefreq: "monthly", priority: "0.7" },
  { path: "/essentuki/", changefreq: "monthly", priority: "0.7" },
  { path: "/nevinnomyssk/", changefreq: "monthly", priority: "0.7" },
  { path: "/budyonnovsk/", changefreq: "monthly", priority: "0.7" },
];
