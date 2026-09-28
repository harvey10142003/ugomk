/**
 * 產生全站標題與手寫註記的字型子集（標題 Noto Serif TC 700、手寫註記 LXGW WenKai TC 400）。
 *
 * 做法與 scripts/insurcrm-fonts.mjs 相同：全站字型自託管（見 app/fonts.css 檔頭），
 * 中文字型整套動輒數 MB，這兩套字只用在標題與旁註，所以只下載用到的字。
 *
 * 標題字從哪來：
 *   1. lib/data/home.ts 的 FONT_SUBSET_TEXT（首頁的襯線與手寫文字）
 *   2. **build 出來的每一頁**（.next/server/app/**\/*.html）裡所有 <h1>、<h2> 的文字 ——
 *      全站 h1／h2 都用襯線（app/globals.css 的 heading-*），逐頁手列一定會漏。
 *
 * 用法：改了任何頁面的標題後
 *   npm run build && node scripts/site-fonts.mjs
 * 會覆寫 public/site/fonts/*.woff2 與 serif-charset.txt。
 * 沒重跑也不會壞：子集裡沒有的字會退回黑體；`npm run build` 結束時的檢查會列出缺字。
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'lib/data/home.ts'), 'utf8');
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const tmp = join(root, '.site-fonts-tmp.mjs');
writeFileSync(tmp, js);
let FONT_SUBSET_TEXT;
try {
  ({ FONT_SUBSET_TEXT } = await import(pathToFileURL(tmp).href));
} finally {
  rmSync(tmp, { force: true });
}

/** build 出來的靜態頁裡，所有 h1／h2 的純文字 */
export function builtHeadingText(rootDir) {
  const dir = join(rootDir, '.next/server/app');
  if (!existsSync(dir)) return null;
  let out = '';
  const walk = (d) => {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (f.endsWith('.html')) {
        const html = readFileSync(p, 'utf8');
        for (const m of html.matchAll(/<(h1|h2)\b[^>]*>([\s\S]*?)<\/\1>/g)) out += m[2].replace(/<[^>]+>/g, '');
      }
    }
  };
  walk(dir);
  return out.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
}

const headings = builtHeadingText(root);
if (headings === null) {
  console.error('找不到 .next/server/app —— 先 `npm run build` 再執行，才收得到全站標題字');
  process.exit(1);
}
const SERIF_TEXT = FONT_SUBSET_TEXT.serif + headings;

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
// 標點與全形符號一起放進子集，標題裡的逗號才會是同一套字
const uniq = (s) => [...new Set([...(s + '，、。：；「」？！（）｜').replace(/\s/g, '')])].sort().join('');

const jobs = [
  { file: 'serif-700.woff2', family: 'Noto+Serif+TC:wght@700', text: SERIF_TEXT, charset: 'serif-charset.txt' },
  { file: 'hand-400.woff2', family: 'LXGW+WenKai+TC', text: FONT_SUBSET_TEXT.hand }
];

const outDir = join(root, 'public/site/fonts');
mkdirSync(outDir, { recursive: true });

for (const job of jobs) {
  const text = uniq(job.text);
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${job.family}&text=${encodeURIComponent(text)}&display=swap`, {
      headers: { 'User-Agent': UA }
    })
  ).text();
  const urls = [...css.matchAll(/url\((https:[^)]+)\)\s*format\('woff2'\)/g)].map((m) => m[1]);
  if (urls.length !== 1) throw new Error(`${job.file}: 預期 1 個 woff2，拿到 ${urls.length} 個\n${css}`);
  const buf = Buffer.from(await (await fetch(urls[0], { headers: { 'User-Agent': UA } })).arrayBuffer());
  writeFileSync(join(outDir, job.file), buf);
  if (job.charset) writeFileSync(join(outDir, job.charset), text);
  console.log(`${job.file}  ${text.length} 字  ${(buf.length / 1024).toFixed(1)} KB`);
}
