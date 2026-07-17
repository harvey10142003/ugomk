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
  name: 'Ugomk LINE CRM',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${site.url}/features`,
  description: 'LINE 會員經營系統：會員 CRM、點數票券、預約報名、POS 與行銷自動化，依照產業與營運需求彈性導入，適合餐飲、美業、零售、課程與多分店品牌。',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'TWD',
    price: '1980',
    availability: 'https://schema.org/InStock'
  }
};
