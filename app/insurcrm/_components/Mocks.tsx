import Image from 'next/image';
import { Bell, ChevronRight, Lock, Mic, ShieldAlert } from 'lucide-react';
import { LOGO_MARK, briefMock, familyMock } from '../_data/content';

/**
 * 一天時間軸裡的產品畫面示意（server component，純 HTML／CSS，不是截圖）。
 * 內容對應 feat/insurance-final 已做好的畫面：每日早報 Flex、業務 AI 助理、家庭保障總表、
 * 來訊通知與一對一回覆的健康字詞阻擋、iCal 遮罩姓名、客戶 LIFF「我的保單」。人物皆為虛構。
 */

function ChatBar({ title }: { title: string }) {
  return (
    <div className="icrm-chat-bar">
      <Image src={LOGO_MARK.src} width={28} height={28} alt="" sizes="28px" />
      {title}
    </div>
  );
}

export function BriefMock() {
  return (
    <div className="icrm-screen icrm-chat">
      <ChatBar title="你的官方帳號" />
      <div className="icrm-chat-body">
        <div className="icrm-bubble-in icrm-flex" style={{ width: '100%' }}>
          <div className="icrm-flex-head">
            <b>{briefMock.heading}</b>
            <span>{briefMock.summary}</span>
          </div>
          {briefMock.lines.map((l) => (
            <div key={l.text} className="icrm-flex-row">
              <em>{l.tag}</em>
              <span>{l.text}</span>
            </div>
          ))}
          <span className="icrm-flex-btn">{briefMock.action}</span>
        </div>
        <span className="icrm-num text-[11px] text-[color:var(--icrm-ink-3)]">07:30</span>
      </div>
    </div>
  );
}

export function FamilyMock() {
  const f = familyMock;
  return (
    <div className="icrm-screen icrm-family">
      <div className="icrm-family-head">
        <div>
          <div className="icrm-serif text-xl">{f.household}．家庭保障總表</div>
          <div className="icrm-small">家庭分級 {f.grade}．三位成員</div>
        </div>
        <span className="icrm-small hidden sm:inline">列印成 PDF</span>
      </div>
      <div className="overflow-x-auto">
        <table>
          <caption className="sr-only">
            {f.household}家庭保障總表示意：各成員的壽險、醫療、意外、長照保額與缺口
          </caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">險種</span>
              </th>
              {f.members.map((m, i) => (
                <th key={m} scope="col">
                  {m}
                  <small>{f.roles[i]}</small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {f.rows.map((r) => (
              <tr key={r.kind}>
                <th scope="row">{r.kind}</th>
                {r.cells.map((c, i) => (
                  <td key={i} className="icrm-num">
                    {r.gap[i] ? <span className="icrm-gap">缺口</span> : c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="icrm-family-foot">
        <span className="icrm-num font-bold text-[color:var(--icrm-ink-2)]">{f.premium}</span>
        <span>{f.footnote}</span>
      </div>
    </div>
  );
}

export function AssistantMock() {
  return (
    <div className="icrm-screen icrm-chat">
      <ChatBar title="業務助理（只有你看得到）" />
      <div className="icrm-chat-body">
        <div className="icrm-bubble-out">記：陳太太說明年小孩上小學，想先了解教育金怎麼準備</div>
        <div className="icrm-bubble-out inline-flex items-center gap-2">
          <Mic className="h-4 w-4" aria-hidden />
          <span>
            下週二下午三點約陳太太<span className="sr-only">（語音口述）</span>
          </span>
        </div>
        <div className="icrm-bubble-in icrm-flex" style={{ width: '94%' }}>
          <div className="px-[14px] pb-1 pt-3">
            <span className="icrm-draft-tag">AI 草稿</span>
            <div className="font-bold">存進陳家的客戶歷程？</div>
          </div>
          <div className="icrm-flex-row">
            <em>筆記</em>
            <span>小孩明年上小學，想了解教育金準備方式</span>
          </div>
          <div className="icrm-flex-row">
            <em>待辦</em>
            <span className="icrm-num">9/29（二）15:00 約陳太太</span>
          </div>
          <div className="icrm-flex-actions">
            <span>確認存入</span>
            <span>修改</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InboxMock() {
  return (
    <div className="max-w-[420px]">
      <div className="icrm-toast">
        <span className="icrm-line-dot">
          <Bell className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <b>林媽媽傳來新訊息</b>
          <div className="icrm-small">打開對話查看（通知不含訊息內容）</div>
        </div>
      </div>
      <div className="icrm-screen icrm-compose">
        <div className="icrm-small mb-2 font-bold">回覆林媽媽</div>
        <div className="icrm-compose-field">
          林媽媽您好，您上次提到的<mark>高血壓</mark>，保單這邊我再幫您確認…
        </div>
        <div className="icrm-compose-alert" role="presentation">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          這則含有健康相關字詞，不能送出。請改寫，不要在訊息裡提到病況。
        </div>
      </div>
    </div>
  );
}

export function IcalMock() {
  const rows = [
    { t: '10:30', title: '約訪 陳○明', kind: 'visit' },
    { t: '14:00', title: '約訪 王○明', kind: 'visit' },
    { t: '全天', title: '中秋節祝福 林○華', kind: 'greet' },
    { t: '全天', title: '繳費提醒 林○華', kind: 'visit' }
  ];
  return (
    <div className="icrm-screen icrm-cal">
      <div className="icrm-cal-head">
        <div className="icrm-small font-bold">手機日曆．保客+ 行程</div>
        <div className="icrm-serif mt-1 text-xl">9 月 26 日 星期六</div>
      </div>
      {rows.map((r) => (
        <div key={r.title} className="icrm-cal-row" data-kind={r.kind}>
          <span className="icrm-num text-[color:var(--icrm-ink-3)]">{r.t}</span>
          <i aria-hidden />
          <span className="font-bold">{r.title}</span>
        </div>
      ))}
      <div className="flex items-center gap-2 px-[18px] py-3 text-xs text-[color:var(--icrm-ink-3)]">
        <Lock className="h-3.5 w-3.5" aria-hidden />
        標題只帶遮罩姓名，不含備註與地點
      </div>
    </div>
  );
}

export function ClientPhoneMock() {
  const policies = [
    { co: 'A 人壽', name: '終身壽險', who: '被保人：本人', due: '年繳．下次 11/02' },
    { co: 'B 產險', name: '傷害保險', who: '被保人：本人', due: '年繳．下次 03/15' },
    { co: 'A 人壽', name: '醫療保險', who: '被保人：女兒（未成年）', due: '月繳．下次 10/05' }
  ];
  return (
    <div className="icrm-phone" role="img" aria-label="客戶在 LINE 裡看到的「我的保單」頁面示意：保單總表與聯絡服務人員按鈕">
      <div className="icrm-phone-top" aria-hidden>
        <div className="text-xs opacity-90">我的保單</div>
        <div className="icrm-serif mt-1 text-xl">林○華 的保單總表</div>
        <div className="mt-1 text-xs opacity-90">3 張有效保單</div>
      </div>
      <div aria-hidden>
        {policies.map((p) => (
          <div key={p.name + p.who} className="icrm-policy">
            <div className="flex items-center justify-between">
              <b>{p.name}</b>
              <span className="text-xs text-[color:var(--icrm-ink-3)]">{p.co}</span>
            </div>
            <div className="text-xs text-[color:var(--icrm-ink-3)]">
              {p.who}．{p.due}
            </div>
          </div>
        ))}
        <div className="p-4">
          <div className="flex items-center justify-between rounded-lg bg-[color:var(--icrm-teal)] px-4 py-3 text-sm font-bold text-white">
            聯絡我的服務人員
            <ChevronRight className="h-4 w-4" />
          </div>
          <p className="mt-3 text-center text-[11px] text-[color:var(--icrm-ink-3)]">不顯示保單照片原圖與業務備註</p>
        </div>
      </div>
    </div>
  );
}
