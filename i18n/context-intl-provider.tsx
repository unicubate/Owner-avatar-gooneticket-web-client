import Cookies from 'js-cookie';
//import { navigator } from 'window'
import { ReactNode, createContext, useContext } from 'react';

const I18N_CONFIG_KEY = process.env.NEXT_PUBLIC_I18N_CONFIG_KEY ?? 'x-lang';

type Props = 'de' | 'en' | 'es' | 'fr' | 'ja' | 'zh';

export const initialLang: Props =
  typeof window !== 'undefined' ? (navigator.language as Props) : 'en';

function getConfig(): Props {
  const ls = Cookies.get(I18N_CONFIG_KEY);
  if (ls) {
    try {
      return ls as Props;
    } catch (er) {
      console.error(er);
    }
  }
  return initialLang;
}

// Side effect
export function setLanguage(lang: string) {
  Cookies.set(I18N_CONFIG_KEY, lang);
  window.location.reload();
}

const I18nContext = createContext<Props>(initialLang);

const useLang = () => {
  return useContext(I18nContext);
};

const ContextIntlProvider = ({ children }: { children?: ReactNode }) => {
  const lang = getConfig();
  return <I18nContext.Provider value={lang}>{children}</I18nContext.Provider>;
};

export { ContextIntlProvider, useLang };
