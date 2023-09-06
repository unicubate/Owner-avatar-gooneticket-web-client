import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import { NextIntlProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import "react-quill/dist/quill.snow.css";
import "toastify-js/src/toastify.css";
import "animate.css";

import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ContextUserProvider } from "@/components/util/session/context-user";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ConfigProvider>
          <ContextUserProvider>
            <Component {...pageProps} />

            {Boolean(process.env.NEXT_PUBLIC_QUERY_DEV_TOOLS) && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </ContextUserProvider>
        </ConfigProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
