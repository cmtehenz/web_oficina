import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider } from 'react-query';
import { theme } from "../styles/theme";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { Provider as NextAuthProvider } from "next-auth/client";
import { makeServer } from "../services/mirage";
import { queryClient } from "../services/queryClient";
import { AuthProvider } from '../contexts/AuthContext';

if(process.env.NODE_ENV === 'development'){
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NextAuthProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <SidebarDrawerProvider>
              <Component {...pageProps} />
            </SidebarDrawerProvider>
          </ChakraProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </NextAuthProvider>
    </AuthProvider>

  );
}

export default MyApp;
