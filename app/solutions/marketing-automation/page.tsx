import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  Cake,
  Check,
  CheckCircle2,
  CircleCheck,
  Clock,
  Coins,
  Filter,
  ListChecks,
  Send,
  ShoppingBag,
  Tag,
  Ticket,
  Trophy,
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
 * 行銷自動化是首頁賣最兇的能力（見 docs/copy-rewrite-2026-07.md 的「行銷自動化區塊」），
 * 卻沒有自己的頁面 —— `marketing_automation` 在 lib/data/modules.ts 裡沒有 `site` 標記，
 * `/solutions/[slug]` 生不出它。而「LINE 行銷自動化系統 / 分眾推播」的搜尋結果前段
 * 是六篇競品部落格文章，一個產品頁都沒有。
 *
 * ## 內容出處
 *
 * 引擎：`apps/api/src/lib/ma-engine.ts`（1913 行）。後台設定頁：
 * `apps/admin/src/app/dashboard/modules/marketing-automation/rules/`。說明書：
 * `apps/admin/docs/help/system/06-marketing-tasks.md`。
 *
 *  - 觸發條件清單：新增劇本下拉 `_RuleForm.tsx:159-175`（16 項）與模組限定
 *    `_RuleForm.tsx:185-223`（客戶歷程 / 餐飲訂位 / 線上簽約）；引擎判定見
 *    ma-engine.ts:595-624（即時型）與 1591-1776（每日掃描型）
 *  - 動作 6 種：ma-engine.ts:264-556（send_notification / issue_voucher / add_tag /
 *    add_points / grant_lottery_chance / set_stage）
 *  - 獎勵可改發給推薦人：ma-engine.ts:63-70, 193-260（action.target = 'referrer'）
 *  - 篩選條件：memberMatchesFilter ma-engine.ts:567-593（等級、必須有標籤、排除標籤，
 *    三者都是 AND）；適用分店是另一套 ma_rules.store_id（ma-engine.ts:1230-1254）
 *  - 延遲執行：resolveDelayMs ma-engine.ts:91-100（天/時/分，上限 90 天）+
 *    dispatchScheduledActions ma-engine.ts:906-1055（派送前重查條件與黑名單）
 *  - 啟用前預估人數：previewScanForRule ma-engine.ts:1858-1913 +
 *    `_RuleForm.tsx:1393-1423` 的二次確認流程
 *  - 執行紀錄：ma_rule_runs，8 種狀態（computeOverallRunStatus ma-engine.ts:716-724），
 *    後台「執行紀錄」頁籤
 *  - 分眾推播（挑收件人的群發）：這是另一個功能，countBroadcastAudience
 *    `apps/api/src/lib/broadcast.ts:134-178`，可依群組 / 等級 / 標籤篩，送出前算得出人數
 *  - 圖文選單依等級切換：rich-menu-rules.ts:56-84，也是獨立機制不是劇本
 *  - 問卷答案自動貼標籤：survey.ts:318-336，貼完會 fireTrigger('tag_added') 接下一段
 *
 * ## 刻意沒有寫的
 *
 *  - 成效統計 / 開封率 / 轉換率 / ROI 儀表板：只有逐筆執行紀錄，沒有任何彙總報表
 *  - A/B 測試、OR 條件、多變量篩選：memberMatchesFilter 只有三個欄位而且全是 AND
 *  - 「篩選條件可依分店」：分店隔離走 ma_rules.store_id，不在 filter_conditions 裡，
 *    寫成「可依分店篩選會員」會是錯的
 *  - lead_created（官網表單提交）：引擎 fire 得出來，但後台沒有對應的設定入口，客戶設不了
 *  - 「久未回訪」的持續提醒：只發一次，說明書明載目前沒有這個選項
 */
export const metadata: Metadata = pageMeta({
  path: '/solutions/marketing-automation',
  title: 'LINE 行銷自動化與分眾推播',
  description:
    'LINE 行銷自動化：設定「什麼情況發生，系統就做什麼」。生日、消費後、久未回訪、點數達標、票券快到期自動推播、發券、加點與貼標籤，訊息只發給符合條件的會員，不用每次群發全部好友。',
  keywords: [
    'LINE 行銷自動化',
    'LINE 分眾推播',
    'LINE 自動推播',
    'LINE 官方帳號自動化',
    '會員自動行銷',
    'LINE 訊息費'
  ]
});

/** 觸發條件 —— 依照後台「新增劇本」實際列得出來的項目分組 */
const triggerGroups = [
  {
    icon: ShoppingBag,
    label: '消費之後',
    items: [
      '訂單付款完成',
      '訂單結束完成',
      '這位會員的第一筆消費',
      '單筆消費滿指定金額',
      '累積消費達到門檻',
      '預約完成'
    ]
  },
  {
    icon: Cake,
    label: '時間到了',
    items: ['生日當月', '生日前指定天數', '距離上次消費滿 N 天', '票券到期前 N 天']
  },
  {
    icon: Tag,
    label: '會員資料變了',
    items: ['被貼上指定標籤', '被移到指定群組', '填完必填欄位', '會員等級變動']
  },
  {
    icon: Coins,
    label: '點數與票券',
    items: ['點數累積到指定門檻', '票券被核銷', '指定的那張票券被核銷']
  }
];

const moduleTriggers = [
  { label: '客戶歷程', items: ['被移到指定階段', '卡在同一階段超過 N 天'] },
  { label: '餐飲訂位', items: ['建立訂位', '確認訂位', '取消訂位', '訂位未到店'] },
  { label: '線上簽約', items: ['文件全部簽署完成'] }
];

const actions = [
  { icon: Send, title: '推播訊息', desc: '可以挑既有範本，也可以現寫。一次最多五則，文字、圖片、影片與多頁圖卡都可以。' },
  { icon: Ticket, title: '發放票券', desc: '直接發一張票券到會員的 LINE 會員卡裡，同時推一張通知卡告訴他拿到了什麼。' },
  { icon: Coins, title: '加點數', desc: '自動加點並寫進點數紀錄，會員在 LINE 裡查得到這筆是怎麼來的。' },
  { icon: Tag, title: '貼標籤', desc: '自動分類會員。貼上去的標籤本身又可以是下一條劇本的觸發條件。' },
  { icon: Trophy, title: '發抽獎機會', desc: '一次發一到五十次抽獎機會，適合把回購動機做成活動而不是折扣。' },
  { icon: Users, title: '獎勵改發給推薦人', desc: '每個動作都可以選擇對象是「這位會員」還是「介紹他來的那位」，做推薦回饋不用另外寫一套。' }
];

const useCases = [
  {
    industry: '餐飲',
    title: '吃過一次就不見的客人',
    detail: '設一條「距離上次消費滿 60 天」的劇本，自動發一張回店折抵券。不用每個月人工撈名單。'
  },
  {
    industry: '美業',
    title: '課程做完的下一次',
    detail: '預約完成後隔幾天自動發關懷訊息，順便提醒該回來保養了。延遲天數自己設，最長 90 天。'
  },
  {
    industry: '零售',
    title: '票券快過期沒人用',
    detail: '票券到期前幾天自動提醒持有的人，把已經發出去卻躺著的券變成實際回店。'
  },
  {
    industry: '課程與活動',
    title: '填完問卷自動分流',
    detail: '問卷答案自動貼上標籤，被貼上標籤又觸發下一條劇本，不同興趣的人收到不同內容。'
  }
];

const relatedModules = [
  {
    href: '/solutions/loyalty',
    title: '會員集點與票券',
    desc: '劇本要發的點數與票券從這裡來。沒有點數票券，自動化就只剩下發訊息。'
  },
  {
    href: '/solutions/referral',
    title: '推薦裂變 MGM',
    desc: '每個動作都能改成發給推薦人，推薦達標自動加碼的獎勵就是這樣設的。'
  },
  {
    href: '/solutions/ai_customer_service',
    title: 'AI 客服',
    desc: '自動推播負責主動找人，AI 客服負責接住回訊息的人，兩邊用同一份會員資料。'
  },
  {
    href: '/solutions/game_community',
    title: '社群與遊戲化',
    desc: '打卡、任務與等級的獎勵可以交給劇本發，不用在活動模組裡再寫一次發獎邏輯。'
  },
  {
    href: '/solutions/website',
    title: '官網建置',
    desc: '官網表單收到的名單直接進同一份會員資料，後續跟進走同一套標籤與劇本。'
  },
  {
    href: '/services/line-marketing',
    title: 'LINE@ 行銷規劃',
    desc: '不知道該設哪幾條劇本？先把客戶從加入到回購的路徑規劃出來，再決定哪一段要自動化。'
  }
];

export default function MarketingAutomationPage() {
  const campaign = 'solutions_marketing_automation';

  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: 'LINE 行銷自動化與分眾推播',
            description:
              '以「觸發條件與動作」設定會員自動跟進：生日、消費後、久未回訪、點數達標與票券到期自動推播、發券、加點與貼標籤，並可依會員等級與標籤篩選收件人。',
            path: '/solutions/marketing-automation',
            serviceType: 'LINE 行銷自動化導入'
          }),
          breadcrumbLd([
            { name: '首頁', path: '/' },
            { name: '解決方案', path: '/solutions' },
            { name: '行銷自動化', path: '/solutions/marketing-automation' }
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

          <span className="eyebrow mt-8 block">LINE 行銷自動化・分眾推播</span>
          <h1 className="heading-1 mt-4 text-balance">
            設定一次，
            <br />
            該做的會員跟進<span className="text-gradient-brand">自動完成</span>
          </h1>
          <p className="body-lg mt-7 max-w-2xl">
            行銷自動化不是一直傳訊息，而是在適合的時間，對適合的會員說適合的話。
            你設定的是「什麼情況發生，系統就做什麼」，之後不用再記得誰該收到什麼。
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
            {['只發給符合條件的人', '延遲最長 90 天', '啟用前先算人數'].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 解決什麼問題 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">The problem</span>
            <h2 className="heading-2 mt-3 text-balance">不是訊息發得不夠多，是每一則都發給同一群人</h2>
            <p className="body-base mt-4">
              好友數成長之後，人工跟進就開始失效。真正漏掉的往往是最該被聯繫的那幾位。
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                title: '每次推播都發給所有人',
                text: '訊息費隨好友數增加，效果卻不一定提升。發太頻繁還會被封鎖，於是變得不敢發，久了整個帳號就沉了。'
              },
              {
                title: '該跟進的事沒人記得',
                text: '生日、預約前一天、消費滿三個月、票券快到期。每一件單獨看都不難，加起來就沒有人做得完。'
              },
              {
                title: '活動辦完名單就冷掉',
                text: '辛苦收來的名單躺在系統裡，沒有下一步。三個月後再想起他們的時候，人已經想不起你是誰。'
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

      {/* ─────────── 運作模型 ─────────── */}
      <section className="section-tight border-y border-ink-100 bg-white">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">How it works</span>
            <h2 className="heading-2 mt-3 text-balance">一條劇本只有四個欄位</h2>
            <p className="body-base mt-4">
              整套自動化就是這四件事。看得懂這四格，你就知道自己的店該設哪幾條。
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              { icon: Bell, step: '01', title: '什麼情況', text: '生日、消費、久未回訪、點數達標、票券到期。' },
              { icon: Filter, step: '02', title: '發給誰', text: '再依會員等級、必須有的標籤、要排除的標籤縮小範圍。' },
              { icon: Clock, step: '03', title: '什麼時候', text: '立刻，或等幾分鐘、幾小時、幾天再送，最長 90 天。' },
              { icon: ListChecks, step: '04', title: '做什麼', text: '推播、發券、加點、貼標籤、發抽獎機會，可以一次設多個。' }
            ].map((s) => {
              const Icon = s.icon;
              return (
                <article key={s.step} className="card-hover p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-brand-800">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs font-bold text-ink-300">{s.step}</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-ink-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.text}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-16">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Walk through</span>
              <h2 className="heading-3 mt-3 text-balance">{solutionDemos['marketing-automation'].title}</h2>
              <p className="body-base mt-4">{solutionDemos['marketing-automation'].intro}</p>
            </div>
            <div className="mt-12">
              <ModuleDemo demo={solutionDemos['marketing-automation']} />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 觸發條件清單 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="max-w-2xl">
            <span className="eyebrow">Triggers</span>
            <h2 className="heading-2 mt-3 text-balance">可以拿來當觸發條件的事</h2>
            <p className="body-base mt-4">
              下面每一項都在後台「新增劇本」的下拉選單裡選得到，不是規劃中的項目。
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {triggerGroups.map((g) => {
              const Icon = g.icon;
              return (
                <article key={g.label} className="card-hover p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-brand-800">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-bold text-ink-900">{g.label}</h3>
                  </div>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {g.items.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm leading-relaxed text-ink-500">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-ink-100 bg-mist-200 p-6 md:p-7">
            <div className="text-[11px] font-semibold uppercase tracking-widest-2 text-ink-400">
              有開對應模組才會出現
            </div>
            <div className="mt-4 grid gap-5 sm:grid-cols-3">
              {moduleTriggers.map((m) => (
                <div key={m.label}>
                  <div className="text-sm font-bold text-ink-900">{m.label}</div>
                  <ul className="mt-2 space-y-1.5">
                    {m.items.map((t) => (
                      <li key={t} className="text-[0.82rem] leading-relaxed text-ink-500">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 動作清單 ─────────── */}
      <section className="section-tight border-y border-ink-100 bg-white">
        <div className="container-ug">
          <div className="max-w-2xl">
            <span className="eyebrow">Actions</span>
            <h2 className="heading-2 mt-3 text-balance">條件成立之後，系統可以做的事</h2>
            <p className="body-base mt-4">
              一條劇本可以同時設好幾個動作。發訊息只是其中一種，很多時候發一張票券比講十句話有用。
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {actions.map((a) => {
              const Icon = a.icon;
              return (
                <article key={a.title} className="card-hover p-7">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink-900">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{a.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── 為什麼省訊息費 ─────────── */}
      <section className="section section-dark">
        <div className="container-ug relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
            <div>
              <span className="eyebrow-on-dark">Cost</span>
              <h2 className="heading-2 mt-3 text-white text-balance">
                為什麼這比每個月群發一次省
              </h2>
              <p className="mt-5 text-base leading-relaxed text-brand-200">
                LINE 官方帳號的訊息費是按則數算的。三千位好友群發一次，就是三千則；
                同一份預算，如果只發給兩百多位真的符合條件的人，剩下的額度可以拿去多做幾次跟進。
              </p>
              <p className="mt-4 text-base leading-relaxed text-brand-200">
                更重要的是另一件事：無差別群發會讓不相關的人陸續封鎖你，
                之後就算發了對的內容，也已經送不到他手上。少發、發對，帳號才活得久。
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  '劇本只打中符合條件的會員，不是整份好友名單',
                  '啟用前先算給你看這條會打到幾位，不是啟用後才知道',
                  '排程送出前會重新確認條件與黑名單，中途不符合的就不送'
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-brand-100">
                    <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-brand-200/20 bg-white/[0.04] p-7 md:p-8">
              <div className="text-[11px] font-semibold uppercase tracking-widest-2 text-brand-300">
                兩件事要分清楚
              </div>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white">自動化劇本</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-200">
                    設定一次，之後由事件觸發。生日到了、九十天沒來、票券快過期，系統自己找出人並執行。
                    你不用挑名單，也不用記得今天是誰的生日。
                  </p>
                </div>
                <div className="h-px bg-brand-200/20" />
                <div>
                  <h3 className="text-base font-bold text-white">分眾群發</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-200">
                    這次就要發的訊息，依群組、會員等級或標籤挑收件人。送出前算得出總人數，
                    以及其中還在好友名單裡的有幾位 —— 已封鎖的人再怎麼發也收不到。
                  </p>
                </div>
              </div>
              <p className="mt-6 text-[0.82rem] leading-relaxed text-brand-300">
                兩個是不同的功能，用途也不同。臨時檔期的活動用分眾群發，
                每天都該發生的跟進交給劇本，不要用群發去補人工的缺口。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 適合誰 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Who it fits</span>
            <h2 className="heading-2 mt-3 text-balance">同行通常從這幾條開始設</h2>
            <p className="body-base mt-4">
              不用一次設十條。先挑一條你現在靠人記、而且常常忘記的事，交給系統做。
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

          {/*
            誠實地講限制比多列一個賣點值錢：
            no_purchase_days 只在跨過門檻那次發一次，說明書明載目前沒有持續提醒的選項。
            官網先說清楚，總比業務在現場被問倒好。
          */}
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <div className="text-[11px] font-semibold uppercase tracking-widest-2 text-brand-700">
              先說清楚的一件事
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              「距離上次消費滿 N 天」這類條件，是在會員跨過那個天數的那一次觸發，發一次。
              如果你要的是持續每個月提醒一次，做法會不一樣，導入時我們會依你的情況一起設計。
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              '好友數成長到人工跟不上的品牌',
              '訊息費一直增加、成效卻沒變好',
              '有生日禮、回購券這類固定活動',
              '多分店，想讓每間店各自跑自己的劇本'
            ].map((w) => (
              <div
                key={w}
                className="flex items-start gap-2.5 rounded-xl border border-ink-100 bg-mist-200 p-4 text-sm font-medium text-ink-700"
              >
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                {w}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 怎麼搭 ─────────── */}
      <section className="section-tight border-t border-ink-100 bg-white">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Works with</span>
            <h2 className="heading-2 mt-3 text-balance">自動化要有東西可以發</h2>
            <p className="body-base mt-4">
              劇本負責決定「誰、什麼時候」，內容則來自其他模組。兩邊接起來才是完整的一次跟進。
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

          <p className="mt-10 text-center text-sm text-ink-500">
            另外，圖文選單本身也可以依會員等級、群組或標籤顯示不同版本，
            讓不同的人打開 LINE 看到不一樣的入口 —— 那是獨立的設定，不需要寫劇本。
          </p>
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section className="section-tight">
        <div className="container-ug">
          <CtaBlock
            eyebrow="行銷自動化"
            title={
              <>
                先挑一件你常忘記的事，
                <br className="hidden sm:block" />
                交給系統做
              </>
            }
            description="把現在靠人記的跟進講一遍，我們幫你判斷哪幾條設起來最有感，以及設完之後訊息費會怎麼變。"
            campaign={campaign}
            secondary={{ label: '看導航六步法', href: '/services/line-marketing' }}
          />
        </div>
      </section>
    </>
  );
}
