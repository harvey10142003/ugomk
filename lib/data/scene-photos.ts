/**
 * 情境照（2026-10-31，Codex 生圖）—— 全站唯一來源。
 *
 * ⚠️ 全部是「行業情境示意」，不是任何客戶的店面或現場：
 *   - 畫面上一律標「情境示意」（components/ScenePhoto.tsx 的角標），alt 也寫明「情境示意」。
 *   - 成功案例頁的圖只能代表「那個行業」，不得暗示是該客戶實景（紅線）。
 * 重生成：提示詞、檔名、放置位置全部記在 docs/image-prompts-2026-10.md。
 * 檔案：public/images/scenes/<id>.webp（1200×800，sharp 轉 WebP），
 *       public/images/og/<id>.jpg（1200×630 社群分享圖，圖上不加字）。
 */

export type ScenePhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const W = 1200;
const H = 800;

function scene(id: string, alt: string): ScenePhoto {
  return { src: `/images/scenes/${id}.webp`, width: W, height: H, alt: `${alt}（情境示意）` };
}

export const scenePhotos = {
  // 成功案例：行業情境，非客戶實景
  caseCourse: scene('case-course', '社區教室的晚間課程，學員用手機掃描報到卡'),
  caseBeauty: scene('case-beauty', '美甲店工作桌，美甲師幫客人做指甲，旁邊平板顯示預約行事曆'),
  caseRestaurant: scene('case-restaurant', '中式餐廳用餐時段，服務人員拿平板在圓桌旁幫一家人點餐'),
  caseConsulting: scene('case-consulting', '小型講座教室，講師對著學員講課，前排學員用手機做筆記'),
  // 解決方案總覽：同行通常這樣配
  packRestaurant: scene('pack-restaurant', '早午餐店櫃台，客人拿手機結帳，店員在平板收銀機上點單'),
  packBeauty: scene('pack-beauty', '髮廊等候區，客人低頭看手機上的對話畫面，後方設計師正在吹頭髮'),
  packCourse: scene('pack-course', '週末手作課，講師彎腰指導學員，桌上放著手機與工具'),
  // 三個能力頁
  solLoyalty: scene('sol-loyalty', '麵包店結帳櫃台，客人出示手機上的會員條碼，店員用掃描槍掃描'),
  solAutomation: scene('sol-automation', '咖啡店打烊後，老闆坐在角落看手機上的訊息'),
  solReferral: scene('sol-referral', '手搖飲店窗邊，一位朋友把手機畫面拿給另一位看'),
  // 模組頁
  modPosRestaurant: scene('mod-pos-restaurant', '麵店出餐口，出單機印出點單，廚師伸手去拿，外場人員手持平板'),
  modPosRetail: scene('mod-pos-retail', '選物店木櫃台，店主在平板上結帳，客人拿著包好的商品等候'),
  modReservation: scene('mod-reservation', '火鍋店門口帶位台，帶位人員查看平板上的訂位名單，客人在門口等候'),
  modBeauty: scene('mod-beauty', '美睫保養工作室櫃台，櫃台人員看平板上的預約時段，客人坐在一旁等候'),
  modMarket: scene('mod-market', '週末手作市集，攤主拿出 QR 卡讓逛市集的客人用手機掃描'),
  // 首頁
  homeConsult: scene('home-consult', '餐廳打烊後，顧問與老闆坐在桌邊，老闆指著手繪的流程圖說明，桌上放著平板')
} satisfies Record<string, ScenePhoto>;

export type ScenePhotoKey = keyof typeof scenePhotos;

/** 社群分享圖（1200×630，由情境照裁切，圖上不加字） */
export const ogImages = {
  cases: '/images/og/case-beauty.jpg',
  solutions: '/images/og/pack-restaurant.jpg',
  loyalty: '/images/og/sol-loyalty.jpg',
  marketingAutomation: '/images/og/sol-automation.jpg',
  referral: '/images/og/sol-referral.jpg'
} as const;

/**
 * 模組頁 → 情境照。只放畫面真的對得上的模組，其餘模組頁維持原樣（不硬塞）。
 */
export const moduleScenePhotos: Partial<Record<string, ScenePhotoKey>> = {
  pos_restaurant: 'modPosRestaurant',
  pos_retail: 'modPosRetail',
  pos_reservation: 'modReservation',
  beauty_booking: 'modBeauty',
  course_enrollment: 'packCourse',
  market_expo: 'modMarket',
  event_module: 'modMarket'
};
