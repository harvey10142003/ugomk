import { site } from './data/site';
import { priceRange } from './data/pricing';

/** Organization 的全站唯一識別 —— 其他 schema 一律用 @id 引用，不要複製一份公司資料 */
export const ORGANIZATION_ID = `${site.url}/#organization`;

/**
 * 座標來源：OpenStreetMap Nominatim，查 `198 成功南路 / 高雄市` 命中的門牌節點
 * 「198號, 成功南路, 橋南里, 橋頭區, 高雄市, 825」（ODbL 授權）。
 * 精度＝門牌節點級，不是實地量測；若之後開了 Google 商家檔案，以那邊的座標為準。
 */
const GEO = { latitude: 22.7515247, longitude: 120.3136576 };

export const organizationLd = {
  '@context': 'https://schema.org',
  /**
   * 陣列而不是單一型別：
   *   - Organization 保留原本的知識圖譜價值（sameAs / taxID / foundingDate 都掛在這一層）
   *   - ProfessionalService 是 LocalBusiness 的子型，Google 要看到 LocalBusiness 血緣
   *     才會把 geo / openingHours / priceRange 拿去餵在地搜尋
   * 只發 Organization 的時候，下面那三個欄位寫了也沒有人讀。
   */
  '@type': ['Organization', 'ProfessionalService'],
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
  // 地址是字串，座標是座標 —— 在地搜尋比對的是後者。少了 geo，「高雄 LINE CRM」
  // 這種帶地名的查詢就只能靠 Google 自己去猜地址落在哪裡。
  geo: {
    '@type': 'GeoCoordinates',
    latitude: GEO.latitude,
    longitude: GEO.longitude
  },
  // 與 /contact 頁面上寫的營業時間同一份事實。改了那頁記得改這裡，
  // 不然結構化資料會替我們對搜尋引擎講一個畫面上沒有的營業時間。
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '18:00'
    }
  ],
  // schema.org 的 priceRange 是自由文字。這裡直接寫方案的實際區間而不是 '$$'，
  // 級距符號對台灣 B2B 買家沒有共識，寫得出真數字就不要用符號。
  // 數字一律從 lib/data/pricing.ts 算，避免改了方案價這裡還留舊值。
  priceRange: `NT$${priceRange.low.toLocaleString('en-US')} - NT$${priceRange.high.toLocaleString('en-US')}`,
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
    /**
     * 原本只寫 Country/Taiwan，等於在「全國都服務」與「在地團隊」之間選了前者，
     * 而後者才是這個站真正打得贏的位置。先列實際跑得到的三個縣市，最後才是全台，
     * 順序有意義 —— 由近到遠，不要把 Taiwan 放第一個把在地訊號稀釋掉。
     */
    areaServed: [
      { '@type': 'City', name: '高雄市' },
      { '@type': 'City', name: '台南市' },
      { '@type': 'AdministrativeArea', name: '屏東縣' },
      { '@type': 'Country', name: 'Taiwan' }
    ],
    inLanguage: 'zh-TW'
  };
}
