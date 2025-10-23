import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
}

export function SEO({
  title = 'ID Católico - Carteirinha Católica Digital',
  description = 'Crie sua carteirinha católica digital personalizada. Compartilhe sua fé, informações sobre sua paróquia, sacramentos e santo de devoção com a comunidade católica.',
  keywords = 'católico, carteirinha católica, identidade católica, perfil católico, paróquia, sacramentos, fé católica, comunidade católica, santo de devoção, batismo, eucaristia, crisma',
  ogTitle,
  ogDescription,
  ogImage = 'https://idcatolico.com/icon-512.png',
  ogUrl = 'https://idcatolico.com/',
  canonicalUrl,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: 'ID Católico' },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'pt-BR' },
      { name: 'revisit-after', content: '7 days' },
      { name: 'theme-color', content: '#8B4513' },

      { property: 'og:title', content: ogTitle || title },
      { property: 'og:description', content: ogDescription || description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: ogUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'pt_BR' },
      { property: 'og:site_name', content: 'ID Católico' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle || title },
      { name: 'twitter:description', content: ogDescription || description },
      { name: 'twitter:image', content: ogImage },

      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'ID Católico' },
      { name: 'mobile-web-app-capable', content: 'yes' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector);

      if (!element) {
        element = document.createElement('meta');
        if (name) element.setAttribute('name', name);
        if (property) element.setAttribute('property', property);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    });

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl || ogUrl);

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'ID Católico',
      description: description,
      url: 'https://idcatolico.com/',
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'BRL',
      },
      author: {
        '@type': 'Organization',
        name: 'ID Católico',
        url: 'https://idcatolico.com/',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        ratingCount: '1',
      },
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, canonicalUrl]);

  return null;
}
