'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Loader2, MessageCircle, AlertTriangle } from 'lucide-react';
import { site } from '@/lib/data/site';
import {
  INDUSTRY_OPTIONS,
  STORE_COUNT_OPTIONS,
  classifyContact,
  type LeadFormPayload
} from '@/lib/data/lead-form';

type Status = 'idle' | 'sending' | 'done' | 'error';

/** 從網址抓 utm_*；沒有就是空物件（不要塞假值，之後分析會分不出「沒帶」與「帶了空的」） */
function readUtm(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const out: Record<string, string> = {};
  const sp = new URLSearchParams(window.location.search);
  for (const [k, v] of sp.entries()) {
    if (!k.toLowerCase().startsWith('utm_')) continue;
    const val = v.trim();
    if (val) out[k.toLowerCase().slice(0, 40)] = val.slice(0, 200);
  }
  // 常見的廣告點擊 id 也一起收 —— 判斷「這張名單是不是投放來的」比 utm 更可靠
  for (const k of ['gclid', 'fbclid', 'ttclid', 'msclkid']) {
    const val = sp.get(k)?.trim();
    if (val) out[k] = val.slice(0, 200);
  }
  return out;
}

export function LeadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [fieldError, setFieldError] = useState<{ name?: string; contact?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const startedAtRef = useRef<number>(0);
  const utmRef = useRef<Record<string, string>>({});
  const referrerRef = useRef<string>('');
  const sourcePathRef = useRef<string>('');

  useEffect(() => {
    // 掛載當下＝訪客看到表單的時間。CRM 端拿它擋「快到不可能是人」的送出，
    // 所以一定要在 client 取，不能用 server 時間。
    startedAtRef.current = Date.now();
    utmRef.current = readUtm();
    referrerRef.current = document.referrer || '';
    sourcePathRef.current = window.location.pathname + window.location.search;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const fd = new FormData(e.currentTarget);
    const name = (fd.get('name') as string | null)?.trim() ?? '';
    const contact = (fd.get('contact') as string | null)?.trim() ?? '';

    const errs: { name?: string; contact?: string } = {};
    if (!name) errs.name = '請留下我們可以怎麼稱呼你。';
    if (!contact) errs.contact = '請留下電話或 Email，我們才聯絡得到你。';
    else if (!classifyContact(contact)) {
      errs.contact = '這看起來不像電話或 Email，請再確認一次。';
    }
    setFieldError(errs);
    if (Object.keys(errs).length > 0) return;

    const payload: LeadFormPayload = {
      name,
      contact,
      industry: (fd.get('industry') as string | null) ?? '',
      storeCount: (fd.get('storeCount') as string | null) ?? '',
      message: (fd.get('message') as string | null)?.trim() ?? '',
      sourcePath: sourcePathRef.current,
      referrer: referrerRef.current,
      utm: utmRef.current,
      formStartedAt: startedAtRef.current,
      hpUrl: (fd.get('hp_url') as string | null) ?? ''
    };

    setStatus('sending');
    setServerError(null);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setServerError(json.error || '送出時發生問題。');
        setStatus('error');
        return;
      }
      setStatus('done');
    } catch {
      // 網路層失敗（離線 / 被擋）—— 訪客那邊看到的是同一張「還有其他方式找到我們」的卡
      setServerError('連線沒有成功，可能是網路暫時中斷。');
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="card-glow p-8 md:p-10 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="heading-3 mt-6">已收到你的需求</h3>
        <p className="body-base mt-4 max-w-md mx-auto">
          我們會在一個工作天內與你聯繫，先了解你目前的狀況，再一起判斷適合的導入方式。
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={site.contact.lineUrl} target="_blank" rel="noopener" className="btn-line">
            <MessageCircle className="h-4 w-4" />
            順便加 LINE，回覆更快
          </a>
          <Link href="/cases" className="btn-outline">
            先看看其他客戶怎麼做
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-8 md:p-10">
      <h2 className="heading-2">留下需求，我們主動聯絡你</h2>
      <p className="body-base mt-4">
        只需要兩個必填欄位。其他的等我們聊過再補就好。
      </p>

      {status === 'error' ? (
        <div
          role="alert"
          className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-ink-800"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold text-ink-900">表單沒有送出成功</div>
              <p className="mt-1.5 text-ink-700">{serverError}</p>
              {/* 失敗一定要留退路：他已經想聯絡我們了，不能讓他卡在這裡 */}
              <p className="mt-3 text-ink-700">
                你可以直接用這兩個方式找到我們，一樣會有人回覆：
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={site.contact.lineUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-line-700 px-4 py-2 text-xs font-semibold text-white hover:bg-line-800 transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  LINE {site.contact.lineId}
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-semibold text-ink-800 hover:border-brand-300 transition-colors"
                >
                  {site.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-8 space-y-6">
        <div>
          <label htmlFor="lead-name" className="block text-sm font-semibold text-ink-900">
            怎麼稱呼你 <span className="text-brand-700">*</span>
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            placeholder="例如：王小姐、陳店長"
            aria-invalid={!!fieldError.name}
            aria-describedby={fieldError.name ? 'lead-name-err' : undefined}
            className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-base text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
          {fieldError.name ? (
            <p id="lead-name-err" className="mt-2 text-sm text-red-700">
              {fieldError.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="lead-contact" className="block text-sm font-semibold text-ink-900">
            聯絡方式 <span className="text-brand-700">*</span>
          </label>
          <p className="mt-1 text-sm text-ink-500">電話或 Email，填你方便的那一個就好。</p>
          <input
            id="lead-contact"
            name="contact"
            type="text"
            inputMode="text"
            autoComplete="tel"
            maxLength={200}
            placeholder="0912-345-678 或 you@example.com"
            aria-invalid={!!fieldError.contact}
            aria-describedby={fieldError.contact ? 'lead-contact-err' : undefined}
            className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-base text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
          {fieldError.contact ? (
            <p id="lead-contact-err" className="mt-2 text-sm text-red-700">
              {fieldError.contact}
            </p>
          ) : null}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="lead-industry" className="block text-sm font-semibold text-ink-900">
              產業
            </label>
            <select
              id="lead-industry"
              name="industry"
              defaultValue=""
              className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-base text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            >
              <option value="">尚未確定 / 不在清單中</option>
              {INDUSTRY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="lead-stores" className="block text-sm font-semibold text-ink-900">
              分店數量
            </label>
            <select
              id="lead-stores"
              name="storeCount"
              defaultValue=""
              className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-base text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            >
              <option value="">尚未確定</option>
              {STORE_COUNT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="lead-message" className="block text-sm font-semibold text-ink-900">
            最想解決的問題
          </label>
          <p className="mt-1 text-sm text-ink-500">
            不用寫得完整，一兩句就夠我們先判斷方向。
          </p>
          <textarea
            id="lead-message"
            name="message"
            rows={4}
            maxLength={2000}
            placeholder="例如：好友有三千人，但推播都是全體發送，訊息費一直增加，效果卻看不出來。"
            className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-base leading-relaxed text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
        </div>

        {/*
          honeypot：CRM 端 `hp_url` 有值就當機器人（回 200 但不寫入）。
          用 aria-hidden + tabIndex=-1 讓螢幕報讀器與鍵盤都跳過它，
          只有自動填表程式會踩到。不可以用 display:none —— 有些機器人會略過隱藏欄位。
        */}
        <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="lead-hp">請不要填寫這個欄位</label>
          <input id="lead-hp" name="hp_url" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-ink-500">
        送出即表示你同意宇果國際行銷蒐集上述聯絡資訊，僅用於回覆本次詢問與後續服務聯繫，
        不會提供給其他公司。你隨時可以來信要求查閱、更正或刪除。
        詳見{' '}
        <Link href="/privacy" className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800">
          隱私權說明
        </Link>
        。
      </p>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-brand mt-6 w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60 disabled:translate-y-0 disabled:shadow-soft"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            送出中
          </>
        ) : (
          <>
            送出需求
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
