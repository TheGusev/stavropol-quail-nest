import { SITE_NAME, SITE_URL } from "./contacts";

export interface SeoInput {
  title: string;
  description: string;
  path: string; // e.g. "/dostavka/"
  ogImage?: string;
}

export function buildHead({ title, description, path, ogImage }: SeoInput) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
  const trimmedTitle = fullTitle.length > 60 ? fullTitle.slice(0, 59) + "…" : fullTitle;
  const trimmedDesc = description.length > 160 ? description.slice(0, 159) + "…" : description;

  const meta = [
    { title: trimmedTitle },
    { name: "description", content: trimmedDesc },
    { property: "og:title", content: trimmedTitle },
    { property: "og:description", content: trimmedDesc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "ru_RU" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: trimmedTitle },
    { name: "twitter:description", content: trimmedDesc },
  ];
  if (ogImage) {
    meta.push({ property: "og:image", content: ogImage });
    meta.push({ name: "twitter:image", content: ogImage });
  }
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
