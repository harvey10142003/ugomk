import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ContactRound, Phone, MapPin, Globe, Share2, MessageCircle, CheckCircle2 } from 'lucide-react';
import { cardActions } from '@/lib/data/services';
import { site } from '@/lib/data/site';

export const metadata: Metadata = {
  title: 'LINE@ 智慧名片｜用 Flex 圖卡做的數位名片，可點擊也可轉傳',
  description:
    '用 LINE Flex 圖卡製作的數位名片：點電話直接撥號、點地址開導航、點按鈕加好友，對方還能整張轉傳給朋友。內容隨時改，不用重印。',
  alternates: { canonical: '/services/smart-card' }
};

/** Flex 名片示意 —— 用 CSS 重現 LINE 裡收到的樣子 */
function SmartCardMock() {
  return (
    <div className="relative">
      <div className="mx-auto w-[290px] rounded-[36px] bg-brand-950 p-2 shadow-card">
        <div className="overflow-hidden rounded-[28px] bg-mist-200">
          {/* 狀態列 */}
          <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[10px] font-semibold text-ink-700">
            <span>9:41</span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-line-500" />
              ●●●●
            </span>
          </div>

          {/* 對話區 */}
          <div className="min-h-[430px] bg-[#7B95A8]/10 px-3 py-4">
            <div className="flex items-start gap-1.5">
              <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-[10px] font-bold text-white">
                U
              </span>

              {/* Flex 名片本體 */}
              <div className="w-[210px] overflow-hidden rounded-2xl bg-white shadow-soft">
                {/* 封面 */}
                <div className="relative h-16 bg-gradient-to-br from-brand-700 to-brand-500">
                  <div className="absolute inset-0 dot-grid opacity-40" />
                </div>
                {/* 頭像與姓名 */}
                <div className="relative -mt-6 px-3 pb-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full border-[3px] border-white bg-brand-800 text-base font-extrabold text-white">
                    施
                  </div>
                  <div className="mt-2 text-[13px] font-extrabold text-ink-900">施雲漢 Shark</div>
                  <div className="text-[10px] text-ink-400">宇果國際行銷 · 執行長</div>
                </div>
                {/* 資訊列 */}
                <div className="space-y-1.5 border-t border-ink-100 px-3 py-2.5">
                  {[
                    { icon: Phone, text: '0910-087-065' },
                    { icon: MapPin, text: '高雄市' },
                    { icon: Globe, text: 'ugomk.com' }
                  ].map((r) => (
                    <div key={r.text} className="flex items-center gap-2 text-[10px] text-ink-600">
                      <r.icon className="h-3 w-3 shrink-0 text-brand-600" />
                      {r.text}
                    </div>
                  ))}
                </div>
                {/* 按鈕 */}
                <div className="space-y-1.5 border-t border-ink-100 p-2.5">
                  <div className="rounded-lg bg-line-500 py-2 text-center text-[10px] font-bold text-white">
                    加入 LINE 好友
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="rounded-lg border border-ink-200 py-1.5 text-center text-[10px] font-semibold text-ink-600">
                      撥打電話
                    </div>
                    <div className="rounded-lg border border-ink-200 py-1.5 text-center text-[10px] font-semibold text-ink-600">
                      查看官網
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 轉傳提示 */}
            <div className="mt-3 flex justify-end">
              <div className="rounded-2xl rounded-br-sm bg-line-500 px-3 py-2 text-[11px] text-white">
                我把名片轉給朋友了
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 浮動標註 */}
      <div className="absolute -right-3 top-24 hidden lg:block">
        <div className="glass max-w-[180px] px-3 py-2">
          <div className="flex items-start gap-2">
            <Share2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            <div>
              <div className="text-[10px] font-bold text-ink-900">整張可以轉傳</div>
              <div className="mt-0.5 text-[9px] text-ink-500">比截圖名片更容易被傳出去</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -left-4 bottom-28 hidden lg:block">
        <div className="glass max-w-[180px] px-3 py-2">
          <div className="flex items-start gap-2">
            <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            <div>
              <div className="text-[10px] font-bold text-ink-900">按鈕直接加好友</div>
              <div className="mt-0.5 text-[9px] text-ink-500">名片本身就是加好友的入口</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SmartCardPage() {
  return (
    <>
      {/* ─────────── Hero ─────────── */}
      <section className="hero-bg relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 dot-grid-fade pointer-events-none" />
        <div className="container-ug relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <span className="chip-brand">
              <ContactRound className="h-3 w-3" />
              LINE@ 智慧名片
            </span>
            <h1 className="heading-1 mt-6 text-balance">
              一張<span className="text-gradient-brand">會動的名片</span>，
              <br />
              留在對方的 LINE 裡
            </h1>
            <p className="body-lg mt-7 max-w-xl">
              用 LINE Flex 圖卡做的數位名片。點電話直接撥號、點地址開導航、點按鈕加你好友，對方還能把整張名片轉傳給朋友。
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={site.cta.primary.href} className="btn-brand">
                詢問智慧名片
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={site.contact.lineUrl} target="_blank" rel="noopener" className="btn-line">
                <MessageCircle className="h-4 w-4" />
                加 LINE 看實際範例
              </a>
            </div>
          </div>
          <SmartCardMock />
        </div>
      </section>

      {/* ─────────── 紙本名片的問題 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Why</span>
            <h2 className="heading-2 mt-3 text-balance">紙本名片的問題不是不好看</h2>
            <p className="body-base mt-4">是收下之後就進了抽屜，而且上面的資訊會過期。</p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <article className="card p-8">
              <h3 className="heading-3">紙本名片</h3>
              <ul className="mt-6 space-y-3 text-sm text-ink-500">
                {[
                  '要先存到通訊錄才聯絡得到你',
                  '換電話、換職稱就得整批重印',
                  '對方想介紹你給朋友，只能拍照傳',
                  '發出去之後不知道有沒有被看'
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-300" />
                    {t}
                  </li>
                ))}
              </ul>
            </article>

            <article className="card border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 shadow-brand">
              <h3 className="heading-3">智慧名片</h3>
              <ul className="mt-6 space-y-3 text-sm text-ink-600">
                {[
                  '在 LINE 裡直接點就撥號、導航、加好友',
                  '資料改一次，所有人看到的都是新的',
                  '對方可以整張轉傳，介紹你不用打字',
                  '名片本身就是加好友的入口'
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ─────────── 卡片上可以放什麼 ─────────── */}
      <section className="section border-y border-ink-100 bg-white">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">What it does</span>
            <h2 className="heading-2 mt-3 text-balance">卡片上的每個按鈕都能做事</h2>
            <p className="body-base mt-4">Flex 圖卡的每一個區塊都可以掛動作，不只是一張圖。</p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cardActions.map((a) => (
              <article key={a.title} className="card-hover p-7">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <h3 className="mt-4 text-base font-bold text-ink-900">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{a.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 適合誰 ─────────── */}
      <section className="section">
        <div className="container-ug grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <span className="eyebrow">Who it fits</span>
            <h2 className="heading-3 mt-3 text-balance">誰適合用</h2>
            <p className="body-base mt-4">
              需要把自己介紹出去、而且希望對方能順手轉介給別人的人。
            </p>
            <Link href={site.cta.primary.href} className="btn-outline mt-6">
              預約需求討論
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              '商務人士與業務',
              '保險、房仲、金融從業',
              '商會與社團成員',
              '接案者與自由工作者',
              '需要團隊統一名片格式的公司',
              '展會與市集擺攤'
            ].map((w) => (
              <li
                key={w}
                className="flex items-start gap-2.5 rounded-xl border border-ink-100 bg-mist-200 p-4 text-sm font-medium text-ink-700"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section className="section-tight">
        <div className="container-ug">
          <div className="card-glow bg-gradient-to-br from-brand-50 to-mint-100/40 p-10 text-center md:p-14">
            <h2 className="heading-3 text-balance">想看實際的卡片長什麼樣？</h2>
            <p className="body-base mx-auto mt-4 max-w-xl">
              加我們的 LINE，直接把一張智慧名片傳給你，你就知道對方收到會是什麼感覺。
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={site.contact.lineUrl} target="_blank" rel="noopener" className="btn-line">
                <MessageCircle className="h-4 w-4" />
                加 LINE 看範例
              </a>
              <Link href={site.cta.primary.href} className="btn-outline">
                {site.cta.primary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
