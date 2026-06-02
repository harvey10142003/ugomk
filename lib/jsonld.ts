import { site } from './data/site';

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  description: site.description,
  email: site.contact.email,
  telephone: site.contact.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kaohsiung',
    addressCountry: 'TW'
  },
  sameAs: [site.contact.facebook, site.contact.instagram, site.contact.lineUrl]
};

export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  inLanguage: 'zh-TW'
};

export const productLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Ugomk LINE CRM SaaS',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${site.url}/features`,
  description: '多租戶 LINE CRM SaaS。可插拔模組、動態圖文選單、行銷自動化任務、POS 收銀、產業包（美業 / 餐酒館 / 補習班 / 宮廟）一站式。',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'TWD',
    price: '1980',
    availability: 'https://schema.org/InStock'
  }
};
