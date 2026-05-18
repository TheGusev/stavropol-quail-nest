import { SITE_NAME, SITE_URL } from "./contacts";

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export interface SeoInput {
  title: string;
  description: string;
  path: string; // canonical path, e.g. "/dostavka/" — leading slash, trailing slash for non-root
  ogImage?: string;
}

function absolutizeImage(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  return `${SITE_URL}${src.startsWith("/") ? src : "/" + src}`;
}

export function buildHead({ title, description, path, ogImage }: SeoInput) {
  // Self-canonical: strip any query/hash defensively, no UTM ever lands here.
  const cleanPath = path.split("?")[0].split("#")[0];
  const url = `${SITE_URL}${cleanPath}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
  const trimmedTitle = fullTitle.length > 60 ? fullTitle.slice(0, 59) + "…" : fullTitle;
  const trimmedDesc = description.length > 160 ? description.slice(0, 159) + "…" : description;
  const image = ogImage ? absolutizeImage(ogImage) : DEFAULT_OG_IMAGE;

  const meta = [
    { title: trimmedTitle },
    { name: "description", content: trimmedDesc },
    { property: "og:title", content: trimmedTitle },
    { property: "og:description", content: trimmedDesc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "ru_RU" },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: SITE_NAME },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: trimmedTitle },
    { name: "twitter:description", content: trimmedDesc },
    { name: "twitter:image", content: image },
  ];

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}

export function jsonLdScript(data: unknown) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data),
  };
}
