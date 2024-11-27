import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ViewportProvider from "@/contexts/viewport";
// import UserMeProvider from "@/contexts/userMe";
import ModalsProvider from "@/contexts/modals";
import Header from "@/components/header";
import Footer from "@/components/footer";

import "@/styles/globals.scss";
import HeaderModalProvider from "@/contexts/headerModal";

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HeaderModalProvider>
        <ModalsProvider>
          <ViewportProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </ViewportProvider>
        </ModalsProvider>
      </HeaderModalProvider>
    </QueryClientProvider>
  );
};

export default App;
