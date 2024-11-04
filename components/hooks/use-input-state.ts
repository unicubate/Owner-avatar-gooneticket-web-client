import { useDebounce } from '@/utils';
import { useDeferredValue, useState } from 'react';
import { useIntl } from 'react-intl';
import { useLang } from '../../i18n/context-intl-provider';
import { useAuthContext } from '../util/context-user';

export function useInputState() {
  const t = useIntl();
  const [search, setSearch] = useState<string>('');
  const deferredSearch = useDeferredValue(search);
  const [extension, setExtension] = useState<'xlsx' | 'csv'>('xlsx');

  const { user, ipLocation } = useAuthContext();
  const locale = useLang();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined,
  );
  const [hasSuccess, setHasSuccess] = useState<boolean | string | undefined>(
    undefined,
  );

  const handleChangeExtension = (event: any) => {
    setExtension(event.target.value);
  };

  const handleSetSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearch(event.target.value);
  };

  const newSearch = useDebounce(deferredSearch, 500);

  const linkHref = typeof window !== 'undefined' ? window.location.href : null;

  /** scroll to bottom */
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };
  /** End scroll to bottom */
  return {
    scrollToBottom,
    search: newSearch,
    setSearch,
    extension,
    setExtension,
    handleChangeExtension,
    handleSetSearch,
    success,
    loading,
    isOpen,
    hasSuccess,
    setHasSuccess,
    hasErrors,
    setIsOpen,
    setLoading,
    setSuccess,
    setHasErrors,
    user,
    ipLocation,
    linkHref,
    locale,
    t,
  };
}
