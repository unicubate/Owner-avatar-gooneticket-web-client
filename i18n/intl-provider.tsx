import { ReactNode } from 'react';
import { IntlProvider as NextIntlProvider } from 'react-intl';

import '@formatjs/intl-relativetimeformat/locale-data/de';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/es';
import '@formatjs/intl-relativetimeformat/locale-data/fr';
import '@formatjs/intl-relativetimeformat/locale-data/ja';
import '@formatjs/intl-relativetimeformat/locale-data/zh';
import '@formatjs/intl-relativetimeformat/polyfill';

import { useLang } from './context-intl-provider';
import deMessages from './lang/de.json';
import enMessages from './lang/en.json';
import esMessages from './lang/es.json';
import frMessages from './lang/fr.json';
import jaMessages from './lang/ja.json';
import zhMessages from './lang/zh.json';

const allMessages = {
  de: deMessages,
  en: enMessages,
  es: esMessages,
  fr: frMessages,
  ja: jaMessages,
  zh: zhMessages,
};

const IntlProvider = ({ children }: { children?: ReactNode }) => {
  const locale = useLang();
  const messages = allMessages[locale];

  return (
    <NextIntlProvider locale={locale} messages={messages}>
      {children}
    </NextIntlProvider>
  );
};

export { IntlProvider };
