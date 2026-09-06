import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  CircleCheck,
  Coins,
  GitBranch,
  Link2,
  QrCode,
  Share2,
  ShieldCheck,
  Ticket,
  Trophy,
  UserPlus,
  Users
} from 'lucide-react';
import { CtaBlock } from '@/components/CtaBlock';
import { JsonLd } from '@/components/JsonLd';
import { ModuleDemo } from '@/components/ModuleDemo';
import { solutionDemos } from '@/lib/data/solution-demos';
import { site } from '@/lib/data/site';
import { breadcrumbLd, serviceLd } from '@/lib/jsonld';
import { pageMeta } from '@/lib/seo';
import { ctaHref } from '@/lib/utm';

/**
 * ## 這一頁為什麼存在
 *
 * 兩個理由。第一，「LINE 推薦好友獎勵 / MGM 推薦碼」的搜尋結果前段全是競品文章與目錄站，
 * 沒有產品頁。第二，也是更嚴重的：產品全名叫「UGO AI CRM 會員裂變系統」
 * （lib/data/site.ts 的 `product`），但站上沒有任何一頁在解釋什麼是裂變 ——
 * 品牌敘事在自己的名字上斷了一截。
 *
 * ## 內容出處
 *
 * 主要實作：`apps/api/src/lib/referral.ts`。後台設定：
 * `apps/admin/src/app/dashboard/settings/referral/page.tsx`（總開關 / 觸發時機 / 防刷 /
 * 加入禮 / 推薦獎勵 / 分享與畫面）與 `apps/admin/src/app/dashboard/appearance/referral/`。
 * 說明書：`apps/admin/docs/help/system/28-referral.md`。
 *
 *  - 推薦碼：generateReferralCode referral.ts:406-434（冪等，`R-XYZ123` 六位格式）、
 *    `members.referral_code` + UNIQUE 索引（tenant.ts:113,123-126）
 *  - 推薦關係：`members.referrer_id` / `referrer_bound_at`（tenant.ts:114,117-120），
 *    bindReferrer referral.ts:577-772 先到先綁 + 原子 UPDATE 防重複（646-657）
 *  - 還不是會員的人也記得住：`referral_pending_binds` 表（boot-migrations.ts:10087-10126），
 *    等對方真的建立會員時再套用
 *  - 推薦人數：`members.referral_count`，綁定成功當下就 +1（referral.ts:672-686）
 *  - 四個獎勵管道：每次推薦立刻發 grantReferrerPerBindReward referral.ts:952-1061 /
 *    達標階梯 tryGrantReferralReward referral.ts:2508-2727 /
 *    被推薦人加入好禮 grantRefereeJoinReward referral.ts:784-935 /
 *    全會員加入禮 referral.ts:88-142（與是否經由推薦無關，24 小時 dedup）
 *  - 觸發時機二選一：`settings.referral.trigger_mode` = 'on_join' | 'on_first_purchase'
 *    （referral.ts:146；on_join 見 766-769、on_first_purchase 見 markFirstPurchase
 *    referral.ts:2733-2774 的原子旗標）。只有「達標階梯獎」吃這個設定，
 *    「每次推薦立刻發」與「被推薦人加入好禮」一律在綁定當下發
 *  - 「是會員但不一定是好友」：LINE 對未加好友的 user 推播會回 200 但實際沒送到
 *    （referral.ts:1617-1628 的設計註解）。系統的處理是資產照發、推播延後：
 *    grantMemberJoinReward 帶 isFollower=false（referral.ts:724-733），
 *    在紀錄上標 pending_push（2271-2300），等對方真的加好友觸發 follow 事件時由
 *    retryPendingPush 補送（2348-2377，送完改 pending_push:false 見 2470-2474）
 *  - 防刷：擋同手機自我推薦 referral.ts:615-617、冷卻期 479-575 + 619-644、
 *    黑名單擋綁定與擋發獎 584-613 / 790-796 / 958-967 / 2524-2533
 *  - 分享：原生分享選單優先，依序退回 LINE 分享網址、系統分享、複製連結
 *    （apps/web/src/app/referral/page.tsx:331-373）；推薦 QR 圖見同檔 527-539
 *  - 戰績面板：GET /api/referral/members/:id/stats（routes/referral.ts:45-99），
 *    顯示在會員詳情頁（members/[id]/page.tsx:1139-1203），含已綁定但尚未發獎的名單
 *
 * ## 刻意沒有寫的
 *
 *  - 推薦排行榜：全站沒有跨會員的 leaderboard，只有「打開某位會員看他的戰績」。
 *    寫成「後台有推薦排行榜」會是編的
 *  - 多層分潤（A 推 B、B 推 C 時 A 也抽成）：只有單層推薦人 + 累積人數階梯，沒有多代
 */
export const metadata: Metadata = pageMeta({
  path: '/solutions/referral',
  title: 'LINE 推薦好友獎勵與會員裂變',
  description:
    'LINE 推薦好友獎勵（MGM）：每位會員有專屬推薦碼與推薦連結，朋友加入後系統記得是誰帶的，雙方各自拿到點數或票券。獎勵時機可選加入即發或首次消費才發，並內建防止自我推薦與重複領取。',
  keywords: [
    'LINE 推薦好友獎勵',
    'MGM 推薦碼',
    '會員裂變',
    'LINE 推薦連結',
    '老客戶帶新客戶',
    '會員推薦制度'
  ]
});

/** 四個獎勵管道 —— 分開講是因為它們的觸發時機真的不一樣，混在一起講會誤導 */
const rewardChannels = [
  {
    icon: UserPlus,
    title: '被推薦人的見面禮',
    when: '推薦關係綁定的當下',
    desc: '新朋友一完成入會就拿到點數、票券或抽獎機會。這份禮不受「獎勵時機」設定影響，一律立刻發。'
  },
  {
    icon: Coins,
    title: '推薦人的每一筆',
    when: '每成功帶進一位',
    desc: '每帶進一個人就發一次，人人有份。適合把推薦做成常態機制，而不是限時活動。'
  },
  {
    icon: Trophy,
    title: '推薦人的達標加碼',
    when: '累積人數跨過門檻',
    desc: '滿 3 人、滿 10 人各給一份不一樣的獎勵，門檻與獎勵自己設。跨過兩個門檻會一次都發。'
  },
  {
    icon: Ticket,
    title: '全會員的加入禮',
    when: '任何人第一次成為會員',
    desc: '跟推薦沒有關係，只要是新加入的會員就發一次，同一個人不會重複領。'
  }
];

const antiAbuse = [
  '同一支手機不能推薦自己，換個 LINE 帳號也擋得掉',
  '可以設冷卻天數，避免同一支門號短期內反覆被拿來刷獎勵',
  '黑名單裡的人，推薦關係綁不起來，獎勵也發不出去',
  '推薦關係先到先綁，一位會員只會有一位推薦人，不會被後來的人蓋掉'
];

const useCases = [
  {
    industry: '課程與講座',
    title: '學員帶學員',
    detail: '報名的人本來就會揪朋友。給推薦人下期折抵、給新朋友首堂優惠，兩邊都有理由開口。'
  },
  {
    industry: '美業',
    title: '老客戶最會介紹',
    detail: '做得好本來就有人問「你在哪弄的」。把那句話變成一個推薦連結，介紹的人也拿得到回饋。'
  },
  {
    industry: '餐飲',
    title: '揪團來吃比廣告便宜',
    detail: '一張朋友專屬的見面禮，換一組新客。跟投廣告比，成本清楚，而且來的人本來就有人背書。'
  },
  {
    industry: '零售與電商',
    title: '把回購客變成通路',
    detail: '常買的人給推薦碼，帶進來的每一筆都記得住，之後要算誰貢獻最多也有依據。'
  }
];

const relatedModules = [
  {
    href: '/solutions/loyalty',
    title: '會員集點與票券',
    desc: '推薦獎勵發的就是這裡的點數與票券，不需要另外做一套獎勵幣別。'
  },
  {
    href: '/solutions/marketing-automation',
    title: '行銷自動化',
    desc: '劇本的每個動作都能改成發給推薦人，也能在被推薦人首次消費時自動加碼。'
  },
  {
    href: '/solutions/game_community',
    title: '社群與遊戲化',
    desc: '推薦人數可以拿來當等級、勳章與任務的條件，讓帶人這件事在會員端看得到成果。'
  },
  {
    href: '/solutions/event_module',
    title: '活動模組',
    desc: '尾牙、春酒與體驗活動的報名連結帶推薦碼，現場來的人一樣算得出是誰帶的。'
  },
  {
    href: '/solutions/website',
    title: '官網建置',
    desc: '官網的表單名單與推薦名單進同一份會員資料，不會變成兩張互不相認的名單。'
  },
  {
    href: '/services/line-marketing',
    title: 'LINE@ 行銷規劃',
    desc: '裂變是導航六步法的最後一步。前面五步沒鋪好，推薦機制通常也帶不動。'
  }
];

export default function ReferralPage() {
  const campaign = 'solutions_referral';

  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: 'LINE 推薦好友獎勵與會員裂變',
            description:
              '每位會員擁有專屬推薦碼與推薦連結，朋友加入後系統記錄推薦關係，推薦人與被推薦人各自獲得點數或票券，並可設定獎勵在加入時或首次消費後發放。',
            path: '/solutions/referral',
            serviceType: 'LINE 會員推薦裂變機制導入'
          }),
          breadcrumbLd([
            { name: '首頁', path: '/' },
            { name: '解決方案', path: '/solutions' },
            { name: '推薦裂變 MGM', path: '/solutions/referral' }
          ])
        ]}
      />

      {/* ─────────── Hero ─────────── */}
      <section className="hero-bg relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="absolute inset-0 dot-grid-fade pointer-events-none" />
        <div className="container-ug relative max-w-4xl">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 transition-colors hover:text-brand-800"
          >
            <ArrowLeft className="h-4 w-4" />
            所有解決方案
          </Link>

          <span className="eyebrow mt-8 block">LINE 推薦好友獎勵・MGM 會員裂變</span>
          <h1 className="heading-1 mt-4 text-balance">
            老客戶帶新客戶，
            <br />
            而且系統<span className="text-gradient-brand">知道是誰帶的</span>
          </h1>
          <p className="body-lg mt-7 max-w-2xl">
            口碑一直都在發生，只是從來沒有被記下來。給每位會員一組專屬推薦碼，
            朋友從他的連結進來，推薦關係就跟著建檔 —— 兩邊各自拿到獎勵，你也知道這個月的新客是誰帶進來的。
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href={ctaHref(site.cta.primary.href, campaign, 'hero')} className="btn-brand">
              預約需求討論
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="btn-outline">
              查看費用方案
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-500">
            {['雙方都有獎勵', '推薦關係查得到', '內建防刷機制'].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 什麼是會員裂變 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <span className="eyebrow">What it means</span>
              <h2 className="heading-2 mt-3 text-balance">先講清楚：什麼是「會員裂變」</h2>
              <p className="body-base mt-5">
                我們的系統全名是「{site.product}」，裂變兩個字常被當成術語帶過，
                但它講的其實是一件很具體的事：
                <span className="font-semibold text-ink-700">
                  讓已經在你這裡消費的會員，去帶來下一位會員，而且這條關係被系統記下來。
                </span>
              </p>
              <p className="body-base mt-4">
                差別在最後半句。發折價券叫促銷，辦活動叫檔期，只有當「誰帶了誰」變成資料，
                你才知道哪一位客人真的替你帶了十個人，也才有辦法回頭謝謝他。
              </p>
              <p className="body-base mt-4">
                名單自己會長，不是因為你發得比較多，而是因為每一位滿意的客人都有一個方便的方式把你介紹出去，
                介紹完還拿得到東西。
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Link2,
                  title: '一人一組推薦碼',
                  text: '每位會員都有自己的推薦碼與推薦連結，在 LINE 裡就拿得到。'
                },
                {
                  icon: GitBranch,
                  title: '關係記在會員身上',
                  text: '被推薦人的資料上會註明是誰介紹的，以及什麼時候綁定的。'
                },
                {
                  icon: Users,
                  title: '雙方都拿得到',
                  text: '推薦人與被推薦人各自有自己的獎勵，不是只有一邊有好處。'
                },
                {
                  icon: Trophy,
                  title: '帶得多還能加碼',
                  text: '累積帶進 3 人、10 人各給一份加碼獎，門檻與獎勵自己設。'
                }
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <article key={c.title} className="card-hover p-6">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-brand-800">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-ink-900">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 解決什麼問題 ─────────── */}
      <section className="section-tight border-y border-ink-100 bg-white">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">The problem</span>
            <h2 className="heading-2 mt-3 text-balance">「聽朋友說的」是你最大的來源，也是最沒紀錄的那個</h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                title: '知道有人介紹，不知道是誰',
                text: '新客人說朋友推薦的，你點頭謝謝，然後就沒有然後了。那位真正幫你帶客的老顧客，從頭到尾沒有被記上一筆。'
              },
              {
                title: '想做推薦活動，卡在對帳',
                text: '推薦送好禮這種活動誰都會辦，難的是誰帶誰要用手記。辦一次要對半天帳，辦第二次就沒力氣了。'
              },
              {
                title: '獎勵發不出去也不知道',
                text: '客人幫忙介紹卻遲遲沒收到回饋，下一次就不會再開口了。口碑很脆弱，斷一次通常就不會再接起來。'
              }
            ].map((p) => (
              <article key={p.title} className="card-hover p-7">
                <h3 className="text-base font-bold text-ink-900">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 實際怎麼跑 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Walk through</span>
            <h2 className="heading-2 mt-3 text-balance">{solutionDemos.referral.title}</h2>
            <p className="body-base mt-4">{solutionDemos.referral.intro}</p>
          </div>
          <div className="mt-12">
            <ModuleDemo demo={solutionDemos.referral} />
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-ink-100 bg-mist-200 p-6 md:p-7">
            <div className="flex items-start gap-3">
              <Share2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
              <div>
                <h3 className="text-base font-bold text-ink-900">分享這件事要夠簡單</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  會員按下分享時，優先叫出 LINE 的分享選單，直接勾選要傳給哪些朋友。
                  這條路走不通時會依序退回開啟 LINE 分享、使用手機內建分享，最後才是複製連結。
                  另外也產得出一張推薦 QR，現場面對面時請對方掃就好。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 獎勵怎麼設 ─────────── */}
      <section className="section-tight border-y border-ink-100 bg-white">
        <div className="container-ug">
          <div className="max-w-2xl">
            <span className="eyebrow">Rewards</span>
            <h2 className="heading-2 mt-3 text-balance">獎勵分成四份，時機不一樣</h2>
            <p className="body-base mt-4">
              很多推薦活動失敗是因為把所有獎勵綁在同一個時間點。這四份是分開設定的，
              可以只開其中一兩份。
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {rewardChannels.map((r) => {
              const Icon = r.icon;
              return (
                <article key={r.title} className="card-hover flex flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-brand-800">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="chip-ink">{r.when}</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-ink-900">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{r.desc}</p>
                </article>
              );
            })}
          </div>

          {/* 觸發時機二選一 */}
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-ink-100 bg-mist-200 p-7">
              <div className="text-[11px] font-semibold uppercase tracking-widest-2 text-ink-400">
                達標加碼獎的時機・選項一
              </div>
              <h3 className="mt-3 text-lg font-bold text-ink-900">加入就算數</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                朋友完成入會、推薦關係一綁定就計入。推薦人回饋來得快，衝人數的活動適合這個。
              </p>
            </article>
            <article className="rounded-2xl border border-brand-200 bg-brand-50 p-7">
              <div className="text-[11px] font-semibold uppercase tracking-widest-2 text-brand-700">
                達標加碼獎的時機・選項二
              </div>
              <h3 className="mt-3 text-lg font-bold text-ink-900">要真的消費過才算</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                被推薦人完成第一筆消費才計入。帶進來的是會花錢的客人，不是為了領獎而註冊的帳號。
                多數品牌我們會建議從這個開始。
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ─────────── 是會員，還不一定是好友 ─────────── */}
      <section className="section section-dark">
        <div className="container-ug relative">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow-on-dark">The detail that matters</span>
            <h2 className="heading-2 mt-3 text-white text-balance">
              朋友加入了，但還沒加你的官方帳號
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-200">
              這是推薦流程最常出事的地方，而且從畫面上完全看不出來。
              朋友點了推薦連結、填完資料，他已經是你的會員了 —— 但他不見得順手加了你的官方帳號好友。
              這種情況下發訊息給他，系統會顯示送出成功，他那邊卻什麼都沒收到。
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-200">
              我們把這件事拆成兩半處理：
              <span className="font-semibold text-white">獎勵照發，通知延後</span>。
              點數、票券、抽獎機會在他成為會員的當下就進帳，不會因為還沒加好友而卡住；
              該送給他的那則通知則先記著，等他之後真的加了好友，系統自動補送。
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { title: '資產', text: '點數、票券、抽獎機會照常入帳，不受影響。' },
                { title: '通知', text: '先記下來，等對方加好友的那一刻自動補送。' },
                { title: '結果', text: '不會有人「明明介紹成功卻沒拿到東西」。' }
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-brand-200/20 bg-white/[0.04] p-6">
                  <div className="text-sm font-bold text-white">{c.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-brand-200">{c.text}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-[0.82rem] leading-relaxed text-brand-300">
              會講這個細節，是因為它決定了推薦機制能不能長期跑下去。一個介紹了朋友卻沒拿到獎勵的老客戶，
              不會再介紹第二次。
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── 防刷 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <span className="eyebrow">Fair play</span>
              <h2 className="heading-2 mt-3 text-balance">送出去的獎勵要送對人</h2>
              <p className="body-base mt-5">
                推薦活動一旦有獎勵，就一定有人會試著鑽。這幾道防線是預設就在的，
                不用等出事了才回頭補。
              </p>
              <Link
                href={ctaHref(site.cta.primary.href, campaign, 'fair_play')}
                className="btn-outline mt-6"
              >
                討論你的獎勵設計
              </Link>
            </div>
            <ul className="grid gap-3">
              {antiAbuse.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-2.5 rounded-xl border border-ink-100 bg-mist-200 p-4 text-sm font-medium text-ink-700"
                >
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-ink-100 bg-white p-7">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <QrCode className="h-4 w-4" />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink-900">還不是會員的人也記得住</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                朋友點了推薦連結但當下沒有填完資料，這筆待綁定的關係會先留著。
                等他之後真的成為會員，推薦關係補上去，不會因為中途離開就白介紹一場。
              </p>
            </article>
            <article className="rounded-2xl border border-ink-100 bg-white p-7">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <Check className="h-4 w-4" />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink-900">看得到誰帶了誰</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                打開任何一位會員，就看得到他成功推薦幾位、累積拿過哪些獎勵，
                以及已經綁定但還在等條件成立的那幾筆。
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ─────────── 適合誰 ─────────── */}
      <section className="section-tight border-y border-ink-100 bg-white">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Who it fits</span>
            <h2 className="heading-2 mt-3 text-balance">哪些生意特別吃這一套</h2>
            <p className="body-base mt-4">
              共通點是：客人本來就會互相講。裂變做的是把那句話變成一個按得下去的連結。
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u) => (
              <article key={u.industry} className="card-hover flex flex-col p-6">
                <span className="chip-brand self-start">{u.industry}</span>
                <h3 className="mt-4 text-base font-bold text-ink-900">{u.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{u.detail}</p>
              </article>
            ))}
          </div>

          <ul className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              '新客大多來自朋友介紹的品牌',
              '廣告成本越來越高、想找別條路',
              '已經有會員與點數制度，想加一層成長',
              '辦過推薦活動但卡在對帳的店家'
            ].map((w) => (
              <li
                key={w}
                className="flex items-start gap-2.5 rounded-xl border border-ink-100 bg-mist-200 p-4 text-sm font-medium text-ink-700"
              >
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─────────── 怎麼搭 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Works with</span>
            <h2 className="heading-2 mt-3 text-balance">裂變不是單獨一個功能</h2>
            <p className="body-base mt-4">
              它要有東西可以當獎勵，也要有人在對的時間提醒會員去分享。
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedModules.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="group flex gap-3.5 rounded-2xl border border-ink-100 bg-white p-[18px] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card"
              >
                <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-brand-800 transition-colors duration-200 group-hover:border-brand-800 group-hover:bg-brand-800 group-hover:text-white">
                  <BadgeCheck className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[0.92rem] font-bold text-ink-900">{m.title}</h3>
                  <p className="mt-1 text-[0.79rem] leading-relaxed text-ink-400">{m.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section className="section-tight">
        <div className="container-ug">
          <CtaBlock
            eyebrow="推薦裂變 MGM"
            title={
              <>
                你的客人已經在幫你介紹了，
                <br className="hidden sm:block" />
                只是還沒被記下來
              </>
            }
            description="先聊聊你現在的新客大多從哪裡來、老客戶願不願意開口，我們再一起決定獎勵怎麼設、什麼時候發。"
            campaign={campaign}
            secondary={{ label: '看實際案例', href: '/cases' }}
          />
        </div>
      </section>
    </>
  );
}
