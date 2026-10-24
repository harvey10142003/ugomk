/* eslint-disable @next/next/no-img-element -- 圖卡／DM 是 R2 公開網址，用原生 img（不走 next/image 的遠端白名單與最佳化） */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, FileText, MessageCircleQuestion, Presentation } from 'lucide-react';
import { KitShell, KitUnavailable } from '@/components/kit/KitShell';
import { CardActions } from '@/components/kit/CardActions';
import { findModule, loadKit, safeHttpsUrl, type KitItem } from '@/lib/kit';

/** 模組頁：簡報、QA、DM、圖卡四區（沒有的那區不顯示） */
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

  return (
    <KitShell backHref={`/kit/${params.token}`} backLabel="所有模組" eyebrow="產品模組" title={mod.name} subtitle={mod.summary}>
      {mod.items.length === 0 && <p className="rounded-lg border border-mist-400 bg-white px-4 py-6 text-sm text-ink-500">這個模組的素材還在準備中。</p>}

      {decks.length > 0 && (
        <Section title="網頁簡報" hint="點開全螢幕播放，可以直接投影給客戶看">
          <ul className="grid gap-3 sm:grid-cols-2">
            {decks.map((d) => (
              <li key={d.id}>
                <RowLink href={`${base}/deck/${d.id}`} icon={<Presentation className="h-5 w-5" aria-hidden="true" />} title={d.title} summary={d.summary} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {qas.length > 0 && (
        <Section title="客戶 QA" hint="客戶常問的問題與建議回答">
          <ul className="grid gap-3 sm:grid-cols-2">
            {qas.map((q) => (
              <li key={q.id}>
                <RowLink
                  href={`${base}/qa/${q.id}`}
                  icon={<MessageCircleQuestion className="h-5 w-5" aria-hidden="true" />}
                  title={q.title}
                  summary={q.summary || `${q.qa?.length ?? 0} 題`}
                />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {dms.length > 0 && (
        <Section title="宣傳 DM" hint="可以下載後傳給客戶或印出來">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dms.map((d) => {
              const url = safeHttpsUrl(d.file_url);
              if (!url) return null;
              return (
                <li key={d.id} className="overflow-hidden rounded-xl border border-mist-400 bg-white">
                  {d.file_kind === 'pdf' ? (
                    <div className="flex aspect-[4/3] items-center justify-center bg-mist-200 text-ink-400">
                      <FileText className="h-10 w-10" aria-hidden="true" />
                    </div>
                  ) : (
                    <img src={url} alt={d.title} loading="lazy" referrerPolicy="no-referrer" className="aspect-[4/3] w-full bg-mist-200 object-contain" />
                  )}
                  <div className="p-3">
                    <p className="text-sm font-bold text-ink-900">{d.title}</p>
                    {d.summary && <p className="mt-0.5 text-xs leading-relaxed text-ink-500">{d.summary}</p>}
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex min-h-[40px] items-center rounded-lg border border-mist-400 px-3 text-sm font-medium text-ink-700 hover:border-brand-300"
                    >
                      {d.file_kind === 'pdf' ? '開啟 PDF' : '開啟原圖'}
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {cards.length > 0 && (
        <Section title="分享圖卡" hint="按「分享」直接傳到 LINE；文案可以先複製再貼上">
          <ul className="grid gap-4 sm:grid-cols-2">
            {cards.map((c) => {
              const url = safeHttpsUrl(c.file_url);
              if (!url) return null;
              return (
                <li key={c.id} className="overflow-hidden rounded-xl border border-mist-400 bg-white">
                  <img src={url} alt={c.title} loading="lazy" referrerPolicy="no-referrer" className="w-full bg-mist-200 object-contain" />
                  <div className="space-y-3 p-3">
                    <p className="text-sm font-bold text-ink-900">{c.title}</p>
                    {c.share_text && (
                      <p className="whitespace-pre-line rounded-lg bg-mist-100 p-3 text-sm leading-relaxed text-ink-700">{c.share_text}</p>
                    )}
                    <CardActions title={c.title} shareText={c.share_text || ''} imageUrl={url} />
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
    <section className="mb-8">
      <div className="mb-3">
        <h2 className="text-lg font-bold text-ink-900">{title}</h2>
        {hint && <p className="text-xs text-ink-400">{hint}</p>}
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
