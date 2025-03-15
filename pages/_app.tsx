import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ViewportProvider from "@/contexts/viewport";
import UserMeProvider from "@/contexts/userMe";
import ModalsProvider from "@/contexts/modals";
import Header from "@/components/header/header";
import Footer from "@/components/footer";

import "@/styles/globals.scss";

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ViewportProvider>
        <UserMeProvider>
          <ModalsProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </ModalsProvider>
        </UserMeProvider>
      </ViewportProvider>
    </QueryClientProvider>
  );
};

export default App;
