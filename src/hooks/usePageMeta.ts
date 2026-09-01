import { useEffect } from 'react';
import {
  type PageMetaDefinition,
  toAbsoluteUrl,
} from '../data/pageMeta';

type MetaKey = 'name' | 'property';

function setMetaContent(key: MetaKey, attribute: string, content?: string) {
  const selector = `meta[${key}="${attribute}"]`;
  const existing = document.head.querySelector<HTMLMetaElement>(selector);

  if (!content) {
    existing?.remove();
    return;
  }

  const tag = existing ?? document.createElement('meta');
  tag.setAttribute(key, attribute);
  tag.content = content;
  if (!existing) document.head.append(tag);
}

function setCanonical(href?: string) {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!href) {
    existing?.remove();
    return;
  }

  const tag = existing ?? document.createElement('link');
  tag.rel = 'canonical';
  tag.href = href;
  if (!existing) document.head.append(tag);
}

/** Synchronise toutes les métadonnées après une navigation côté client. */
export default function usePageMeta(page: PageMetaDefinition) {
  useEffect(() => {
    const canonical = page.path ? toAbsoluteUrl(page.path) : undefined;
    const image = toAbsoluteUrl(page.image);

    document.title = page.title;
    setCanonical(canonical);
    setMetaContent('name', 'description', page.description);
    setMetaContent('name', 'robots', page.noIndex ? 'noindex, follow' : undefined);

    setMetaContent('property', 'og:url', canonical);
    setMetaContent('property', 'og:title', page.title);
    setMetaContent('property', 'og:description', page.description);
    setMetaContent('property', 'og:image', image);
    setMetaContent('property', 'og:image:type', page.imageType);
    setMetaContent('property', 'og:image:width', String(page.imageWidth));
    setMetaContent('property', 'og:image:height', String(page.imageHeight));
    setMetaContent('property', 'og:image:alt', page.imageAlt);

    setMetaContent('name', 'twitter:title', page.title);
    setMetaContent('name', 'twitter:description', page.description);
    setMetaContent('name', 'twitter:image', image);
    setMetaContent('name', 'twitter:image:alt', page.imageAlt);
  }, [page]);
}
