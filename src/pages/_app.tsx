import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from "../styles/theme";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { Provider as NextAuthProvider } from "next-auth/client";
import { makeServer } from "../services/mirage";

if(process.env.NODE_ENV === 'development'){
  makeServer();
}

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
