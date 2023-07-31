import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import { NextIntlProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import "toastify-js/src/toastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ContextUserProvider } from "@/components/util/session/context-user";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextUserProvider>
        <ConfigProvider>
          <Component {...pageProps} />

          {Boolean(process.env.NEXT_PUBLIC_QUERY_DEV_TOOLS) && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </ConfigProvider>
      </ContextUserProvider>
    </QueryClientProvider>
  );
}
