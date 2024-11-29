import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ViewportProvider from "@/contexts/viewport";
import ModalsProvider from "@/contexts/modals";
import Header from "@/components/header";
import Footer from "@/components/footer";

import "@/styles/globals.scss";

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ModalsProvider>
        <ViewportProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ViewportProvider>
      </ModalsProvider>
    </QueryClientProvider>
  );
};

export default App;
