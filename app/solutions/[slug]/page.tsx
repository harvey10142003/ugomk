import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CircleCheck } from 'lucide-react';
import { crmModules, siteModuleGroups } from '@/lib/data/modules';
import { moduleDemos } from '@/lib/data/module-demos';
import { ModuleDemo } from '@/components/ModuleDemo';
import { moduleDetails } from '@/lib/data/module-details';
import { site } from '@/lib/data/site';
import { CtaBlock } from '@/components/CtaBlock';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd } from '@/lib/jsonld';
import { pageMeta } from '@/lib/seo';
import { ctaHref } from '@/lib/site-source';

type Props = { params: { slug: string } };

/** 只有官網展示的模組才有說明頁；其餘 slug 一律 404，不要生出空殼頁面 */
export function generateStaticParams() {
  return Object.keys(moduleDetails).map((slug) => ({ slug }));
}

/**
 * ⚠️ 這一行是必要的，不是效能微調。
 *
 * `/solutions` 底下除了這支動態路由，還有 loyalty / marketing-automation / referral
 * 三個實體資料夾。預設 `dynamicParams = true` 時，`next start` 會把「不在
 * generateStaticParams 裡的 slug」當成可以隨選渲染的路徑接下來 ——
 * 包含那三個。它們在這裡查不到 moduleDetails，於是 notFound()，
 * 而這個 404 結果會被寫回 `.next/server/app/solutions/<name>.html`，
 * **蓋掉 build 時已經產好的靜態頁**。症狀是第一次開得起來、之後全部變 404，
 * 而且 build log 完全正常（那三頁確實有被 prerender）。
 *
 * 關掉 dynamicParams 之後，沒列在 generateStaticParams 裡的 slug 不再由這支路由接管，
 * 實體資料夾的頁面才拿得到自己的網址。對既有 19 個模組頁沒有任何影響：
 * 它們本來就全部列在 generateStaticParams 裡，未知 slug 的結果也一樣是 404。
 */
export const dynamicParams = false;

/**
 * ⚠️ SERP 標題與畫面標題是兩件事。
 *
 * 這裡原本是 `${mod.title}｜${detail.tagline}`，接上 layout 的「｜宇果國際行銷」之後
 * 全形早就超過 30 字，Google 截斷的位置正好把站名吃掉 —— 19 個模組頁沒有一頁在
 * 搜尋結果上秀得出品牌。而且 tagline 講的是體感（「一台平板做完」），不是有人
 * 真的會去搜的字，所以連截斷之前那段也接不到流量。
 *
 * 解法是讓 seoTitle / seoDescription 獨立於畫面文案：tagline 繼續當 H1 副標不動，
 * 沒填 seo 欄位的模組自動退回原本的組法，不會有頁面因為漏填就沒有 metadata。
 */
export function generateMetadata({ params }: Props): Metadata {
  const detail = moduleDetails[params.slug];
  const mod = crmModules.find((m) => m.id === params.slug);
  if (!detail || !mod) return {};
  return pageMeta({
    path: `/solutions/${params.slug}`,
    title: detail.seoTitle ?? `${mod.title}｜${detail.tagline}`,
    description: detail.seoDescription ?? detail.intro
  });
}

export default function ModulePage({ params }: Props) {
  const detail = moduleDetails[params.slug];
  const mod = crmModules.find((m) => m.id === params.slug);
  if (!detail || !mod) notFound();

  const Icon = mod.icon;
  const demo = moduleDemos[params.slug];
  const group = siteModuleGroups.find((g) => g.key === mod.site);
  const siblings = (group?.modules ?? []).filter((m) => m.id !== mod.id).slice(0, 6);
  /* 19 個模組頁共用這支模板，source 帶上 slug 才知道是哪個模組產出的詢問 */
  const source = `solutions_${params.slug}`;

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: '首頁', path: '/' },
          { name: '解決方案', path: '/solutions' },
          { name: mod.title, path: `/solutions/${params.slug}` }
        ])}
      />

      {/* ─────────── Hero ─────────── */}
      <section className="hero-bg relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-ug relative">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 transition-colors hover:text-brand-800"
          >
            <ArrowLeft className="h-4 w-4" />
            所有模組
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-800 text-white">
              {Icon ? <Icon className="h-7 w-7" /> : null}
            </span>
            <div>
              <div className="text-sm font-bold text-brand-700">{group?.label}</div>
              <h1 className="heading-1 mt-1">{mod.title}</h1>
            </div>
          </div>

          <p className="mt-6 text-lg font-bold text-brand-800 md:text-xl">{detail.tagline}</p>
          <p className="body-lg mt-4 max-w-3xl">{detail.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href={ctaHref(site.cta.primary.href, source, 'hero')} className="btn-brand">
              詢問這個模組
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="btn-outline">
              查看費用方案
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────── 互動 demo ─────────── */}
      {demo ? (
        <section className="section-tight">
          <div className="container-ug">
            <div className="max-w-2xl">
              <h2 className="heading-2">{demo.title}</h2>
              <p className="body-base mt-4">{demo.intro}</p>
            </div>
            <div className="mt-12">
              <ModuleDemo demo={demo} />
            </div>
          </div>
        </section>
      ) : null}

      {/* ─────────── 可以做到什麼 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="max-w-2xl">
            <h2 className="heading-2">這個模組可以做到什麼</h2>
            <p className="body-base mt-4">
              以下每一項都是系統裡實際存在的功能，不是規劃中的項目。
            </p>
          </div>

          {/*
            2026-09-28：原本是「圓底勾勾圖示＋標題＋說明」的等大卡片三欄（10 張長得一模一樣、最後一張落單），
            改成兩欄的細線清單 —— 功能是並列的，沒有順序，所以不編號、不配圖示。
          */}
          <dl className="mt-12 grid border-t border-ink-100 md:grid-cols-2 md:gap-x-14">
            {detail.features.map((f) => (
              <div key={f.title} className="border-b border-ink-100 py-5">
                <dt className="text-base font-bold text-ink-900">{f.title}</dt>
                <dd className="mt-1.5 text-[0.95rem] leading-[1.8] text-ink-500">{f.description}</dd>
              </div>
            ))}
          </dl>

          {detail.note ? (
            <div className="mt-10 border-l-2 border-brand-300 pl-5">
              <div className="text-sm font-bold text-brand-800">搭配說明</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{detail.note}</p>
            </div>
          ) : null}
        </div>
      </section>

      {/* ─────────── 適合誰 ─────────── */}
      <section className="section-tight border-y border-ink-100 bg-white">
        <div className="container-ug grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="heading-2">這個模組適合誰</h2>
            <p className="body-base mt-4">
              不確定自己適不適合？把現在的流程講一遍，我們幫你判斷要不要開這個模組。
            </p>
            <Link href={ctaHref(site.cta.primary.href, source, 'for_who')} className="btn-outline mt-6">
              預約需求討論
            </Link>
          </div>
          <ul className="border-t border-ink-100">
            {detail.forWho.map((w) => (
              <li key={w} className="flex items-start gap-3 border-b border-ink-100 py-4 text-base text-ink-700">
                <CircleCheck className="mt-1 h-4 w-4 shrink-0 text-brand-600" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─────────── 同組其他模組 ─────────── */}
      {siblings.length ? (
        <section className="section">
          <div className="container-ug">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="heading-2">同一組的其他模組</h2>
              </div>
              <Link href="/solutions" className="btn-ghost">
                看全部模組
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((m) => {
                const SibIcon = m.icon;
                return (
                  <Link
                    key={m.id}
                    href={`/solutions/${m.id}`}
                    className="group flex gap-3.5 rounded-2xl border border-ink-100 bg-white p-[18px] transition-colors duration-200 hover:border-brand-400"
                  >
                    <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-brand-800 transition-colors duration-200 group-hover:border-brand-800 group-hover:bg-brand-800 group-hover:text-white">
                      {SibIcon ? <SibIcon className="h-5 w-5" /> : null}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[0.92rem] font-bold text-ink-900">{m.title}</h3>
                      <p className="mt-1 text-[0.79rem] leading-relaxed text-ink-400">{m.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* ─────────── CTA ─────────── */}
      <section className="section-tight">
        <div className="container-ug">
          <CtaBlock
            title={`想知道${mod.title}接進你的流程會長怎樣？`}
            description="先聊聊現在怎麼做、卡在哪裡，我們再判斷這個模組要不要開、怎麼設定。"
            source={source}
            secondary={{ label: '看實際案例', href: '/cases' }}
          />
        </div>
      </section>
    </>
  );
}
