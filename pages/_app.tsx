import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import Header from "@/componenets/header";
import Footer from "@/componenets/footer";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const notContainHeaderPages = ["/auth", "/auth"];
  console.log(router)

  return (
    <>
      {!notContainHeaderPages.includes(router.pathname) && <Header />}
      <Component {...pageProps} />
      {!notContainHeaderPages.includes(router.pathname) && <Footer />}
    </>
  );
}
