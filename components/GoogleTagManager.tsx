import Script from 'next/script';

/**
 * GTM 容器載入器。
 *
 * ## 沒設容器 ID 就整段不渲染
 *
 * 不輸出半殘的 script、不用假 ID。理由：一個載不起來的 GTM script 會在每個訪客的
 * console 留下錯誤，而且 `dataLayer` 裡的事件會一直排隊等一個永遠不會來的容器 ——
 * 那比沒有追蹤更難排查。要嘛完整載入，要嘛完全不存在。
 *
 * ## ⚠️ 這個環境變數是「建置時」讀的，不是「執行時」
 *
 * `NEXT_PUBLIC_*` 會在 `next build` 當下被字面替換進打包結果，而且全站頁面都是
 * 靜態預先產生的（build 輸出的 ○ Static），layout 的 HTML 也是那時候就定下來的。
 *
 * 所以在 Zeabur 加完環境變數之後，**必須讓服務重新建置（redeploy），只按重啟是沒有用的**
 * —— 重啟跑的還是同一份 image，裡面沒有那個 ID。判準是 Zeabur 的 Deployments
 * 有沒有新增一筆；沒有新的一筆就代表沒有重建。
 */
export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  if (!gtmId) return null;

  return (
    <Script id="gtm-loader" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
    </Script>
  );
}

/**
 * 關閉 JavaScript 時的備援 iframe。必須放在 `<body>` 裡面（GTM 官方要求），
 * 所以與上面的 script 分開匯出。
 */
export function GoogleTagManagerNoScript() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
