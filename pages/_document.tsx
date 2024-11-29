import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="//fonts.googleapis.com/earlyaccess/notosanskr.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Metrophobic&display=swap" rel="stylesheet" />
      </Head>
      <body style={{ position: "relative" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
