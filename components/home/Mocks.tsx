import {
  CalendarCheck,
  ChevronRight,
  Coins,
  Contact,
  MessageCircle,
  Newspaper,
  Ticket
} from 'lucide-react';
import { DEMO_SHOP, hero } from '@/lib/data/home';
import { ThreadLines } from './ThreadLines';
import { HeroLive } from './HeroLive';

/*
 * 首頁的產品畫面（HTML／CSS 畫，不是截圖）。
 *
 * 每個欄位都要對得上 CRM 真的有的功能；出處見 lib/data/home.ts 各段註解。
 * 店家、會員、金額都是虛構的示意值 —— 不可以換成真實客戶名字。
 */

const ICON = { size: 16, strokeWidth: 1.75 } as const;

/*
 * 首屏的「播放」：元素基本樣式就是播完的樣子，`.ug-live` 底下的 keyframes 只負責把起點拉回去
 * （見 app/home.css「首屏播放」）。所以 JS 沒跑、減少動態、截圖時都看到完整畫面。
 * `--t` 是每個元素出場的秒數（一定要帶 s，否則整條 animation 宣告無效）。
 */
const at = (t: number) => ({ '--t': `${t}s` }) as React.CSSProperties;

/** LINE 官方帳號畫面：加好友 → 填會員資料 → 會員卡＋入會禮票券，下方是圖文選單 */
export function LinePhone({ className }: { className?: string }) {
  return (
    <div className={`ug-phone ${className ?? ''}`} aria-hidden data-anchor="phone">
      <div className="ug-phone-screen" style={{ minHeight: 540 }}>
        <div className="ug-phone-head">
          <span className="ug-avatar">店</span>
          {DEMO_SHOP}
          <span className="ug-tag ug-tag-line" style={{ marginLeft: 'auto' }}>
            LINE
          </span>
        </div>
        <div className="ug-chat">
          <div className="ug-bubble ug-a" style={at(0.3)}>
            歡迎加入！填好會員資料，送你 <b className="ug-gold ug-num">100</b> 點。
            <span className="ug-bubble-btn ug-a-press" style={at(1.05)} data-anchor="join">
              填寫會員資料
            </span>
          </div>
          <div className="ug-me-row">
            <span className="ug-typing" style={at(1.3)}>
              <i />
              <i />
              <i />
            </span>
            <div className="ug-bubble ug-bubble-me ug-a" style={at(2.1)}>
              填好了
            </div>
          </div>
          <div className="ug-card-flex ug-a" style={at(2.7)}>
            <div className="ug-card-flex-top">
              <div style={{ fontSize: 11, opacity: 0.85 }}>會員卡</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>林小姐</div>
            </div>
            <div style={{ padding: '8px 12px 10px' }}>
              <div className="ug-kv" style={{ padding: '3px 0' }}>
                <span style={{ color: 'var(--ug-ink-3)' }}>等級</span>
                <b>一般會員</b>
              </div>
              <div className="ug-kv" style={{ padding: '3px 0' }}>
                <span style={{ color: 'var(--ug-ink-3)' }}>點數</span>
                <b className="ug-gold ug-num ug-a-count" style={at(3)} data-live-count data-count-ms="900">
                  100
                </b>
              </div>
            </div>
          </div>
          <div className="ug-ticket ug-a" style={at(3.7)}>
            <Ticket {...ICON} />
            <div>
              <b>入會好禮</b>
              <span>已放進「我的票券」</span>
            </div>
          </div>
        </div>
        <div className="ug-richmenu" data-anchor="menu">
          <span>
            <Contact {...ICON} />
            會員卡
          </span>
          <span>
            <CalendarCheck {...ICON} />
            線上預約
          </span>
          <span className="ug-a-ping" style={at(4.1)}>
            <Ticket {...ICON} />
            我的票券
          </span>
          <span>
            <Coins {...ICON} />
            點數商城
          </span>
          <span>
            <Newspaper {...ICON} />
            最新消息
          </span>
          <span>
            <MessageCircle {...ICON} />
            聯絡我們
          </span>
        </div>
      </div>
    </div>
  );
}

/** 後台會員資料：加好友時建檔、問卷答案變標籤、結帳後點數更新 */
export function MemberCard({ className }: { className?: string }) {
  return (
    <div className={`ug-screen ug-a ${className ?? ''}`} style={at(2.9)} aria-hidden data-anchor="member">
      <div className="ug-screen-bar">
        <b>會員資料</b>
        <span>後台</span>
      </div>
      <div style={{ padding: '12px 16px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="ug-avatar" style={{ width: 34, height: 34, fontSize: 13 }}>
            林
          </span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>林小姐</div>
            <div style={{ color: 'var(--ug-ink-3)', fontSize: 12 }}>來源：門市 QR 加入</div>
          </div>
        </div>
        <div className="ug-chips" style={{ marginTop: 10 }}>
          <span className="ug-tag ug-a-pop" style={at(3.3)}>
            新會員
          </span>
          <span className="ug-tag ug-a-pop" style={at(3.55)}>
            問卷：手部保養
          </span>
        </div>
        <dl style={{ marginTop: 8 }}>
          <div className="ug-kv">
            <dt>等級</dt>
            <dd>一般會員</dd>
          </div>
          <div className="ug-kv">
            <dt>點數</dt>
            <dd>
              <span
                className="ug-gold ug-num ug-a-count"
                style={at(5.6)}
                data-live-count
                data-count-from="100"
                data-count-ms="700"
              >
                112
              </span>
            </dd>
          </div>
          <div className="ug-kv">
            <dt>最近消費</dt>
            <dd className="ug-num ug-a-pop" style={at(5.4)}>
              NT$ 1,200
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/** 美業結帳：服務＋指定設計師加價、儲值金扣款、點數累積（每 100 元 1 點是系統預設） */
export function PosTicket({ className }: { className?: string }) {
  return (
    <div className={`ug-screen ug-a ${className ?? ''}`} style={at(4.3)} aria-hidden data-anchor="pos">
      <div className="ug-screen-bar">
        <span>
          <b>POS 結帳</b>・美業
        </span>
        <span className="ug-tag">林小姐</span>
      </div>
      <div style={{ padding: '10px 16px 14px' }}>
        <dl>
          <div className="ug-kv ug-a-row" style={at(4.55)}>
            <dt>手部保養</dt>
            <dd className="ug-num">1,000</dd>
          </div>
          <div className="ug-kv ug-a-row" style={at(4.7)}>
            <dt>指定設計師加價</dt>
            <dd className="ug-num">200</dd>
          </div>
          <div className="ug-kv ug-a-row" style={at(4.85)}>
            <dt>儲值金扣款</dt>
            <dd className="ug-num">1,200</dd>
          </div>
          <div className="ug-kv ug-a-row" style={at(5.15)}>
            <dt>本次點數</dt>
            <dd className="ug-gold ug-num ug-a-pop" style={at(5.25)}>
              +12
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/**
 * 首屏舞台：LINE 畫面 → 會員資料 → 結帳，一條線串起來，最後回到 LINE 的圖文選單。
 * 桌機是三欄 grid（手機畫面／空隙／右側兩張卡），線由 ThreadLines 量位置後畫在空隙裡；
 * 手機版改成直的一疊，線換成左側的一條直線（見 app/home.css）。
 * 播放與重播由 HeroLive 控制（進畫面才播、離開畫面暫停、播完停 6 秒再重播）。
 */
export function HeroStage() {
  return (
    <div className="ug-hero-visual">
      <HeroLive>
        <LinePhone className="ug-st-phone" />
        <div className="ug-st-right">
          <p className="ug-note ug-a" style={at(2.9)}>
            {hero.notes.member}
          </p>
          <MemberCard />
          <PosTicket />
          <p className="ug-note ug-note-pos ug-a" style={at(5.4)}>
            {hero.notes.pos}
          </p>
        </div>
        <ThreadLines />
      </HeroLive>
      <p className="ug-stage-caption">畫面為系統示意，店家與會員皆為虛構</p>
    </div>
  );
}

/* ── 顧客旅程四站的小畫面 ─────────────────────────────── */

/** 加入好友：在 LINE 裡填會員資料（不用下載 App） */
export function JoinMock() {
  return (
    <div className="ug-screen" aria-hidden>
      <div className="ug-screen-bar">
        <b>填寫會員資料</b>
        <span>在 LINE 裡開啟</span>
      </div>
      <div style={{ padding: '12px 16px 16px', display: 'grid', gap: 8 }}>
        {[
          ['姓名', '林小姐'],
          ['手機', '0912-***-678'],
          ['生日', '05 / 14']
        ].map(([k, v]) => (
          <div key={k} className="ug-field">
            <span style={{ color: 'var(--ug-ink-3)', fontWeight: 400 }}>{k}</span>
            <span className="ug-num">{v}</span>
          </div>
        ))}
        <span className="ug-mini-btn" style={{ justifyContent: 'center', marginTop: 4 }}>
          送出，領 100 點
        </span>
      </div>
    </div>
  );
}

/** 互動：圖文選單依等級切換 */
export function EngageMock() {
  return (
    <div className="ug-screen" aria-hidden>
      <div className="ug-screen-bar">
        <b>圖文選單</b>
        <span className="ug-tag ug-tag-gold">金卡會員版</span>
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {['會員卡', '金卡專屬', '我的票券', '點數商城', '線上預約', '推薦好友'].map((t, i) => (
            <span
              key={t}
              style={{
                padding: '10px 0',
                borderRadius: 8,
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 12,
                background: i === 1 ? 'var(--ug-gold-tint)' : 'var(--ug-mist)',
                color: i === 1 ? 'var(--ug-gold)' : 'var(--ug-ink-2)'
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="ug-small" style={{ marginTop: 10, fontSize: 12 }}>
          升等後自動換成這一版
        </div>
      </div>
    </div>
  );
}

/** 消費：線上預約 → 到店結帳，點數回到會員 */
export function BuyMock() {
  return (
    <div className="ug-screen" aria-hidden>
      <div className="ug-screen-bar">
        <b>預約</b>
        <span className="ug-tag">已到店</span>
      </div>
      <div style={{ padding: '10px 16px 14px' }}>
        <dl>
          <div className="ug-kv">
            <dt>時間</dt>
            <dd className="ug-num">10/03 14:00</dd>
          </div>
          <div className="ug-kv">
            <dt>項目</dt>
            <dd>手部保養</dd>
          </div>
          <div className="ug-kv">
            <dt>服務人員</dt>
            <dd>Amy</dd>
          </div>
          <div className="ug-kv">
            <dt>結帳後</dt>
            <dd className="ug-gold ug-num">+12 點</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/** 再次回購：久未回訪自動發券 */
export function ReturnMock() {
  return (
    <div className="ug-screen" aria-hidden>
      <div className="ug-screen-bar">
        <b>自動跟進</b>
        <span className="ug-tag">啟用中</span>
      </div>
      <div style={{ padding: '12px 16px 14px', display: 'grid', gap: 8 }}>
        <div className="ug-field">
          <span>超過 60 天沒回來</span>
        </div>
        <div style={{ textAlign: 'center', color: 'var(--ug-ink-3)', lineHeight: 1 }}>↓</div>
        <div className="ug-field">
          <span>
            發送 <span className="ug-gold">回店禮 折 100</span>
          </span>
          <Ticket {...ICON} color="var(--ug-gold)" />
        </div>
      </div>
    </div>
  );
}

/* ── 行銷自動化：劇本設定畫面 ─────────────────────────────── */

/**
 * 欄位對照 ma-engine.ts：觸發（每日掃描型「久未回訪」）、篩選（等級／標籤，AND）、
 * 動作（發送票券）、延遲（上限 90 天）、啟用前預估人數（previewScanForRule）。
 */
export function RuleMock() {
  return (
    <div className="ug-screen" aria-hidden style={{ fontSize: 13.5 }}>
      <div className="ug-screen-bar">
        <span>
          <b>自動跟進劇本</b>・久未回訪關懷
        </span>
        <span className="ug-tag">草稿</span>
      </div>
      <div className="ug-rule-step" data-seq style={{ '--s': '0.25s' } as React.CSSProperties}>
        <span className="ug-rule-label">當</span>
        <div className="ug-field">
          <span>最後一次消費超過 60 天</span>
          <ChevronRight size={14} strokeWidth={1.75} />
        </div>
      </div>
      <div className="ug-rule-step" data-seq style={{ '--s': '0.45s' } as React.CSSProperties}>
        <span className="ug-rule-label">只給</span>
        <div className="ug-chips">
          <span className="ug-tag">等級：全部</span>
          <span className="ug-tag">排除標籤：已預約</span>
        </div>
      </div>
      <div className="ug-rule-step" data-seq style={{ '--s': '0.65s' } as React.CSSProperties}>
        <span className="ug-rule-label">就做</span>
        <div style={{ display: 'grid', gap: 6 }}>
          <div className="ug-field">
            <span>
              發送票券 <span className="ug-gold">回店禮 折 100</span>
            </span>
            <Ticket {...ICON} color="var(--ug-gold)" />
          </div>
          <div className="ug-field">
            <span>加上標籤「回流關懷」</span>
          </div>
        </div>
      </div>
      <div className="ug-rule-step" data-seq style={{ '--s': '0.85s' } as React.CSSProperties}>
        <span className="ug-rule-label">何時</span>
        <div className="ug-field">
          <span>條件成立後 立即</span>
        </div>
      </div>
      <div className="ug-preview" data-seq style={{ '--s': '1.1s' } as React.CSSProperties}>
        <span>
          啟用前預估：<b className="ug-num" data-count data-count-delay="1300">42</b> 位會員符合
        </span>
        <span className="ug-mini-btn">確認啟用</span>
      </div>
    </div>
  );
}

/* ── POS：平板結帳＋會員在 LINE 確認扣儲值金 ─────────────────────────────── */

export function PosScene() {
  return (
    <div className="ug-pos-wrap" aria-hidden>
      <div className="ug-screen" style={{ fontSize: 13.5 }}>
        <div className="ug-screen-bar">
          <span>
            <b>{DEMO_SHOP}</b>・櫃台平板
          </span>
          <span className="ug-tag">會員：林小姐</span>
        </div>
        <div style={{ padding: '10px 16px 6px' }}>
          <dl>
            <div className="ug-kv" data-seq style={{ '--s': '0.25s' } as React.CSSProperties}>
              <dt>手部保養・Amy</dt>
              <dd className="ug-num">1,000</dd>
            </div>
            <div className="ug-kv" data-seq style={{ '--s': '0.4s' } as React.CSSProperties}>
              <dt>指定設計師加價</dt>
              <dd className="ug-num">200</dd>
            </div>
            <div className="ug-kv" data-seq style={{ '--s': '0.55s' } as React.CSSProperties}>
              <dt>生日禮 折 100（票券核銷）</dt>
              <dd className="ug-num">−100</dd>
            </div>
            <div className="ug-kv" data-seq style={{ '--s': '0.75s' } as React.CSSProperties}>
              <dt style={{ color: 'var(--ug-ink)', fontWeight: 700 }}>應收</dt>
              <dd className="ug-num" style={{ fontSize: 18 }}>
                NT$ 1,100
              </dd>
            </div>
          </dl>
        </div>
        <div className="ug-pay">
          <span>現金</span>
          <span>信用卡</span>
          <span data-on="" data-seq-on style={{ '--s': '1.05s' } as React.CSSProperties}>
            儲值金
          </span>
        </div>
      </div>
      <div className="ug-phone ug-pos-line" data-seq-pop style={{ borderRadius: 22, padding: 6, '--s': '1.4s' } as React.CSSProperties}>
        <div className="ug-phone-screen" style={{ borderRadius: 17 }}>
          <div className="ug-chat" style={{ padding: 10 }}>
            <div className="ug-bubble" style={{ maxWidth: '100%' }}>
              <div style={{ fontWeight: 700 }}>儲值金扣款確認</div>
              <div className="ug-num" style={{ color: 'var(--ug-ink-2)' }}>
                {DEMO_SHOP}・NT$ 1,100
              </div>
              <span className="ug-bubble-btn">確認扣款</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
