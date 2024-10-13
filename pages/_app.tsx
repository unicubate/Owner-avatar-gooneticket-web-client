import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';
import 'toastify-js/src/toastify.css';

import { LoadingFile } from '@/components/ui-setting';
import { ContextUserProvider } from '@/components/util/context-user';
import { ThemeProvider } from '@/components/util/theme-provider';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ClientOnly } from '@/components/util/client-only';
import { ContextIntlProvider } from '@/i18n/context-intl-provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ContextIntlProvider>
          <GoogleOAuthProvider
            clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
          >
            <ClientOnly fallback={<LoadingFile />}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <ContextUserProvider>
                  <Component {...pageProps} />
                </ContextUserProvider>
              </ThemeProvider>
            </ClientOnly>
          </GoogleOAuthProvider>
        </ContextIntlProvider>
      </HydrationBoundary>

      {Boolean(process.env.NEXT_PUBLIC_QUERY_DEV_TOOLS) && (
        <ReactQueryDevtools
          buttonPosition="bottom-right"
          initialIsOpen={false}
        />
      )}
    </QueryClientProvider>
  );
}
