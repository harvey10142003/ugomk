import { site } from './data/site';
import { priceRange } from './data/pricing';

/** Organization 的全站唯一識別 —— 其他 schema 一律用 @id 引用，不要複製一份公司資料 */
export const ORGANIZATION_ID = `${site.url}/#organization`;

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: site.name,
  // 登記全名與統編是可查證的公司識別，比任何自我描述更能讓搜尋引擎確認實體是誰
  legalName: site.legalName,
  taxID: site.taxId,
  foundingDate: site.foundedDate,
  alternateName: site.shortName,
  url: site.url,
  description: site.description,
  email: site.contact.email,
  telephone: site.contact.phone,
  // 完整地址對在地搜尋（例如「高雄 LINE CRM」）有幫助，不要只留城市
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.contact.addressStreet,
    addressLocality: site.contact.addressDistrict,
    addressRegion: site.contact.addressCity,
    addressCountry: 'TW'
  },
  // 只放確定屬於宇果的帳號。sameAs 等於向 Google 宣告「這些也是我們」，
  // 放錯的網址會把陌生人的帳號綁成公司的官方社群，比留空傷害大得多。
  sameAs: [site.contact.lineUrl]
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
  name: 'UGO AI CRM 會員裂變系統',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${site.url}/solutions`,
  description: 'LINE 會員經營系統：會員 CRM、點數票券、預約報名、POS 與行銷自動化，依照產業與營運需求彈性導入，適合餐飲、美業、零售、課程與多分店品牌。',
  // 三個方案不是同一個價格。單一 Offer 只講得出最低價，搜尋結果就會顯示成「$1,980」
  // 而漏掉上面兩級；數字一律從 lib/data/pricing.ts 算，避免改了方案價這裡還留舊值。
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: priceRange.currency,
    lowPrice: priceRange.low,
    highPrice: priceRange.high,
    offerCount: priceRange.count,
    availability: 'https://schema.org/InStock'
  }
};

/**
 * FAQPage —— 頁面上要有對應的問答內容，schema 才合規。
 * 傳進來的就是畫面在渲染的那一份資料，不要另外寫一份給爬蟲看。
 */
export function faqPageLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

/** 麵包屑 —— items 由淺到深，最後一項是目前這頁 */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.path === '/' ? site.url : `${site.url}${it.path}`
    }))
  };
}

/** 服務頁（/services/*）—— provider 用 @id 引用 Organization，不重複一份公司資料 */
export function serviceLd({
  name,
  description,
  path,
  serviceType
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    url: `${site.url}${path}`,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: { '@type': 'Country', name: 'Taiwan' },
    inLanguage: 'zh-TW'
  };
}
