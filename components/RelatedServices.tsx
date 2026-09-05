import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { serviceOfferings } from '@/lib/data/services';

/**
 * 服務頁彼此的交叉連結。
 *
 * 三個 /services/* 頁原本互不相連（smart-card 更是整頁只指向 /contact 與 LINE），
 * 訪客看完一項服務就沒有下一步，爬蟲也走不進另外兩頁。
 */
export function RelatedServices({ current }: { current: string }) {
  const others = serviceOfferings.filter((s) => s.href !== current);

  return (
    <section className="section-tight border-t border-ink-100 bg-mist-100">
      <div className="container-ug">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">More services</span>
          <h2 className="heading-3 mt-3 text-balance">你可能也需要這些</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {others.map((s) => (
            <Link key={s.href} href={s.href} className="card-hover group flex flex-col p-7">
              <h3 className="text-lg font-bold text-ink-900 transition-colors group-hover:text-brand-800">
                {s.title}
              </h3>
              <p className="mt-2 text-sm font-semibold text-brand-700">{s.summary}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-500">{s.detail}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition-all group-hover:gap-2">
                了解這項服務
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-500">
          想先看系統本身能做什麼？
          <Link
            href="/solutions"
            className="mx-1 font-semibold text-brand-700 underline-offset-4 hover:underline"
          >
            看多模組架構
          </Link>
          或
          <Link
            href="/pricing"
            className="mx-1 font-semibold text-brand-700 underline-offset-4 hover:underline"
          >
            查看費用方案
          </Link>
          。
        </p>
      </div>
    </section>
  );
}
