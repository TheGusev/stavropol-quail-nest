// Single source of truth for prerendered routes, sitemap.xml and robots.txt.
// Each entry: path (with trailing slash, except root), changefreq, priority.
export const SITE_URL = "https://stavropolskiy-perepel.ru";

export const ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/catalog/", changefreq: "weekly", priority: "0.9" },

  { path: "/yaytsa/", changefreq: "weekly", priority: "0.9" },
  { path: "/perepelinye-yaytsa/", changefreq: "weekly", priority: "0.9" },
  { path: "/inkubatsionnoe-yaytso/", changefreq: "weekly", priority: "0.8" },

  { path: "/ptitsa/", changefreq: "weekly", priority: "0.9" },
  { path: "/ptitsa/sutochnye/", changefreq: "monthly", priority: "0.7" },
  { path: "/ptitsa/podroshchennye/", changefreq: "monthly", priority: "0.7" },
  { path: "/ptitsa/nesushki/", changefreq: "monthly", priority: "0.7" },
  { path: "/ptitsa/samtsy/", changefreq: "monthly", priority: "0.6" },
  { path: "/ptitsa/roditelskoe-stado/", changefreq: "monthly", priority: "0.7" },
  { path: "/molodnyak/", changefreq: "monthly", priority: "0.7" },

  { path: "/myaso/", changefreq: "weekly", priority: "0.9" },
  { path: "/myaso-perepela/", changefreq: "weekly", priority: "0.8" },
  { path: "/myaso/zamorozhennoe/", changefreq: "monthly", priority: "0.7" },
  { path: "/myaso/dlya-zapekaniya/", changefreq: "monthly", priority: "0.6" },
  { path: "/myaso/marinovannye-kopchenye/", changefreq: "monthly", priority: "0.7" },
  { path: "/myaso/marinovannye-yaytsa/", changefreq: "monthly", priority: "0.6" },
  { path: "/myaso/vybrakovannye/", changefreq: "monthly", priority: "0.6" },

  { path: "/soputstvuyushchie/", changefreq: "weekly", priority: "0.8" },
  { path: "/soputstvuyushchie/pomet/", changefreq: "monthly", priority: "0.7" },
  { path: "/soputstvuyushchie/skorlupa/", changefreq: "monthly", priority: "0.6" },
  { path: "/soputstvuyushchie/pero-pukh/", changefreq: "monthly", priority: "0.5" },
  { path: "/soputstvuyushchie/potroha/", changefreq: "monthly", priority: "0.6" },

  { path: "/korm/", changefreq: "weekly", priority: "0.8" },
  { path: "/korm/startovyy/", changefreq: "monthly", priority: "0.7" },
  { path: "/kletki/", changefreq: "monthly", priority: "0.8" },

  { path: "/opt/", changefreq: "monthly", priority: "0.8" },
  { path: "/dostavka/", changefreq: "monthly", priority: "0.8" },
  { path: "/o-ferme/", changefreq: "monthly", priority: "0.6" },
  { path: "/sertifikaty/", changefreq: "monthly", priority: "0.5" },
  { path: "/faq/", changefreq: "monthly", priority: "0.6" },
  { path: "/kontakty/", changefreq: "monthly", priority: "0.7" },

  { path: "/stavropol/", changefreq: "monthly", priority: "0.8" },
  { path: "/mihaylovsk/", changefreq: "monthly", priority: "0.8" },
  { path: "/pyatigorsk/", changefreq: "monthly", priority: "0.7" },
  { path: "/essentuki/", changefreq: "monthly", priority: "0.7" },
  { path: "/nevinnomyssk/", changefreq: "monthly", priority: "0.7" },
  { path: "/budyonnovsk/", changefreq: "monthly", priority: "0.7" },
];
