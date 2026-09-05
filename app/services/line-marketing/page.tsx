import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, Map, CheckCircle2 } from 'lucide-react';
import { ChatFlowMock } from '@/components/mocks/ChatFlowMock';
import { navigationSteps, planningProcess } from '@/lib/data/services';
import { site } from '@/lib/data/site';
import { RelatedServices } from '@/components/RelatedServices';
import { CtaBlock } from '@/components/CtaBlock';
import { JsonLd } from '@/components/JsonLd';
import { serviceLd, breadcrumbLd } from '@/lib/jsonld';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  path: '/services/line-marketing',
  title: 'LINE@ 行銷規劃｜導航式行銷，用 LINE 自動帶路到成交',
  description:
    '不用追著客戶跑。導航式行銷用六個步驟規劃從陌生好友到回頭客的路徑：加入、互動、信任、引導、成交、裂變，並落實到圖文選單、標籤與自動化設定。'
});

export default function LineMarketingPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: 'LINE@ 行銷規劃',
            description:
              '用導航六步法規劃好友從加入、互動、信任、引導、成交到裂變的路徑，並落實到圖文選單、標籤與自動跟進的實際設定。',
            path: '/services/line-marketing',
            serviceType: 'LINE 官方帳號行銷規劃與導入顧問'
          }),
          breadcrumbLd([
            { name: '首頁', path: '/' },
            { name: '解決方案', path: '/solutions' },
            { name: 'LINE@ 行銷規劃', path: '/services/line-marketing' }
          ])
        ]}
      />

      {/* ─────────── Hero ─────────── */}
      <section className="hero-bg relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 dot-grid-fade pointer-events-none" />
        <div className="container-ug relative grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div>
            <span className="chip-brand">
              <Compass className="h-3 w-3" />
              LINE@ 行銷規劃
            </span>
            <h1 className="heading-1 mt-6 text-balance">
              不用追著客戶跑，
              <br />
              用 LINE <span className="text-gradient-brand">自動帶路到成交</span>
            </h1>
            <p className="body-lg mt-7 max-w-xl">
              多數人的 LINE@ 停在無差別群發與折扣轟炸，效果越做越差。導航式行銷把好友從加入到回購的路徑先規劃出來，再讓系統在每個關鍵時刻自動給出下一步。
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={site.cta.primary.href} className="btn-brand">
                預約規劃討論
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/solutions" className="btn-outline">
                看系統能做到什麼
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-brand-100/50 via-mint-100/40 to-transparent blur-3xl" />
            <div className="relative">
              <ChatFlowMock />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 地圖 vs 導航 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Map or navigation</span>
            <h2 className="heading-2 mt-3 text-balance">你的 LINE@ 是「地圖」還是「導航」？</h2>
            <p className="body-base mt-4">同樣是要到目的地，兩者的差別在於有沒有人告訴你下一步該轉哪裡。</p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <article className="card p-8">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink-100 text-ink-500">
                <Map className="h-5 w-5" />
              </span>
              <h3 className="heading-3 mt-5">靜態地圖</h3>
              <p className="mt-2 text-sm font-semibold text-ink-400">傳統做法</p>
              <p className="body-base mt-4">
                資訊給得很多，但顧客得自己研究、自己找路，一不小心就走錯方向。這也是為什麼群發訊息的開封率一路往下掉。
              </p>
              <ul className="mt-6 space-y-2 text-sm text-ink-500">
                {['所有人收到一樣的訊息', '不知道誰有興趣、誰只是路過', '推播效果只能事後猜'].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-300" />
                    {t}
                  </li>
                ))}
              </ul>
            </article>

            <article className="card border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 shadow-brand">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-800 text-white">
                <Compass className="h-5 w-5" />
              </span>
              <h3 className="heading-3 mt-5">動態導航</h3>
              <p className="mt-2 text-sm font-semibold text-brand-700">導航式行銷</p>
              <p className="body-base mt-4">
                替顧客規劃從陌生好友到回頭客的路徑，並在每個關鍵時刻自動給出最合適的下一步，讓他自己走到成交。
              </p>
              <ul className="mt-6 space-y-2 text-sm text-ink-600">
                {['依標籤與行為分眾發送', '互動過的人才收到優惠', '每一步都留下可追蹤的紀錄'].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center">
            <div className="text-[11px] font-semibold uppercase tracking-widest-2 text-brand-700">目標</div>
            <p className="mt-2 text-base font-bold text-ink-900">
              打造一座自動化的私域流量池，讓顧客願意跟著指引一步步完成購買，甚至替你帶來新客人。
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── 六步法 ─────────── */}
      <section className="section section-dark">
        <div className="container-ug relative">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow-on-dark">Six steps</span>
            <h2 className="heading-2 mt-3 text-white text-balance">導航六步法</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-200">
              這套系統的核心路徑，就是這六個關鍵步驟。每一步都有要達成的目標，也有做得出來的東西。
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {navigationSteps.map((s) => (
              <article
                key={s.no}
                className="rounded-2xl border border-brand-200/20 bg-white/[0.04] p-7 transition-colors duration-300 hover:border-brand-200/45 hover:bg-white/[0.07]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 font-mono text-sm font-extrabold text-brand-900">
                    {s.no}
                  </span>
                  <div>
                    <div className="text-base font-bold text-white">{s.title}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest-2 text-brand-300">
                      {s.en}
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-sm font-semibold text-brand-100">{s.goal}</p>
                <p className="mt-2 text-sm leading-relaxed text-brand-200">{s.detail}</p>
                <div className="mt-5 border-t border-brand-200/15 pt-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest-2 text-brand-300">
                    這一步交付
                  </div>
                  <p className="mt-1 text-xs text-brand-100">{s.deliver}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 合作方式 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">How we work</span>
            <h2 className="heading-2 mt-3 text-balance">我們怎麼陪你做這件事</h2>
            <p className="body-base mt-4">
              規劃不是給你一份簡報就結束，要能落到實際的設定與腳本上。
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {planningProcess.map((p) => (
              <article key={p.step} className="card-hover p-7">
                <div className="font-mono text-sm font-bold text-brand-600">{p.step}</div>
                <h3 className="mt-3 text-base font-bold text-ink-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{p.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-ink-100 bg-mist-200 p-7 text-center">
            <p className="body-base">
              規劃出來的每一步，都能用{' '}
              <Link href="/solutions" className="font-bold text-brand-800 underline decoration-brand-300 underline-offset-4">
                UGO AI CRM
              </Link>{' '}
              的標籤、自動化與推薦機制直接執行，不用另外找工具拼湊。
            </p>
          </div>
        </div>
      </section>

      <RelatedServices current="/services/line-marketing" />

      {/* ─────────── CTA ─────────── */}
      <section className="section-tight">
        <div className="container-ug">
          <CtaBlock
            title="先看看你的 LINE@ 卡在哪一步"
            description="把現在的好友數、經營方式與最想改善的問題講一遍，我們幫你判斷該從六步裡的哪一步開始。"
            secondary={{ label: '看實際案例', href: '/cases' }}
          />
        </div>
      </section>
    </>
  );
}
