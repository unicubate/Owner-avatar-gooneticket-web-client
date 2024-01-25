import '@/styles/globals.css';
import 'animate.css';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';
import 'toastify-js/src/toastify.css';

import { LoadingFile } from '@/components/ui-setting/ant';
import { ContextUserProvider } from '@/components/util/context-user';
import { ThemeProvider } from '@/components/util/theme-provider';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextIntlClientProvider } from 'next-intl';

import { useRouter } from 'next/router';
import { Suspense } from 'react';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingFile />}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider
            locale={router.locale}
            timeZone="Europe/Berlin"
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
