/* eslint-disable @next/next/no-img-element -- 圖卡／DM 是 R2 公開網址，用原生 img（不走 next/image 的遠端白名單與最佳化） */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, FileText, MessageCircleQuestion, Play } from 'lucide-react';
import { KitShell, KitUnavailable } from '@/components/kit/KitShell';
import { CardActions, DeckShareActions, DmActions } from '@/components/kit/actions';
import { fillDeckLink, findModule, loadKit, safeHttpsUrl, type KitItem } from '@/lib/kit';

/** 模組頁：簡報（播放＋客戶分享）、QA、DM（預覽＋下載）、圖卡（下載／複製文案／LINE 分享）。沒有的那區不顯示 */
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
  const firstDeckShare = safeHttpsUrl(decks.find((d) => d.share_url)?.share_url);

  return (
    <KitShell backHref={`/kit/${params.token}`} backLabel="所有模組" eyebrow="產品模組" title={mod.name} subtitle={mod.summary}>
      {mod.items.length === 0 && <p className="rounded-lg border border-mist-400 bg-white px-4 py-6 text-sm text-ink-500">這個模組的素材還在準備中。</p>}

      {decks.length > 0 && (
        <Section title="網頁簡報" hint="自己看或投影用「播放」；要給客戶看就傳「客戶分享連結」（客戶只看得到這份簡報）">
          <ul className="grid gap-3">
            {decks.map((d) => (
              <li key={d.id} className="rounded-xl border border-mist-400 bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-bold text-ink-900">{d.title}</p>
                    {d.summary && <p className="mt-0.5 text-sm leading-relaxed text-ink-500">{d.summary}</p>}
                  </div>
                  <Link
                    href={`${base}/deck/${d.id}`}
                    className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-lg border border-brand-700 bg-brand-700 px-3 text-sm font-medium text-white hover:bg-brand-800"
                  >
                    <Play className="h-4 w-4" aria-hidden="true" />
                    播放
                  </Link>
                </div>
                <div className="mt-3">
                  <DeckShareActions title={d.title} shareUrl={safeHttpsUrl(d.share_url)} />
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {qas.length > 0 && (
        <Section title="客戶 QA" hint="常見問題與異議處理（內部用，不要整份轉給客戶）">
          <ul className="grid gap-3 sm:grid-cols-2">
            {qas.map((q) => {
              const n = q.qa?.length ?? 0;
              const ob = q.qa?.filter((x) => x.kind === 'objection').length ?? 0;
              return (
                <li key={q.id}>
                  <RowLink
                    href={`${base}/qa/${q.id}`}
                    icon={<MessageCircleQuestion className="h-5 w-5" aria-hidden="true" />}
                    title={q.title}
                    summary={q.summary || `常見問題 ${n - ob} 題・異議處理 ${ob} 題`}
                  />
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {dms.length > 0 && (
        <Section title="宣傳 DM" hint="一頁式宣傳單，可以下載後傳給客戶或印出來">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dms.map((d) => {
              const main = safeHttpsUrl(d.file_url);
              if (!main) return null;
              const pdf = d.file_kind === 'pdf' ? main : null;
              const png = d.file_kind === 'pdf' ? safeHttpsUrl(d.preview_url) : main;
              return (
                <li key={d.id} className="overflow-hidden rounded-xl border border-mist-400 bg-white">
                  {png ? (
                    <a href={png} target="_blank" rel="noopener noreferrer" aria-label={`放大預覽：${d.title}`}>
                      <img src={png} alt={d.title} loading="lazy" referrerPolicy="no-referrer" className="aspect-[1240/1754] w-full bg-mist-200 object-contain" />
                    </a>
                  ) : (
                    <div className="flex aspect-[1240/1754] items-center justify-center bg-mist-200 text-ink-400">
                      <FileText className="h-10 w-10" aria-hidden="true" />
                    </div>
                  )}
                  <div className="space-y-2 p-3">
                    <p className="text-sm font-bold text-ink-900">{d.title}</p>
                    {d.summary && <p className="text-xs leading-relaxed text-ink-500">{d.summary}</p>}
                    <DmActions pdfUrl={pdf} pngUrl={png} baseName={`${mod.slug}-dm`} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {cards.length > 0 && (
        <Section title="分享圖卡" hint="下載圖卡，搭配文案傳到 LINE 或社群；文案裡已經帶好簡報的客戶分享連結">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c, i) => {
              const url = safeHttpsUrl(c.file_url);
              if (!url) return null;
              const text = fillDeckLink(c.share_text || '', firstDeckShare);
              return (
                <li key={c.id} className="overflow-hidden rounded-xl border border-mist-400 bg-white">
                  <img src={url} alt={c.title} loading="lazy" referrerPolicy="no-referrer" className="aspect-[1080/1350] w-full bg-mist-200 object-cover" />
                  <div className="space-y-3 p-3">
                    <p className="text-sm font-bold text-ink-900">{c.title}</p>
                    {text && <p className="whitespace-pre-line break-words rounded-lg bg-mist-100 p-3 text-sm leading-relaxed text-ink-700">{text}</p>}
                    <CardActions title={c.title} shareText={text} imageUrl={url} filename={`${mod.slug}-card-${i + 1}.png`} />
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

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="mb-3">
        <h2 className="text-lg font-bold text-ink-900">{title}</h2>
        {hint && <p className="text-xs leading-relaxed text-ink-400">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

function RowLink({ href, icon, title, summary }: { href: string; icon: React.ReactNode; title: string; summary?: string }) {
  return (
    <Link href={href} className="group flex items-center gap-3 rounded-xl border border-mist-400 bg-white p-4 transition-colors hover:border-brand-300">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold text-ink-900">{title}</span>
        {summary && <span className="block truncate text-xs text-ink-500">{summary}</span>}
      </span>
      <ChevronRight className="h-5 w-5 shrink-0 text-ink-300 group-hover:text-brand-600" aria-hidden="true" />
    </Link>
  );
}
