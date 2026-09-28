/**
 * 檢查全站內文字型子集有沒有缺字（離線、不連網）。
 *
 * 內文字型是本站用字子集（scripts/site-body-font.py 產生，字表存在 public/fonts/body/charset.txt）。
 * 新增文章或頁面文字卻沒重跑產生腳本時，新字會退回系統字體 —— 不會壞，但那幾個字字形不同。
 * 這支只負責「講出來」：列出缺哪些字、出現在哪個檔。
 *
 * `npm run build` 結束後自動跑（postbuild，才看得到 build 出來的標題），**永遠 exit 0**，不擋部署；
 * 想在本機當成硬性檢查就加 `--strict`。
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const strict = process.argv.includes('--strict');

/** 去掉程式註解（與 scripts/site-body-font.py 的 strip_comments 相同規則，改一邊要同步另一邊） */
const stripComments = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[\s;{}(),])\/\/.*$/gm, '$1');
try {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  const have = new Set(readFileSync(join(root, 'public/fonts/body/charset.txt'), 'utf8'));
  const missing = new Map();
  const walk = (d) => {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.tsx?$/.test(f)) {
        for (const ch of stripComments(readFileSync(p, 'utf8'))) {
          if (ch.codePointAt(0) >= 0x2000 && !have.has(ch)) {
            if (!missing.has(ch)) missing.set(ch, new Set());
            missing.get(ch).add(relative(root, p));
          }
        }
      }
    }
  };
  for (const d of ['app', 'components', 'lib']) walk(join(root, d));
  if (missing.size === 0) {
    console.log('[font-charset] 內文字型子集涵蓋全站用字');
  } else {
    console.warn(`[font-charset] 內文字型缺 ${missing.size} 個字（會退回系統字體）：`);
    for (const [ch, files] of missing) console.warn(`  ${ch}  ${[...files].slice(0, 3).join(', ')}`);
    console.warn('[font-charset] 重跑 `python scripts/site-body-font.py` 補上');
    if (strict) process.exitCode = 1;
  }

  // 標題襯線子集：看 build 出來的頁面裡所有 h1／h2（規則同 scripts/site-fonts.mjs 的 builtHeadingText）
  const built = join(root, '.next/server/app');
  const serifSet = join(root, 'public/site/fonts/serif-charset.txt');
  if (existsSync(built) && existsSync(serifSet)) {
    const serif = new Set(readFileSync(serifSet, 'utf8'));
    const miss = new Set();
    const walkHtml = (d) => {
      for (const f of readdirSync(d)) {
        const p = join(d, f);
        if (statSync(p).isDirectory()) walkHtml(p);
        else if (f.endsWith('.html')) {
          const html = readFileSync(p, 'utf8');
          for (const m of html.matchAll(/<(h1|h2)\b[^>]*>([\s\S]*?)<\/\1>/g))
            for (const ch of m[2].replace(/<[^>]+>/g, '')) if (ch.codePointAt(0) >= 0x2000 && !serif.has(ch)) miss.add(ch);
        }
      }
    };
    walkHtml(built);
    if (miss.size === 0) console.log('[font-charset] 標題襯線子集涵蓋全站 h1／h2');
    else {
      console.warn(`[font-charset] 標題襯線子集缺 ${miss.size} 個字（會退回黑體）：${[...miss].join('')}`);
      console.warn('[font-charset] 執行 `node scripts/site-fonts.mjs` 補上（需要剛 build 完的 .next）');
      if (strict) process.exitCode = 1;
    }
  }
} catch (err) {
  console.warn('[font-charset] 檢查略過：', err.message);
}
