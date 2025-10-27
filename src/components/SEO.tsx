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
  title = 'CATOLID - Sua Identidade Católica Digital | catolid.com',
  description = 'Crie sua carteirinha católica digital personalizada no CATOLID. Compartilhe sua fé, informações sobre sua paróquia, sacramentos e santo de devoção com a comunidade católica mundial.',
  keywords = 'catolid, católico, carteirinha católica, identidade católica digital, perfil católico, paróquia, sacramentos, fé católica, comunidade católica, santo de devoção, batismo, eucaristia, crisma, catolid.com',
  ogTitle,
  ogDescription,
  ogImage = 'https://catolid.com/og-image.png',
  ogUrl = 'https://catolid.com/',
  canonicalUrl,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: 'CATOLID' },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'pt-BR' },
      { name: 'revisit-after', content: '7 days' },
      { name: 'theme-color', content: '#2563eb' },

      { property: 'og:title', content: ogTitle || title },
      { property: 'og:description', content: ogDescription || description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: ogUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'pt_BR' },
      { property: 'og:site_name', content: 'CATOLID' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle || title },
      { name: 'twitter:description', content: ogDescription || description },
      { name: 'twitter:image', content: ogImage },

      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'CATOLID' },
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
      name: 'CATOLID',
      description: description,
      url: 'https://catolid.com/',
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'BRL',
      },
      author: {
        '@type': 'Organization',
        name: 'CATOLID',
        url: 'https://catolid.com/',
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
