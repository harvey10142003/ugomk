/**
 * 產生 /insurcrm 落地頁的字型子集（標題 Noto Serif TC 700、手寫註記 LXGW WenKai TC 400）。
 *
 * 為什麼：全站字型自託管（next/font/google 在 Zeabur 建置時抓不穩，見 app/fonts.css 檔頭），
 * 而中文字型整套動輒數 MB。這頁只有標題與手寫註記用這兩套字，所以只下載用到的字，每套約數十 KB。
 *
 * 用法：改了 app/insurcrm/_data/content.ts 的標題或手寫註記後執行
 *   node scripts/insurcrm-fonts.mjs
 * 會覆寫 public/insurcrm/fonts/*.woff2。沒重跑也不會壞：子集裡沒有的字會退回黑體。
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'app/insurcrm/_data/content.ts'), 'utf8');
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const tmp = join(root, '.insurcrm-fonts-tmp.mjs');
writeFileSync(tmp, js);
let FONT_SUBSET_TEXT;
try {
  ({ FONT_SUBSET_TEXT } = await import(pathToFileURL(tmp).href));
} finally {
  rmSync(tmp, { force: true });
}

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const uniq = (s) => [...new Set([...s.replace(/\s/g, '')])].sort().join('');

const jobs = [
  { file: 'serif-700.woff2', family: 'Noto+Serif+TC:wght@700', text: FONT_SUBSET_TEXT.serif },
  { file: 'hand-400.woff2', family: 'LXGW+WenKai+TC', text: FONT_SUBSET_TEXT.hand }
];

const outDir = join(root, 'public/insurcrm/fonts');
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
  console.log(`${job.file}  ${text.length} 字  ${(buf.length / 1024).toFixed(1)} KB`);
}
