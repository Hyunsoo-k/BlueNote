import type { AppProps } from "next/app";
import ViewportProvider from "@/contexts/viewport";
import UserMeProvider from "@/contexts/userMe";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "@/components/header";
import Footer from "@/components/footer";
import "@/styles/globals.scss";

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ViewportProvider>
        <UserMeProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </UserMeProvider>
      </ViewportProvider>
    </QueryClientProvider>
  );
};

export default App;
