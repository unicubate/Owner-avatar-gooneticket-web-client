import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import "react-quill/dist/quill.snow.css";
import "toastify-js/src/toastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "animate.css";

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ContextUserProvider } from "@/components/util/context-user";
import { ThemeProvider } from "@/components/util/theme-provider";
import { LoadingFile } from "@/components/ui";
import { NextIntlClientProvider } from "next-intl";

import { Suspense } from "react";
import { useRouter } from "next/router";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingFile />}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NextIntlClientProvider
            locale={router.locale}
            timeZone='Europe/Berlin'
            now={new Date()}
            messages={pageProps.messages}
          >
            <HydrationBoundary state={pageProps.dehydratedState}>
              <ConfigProvider>
                <ContextUserProvider>
                  <Component {...pageProps} />

                  {Boolean(process.env.NEXT_PUBLIC_QUERY_DEV_TOOLS) && (
                    <ReactQueryDevtools
                      buttonPosition="bottom-left"
                      initialIsOpen={false}
                    />
                  )}
                </ContextUserProvider>
              </ConfigProvider>
            </HydrationBoundary>
          </NextIntlClientProvider>
        </ThemeProvider>
      </Suspense>
    </QueryClientProvider>
  );
}
