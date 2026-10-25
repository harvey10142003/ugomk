import Link from 'next/link';
import { notFound } from 'next/navigation';
import { KitImage } from '@/components/kit/KitImage';
import { KitShell, KitUnavailable } from '@/components/kit/KitShell';
import { CardActions, DeckShareActions, DmActions } from '@/components/kit/actions';
import { btnPrimary } from '@/components/kit/styles';
import { IconArrowUpRight, IconChevronRight, IconPlay } from '@/components/kit/icons';
import { fillDeckLink, findModule, loadKit, safeHttpsUrl, type KitItem } from '@/lib/kit';
import { kitCategoryOf } from '@/lib/kit-media';

/**
 * 模組頁（2026-10-25 UI v2）：上方是模組名稱、說明與「播放／傳給客戶」（最常做的事），右側主視覺；
 * 下面依序是簡報、客戶 QA（先列前幾題）、宣傳 DM、分享圖卡。沒有的那區不顯示。
 * 圖卡與 DM 在頁面上只載縮圖（next/image），下載與放大仍用原檔。
 */
export default async function KitModulePage({ params }: { params: { token: string; module: string } }) {
  const r = await loadKit(params.token);
  if (r.state === 'not_found') notFound();
  if (r.state === 'unavailable') return <KitUnavailable />;
  const mod = findModule(r.kit, params.module);
  if (!mod) notFound();

  const base = `/kit/${params.token}/${mod.slug}`;
  const of = (t: KitItem['type']) => mod.items.filter((i) => i.type === t);
  const decks = of('deck');
  const qas = of('qa');
  const dms = of('dm');
  const cards = of('card');
  const firstDeck = decks.find((d) => d.share_url) ?? decks[0] ?? null;
  const firstDeckShare = safeHttpsUrl(decks.find((d) => d.share_url)?.share_url);
  // 頁首圖：模組專屬縮圖（3:2、完整顯示）優先，沒有才用第一張圖卡／DM（取上方主視覺）
  const ownThumb = safeHttpsUrl(mod.thumbnail_url);
  const heroImg = ownThumb ?? safeHttpsUrl(cards.find((c) => safeHttpsUrl(c.file_url))?.file_url) ?? safeHttpsUrl(dms[0]?.preview_url ?? dms[0]?.file_url);
  const qaTotal = qas.reduce((s, q) => s + (q.qa?.length ?? 0), 0);

  const jump = [
    decks.length > 1 && { id: 'decks', label: '網頁簡報', n: decks.length },
    qas.length && { id: 'qa', label: '客戶 QA', n: qaTotal },
    dms.length && { id: 'dm', label: '宣傳 DM', n: dms.length },
    cards.length && { id: 'cards', label: '分享圖卡', n: cards.length },
  ].filter(Boolean) as Array<{ id: string; label: string; n: number }>;

  return (
    <KitShell backHref={`/kit/${params.token}`} backLabel="所有模組" crumb={kitCategoryOf(mod.category).label}>
      {/* 標題區：左文字與主要動作、右主視覺（手機主視覺在上、矮一點） */}
      <section className="grid gap-6 pt-5 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center lg:gap-12">
        <div className="order-2 min-w-0 lg:order-1">
          <h1 className="text-[26px] font-bold leading-tight tracking-[-0.01em] text-ink-900 sm:text-[32px]">{mod.name}</h1>
          {mod.summary && <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-500">{mod.summary}</p>}
          {firstDeck && (
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Link href={`${base}/deck/${firstDeck.id}`} className={`${btnPrimary} sm:px-5`}>
                <IconPlay className="h-4 w-4" aria-hidden="true" />
                播放簡報
              </Link>
              <DeckShareActions title={firstDeck.title} shareUrl={safeHttpsUrl(firstDeck.share_url)} />
            </div>
          )}
          {firstDeck && decks.length === 1 && (
            <p className="mt-3 text-[13px] text-ink-400">
              簡報：{firstDeck.title}・第 <span className="tabular-nums">{firstDeck.version}</span> 版。客戶只看得到這份簡報。
            </p>
          )}
          {jump.length > 1 && (
            <nav aria-label="本頁內容" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
              {jump.map((j) => (
                <a key={j.id} href={`#${j.id}`} className="text-ink-500 underline-offset-4 hover:text-ink-900 hover:underline">
                  {j.label} <span className="tabular-nums text-ink-400">{j.n}</span>
                </a>
              ))}
            </nav>
          )}
        </div>
        <div className="order-1 lg:order-2">
          <KitImage
            src={heroImg}
            alt=""
            fallbackLabel={mod.name}
            sizes="(max-width: 1023px) 100vw, 400px"
            priority
            position={ownThumb ? 'center' : 'top'}
            className={`w-full rounded-lg lg:aspect-[3/2] ${ownThumb ? 'aspect-[3/2]' : 'aspect-[16/9]'}`}
          />
        </div>
      </section>

      {mod.items.length === 0 && (
        <p className="mt-10 rounded-lg border border-dashed border-mist-400 px-4 py-5 text-[15px] text-ink-500">這個模組的素材還在準備中。</p>
      )}

      {/* 只有一份簡報時，上方標題區已經有播放與分享，不再重複一區 */}
      {decks.length > 1 && (
        <Section id="decks" title="網頁簡報" hint="自己看或投影用「播放」；給客戶請用「複製客戶連結」或「用 LINE 傳給客戶」，客戶只看得到這份簡報。">
          <ul className="divide-y divide-mist-300 rounded-lg border border-mist-300 bg-white">
            {decks.map((d) => (
              <li key={d.id} className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <p className="text-[16px] font-semibold text-ink-900">{d.title}</p>
                  {d.summary && <p className="mt-1 text-[14px] leading-relaxed text-ink-500">{d.summary}</p>}
                  <p className="mt-1 text-[13px] tabular-nums text-ink-400">第 {d.version} 版</p>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start">
                  <Link href={`${base}/deck/${d.id}`} className={btnPrimary}>
                    <IconPlay className="h-4 w-4" aria-hidden="true" />
                    播放
                  </Link>
                  <DeckShareActions title={d.title} shareUrl={safeHttpsUrl(d.share_url)} />
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {qas.length > 0 && (
        <Section id="qa" title="客戶 QA" hint="常見問題與異議處理（內部用，不要整份轉給客戶；單題回答可以複製）。">
          <div className={`grid gap-4 ${qas.length > 1 ? 'lg:grid-cols-2' : ''}`}>
            {qas.map((q) => {
              const list = q.qa ?? [];
              const ob = list.filter((x) => x.kind === 'objection').length;
              return (
                <div key={q.id} className="flex flex-col rounded-lg border border-mist-300 bg-white">
                  <div className="flex items-baseline justify-between gap-3 px-4 pt-4 sm:px-5">
                    <p className="min-w-0 text-[16px] font-semibold text-ink-900">{q.title}</p>
                    <p className="shrink-0 text-[13px] tabular-nums text-ink-400">
                      常見問題 {list.length - ob}・異議 {ob}
                    </p>
                  </div>
                  <ul className={`mt-2 grid px-4 sm:px-5 ${qas.length > 1 ? '' : 'lg:grid-cols-2 lg:gap-x-10'}`}>
                    {list.slice(0, qas.length > 1 ? 4 : 6).map((p, i) => (
                      <li key={i} className="border-b border-mist-200 py-2.5 text-[15px] leading-relaxed text-ink-700">
                        {p.q}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`${base}/qa/${q.id}`}
                    className="mt-auto flex min-h-[48px] items-center justify-between gap-2 border-t border-mist-300 px-4 text-[14px] font-medium text-ink-900 transition-colors hover:bg-mist-100 sm:px-5"
                  >
                    看全部 {list.length} 題與建議回答
                    <IconChevronRight className="h-4 w-4 text-ink-400" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {dms.length > 0 && (
        <Section id="dm" title="宣傳 DM" hint="一頁式宣傳單，可以下載後傳給客戶或印出來。">
          <ul className="grid gap-4">
            {dms.map((d) => {
              const main = safeHttpsUrl(d.file_url);
              if (!main) return null;
              const pdf = d.file_kind === 'pdf' ? main : null;
              const png = d.file_kind === 'pdf' ? safeHttpsUrl(d.preview_url) : main;
              return (
                <li key={d.id} className="flex flex-col overflow-hidden rounded-lg border border-mist-300 bg-white sm:flex-row">
                  {png ? (
                    <a href={png} target="_blank" rel="noopener noreferrer" className="group relative block shrink-0 sm:w-[260px] lg:w-[300px]" aria-label={`開新分頁看原圖：${d.title}`}>
                      <KitImage src={png} alt={d.title} sizes="(max-width: 639px) 100vw, 300px" className="aspect-[1240/1754] w-full" />
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded bg-ink-900/85 px-2 py-1 text-[12px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                        看原圖
                        <IconArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </a>
                  ) : (
                    <KitImage src={null} alt={d.title} sizes="1px" className="aspect-[1240/1754] w-full shrink-0 sm:w-[260px] lg:w-[300px]" />
                  )}
                  <div className="flex flex-1 flex-col gap-3 p-4 sm:p-6">
                    <div>
                      <p className="text-[16px] font-semibold text-ink-900">{d.title}</p>
                      {d.summary && <p className="mt-1 text-[14px] leading-relaxed text-ink-500">{d.summary}</p>}
                      <p className="mt-2 text-[14px] leading-relaxed text-ink-500">
                        {pdf ? 'PDF 適合列印或寄送；圖片適合直接傳 LINE。' : '圖片可以直接傳 LINE 或印出來。'}點縮圖可以看原圖。
                      </p>
                    </div>
                    <div>
                      <DmActions pdfUrl={pdf} pngUrl={png} baseName={`${mod.slug}-dm`} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {cards.length > 0 && (
        <Section id="cards" title="分享圖卡" hint="下載圖卡，搭配文案傳到 LINE 或社群；文案裡已經帶好簡報的客戶分享連結。">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c, i) => {
              const url = safeHttpsUrl(c.file_url);
              if (!url) return null;
              const text = fillDeckLink(c.share_text || '', firstDeckShare);
              return (
                <li key={c.id} className="flex flex-col overflow-hidden rounded-lg border border-mist-300 bg-white">
                  <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`開新分頁看原圖：${c.title}`} className="block">
                    <KitImage src={url} alt={c.title} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 46vw, 370px" className="aspect-[4/5] w-full" />
                  </a>
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <p className="text-[15px] font-semibold text-ink-900">{c.title}</p>
                    {text && <p className="whitespace-pre-line break-words rounded-md bg-mist-100 p-3 text-[14px] leading-relaxed text-ink-700">{text}</p>}
                    <div className="mt-auto">
                      <CardActions title={c.title} shareText={text} imageUrl={url} filename={`${mod.slug}-card-${i + 1}.png`} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </KitShell>
  );
}

function Section({ id, title, hint, children }: { id: string; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-4 sm:mt-16" aria-labelledby={`${id}-h`}>
      <div className="mb-4">
        <h2 id={`${id}-h`} className="text-[20px] font-bold text-ink-900">
          {title}
        </h2>
        {hint && <p className="mt-1 max-w-3xl text-[14px] leading-relaxed text-ink-500">{hint}</p>}
      </div>
      {children}
    </section>
  );
}
