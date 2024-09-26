import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang={'en'} className="system">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#404756" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#23272f" />
        <link
          href="https://fonts.googleapis.com/css2?family=Krona+One&display=optional"
          rel="stylesheet"
        />
        <title key="title">{`${process.env.NEXT_PUBLIC_NAME_SITE}`}</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
