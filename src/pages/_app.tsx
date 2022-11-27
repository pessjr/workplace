import * as React from "react";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";

import createEmotionCache from "../utils/createEmotionCache";
import { theme } from "../utils/theme";
import "../../styles/globals.css";
import { CookiesProvider } from "react-cookie";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(theme);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <CookiesProvider>
              <SnackbarProvider autoHideDuration={3000}>
                <Component {...pageProps} />
              </SnackbarProvider>
            </CookiesProvider>
          </ThemeProvider>
        </CacheProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
