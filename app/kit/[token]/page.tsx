import { notFound } from 'next/navigation';
import { KitShell, KitUnavailable } from '@/components/kit/KitShell';
import { KitHomeBrowser, type HomeCategory, type HomeModule } from '@/components/kit/KitHomeBrowser';
import type { QaEntry } from '@/components/kit/QaBrowser';
import { loadKit, safeHttpsUrl, type KitModule } from '@/lib/kit';
import { KIT_CATEGORIES, KIT_CATEGORY_OTHER, kitCategoryOf } from '@/lib/kit-media';

/** 模組縮圖退路（沒有專屬縮圖時）：第一張分享圖卡 → DM 預覽（PNG 主檔或 PDF 附的 PNG）→ 沒有就用名稱字塊 */
function thumbOf(m: KitModule): string | null {
  const card = m.items.find((i) => i.type === 'card' && safeHttpsUrl(i.file_url));
  if (card) return safeHttpsUrl(card.file_url);
  const dm = m.items.find((i) => i.type === 'dm');
  if (dm) return safeHttpsUrl(dm.file_kind === 'pdf' ? dm.preview_url : dm.file_url);
  return null;
}

function metaOf(m: KitModule): string {
  const n = (t: string) => m.items.filter((i) => i.type === t).length;
  const qa = m.items.filter((i) => i.type === 'qa').reduce((s, i) => s + (i.qa?.length ?? 0), 0);
  const parts = [
    n('deck') ? `簡報${n('deck') > 1 ? ` ${n('deck')}` : ''}` : '',
    qa ? `QA ${qa} 題` : '',
    n('dm') ? `DM${n('dm') > 1 ? ` ${n('dm')}` : ''}` : '',
    n('card') ? `圖卡 ${n('card')}` : '',
  ].filter(Boolean);
  return parts.length ? parts.join('・') : '素材準備中';
}

/** 業務資源首頁：這個連結看得到的模組（依分類分區，附縮圖與快速分享）＋全站 QA 搜尋 */
export default async function KitHome({ params }: { params: { token: string } }) {
  const r = await loadKit(params.token);
  if (r.state === 'not_found') notFound();
  if (r.state === 'unavailable') return <KitUnavailable />;
  const { kit } = r;
  const base = `/kit/${params.token}`;

  const modules: HomeModule[] = kit.modules.map((m) => {
    const deck = m.items.find((i) => i.type === 'deck' && i.share_url) ?? m.items.find((i) => i.type === 'deck');
    return {
      slug: m.slug,
      name: m.name,
      summary: m.summary,
      categoryId: kitCategoryOf(m.category).id,
      // 專屬縮圖優先（CRM thumbnail_url）；沒有才退回圖卡／DM／字塊
      ownThumb: safeHttpsUrl(m.thumbnail_url),
      thumb: safeHttpsUrl(m.thumbnail_url) ?? thumbOf(m),
      meta: metaOf(m),
      deck: deck ? { title: deck.title, shareUrl: safeHttpsUrl(deck.share_url) } : null,
    };
  });
  const categories: HomeCategory[] = [...KIT_CATEGORIES, KIT_CATEGORY_OTHER].filter((c) => modules.some((m) => m.categoryId === c.id));

  // 全站 QA 搜尋的資料（伺服器端攤平；搜尋在瀏覽器做）
  const qa: QaEntry[] = kit.modules.flatMap((m) =>
    m.items
      .filter((i) => i.type === 'qa')
      .flatMap((i) => (i.qa ?? []).map((p) => ({ q: p.q, a: p.a, kind: p.kind, moduleName: m.name, href: `${base}/${m.slug}/qa/${i.id}` }))),
  );
  const decks = kit.modules.reduce((s, m) => s + m.items.filter((i) => i.type === 'deck').length, 0);
  const cards = kit.modules.reduce((s, m) => s + m.items.filter((i) => i.type === 'card').length, 0);

  return (
    <KitShell
      title="產品資源"
      subtitle={`${kit.modules.length} 個模組・簡報 ${decks} 份・客戶 QA ${qa.length} 題・圖卡 ${cards} 張`}
      note="這是業務內部網址，請不要轉給客戶。給客戶請按「複製連結」或「LINE 傳送」，客戶只看得到那份簡報。"
    >
      <KitHomeBrowser base={base} modules={modules} categories={categories} qa={qa} />
    </KitShell>
  );
}
