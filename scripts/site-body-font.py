"""
產生全站內文字型：Noto Sans TC 400／700 的「本站用字子集」（2026-09-28）。

為什麼
------
原本 app/fonts.css 是 Google Fonts 的 unicode-range 分片原樣搬過來（105 片 × 4 個字重宣告，
共 455 個 @font-face）。那些分片是「可變字型」，每片約 65KB，一個頁面要下載 17 片（約 1.1MB），
而且 455 個宣告讓全站 CSS 變成 146KB、會擋住畫面顯示。

全站的中文內容都寫在 repo 裡（app／components／lib，含部落格文章），不重複的中文字只有一千多個，
所以改成：把 Noto Sans TC 可變字型固定成 400 與 700 兩個靜態字重，只留本站用到的字。

用法
----
改了任何頁面文字（尤其是新增部落格文章）之後執行：

    pip install fonttools brotli     # 第一次
    python scripts/site-body-font.py

會覆寫 public/fonts/body/*.woff2 與 charset.txt。
沒重跑也不會壞：子集裡沒有的字會退回系統字體（Windows 微軟正黑體、Apple 蘋方），
只是那幾個字字形會不同。`node scripts/check-font-charset.mjs` 會列出缺哪些字（build 前自動跑、只警告）。

來源：google/fonts repo 的 ofl/notosanstc/NotoSansTC[wght].ttf（SIL Open Font License）。
"""
import io
import os
import re
import sys
import urllib.request
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'fonts' / 'body'
SRC_URL = 'https://github.com/google/fonts/raw/main/ofl/notosanstc/NotoSansTC%5Bwght%5D.ttf'
CACHE = ROOT / '.cache' / 'NotoSansTC-wght.ttf'
SCAN_DIRS = ['app', 'components', 'lib']
SCAN_EXT = {'.ts', '.tsx'}

# 使用者可能在表單裡打的全形標點、常見符號，一律放進子集
EXTRA = '，。、：；？！「」『』（）【】《》〈〉—…～・．／｜＋－＝％＄＃＠＆＊＿·•→←↑↓×÷°＜＞'


def strip_comments(src: str) -> str:
    """去掉程式註解再收字（註解裡的中文不會出現在畫面上）。
    規則與 scripts/check-font-charset.mjs 的 stripComments 相同，改一邊要同步另一邊。
    `//` 只在行首或空白、標點之後才算註解，網址裡的 `https://` 前面是冒號，不會被誤刪。"""
    src = re.sub(r'/\*[\s\S]*?\*/', '', src)
    return re.sub(r'(^|[\s;{}(),])//.*$', r'\1', src, flags=re.M)


def collect_chars() -> str:
    chars = set(chr(c) for c in range(0x20, 0x7F))
    chars.update(EXTRA)
    for d in SCAN_DIRS:
        for p in (ROOT / d).rglob('*'):
            if p.suffix in SCAN_EXT and p.is_file():
                for ch in strip_comments(p.read_text(encoding='utf-8')):
                    # 中日韓文字、全形符號、各類標點（ASCII 已經在上面）
                    if ord(ch) >= 0x2000:
                        chars.add(ch)
    return ''.join(sorted(chars))


def load_source() -> bytes:
    if CACHE.exists():
        return CACHE.read_bytes()
    print('下載 Noto Sans TC 可變字型（約 12MB）…')
    data = urllib.request.urlopen(SRC_URL, timeout=120).read()
    CACHE.parent.mkdir(parents=True, exist_ok=True)
    CACHE.write_bytes(data)
    return data


def build(weight: int, text: str, src: bytes) -> bytes:
    font = TTFont(io.BytesIO(src))
    font = instancer.instantiateVariableFont(font, {'wght': weight})
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['kern', 'liga', 'palt', 'halt', 'vert', 'locl']
    opts.name_IDs = ['*']
    opts.notdef_outline = True
    opts.hinting = False
    opts.desubroutinize = True
    sub = subset.Subsetter(options=opts)
    sub.populate(text=text)
    sub.subset(font)
    buf = io.BytesIO()
    font.flavor = 'woff2'
    font.save(buf)
    return buf.getvalue()


def main() -> None:
    sys.stdout.reconfigure(encoding='utf-8')
    text = collect_chars()
    src = load_source()
    OUT.mkdir(parents=True, exist_ok=True)
    for w in (400, 700):
        data = build(w, text, src)
        (OUT / f'noto-sans-tc-{w}.woff2').write_bytes(data)
        print(f'noto-sans-tc-{w}.woff2  {len(text)} 字  {len(data) / 1024:.1f} KB')
    (OUT / 'charset.txt').write_text(text, encoding='utf-8')


if __name__ == '__main__':
    sys.exit(main())
