import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Metrophobic&family=Noto+Sans+KR:wght@100..500&family=Varela+Round&display=swap"
        />
        <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=062737a11ba892d22d26ed9e7ef513f1"></script>
      </Head>
      <body style={{ position: "relative" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
