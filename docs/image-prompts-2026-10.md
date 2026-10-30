# 官網情境照提示詞（2026-10）

這份記錄 ugomk.com 2026-10-31 這批生成圖的提示詞、檔名與放置位置，日後重生成照這份做。

## 規則

- 全部是「行業情境示意」，不是任何客戶的店面或現場。畫面右上角一律標「情境示意」（成功案例頁標「行業情境示意」），alt 結尾帶「（情境示意）」。
- 成功案例頁的圖只能代表那個行業，不得做出看起來像真實客戶店面的照片；案例名稱與數字不因配圖而改。
- 圖裡不放文字、logo、品牌名，也不出現 LINE 官方 logo；手機與平板畫面只有模糊的抽象介面。
- alt 文字的單一來源是 `lib/data/scene-photos.ts`。

## 產生與處理流程

1. 生圖：Codex CLI（codex-cli 0.162.1），每張一次 `codex exec --skip-git-repo-check -s read-only -o out.md -`，提示詞從 stdin 送入，要求只回生成圖的絕對路徑；圖在 `~/.codex/generated_images/<session>/exec-*.png`（1536×1024），由我們複製出來。Codex 額度用完時改 ChatGPT 網頁版（見記憶 reference_codex_cli_asset_pipeline）。
2. 送出的提示詞 =「Generate exactly one image…」+ 下方各張的「畫面」+ 共用尾段。
3. 轉檔：sharp `resize(1200, 800, { fit: 'cover' })` → WebP quality 74（effort 6），存到 `public/images/scenes/<檔名>.webp`，單張目標 ≤ 150KB。
4. 社群分享圖：同一張原圖 `resize(1200, 630, { fit: 'cover', position: 'centre' })` → JPEG（mozjpeg）存到 `public/images/og/<檔名>.jpg`，圖上不加字。
5. 前台：`components/ScenePhoto.tsx`（next/image 帶 width／height、sizes，預設 lazy）；案例頁與產業組合卡用 fill＋固定高度容器。

## 共用尾段

> Photorealistic candid documentary photograph, landscape 3:2 (1536x1024). Setting: a small independent local shop in Taiwan, everyday working atmosphere. People are Taiwanese / East Asian, natural expressions, ordinary clothes, not models. Soft natural daylight from a window, realistic slightly imperfect details (cables, receipts, worn wood, plants), shallow depth of field, shot on a 35mm lens, muted true-to-life colors. ABSOLUTELY NO text, letters, numbers, signage words, logos, brand names or watermarks anywhere in the image; no LINE logo. Any phone or tablet screen shows only soft out-of-focus abstract interface blocks (rounded rectangles, a green or teal chat-bubble shape) with nothing readable. Avoid: purple or blue gradients, glowing 3D icons, abstract tech lines, holograms, studio-perfect glossy lighting, symmetrical stock-photo poses, people looking at the camera.

## 各張

| 檔名 | 放在哪裡 | 狀態 |
|---|---|---|
| `public/images/scenes/case-course.webp` | /cases 小聚所案例卡片頂部橫幅（lib/data/cases.ts → scenePhotos.caseCourse） | 已上站 |
| `public/images/scenes/case-beauty.webp` | /cases 菲韻美甲案例卡片頂部橫幅；/cases 社群分享圖 og/case-beauty.jpg | 已上站 |
| `public/images/scenes/case-restaurant.webp` | /cases 鴨點棧案例卡片頂部橫幅；首頁案例區標題下方寬幅（標「行業情境示意」） | 已上站 |
| `public/images/scenes/case-consulting.webp` | /cases 王子娘案例卡片頂部橫幅 | 已上站 |
| `public/images/scenes/pack-restaurant.webp` | /solutions「同行通常這樣配」餐飲卡（lib/data/modules.ts industryPacks）；/solutions 社群分享圖 og/pack-restaurant.jpg | 已上站 |
| `public/images/scenes/pack-beauty.webp` | /solutions「同行通常這樣配」美業卡；首頁「LINE 好友不少，卻沒有真正變成會員？」區左欄 | 已上站 |
| `public/images/scenes/pack-course.webp` | /solutions「同行通常這樣配」課程活動卡；/solutions/course_enrollment「這個模組適合誰」左欄 | 已上站 |
| `public/images/scenes/sol-loyalty.webp` | /solutions/loyalty「解決什麼問題」區右欄；社群分享圖 og/sol-loyalty.jpg | 已上站 |
| `public/images/scenes/sol-automation.webp` | /solutions/marketing-automation「解決什麼問題」區右欄；社群分享圖 og/sol-automation.jpg | 已上站 |
| `public/images/scenes/sol-referral.webp` | /solutions/referral「解決什麼問題」區右欄；社群分享圖 og/sol-referral.jpg | 已上站 |
| `public/images/scenes/mod-pos-restaurant.webp` | /solutions/pos_restaurant「這個模組適合誰」左欄 | 已上站 |
| `public/images/scenes/mod-pos-retail.webp` | /solutions/pos_retail「這個模組適合誰」左欄；首頁最後的預約區右欄 | 已上站 |
| `public/images/scenes/mod-reservation.webp` | /solutions/pos_reservation「這個模組適合誰」左欄 | 已上站 |
| `public/images/scenes/mod-beauty.webp` | /solutions/beauty_booking「這個模組適合誰」左欄 | 已上站 |
| `public/images/scenes/mod-market.webp` | /solutions/market_expo 與 /solutions/event_module「這個模組適合誰」左欄 | 已上站 |
| `public/images/scenes/home-consult.webp` | 首頁「顧問式導入」深色區（標題右側／手機在說明下方） | 已上站 |

### case-course

- 位置：/cases 小聚所案例卡片頂部橫幅（lib/data/cases.ts → scenePhotos.caseCourse）
- 畫面：

> A small community workshop classroom in Taiwan in the evening: a few adult participants sit at a long wooden table with notebooks and paper cups of tea; in the foreground one participant holds up a smartphone to scan a printed check-in card held by a smiling staff member. Warm mixed light, plants and a whiteboard (blank) in the background, seen from a slightly high side angle.

### case-beauty

- 位置：/cases 菲韻美甲案例卡片頂部橫幅；/cases 社群分享圖 og/case-beauty.jpg
- 畫面：

> Inside a small nail salon in Taiwan: close view over the manicure desk, a nail technician wearing a mask works on a customer's hand under a desk lamp; on the side of the desk a tablet on a stand shows a blurred abstract booking calendar. Pastel bottles of polish, a towel, natural daylight from the shop window. Camera at desk height, off-center composition.

### case-restaurant

- 位置：/cases 鴨點棧案例卡片頂部橫幅；首頁案例區標題下方寬幅（標「行業情境示意」）
- 畫面：

> A busy Taiwanese family-style Chinese restaurant dining room at lunchtime: a server in a dark apron stands beside a round table with a lazy susan, taking an order on a small handheld tablet while a family of four looks at the dishes. Steam from tea, red-brown wood chairs, plain walls with NO posters, NO menu boards, NO red paper signs, NO calligraphy, nothing written anywhere. Shot from behind the server's shoulder, slight motion in the background staff.

### case-consulting

- 位置：/cases 王子娘案例卡片頂部橫幅
- 畫面：

> A small seminar room in Taiwan: a woman in her forties speaking casually to about eight seated adults, mid-gesture, a projector screen behind her shows only a soft blank light. Attendees with laptops and notebooks, one person in the foreground typing notes on a phone. Daylight through blinds, realistic office carpet and chairs. Shot from the back corner of the room.

### pack-restaurant

- 位置：/solutions「同行通常這樣配」餐飲卡（lib/data/modules.ts industryPacks）；/solutions 社群分享圖 og/pack-restaurant.jpg
- 畫面：

> Counter of a small Taiwanese breakfast / brunch shop: a customer pays at the counter, holding out a smartphone, while the young cashier taps an order on a tablet POS on the counter. Paper bags, a basket of toast, a steel milk-tea dispenser in the background, morning sunlight. Side angle at counter height, cashier's hands and customer's phone in focus.

### pack-beauty

- 位置：/solutions「同行通常這樣配」美業卡；首頁「LINE 好友不少，卻沒有真正變成會員？」區左欄
- 畫面：

> A young woman sitting in a cozy hair salon waiting area in Taiwan, looking down at her smartphone which shows a blurred chat interface with green bubble shapes; behind her out of focus a stylist blow-dries another customer's hair. Plants, a mirror with warm bulbs, afternoon window light. Medium shot, subject on the left third.

### pack-course

- 位置：/solutions「同行通常這樣配」課程活動卡；/solutions/course_enrollment「這個模組適合誰」左欄
- 畫面：

> A weekend craft / handmade class in a small Taiwanese studio: participants at a shared table making pottery or leather goods, an instructor leaning in to help; a phone lies on the table next to tools. Natural daylight, clay dust, wooden shelves with unfinished pieces. Overhead three-quarter angle, candid.

### sol-loyalty

- 位置：/solutions/loyalty「解決什麼問題」區右欄；社群分享圖 og/sol-loyalty.jpg
- 畫面：

> Checkout counter of a neighborhood Taiwanese bakery: a middle-aged customer shows a member barcode on her phone (screen blurred, abstract shapes only) to the shop assistant who scans it with a handheld scanner; trays of bread, paper bags, receipt printer. Morning daylight, shot from behind the counter at a low angle focusing on the phone and scanner.

### sol-automation

- 位置：/solutions/marketing-automation「解決什麼問題」區右欄；社群分享圖 og/sol-automation.jpg
- 畫面：

> After closing time in a small Taiwanese cafe: the owner, a man in his thirties with an apron, sits at a corner table with a cup of coffee, checking his smartphone (blurred chat interface with green and teal bubble shapes). Chairs partly stacked, warm pendant lamp, dusk light through the window. Calm, quiet mood, subject off-center.

### sol-referral

- 位置：/solutions/referral「解決什麼問題」區右欄；社群分享圖 og/sol-referral.jpg
- 畫面：

> Two Taiwanese female friends in their twenties sitting side by side at a small bubble-tea shop table by the window; one shows her phone screen to the other (blurred chat bubbles, nothing readable), both smiling naturally, drinks with straws on the table. Daylight from the street, candid over-the-shoulder angle.

### mod-pos-restaurant

- 位置：/solutions/pos_restaurant「這個模組適合誰」左欄
- 畫面：

> Inside a small Taiwanese noodle restaurant at lunch rush: at the pass-through window between kitchen and dining area, a small thermal printer pushes out a blank order ticket while a cook in a white cap reaches for it; in the foreground a server holds a tablet. Steam, stainless steel counter, bowls lined up, warm practical light. Shot from the dining side, slightly low angle, kitchen partly out of focus.

### mod-pos-retail

- 位置：/solutions/pos_retail「這個模組適合誰」左欄；首頁最後的預約區右欄
- 畫面：

> A small lifestyle select shop in Taiwan with ceramics, linen bags and plants on wooden shelves: the shop owner, a woman in her thirties, rings up a purchase on a tablet on a stand at the wooden counter while a customer waits with a wrapped item. Afternoon sunlight, calm atmosphere, shot from the side of the counter, the owner's hands on the tablet in focus.

### mod-reservation

- 位置：/solutions/pos_reservation「這個模組適合誰」左欄
- 畫面：

> Entrance host stand of a cozy Taiwanese hot-pot restaurant in early evening: a young host in a black shirt checks a tablet booking list (blurred abstract rows) while a couple waits at the door; behind them out of focus tables with induction hot pots. Warm light, realistic clutter (menus face down, a pen cup). Shot from inside the restaurant, host in the right third.

### mod-beauty

- 位置：/solutions/beauty_booking「這個模組適合誰」左欄
- 畫面：

> Reception desk of a small eyelash and skincare studio in Taiwan: a receptionist in a simple uniform looks at a tablet calendar (blurred blocks) while a client sits on a bench nearby checking her phone; dried flowers, light wood, linen curtain diffusing daylight. Calm, minimal but lived-in. Shot from a slight angle across the desk.

### mod-market

- 位置：/solutions/market_expo 與 /solutions/event_module「這個模組適合誰」左欄
- 畫面：

> An outdoor weekend craft market in a Taiwanese park: a vendor at a canvas-covered stall with handmade goods holds out a small printed QR card (pattern only, no text) for a visitor who scans it with her phone; other stalls and strolling people blurred behind, late afternoon sun. Candid, eye-level shot.

### home-consult

- 位置：首頁「顧問式導入」深色區（標題右側／手機在說明下方）
- 畫面：

> After closing time in a small Taiwanese restaurant: a consultant in a plain shirt and the restaurant owner in an apron sit side by side at a dining table, looking together at a tablet (blurred abstract screen) and a printed sheet with hand-drawn boxes and arrows (no readable words); the owner points at the sheet. Chairs stacked on some tables, warm pendant light, dusk through the window, plain walls with nothing written. Candid three-quarter angle from across the table, both people slightly off-center.

